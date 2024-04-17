import { BlockPermutation, world } from "@minecraft/server";
let overworld = world.getDimension("overworld")
export function cuisenaire(event: any, blockName: string, rodLength: number, successMessage: string) {
    let extend = true;
    if (event.block.permutation?.matches(blockName)) {
      overworld.runCommand("title @p actionbar " + successMessage);
      for (let i = 0; i < rodLength; i++) { //runs east to the rod length
        if (event.block.east(i)?.permutation?.matches("sandstone")) {
          world.sendMessage("It's gone over a whole rod length!");
          event.block.setPermutation(BlockPermutation.resolve("grass"));
          extend = false;
          break;
        }
        else {
          event.block.east(i)?.setPermutation(BlockPermutation.resolve(blockName));
        }
      }
      if (extend == true) {
        extendRods(event, blockName, rodLength);
      }
    }
  }

  export function clearMap(){
    overworld.runCommand("clear @a filled_map");
    overworld.runCommand("give @a empty_map");
  }

  export function extendRods(event: any, blockName: string, rodLength: number){
    for (let i = 0; i < 10; i++) { //runs south
      if (event.block.south(i)?.permutation?.matches("sandstone") || event.block.south(i)?.permutation?.matches("white_concrete")){
          break;
      }
      else {
        for (let j = 0; j < rodLength; j++) { //runs south to the rod length
          event.block.south(i)?.setPermutation(BlockPermutation.resolve(blockName));
          event.block.south(i)?.east(j)?.setPermutation(BlockPermutation.resolve(blockName));
        }
        }
    }
  
    for (let i = 0; i < 9; i++) { //runs north
        if (event.block.north(i)?.permutation?.matches("sandstone") || event.block.north(i)?.permutation?.matches("white_concrete")) {
            break;
        }
        else {
          for (let j = 0; j < rodLength; j++) { //runs north to the rod length
            event.block.north(i)?.setPermutation(BlockPermutation.resolve(blockName));
            event.block.north(i)?.east(j)?.setPermutation(BlockPermutation.resolve(blockName));
        }
      }
    }
  }