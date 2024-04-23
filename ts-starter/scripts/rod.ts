import { BlockPermutation, world } from "@minecraft/server";

let overworld = world.getDimension("overworld");

const left = {
  east: "south",
  south: "west",
  west: "north",
  north: "east",
};

const right = {
  east: "north",
  north: "west",
  west: "south",
  south: "east",
};

export function cuisenaire(
  event: any,
  blockName: string,
  rodLength: number,
  successMessage: string,
  direction: string
) {
  let extend = true;
  if (event.block.permutation?.matches(blockName)) {
    overworld.runCommand("title @p actionbar " + successMessage);
    for (let i = 0; i < rodLength; i++) {
      //runs east to the rod length
      if (event.block[direction](i)?.permutation?.matches("sandstone")) {
        world.sendMessage("It's gone over a whole rod length!");
        event.block.setPermutation(BlockPermutation.resolve("grass"));
        extend = false;
        break;
      } else {
        if (["east", "west", "north", "south"].includes(direction)) {
          event.block[direction](i)?.setPermutation(BlockPermutation.resolve(blockName));
        } else {
          throw new Error(`Invalid direction: ${direction}`);
        }
      }
    }
    if (extend == true) {
      extendRods(event, blockName, rodLength, direction);
    }
  }
}

export function extendRods(event: any, blockName: string, rodLength: number, direction: string) {
  const leftDirection = left[direction as keyof typeof left];
  const rightDirection = right[direction as keyof typeof right];
  //copy to the left
  for (let i = 0; i < 10; i++) {
    //runs south
    if (
      event.block[leftDirection](i)?.permutation?.matches("sandstone") ||
      event.block[leftDirection](i)?.permutation?.matches("white_concrete")
    ) {
      break;
    } else {
      for (let j = 0; j < rodLength; j++) {
        //runs south to the rod length
        event.block[leftDirection](i)?.setPermutation(BlockPermutation.resolve(blockName));
        event.block[leftDirection](i)?.[direction](j)?.setPermutation(BlockPermutation.resolve(blockName));
      }
    }
  }
  //copy to the right
  for (let i = 0; i < 9; i++) {
    //runs north
    if (
      event.block[rightDirection](i)?.permutation?.matches("sandstone") ||
      event.block[rightDirection](i)?.permutation?.matches("white_concrete")
    ) {
      break;
    } else {
      for (let j = 0; j < rodLength; j++) {
        //runs north to the rod length
        event.block[rightDirection](i)?.setPermutation(BlockPermutation.resolve(blockName));
        event.block[rightDirection](i)?.[direction](j)?.setPermutation(BlockPermutation.resolve(blockName));
      }
    }
  }
}
