import { BlockPermutation, Vector3, world } from "@minecraft/server";

let overworld = world.getDimension("overworld");

//combines multiple digits into a single number
export function getInput(digits: Vector3[]): number {
  let combinedString = "";
  for (let digit of digits) {
    let digitValue = getNumberValue(digit);
    combinedString += digitValue;
  }
  let combinedNumber = parseInt(combinedString);
  return combinedNumber;
}

//gets the block and permutation of a cuboid selection
//if it doesn't work make sure pos1 is the bottom left corner and pos2 is the top right corner
export async function getCube(pos1: Vector3, pos2: Vector3) {
  const blocks = [];
  //world.sendMessage("pos1 = " + pos1.x + "," + pos1.y + "," + pos1.z);
  //world.sendMessage("pos2 = " + pos2.x + "," + pos2.y + "," + pos2.z);
  for (let x3 = pos1.x; x3 <= pos2.x; x3++) {
    for (let y3 = pos1.y; y3 <= pos2.y; y3++) {
      for (let z3 = pos1.z; z3 <= pos2.z; z3++) {
        const location = { x: x3, y: y3, z: z3 };
        const blockValue = getBlockValue(location);
        blocks.push(blockValue);
      }
    }
  }

  return blocks;
}

//converts a block to a number value
function getNumberValue(location: Vector3) {
  let { block, permutation } = getBlockValue(location);
  for (let i = 0; i < 10; i++) {
    //check for element_0 to element_9
    if (permutation?.matches("blockbuilders:number_" + i)) {
      return i;
    }
  }
  block?.setPermutation(BlockPermutation.resolve("blockbuilders:number_0")); //if no match is found, default to element_0
  return 0; //if no match is found, return 0
}

//gets the block and permutation of a block at a specific location
export function getBlockValue(location: Vector3) {
  const block = overworld.getBlock(location); //get the block at the location
  const permutation = block?.permutation; //get the permutation of the block
  return { block, permutation };
}

//gets the block and permutation of a block at a specific location
export async function getAsyncBlockValue(location: Vector3) {
  const block = overworld.getBlock(location); //get the block at the location
  const permutation = block?.permutation; //get the permutation of the block
  return { block, permutation };
}
