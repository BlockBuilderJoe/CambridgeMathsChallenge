// scripts/main.ts
import { world as world7 } from "@minecraft/server";

// scripts/input.ts
import { BlockPermutation, world } from "@minecraft/server";
var overworld = world.getDimension("overworld");
function getInput(digits) {
  let combinedString = "";
  for (let digit of digits) {
    let digitValue = getNumberValue(digit);
    combinedString += digitValue;
  }
  let combinedNumber = parseInt(combinedString);
  return combinedNumber;
}
async function getCube(pos1, pos2) {
  const blocks = [];
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
function getNumberValue(location) {
  let { block, permutation } = getBlockValue(location);
  for (let i = 0; i < 10; i++) {
    if (permutation?.matches("blockbuilders:number_" + i)) {
      return i;
    }
  }
  block?.setPermutation(BlockPermutation.resolve("blockbuilders:number_0"));
  return 0;
}
function getBlockValue(location) {
  const block = overworld.getBlock(location);
  const permutation = block?.permutation;
  return { block, permutation };
}

// scripts/calculator.ts
import { world as world3 } from "@minecraft/server";

// scripts/output.ts
import { BlockPermutation as BlockPermutation2, world as world2 } from "@minecraft/server";
var overworld2 = world2.getDimension("overworld");
function outputTotal(total, location) {
  let blockName = "";
  let totalString = ("" + total).split("").reverse().join("");
  for (let i = 0; i < totalString.length; i++) {
    let { block, permutation } = getBlockValue(location);
    if (totalString[i] === ".") {
      blockName = "blockbuilders:symbol_decimalpoint";
    } else {
      let digit = parseInt(totalString[i]);
      blockName = "blockbuilders:number_" + digit;
    }
    block?.setPermutation(BlockPermutation2.resolve(blockName));
    location.x -= 1;
  }
}
function setBlock(location, blockName) {
  let { block } = getBlockValue(location);
  block?.setPermutation(BlockPermutation2.resolve(blockName));
}
async function clearAnswer(start, end) {
  overworld2.runCommandAsync(`fill ${start.x} ${start.y} ${start.z} ${end.x} ${end.y} ${end.z} air replace`);
}

// scripts/numberHandler.ts
function roundToDigits(num, digits) {
  let numStr = num.toString();
  if (numStr.length > digits) {
    if (numStr.includes(".")) {
      let [whole, decimal] = numStr.split(".");
      if (whole.length >= digits) {
        return parseFloat(whole.slice(0, digits));
      } else {
        let decimalDigits = digits - whole.length;
        return parseFloat(num.toFixed(decimalDigits));
      }
    } else {
      return parseFloat(numStr.slice(0, digits));
    }
  } else {
    return num;
  }
}

// scripts/calculator.ts
function calculateTotal(leftvalue, rightvalue) {
  let { block, permutation } = getBlockValue({ x: -11, y: -59, z: 93 });
  world3.sendMessage("The sum is:");
  if (permutation?.matches("blockbuilders:symbol_plus")) {
    world3.sendMessage(leftvalue + "+" + rightvalue);
    let total = leftvalue + rightvalue;
    return total;
  } else if (permutation?.matches("blockbuilders:symbol_subtract")) {
    world3.sendMessage(leftvalue + "-" + rightvalue);
    let total = leftvalue - rightvalue;
    return total;
  } else if (permutation?.matches("blockbuilders:symbol_times")) {
    world3.sendMessage(leftvalue + "*" + rightvalue);
    let total = leftvalue * rightvalue;
    return total;
  } else if (permutation?.matches("blockbuilders:symbol_divide")) {
    world3.sendMessage(leftvalue + "/" + rightvalue);
    let total = leftvalue / rightvalue;
    return total;
  } else {
    world3.sendMessage("Add a +, -, *, or / block to the center to perform an operation.");
  }
}
async function calculate() {
  await clearAnswer({ x: -14, y: -57, z: 93 }, { x: -8, y: -57, z: 93 });
  let leftInput = getInput([{ x: -14, y: -59, z: 93 }, { x: -13, y: -59, z: 93 }, { x: -12, y: -59, z: 93 }]);
  let rightInput = getInput([{ x: -10, y: -59, z: 93 }, { x: -9, y: -59, z: 93 }, { x: -8, y: -59, z: 93 }]);
  let total = calculateTotal(leftInput, rightInput);
  if (total !== null && total !== void 0) {
    let roundedTotal = roundToDigits(total, 6);
    outputTotal(roundedTotal, { x: -8, y: -57, z: 93 });
    world3.sendMessage("The total is:");
    if (roundedTotal === total) {
      world3.sendMessage(`${total}.`);
    } else {
      world3.sendMessage(`${total} and has been rounded to ${roundedTotal}.`);
    }
  } else {
    world3.sendMessage("Please input a number.");
  }
}

// scripts/fraction.ts
import { world as world4 } from "@minecraft/server";
async function fraction1() {
  let outputRight = { x: -22, y: -59, z: 93 };
  let outputLeft = { x: -26, y: -59, z: 93 };
  await clearAnswer(outputRight, outputLeft);
  let numerator = getInput([{ x: -28, y: -57, z: 93 }]);
  let denominator = getInput([{ x: -28, y: -59, z: 93 }]);
  let input = getInput([{ x: -26, y: -57, z: 93 }, { x: -25, y: -57, z: 93 }, { x: -24, y: -57, z: 93 }]);
  world4.sendMessage("The fraction is:");
  world4.sendMessage(numerator + "/" + denominator + " of " + input);
  let fraction = calculateFraction(numerator, denominator);
  let result = fraction * input;
  world4.sendMessage("The Output is:");
  let roundedFraction = roundToDigits(result, 4);
  if (result === roundedFraction) {
    world4.sendMessage("" + roundedFraction);
  } else {
    world4.sendMessage("" + result + " which has been rounded to " + roundedFraction);
  }
  outputTotal(roundedFraction, outputRight);
}
function calculateFraction(numerator, denominator) {
  if (denominator === 0) {
    world4.sendMessage("The denominator cannot be 0. Please input a different number.");
  }
  return numerator / denominator;
}

// scripts/ratio.ts
import { world as world5 } from "@minecraft/server";
async function ratio1() {
  let output1 = { x: -42, y: -59, z: 93 };
  let output2 = { x: -40, y: -59, z: 93 };
  world5.sendMessage("Calculating the ratio of pink to yellow blocks.");
  let ratioInput = [{ x: -37, y: -58, z: 93 }, { x: -39, y: -60, z: 93 }, { x: -38, y: -60, z: 93 }, { x: -37, y: -60, z: 93 }, { x: -36, y: -60, z: 93 }, { x: -35, y: -60, z: 93 }, { x: -38, y: -59, z: 93 }, { x: -37, y: -59, z: 93 }, { x: -36, y: -59, z: 93 }];
  let { pink, yellow } = calculateRatio(ratioInput);
  world5.sendMessage("The ratio is:");
  world5.sendMessage(pink + ":" + yellow);
  outputTotal(pink, output1);
  outputTotal(yellow, output2);
}
function calculateRatio(ratioInput) {
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

// scripts/test.ts
import { world as world6 } from "@minecraft/server";

// scripts/scaler.ts
async function scaleShape(shape, scaleFactor) {
  const scaledShape = [];
  const basePoint = shape.reduce((min, block) => ({
    x: Math.min(min.x, block.x),
    y: Math.min(min.y, block.y),
    z: Math.min(min.z, block.z)
  }), shape[0]);
  for (const block of shape) {
    const relativePos = {
      x: block.x - basePoint.x,
      y: block.y - basePoint.y,
      z: block.z - basePoint.z
    };
    for (let i = 0; i < scaleFactor; i++) {
      for (let j = 0; j < scaleFactor; j++) {
        for (let k = 0; k < scaleFactor; k++) {
          const scaledBlock = {
            x: basePoint.x + relativePos.x * scaleFactor + i,
            y: basePoint.y + relativePos.y * scaleFactor + j,
            z: basePoint.z + relativePos.z * scaleFactor + k
          };
          scaledShape.push(scaledBlock);
        }
      }
    }
  }
  return scaledShape;
}

// scripts/test.ts
var overworld3 = world6.getDimension("overworld");
async function test() {
  overworld3.runCommandAsync("fill 6 -60 122 39 -35 154 air");
  overworld3.runCommandAsync("fill 6 -35 122 39 -30 154 air");
  const blocks = await getCube({ x: 8, y: -60, z: 119 }, { x: 10, y: -57, z: 121 });
  let shape = [];
  let scaleFactor = getInput([{ x: 6, y: -58, z: 116 }]);
  for (const block of blocks) {
    if (block.permutation?.matches("white_concrete")) {
      let location = { x: block.block?.x, y: block.block?.y, z: block.block?.z };
      shape.push(location);
    }
  }
  let scaledShape = await scaleShape(shape, scaleFactor);
  for (const block of scaledShape) {
    let scaledz = block.z + 6;
    setBlock({ x: block.x, y: block.y, z: scaledz }, "white_concrete");
  }
}

// scripts/main.ts
var overworld4 = world7.getDimension("overworld");
world7.afterEvents.buttonPush.subscribe(async (event) => {
  switch (`${event.block.location.x},${event.block.location.y},${event.block.location.z}`) {
    case "-11,-60,94": {
      calculate();
      break;
    }
    case "-27,-60,94": {
      fraction1();
      break;
    }
    case "-40,-60,94": {
      ratio1();
      break;
    }
    case "5,-60,117": {
      test();
      break;
    }
  }
});

//# sourceMappingURL=../debug/main.js.map
