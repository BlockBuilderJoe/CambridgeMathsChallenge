import { BlockPermutation, Vector3, world } from "@minecraft/server";
import { getBlockValue } from "./input";

const overworld = world.getDimension("overworld");
//outputs the total to the screen
export function outputTotal(total: number, location: Vector3) {
  let blockName = "";
  let totalString = ("" + total).split("").reverse().join(""); //reverses the string so it can be read from right to left
  for (let i = 0; i < totalString.length; i++) {
    let { block, permutation } = getBlockValue(location);
    if (totalString[i] === ".") {
      blockName = "blockbuilders:symbol_decimalpoint";
    } else {
      let digit = parseInt(totalString[i]);
      blockName = "blockbuilders:number_" + digit;
    }
    block?.setPermutation(BlockPermutation.resolve(blockName));
    location.x -= 1;
  }
}

export function setBlock(location: Vector3, blockName: string) {
  let { block } = getBlockValue(location);
  let isCopper = block?.permutation?.matches("waxed_weathered_copper");
  if (!isCopper) {
    //keeps the frame.
    block?.setPermutation(BlockPermutation.resolve(blockName));
  }
}

export async function clearAnswer(start: Vector3, end: Vector3) {
  overworld.runCommandAsync(`fill ${start.x} ${start.y} ${start.z} ${end.x} ${end.y} ${end.z} air replace`);
}
export function cycleNumberBlock(clickEvent: any) {
  for (let i = 0; i < 9; i++) {
    //check for element_0 toplement_8
    if (clickEvent.brokenBlockPermutation?.matches("blockbuilders:number_" + i)) {
      let nextNumber = i + 1;
      let blockname = "blockbuilders:number_" + nextNumber;
      clickEvent.block.setPermutation(BlockPermutation.resolve(blockname));
    }
    if (clickEvent.brokenBlockPermutation?.matches("blockbuilders:number_9")) {
      clickEvent.block.setPermutation(BlockPermutation.resolve("blockbuilders:number_0"));
    }
  }
}
