import { BlockPermutation, world } from "@minecraft/server";

let overworld = world.getDimension("overworld");

export function cuisenaire(
  event: any,
  blockName: string,
  rodLength: number,
  successMessage: string,
  direction: string
) {
  if (event.block.permutation?.matches(blockName)) {
    overworld.runCommand("title @p actionbar " + successMessage);
    for (let i = 0; i < rodLength; i++) {
      //runs east to the rod length
      if (event.block[direction](i)?.permutation?.matches("sandstone")) {
        world.sendMessage("It's gone over a whole rod length!");
        event.block.setPermutation(BlockPermutation.resolve("grass"));
        break;
      } else {
        if (["east", "west", "north", "south"].includes(direction)) {
          event.block[direction](i)?.setPermutation(BlockPermutation.resolve(blockName));
        } else {
          throw new Error(`Invalid direction: ${direction}`);
        }
      }
    }
  }
}

export async function getBlockBehind(event: any, oppositeDirection: string) {
  let hasColour = event.block[oppositeDirection](1)?.permutation?.getState("color");
  return hasColour;    
}
