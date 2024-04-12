import { BlockPermutation, world } from "@minecraft/server";
let overworld = world.getDimension("overworld")

export function cuisenaire(event: any, blockName: string, rodLength: number, successMessage: string, failureMessage: string) {
    if (event.block.permutation?.matches(blockName)) {
      overworld.runCommand("title @p actionbar " + successMessage);
      for (let i = 0; i < rodLength; i++) {
        event.block.north(i)?.setPermutation(BlockPermutation.resolve(blockName));
        }
    } else {
      overworld.runCommand("title @p actionbar " + failureMessage);
      world.sendMessage(failureMessage);
      event.block.setPermutation(BlockPermutation.resolve("lava"));   
    }
  }
