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
    overworld.runCommand("title @p actionbar " + successMessage);
    for (let i = 0; i < rodLength; i++) {
      //runs east to the rod length
      if (block[direction](i)?.permutation?.matches("sandstone") || block[direction](i)?.permutation?.matches("white_concrete") || block[direction](1)?.permutation?.getState("color") ) {
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
        block?.setPermutation(BlockPermutation.resolve("air"));
      
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


export async function getBlockBehind(event: any, oppositeDirection: string) {
  let hasColour = event.block[oppositeDirection](1)?.permutation?.getState("color");
  return hasColour;    
}


export async function replayRods(rodsPlaced: any[], entity: any){
  entity.runCommandAsync(`title ${entity.name} actionbar Replaying rods`);
  entity.runCommandAsync(`clear ${entity.name}`);
  entity.runCommandAsync(`replaceitem entity ${entity.name} slot.weapon.mainhand 0 filled_map`);
  
  for (let i = 0; i < rodsPlaced.length; i++) {
    ((index) => {
      system.runTimeout(async() => {
        let location = {x: rodsPlaced[index].location.x, y: rodsPlaced[index].location.y, z: rodsPlaced[index].location.z + 33};
        let block = overworld.getBlock(location);
        world.sendMessage(`Replaying rod ${index}`);
        placeRods(block, rodsPlaced[index].blockName, rodsPlaced[index].rodLength, rodsPlaced[index].direction);
      }, 40 * index);
    })(i);
  }
}

