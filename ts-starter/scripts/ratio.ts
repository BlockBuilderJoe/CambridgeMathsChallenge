import { world, BlockPermutation, Vector3 } from "@minecraft/server";
import { getBlockValue } from "./input";
import { outputTotal, clearAnswer } from "./output";
import { roundToDigits } from "./numberHandler";

export async function ratio1() {
  let output1 = { x: -42, y: -59, z: 93 };
  let output2 = { x: -40, y: -59, z: 93 };
  world.sendMessage("Calculating the ratio of pink to yellow blocks.");
  let ratioInput = [
    { x: -37, y: -58, z: 93 },
    { x: -39, y: -60, z: 93 },
    { x: -38, y: -60, z: 93 },
    { x: -37, y: -60, z: 93 },
    { x: -36, y: -60, z: 93 },
    { x: -35, y: -60, z: 93 },
    { x: -38, y: -59, z: 93 },
    { x: -37, y: -59, z: 93 },
    { x: -36, y: -59, z: 93 },
  ];
  let { pink, yellow } = calculateRatio(ratioInput); // Assign values to pink and yellow variables
  world.sendMessage("The ratio is:");
  world.sendMessage(pink + ":" + yellow);
  outputTotal(pink, output1);
  outputTotal(yellow, output2);
}

function calculateRatio(ratioInput: Vector3[]) {
  let yellow = 0;
  let pink = 0;
  for (let i = 0; i < ratioInput.length; i++) {
    let { block, permutation } = getBlockValue(ratioInput[i]);
    if (permutation?.matches("yellow_concrete")) {
      yellow++;
    } else if (permutation?.matches("pink_concrete")) {
      pink++;
    }
  }
  return { pink, yellow };
}
