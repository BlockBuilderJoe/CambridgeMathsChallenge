import { BlockPermutation, world, system, Vector3, Player, EntityInventoryComponent, EquipmentSlot, EntityItemComponent} from "@minecraft/server";
let overworld = world.getDimension("overworld");


export function cuisenaire(
  block: any,
  blockName: string,
  rodLength: number,
  successMessage: string,
  direction: string,
  rodsPlaced: any[]
) {
  if (block.permutation?.matches(blockName)) {
    let runPlaceRods = true;
    let hasColour = null;
    overworld.runCommand("title @p actionbar " + successMessage);
    block.setPermutation(BlockPermutation.resolve("tallgrass"));
    for (let i = 0; i < rodLength; i++) {
      let colour = block[direction](i)?.permutation?.getState("color");
      if (colour || block[direction](i)?.permutation?.matches("sandstone") ) {
          world.sendMessage("It's gone over a whole rod length!");
          runPlaceRods = false;
          break;
        }
    }
    if (runPlaceRods) {
        rodsPlaced.push({location: block.location, direction: direction, rodLength: rodLength, blockName: blockName});
        placeRods(block, blockName, rodLength, direction);
      }
      else {
        block?.setPermutation(BlockPermutation.resolve("tallgrass"));
      
      }
  }
}

function placeRods(block: any, blockName: string, rodLength: number, direction: string){
      for (let i = 0; i < rodLength; i++) {
          if (["east", "west", "north", "south"].includes(direction)) {
            block[direction](i)?.setPermutation(BlockPermutation.resolve(blockName));
          } else {
            throw new Error(`Invalid direction: ${direction}`);
          }
        }
}

async function setCameraView(x: number, player: any){
            if (x >= 25 && x <= 48) {
              player.runCommandAsync(`camera ${player.name} set minecraft:free pos 36 120 44 facing 36 94 44`);
            } else if (x >= 0 && x <= 23) {
              player.runCommandAsync(`camera ${player.name} set minecraft:free pos 11 120 44 facing 11 94 44`);
            } else if (x >= -25 && x <= -2) {
              player.runCommandAsync(`camera ${player.name} set minecraft:free pos -14 120 44 facing -14 94 44`);
            } else if (x >= -50 && x <= -27) {
              player.runCommandAsync(`camera ${player.name} set minecraft:free pos -39 120 44 facing -39 94 44`);
            }  
}

export async function getBlockBehind(event: any, oppositeDirection: string) {
  let hasColour = event.block[oppositeDirection](1)?.permutation?.getState("color");
  return hasColour;    
}
export async function replayRods(rodsPlaced: any[], player: any, perfectRun: any[]){
  if (JSON.stringify(rodsPlaced) === JSON.stringify(perfectRun)){
    world.sendMessage('You placed the rods in the most efficient way! Well done!');
  } else {
    await resetGrid({ x: -50, y: 94, z: 33 });
    for (let i = 0; i < rodsPlaced.length; i++) {      
      player.runCommandAsync(`title ${player.name} actionbar This was how you placed the rods.`);
      ((index) => {
        system.runTimeout(async() => {
            let x = rodsPlaced[index].location.x;
            await setCameraView(x, player);
            let block = overworld.getBlock(rodsPlaced[index].location); 
            placeRods(block, rodsPlaced[index].blockName, rodsPlaced[index].rodLength, rodsPlaced[index].direction);
            if (perfectRun[index] && rodsPlaced[index].blockName !== perfectRun[index].blockName) {
              player.runCommandAsync(`title ${player.name} actionbar ${rodsPlaced[index].rodLength} is not the most efficient factor.`);
            } else if (!perfectRun[index]) {
              // Handle the case where there is no corresponding value in perfectRun to stop errors.
              player.runCommandAsync(`title ${player.name} actionbar ${rodsPlaced[index].rodLength} is not the most efficient factor.`);
            }
            if (i === rodsPlaced.length -1) { //resets the camera 2 seconds after last rod placed.
              system.runTimeout(() => { 
                player.runCommandAsync(`camera ${player.name} clear`)
              }
              , 40);
          }
          }, 40 * index);
      })(i);
  }
}
}

//Resets the area to the original state, one area at a time. 
async function squareReset(pos1: Vector3, pos2: Vector3, concreteColours: string[]) {
  for (let i = 0; i < concreteColours.length; i++) {
    let command = `fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace ${concreteColours[i]}_concrete`;
    overworld.runCommand(command);
  }
  overworld.runCommandAsync(`fill ${pos1.x} ${pos1.y - 1} ${pos1.z} ${pos2.x} ${pos2.y - 1} ${pos2.z} grass replace dirt`);
  overworld.runCommandAsync(`fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace air`);
}

//preps the grid coordinates for the squareReset function.
export async function resetGrid(location: Vector3) {
  let concreteColours = ["red", "green", "purple", "brown", "blue", "lime", "yellow"]; // What rods will be replaced. 
  for (let i = 0; i < 4; i++) {
      let offset_x = location.x + i * 25; // 25 is the distance between each starting point of the grid.
      let pos1 = {x: offset_x, y: location.y, z: location.z};
      let pos2 = {x: offset_x + 24, y: location.y, z: location.z + 24};
      await squareReset(pos1, pos2, concreteColours);
    }
  }

