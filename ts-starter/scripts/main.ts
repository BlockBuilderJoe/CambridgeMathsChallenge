import { world } from "@minecraft/server";
import { getInput } from "./input";
import { outputTotal, clearAnswer } from "./output";
import { calculateTotal } from "./calculator";
import { roundToDigits } from "./numberHandler";

const overworld = world.getDimension("overworld");

world.afterEvents.buttonPush.subscribe(async(event) => {
  await clearAnswer();
  let leftInput = getInput({x: -14, y: -59, z: 93}, {x: -13, y: -59, z: 93}, {x: -12, y: -59, z: 93});
  let rightInput = getInput({x: -10, y: -59, z: 93}, {x: -9, y: -59, z: 93}, {x: -8, y: -59, z: 93});
  let total = calculateTotal(leftInput, rightInput);
  if (total){
    let roundedTotal = roundToDigits(total, 6);
    outputTotal(roundedTotal, {x: -8, y: -57, z: 93});
    if (roundedTotal === total){
      world.sendMessage(`The total is ${total}.`);
    }
    else {
      world.sendMessage(`The total is ${total} and has been rounded to ${roundedTotal}.`);
    }
    
  }

});