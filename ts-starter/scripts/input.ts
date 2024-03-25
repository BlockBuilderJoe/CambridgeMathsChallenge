import { BlockPermutation, Vector3, world } from "@minecraft/server";

let overworld = world.getDimension("overworld");

//combines 3 digits into a single number
export function getInput(digit0: Vector3, digit1: Vector3, digit2: Vector3): number {
    let digit0Value = getNumberValue(digit0);
    let digit1Value = getNumberValue(digit1);
    let digit2Value = getNumberValue(digit2);
    let combinedString = '' + digit0Value + digit1Value + digit2Value;
    let combinedNumber = parseInt(combinedString);
    return combinedNumber;
}
  
//converts a block to a number value
function getNumberValue(location: Vector3) {
    let {block, permutation} = getBlockValue(location);
    for (let i = 0; i < 10; i++) {//check for element_0 to element_9
        if (permutation?.matches("element_" + i)) {
          return i;
        }
      }
      block?.setPermutation(BlockPermutation.resolve("element_0")); //if no match is found, default to element_0
      return 0; //if no match is found, return 0
    }

//gets the block and permutation of a block at a specific location
export function getBlockValue(location: Vector3) {
    const block = overworld.getBlock(location); //get the block at the location
    const permutation = block?.permutation; //get the permutation of the block
    return {block, permutation};
  }
  