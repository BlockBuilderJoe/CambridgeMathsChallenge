import { BlockPermutation, world } from "@minecraft/server";

export function cuisenaire(event: any, blockName: string, rodLength: number, successMessage: string, failureMessage: string) {
    if (event.block.permutation?.matches(blockName)) {
      world.sendMessage(successMessage);
      for (let i = 0; i < rodLength; i++) {
        event.block.north(i)?.setPermutation(BlockPermutation.resolve(blockName));
        }
    } else {
      world.sendMessage(failureMessage);
      event.block.setPermutation(BlockPermutation.resolve("lava"));   
    }
  }
