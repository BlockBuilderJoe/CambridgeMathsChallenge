import { BlockPermutation, world, system, Vector3, Player, EntityInventoryComponent, EquipmentSlot, EntityItemComponent} from "@minecraft/server";
import { grid } from "./grid";
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
  let perfectRun = [{location: {x:609, y:-60, z:1009}, direction: "east", rodLength: 2, blockName: "red_concrete"}, {location: {x: 610, y: -60, z: 1008}, direction: "north", rodLength: 2, blockName: "red_concrete"}, {location: {x: 610, y: -60, z: 1005}, direction: "north", rodLength: 4, blockName: "purple_concrete"}, {location: {x: 611, y: -60, z: 1002}, direction: "east", rodLength: 8, blockName: "brown_concrete"}];
  world.sendMessage('Replaying rods');
  entity.runCommandAsync(`title ${entity.name} actionbar Replaying rods`);
  entity.runCommandAsync(`clear ${entity.name}`);
  entity.runCommandAsync(`replaceitem entity ${entity.name} slot.weapon.mainhand 0 filled_map`);
  await grid({ x: 608, y: -60, z: 995 });
  let shouldContinue = true;

  for (let i = 0; i < rodsPlaced.length; i++) {
    ((index) => {
      system.runTimeout(() => {
        if (!shouldContinue) {
          return;
        }

        let offsetLocation = {x: perfectRun[index].location.x, y: perfectRun[index].location.y, z: perfectRun[index].location.z + 33};
        let offsetBlock = overworld.getBlock(offsetLocation);
        let block = overworld.getBlock(rodsPlaced[index].location); 
        placeRods(block, rodsPlaced[index].blockName, rodsPlaced[index].rodLength, rodsPlaced[index].direction);
        placeRods(offsetBlock, perfectRun[index].blockName, perfectRun[index].rodLength, perfectRun[index].direction);
        if (rodsPlaced[index].blockName !== perfectRun[index].blockName) {
          world.sendMessage(`${rodsPlaced[index].rodLength} is not the most efficient rod to place here. If you want to get further try again!`);
          shouldContinue = false;
        }
      }, 40 * index);
    })(i);
  }
}
