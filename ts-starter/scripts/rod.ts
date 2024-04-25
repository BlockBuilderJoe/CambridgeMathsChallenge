import { BlockPermutation, world } from "@minecraft/server";
import { ActionFormResponse } from "@minecraft/server-ui";

let overworld = world.getDimension("overworld");

export function cuisenaire(
  event: any,
  blockName: string,
  rodLength: number,
  successMessage: string,
  direction: string
) {
  if (event.block.permutation?.matches(blockName)) {
    let placeRods = true;
    overworld.runCommand("title @p actionbar " + successMessage);
    for (let i = 0; i < rodLength; i++) {
      //runs east to the rod length
      if (event.block[direction](i)?.permutation?.matches("sandstone") || event.block[direction](i)?.permutation?.matches("white_concrete") || event.block[direction](1)?.permutation?.getState("color") ) {
        world.sendMessage("It's gone over a whole rod length!");
        placeRods = false;
        break;
      }
    }
    if (placeRods) {
      for (let i = 0; i < rodLength; i++) {
          if (["east", "west", "north", "south"].includes(direction)) {
            event.block[direction](i)?.setPermutation(BlockPermutation.resolve(blockName));
          } else {
            throw new Error(`Invalid direction: ${direction}`);
          }
        }
      }
      else {
        event.block?.setPermutation(BlockPermutation.resolve("air"));
      
      }
  }
}

export async function getBlockBehind(event: any, oppositeDirection: string) {
  let hasColour = event.block[oppositeDirection](1)?.permutation?.getState("color");
  return hasColour;    
}
