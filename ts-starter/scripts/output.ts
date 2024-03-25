import { BlockPermutation, Vector3, world} from "@minecraft/server";
import { getBlockValue } from "./input";

const overworld = world.getDimension("overworld");
//outputs the total to the screen
export function outputTotal(total: number, location: Vector3){
    let blockName = "";
    let totalString = ('' + total).split('').reverse().join(''); //reverses the string so it can be read from right to left
    for (let i = 0; i < totalString.length; i++){
      let {block, permutation} = getBlockValue(location);
      if (totalString[i] === '.') {
        blockName = "anvil";
      } else {
        let digit = parseInt(totalString[i]);
        blockName = "element_" + digit;
      }
      block?.setPermutation(BlockPermutation.resolve(blockName));
      location.x -= 1;
    }
  }

  export async function clearAnswer(start: Vector3, end: Vector3) {
    overworld.runCommandAsync(`fill ${start.x} ${start.y} ${start.z} ${end.x} ${end.y} ${end.z} air replace`);
  }