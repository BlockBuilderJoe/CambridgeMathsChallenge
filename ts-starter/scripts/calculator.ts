import { getBlockValue } from "./input";
import { world } from "@minecraft/server";

//calculates the total based on the block in the center
export function calculateTotal(leftvalue: number, rightvalue: number){
    let {block, permutation} = getBlockValue({x: -11, y: -59, z: 93});
    if (permutation?.matches("cut_copper")) {
      let total = leftvalue + rightvalue;
      return total;
    }
    else if (permutation?.matches("raw_gold_block")) {
      let total = leftvalue - rightvalue;
      return total;
    }
    else if (permutation?.matches("gold_block")) {
      let total = leftvalue * rightvalue;
      return total;
    }
    else if (permutation?.matches("cobblestone")) {
      let total = leftvalue / rightvalue;
      return total;
    }
    else {
      world.sendMessage("Add a +, -, *, or / block to the center to perform an operation.");
    }
  }
  