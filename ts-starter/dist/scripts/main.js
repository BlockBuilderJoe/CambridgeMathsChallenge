// scripts/main.ts
import { world as world10, system as system4, BlockPermutation as BlockPermutation6 } from "@minecraft/server";

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
function cycleNumberBlock(clickEvent) {
  for (let i = 0; i < 9; i++) {
    if (clickEvent.brokenBlockPermutation?.matches("blockbuilders:number_" + i)) {
      let nextNumber = i + 1;
      let blockname = "blockbuilders:number_" + nextNumber;
      clickEvent.block.setPermutation(BlockPermutation2.resolve(blockname));
    }
    if (clickEvent.brokenBlockPermutation?.matches("blockbuilders:number_9")) {
      clickEvent.block.setPermutation(BlockPermutation2.resolve("blockbuilders:number_0"));
    }
  }
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
  let leftInput = getInput([
    { x: -14, y: -59, z: 93 },
    { x: -13, y: -59, z: 93 },
    { x: -12, y: -59, z: 93 }
  ]);
  let rightInput = getInput([
    { x: -10, y: -59, z: 93 },
    { x: -9, y: -59, z: 93 },
    { x: -8, y: -59, z: 93 }
  ]);
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
  let input = getInput([
    { x: -26, y: -57, z: 93 },
    { x: -25, y: -57, z: 93 },
    { x: -24, y: -57, z: 93 }
  ]);
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
  let ratioInput = [
    { x: -37, y: -58, z: 93 },
    { x: -39, y: -60, z: 93 },
    { x: -38, y: -60, z: 93 },
    { x: -37, y: -60, z: 93 },
    { x: -36, y: -60, z: 93 },
    { x: -35, y: -60, z: 93 },
    { x: -38, y: -59, z: 93 },
    { x: -37, y: -59, z: 93 },
    { x: -36, y: -59, z: 93 }
  ];
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

// scripts/scaler.ts
import { world as world6 } from "@minecraft/server";
var overworld3 = world6.getDimension("overworld");
var glass = [
  "magenta",
  "orange",
  "light_blue",
  "yellow",
  "lime",
  "pink",
  "gray",
  "light_gray",
  "cyan",
  "purple",
  "blue",
  "brown",
  "green",
  "red",
  "black",
  "white"
];
async function scale() {
  const blocks = await getCube({ x: 13, y: -60, z: 142 }, { x: 13, y: -51, z: 148 });
  let shape = [];
  let scaleFactor = getInput([{ x: 12, y: -58, z: 149 }]);
  for (const block of blocks) {
    for (const colour of glass) {
      if (block.permutation?.matches(colour + "_stained_glass")) {
        let location = { x: block.block?.x, y: block.block?.y, z: block.block?.z, colour };
        shape.push(location);
      }
    }
    let scaledShape = await scaleShape(shape, scaleFactor, "yz");
    for (const block2 of scaledShape) {
      let offset_z = block2.z + 15;
      let offset_x = block2.x + 10;
      let offset_y = block2.y + 5;
      setBlock({ x: offset_x, y: offset_y, z: offset_z }, block2.colour + "_stained_glass");
    }
  }
}
async function resetArea() {
  await overworld3.runCommandAsync("fill 20 -60 153 32 -40 221 air replace");
  await overworld3.runCommandAsync("fill 20 -40 153 32 -20 221 air replace");
  await overworld3.runCommandAsync("fill 20 -20 153 32 0 221 air replace");
  await overworld3.runCommandAsync("fill 20 0 153 32 30 221 air replace");
  await overworld3.runCommandAsync("clone -49 -60 151 -47 -23 175 21 -60 153 replace");
}
async function scaleShape(shape, scaleFactor, axes) {
  const scaledShape = [];
  const basePoint = shape.reduce(
    (min, block) => ({
      x: Math.min(min.x, block.x),
      y: Math.min(min.y, block.y),
      z: Math.min(min.z, block.z)
    }),
    shape[0]
  );
  for (const block of shape) {
    const relativePos = {
      x: block.x - basePoint.x,
      y: block.y - basePoint.y,
      z: block.z - basePoint.z
    };
    for (let i = axes.includes("x") ? 0 : scaleFactor - 1; i < scaleFactor; i++) {
      for (let j = axes.includes("y") ? 0 : scaleFactor - 1; j < scaleFactor; j++) {
        for (let k = axes.includes("z") ? 0 : scaleFactor - 1; k < scaleFactor; k++) {
          const scaledBlock = {
            x: basePoint.x + (axes.includes("x") ? relativePos.x * scaleFactor + i : relativePos.x),
            y: basePoint.y + (axes.includes("y") ? relativePos.y * scaleFactor + j : relativePos.y),
            z: basePoint.z + (axes.includes("z") ? relativePos.z * scaleFactor + k : relativePos.z),
            colour: block.colour
          };
          scaledShape.push(scaledBlock);
        }
      }
    }
  }
  return scaledShape;
}

// scripts/rod.ts
import {
  BlockPermutation as BlockPermutation4,
  world as world7,
  system
} from "@minecraft/server";

// scripts/perfectRun.ts
var perfectRun = [
  { location: { z: 104, y: 95, x: 30 }, direction: "north", rodLength: 12, blockName: "yellow_concrete", successMessage: `Instead use a 1/2 rod as that is half of 24.` },
  //1/2
  { location: { z: 92, y: 95, x: 31 }, direction: "east", rodLength: 6, blockName: "green_concrete", successMessage: `For 1/4 of 24 use a 6 rod.` },
  //1/4
  { location: { z: 91, y: 95, x: 44 }, direction: "east", rodLength: 8, blockName: "brown_concrete", successMessage: `Use an 8 rod to make up a 1/3.` },
  //1/3
  { location: { z: 94, y: 95, x: 53 }, direction: "south", rodLength: 4, blockName: "purple_concrete", successMessage: `Four is a sixth of 24.` },
  //1/6
  { location: { z: 99, y: 95, x: 55 }, direction: "east", rodLength: 8, blockName: "brown_concrete", successMessage: `The most efficient way is to simplify 2/6 to 1/3.` },
  //2/6
  { location: { z: 99, y: 95, x: 69 }, direction: "east", rodLength: 24, blockName: "blue_concrete", successMessage: `The largest rod you have is a whole, so place two of them.` },
  //1/1
  { location: { z: 99, y: 95, x: 93 }, direction: "east", rodLength: 24, blockName: "blue_concrete", successMessage: `The largest rod you have is a whole, so place two of them.` },
  //1/1
  { location: { z: 95, y: 95, x: 115 }, direction: "west", rodLength: 3, blockName: "lime_concrete", successMessage: `Three is 1/8 of 24. ` },
  //1/3
  { location: { z: 94, y: 95, x: 109 }, direction: "west", rodLength: 6, blockName: "green_concrete", successMessage: `Simplify 2/8 to 1/4 to get the most efficient way across` },
  //1/6
  { location: { z: 92, y: 95, x: 99 }, direction: "north", rodLength: 2, blockName: "red_concrete", successMessage: `Two is 1/2 of 24.` },
  //1/2
  { location: { z: 89, y: 95, x: 97 }, direction: "west", rodLength: 4, blockName: "purple_concrete", successMessage: `Simplify 2/12 to get the most optimum route` },
  //1/4
  { location: { z: 89, y: 95, x: 92 }, direction: "west", rodLength: 2, blockName: "red_concrete", successMessage: `Two is 1/2 of 24.` },
  //1/2
  { location: { z: 89, y: 95, x: 87 }, direction: "west", rodLength: 8, blockName: "brown_concrete", successMessage: `Error this message shouldn't be able to be seen. It means the rod amounts are incorrect.` }
  //1/3
];
var validRanges = [
  { x: 30, zMin: 93, zMax: 104 },
  { xMin: 31, xMax: 36, z: 92 },
  { xMin: 44, xMax: 51, z: 91 },
  { x: 53, zMin: 94, zMax: 97 },
  { xMin: 55, xMax: 62, z: 99 },
  { xMin: 69, xMax: 116, z: 99 },
  { xMin: 113, xMax: 115, z: 95 },
  { xMin: 101, xMax: 109, z: 94 },
  { x: 99, zMin: 91, zMax: 92 },
  { xMin: 94, xMax: 97, z: 89 },
  { xMin: 91, xMax: 92, z: 89 },
  { xMin: 80, xMax: 87, z: 89 }
];
var finalBlock = [
  { location: { z: 93, y: 95, x: 30 } },
  { location: { z: 92, y: 95, x: 36 } },
  { location: { z: 91, y: 95, x: 51 } },
  { location: { z: 97, y: 95, x: 53 } },
  { location: { z: 99, y: 95, x: 62 } },
  { location: { z: 99, y: 95, x: 92 } },
  { location: { z: 99, y: 95, x: 116 } },
  { location: { z: 95, y: 95, x: 113 } },
  { location: { z: 94, y: 95, x: 101 } },
  { location: { z: 91, y: 95, x: 99 } },
  { location: { z: 89, y: 95, x: 94 } },
  { location: { z: 89, y: 95, x: 91 } },
  { location: { z: 89, y: 95, x: 80 } }
];
var replaySettings = [
  {
    // Message to display at the beginning of the replay
    beginningMessage: `To make 1/2 you placed: `,
    // Command to teleport the player to the starting position of the last platform they were on and set their facing direction
    tpStart: `tp @p 31 96 107 facing 31 96 100`,
    // Command to clear the rods they just placed by replacing blocks with tallgrass
    clearBlock: `fill 30 95 104 30 95 93 tallgrass replace`,
    // Command to replenish the grass under the rods they just placed, same coordinates as above with y axis 94.
    replenishGrass: `fill 30 94 104 30 94 93 grass_block replace`,
    // Direction along which the rods are placed ('x' or 'z'). This will be the value that is always the same. 
    cartesianDirection: "x",
    // Specific value of the x or z that is the same on all the coordinates.
    cartesionValue: 30
  },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/3 you placed: `, tpStart: `tp @p 41 96 91 facing 53 96 91`, clearBlock: `fill 51 95 91 44 95 91 tallgrass replace`, replenishGrass: `fill 51 94 91 44 94 91 grass_block replace`, cartesianDirection: "z", cartesionValue: 91 },
  //Todo
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: "z", cartesionValue: 92 }
];

// scripts/rod.ts
var overworld4 = world7.getDimension("overworld");
var rodsPlaced = [];
async function directionCheck(x, z, direction) {
  let correctDirection = false;
  for (const range of validRanges) {
    if (range.x !== void 0 && x === range.x && isInRange(z, range.zMin, range.zMax) || range.z !== void 0 && z === range.z && isInRange(x, range.xMin, range.xMax)) {
      correctDirection = true;
      break;
    }
  }
  return correctDirection;
}
function isInRange(value, min, max) {
  return value >= min && value <= max;
}
async function cuisenaire(block, blockName, rodLength, successMessage, direction) {
  if (block.permutation?.matches(blockName)) {
    let runPlaceRods = true;
    overworld4.runCommand(`title @p actionbar ${successMessage} placed`);
    block.setPermutation(BlockPermutation4.resolve("tallgrass"));
    for (let i = 0; i < rodLength; i++) {
      let colour = block[direction](i)?.permutation?.getState("color");
      if (colour || block[direction](i)?.permutation?.matches("sandstone")) {
        overworld4.runCommand("title @p actionbar That rod is too long!");
        runPlaceRods = false;
        break;
      }
    }
    if (runPlaceRods) {
      let rodToPlace = { location: block.location, direction, rodLength, blockName, successMessage };
      rodsPlaced.push(rodToPlace);
      placeRods(block, blockName, rodLength, direction);
      const matchingRodIndex = perfectRun.findIndex(
        (rod) => rod.location.x === rodToPlace.location.x && rod.location.y === rodToPlace.location.y && rod.location.z === rodToPlace.location.z && rod.direction === rodToPlace.direction && rod.rodLength === rodToPlace.rodLength && rod.blockName === rodToPlace.blockName
      );
      world7.sendMessage(JSON.stringify(matchingRodIndex));
      if (matchingRodIndex >= 0) {
        await changeNPC(matchingRodIndex, true);
      }
    } else {
      block?.setPermutation(BlockPermutation4.resolve("tallgrass"));
    }
  }
}
async function changeNPC(matchingRodIndex, win) {
  if (win) {
    overworld4.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Win`);
  } else {
    overworld4.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Fail`);
  }
}
async function resetNPC(npcAmount) {
  rodsPlaced = [];
  for (let i = 0; i < npcAmount; i++) {
    overworld4.runCommandAsync(`dialogue change @e[tag=rodNpc${i}] rodNpc${i}Default`);
  }
}
function placeRods(block, blockName, rodLength, direction) {
  const validDirections = ["east", "west", "north", "south"];
  if (validDirections.includes(direction)) {
    for (let i = 0; i < rodLength; i++) {
      block[direction](i).setPermutation(BlockPermutation4.resolve(blockName));
      const newRodIndex = finalBlock.findIndex(
        (finalBlockElement) => JSON.stringify(finalBlockElement.location) === JSON.stringify(block[direction](i).location)
      );
      if (newRodIndex >= 0) {
        changeNPC(newRodIndex, false);
      }
    }
  } else {
    throw new Error(`Invalid direction: ${direction}`);
  }
}
async function setCameraView(player, index) {
  if (index == 0 || index == 1) {
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 30 120 92 facing 30 90 92`);
  } else if (index == 2 || index == 3 || index == 4) {
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 55 120 92 facing 55 90 92`);
  } else if (index == 5) {
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 93 120 92 facing 93 90 92`);
  } else if (index == 6, index == 7, index == 8, index == 9) {
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 105 120 92 facing 105 90 92`);
  } else if (index == 10, index == 11, index == 12) {
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos -39 120 44 facing -39 94 44`);
  }
}
async function getBlockBehind(event, oppositeDirection) {
  let hasColour = event.block[oppositeDirection](1)?.permutation?.getState("color");
  return hasColour;
}
async function replayMessage(beginningMessage, fractions) {
  if (fractions) {
    if (fractions.length > 0) {
      const playerPlacedFractions = fractions.filter((fraction) => fraction !== void 0 && fraction.startsWith("1"));
      const perfectRunFractions = fractions.filter((fraction) => fraction !== void 0 && !fraction.startsWith("1"));
      if (perfectRunFractions.length > 0) {
        const perfectRunFractionsSum = perfectRunFractions.join(" + ");
        overworld4.runCommandAsync(`title @p actionbar ${perfectRunFractionsSum}`);
      } else if (playerPlacedFractions.length > 0) {
        const fractionsSum = playerPlacedFractions.join(" + ");
        overworld4.runCommandAsync(`title @p actionbar ${beginningMessage} ${fractionsSum}`);
      }
    }
  } else {
    world7.sendMessage(`Error: No fractions found`);
  }
}
async function replay(index) {
  overworld4.runCommandAsync(`tp @p 31 96 116`);
  let npcIndex = index;
  let fractions = [];
  let combinedRods = [];
  let replayConfig = replaySettings[index];
  overworld4.runCommandAsync(replayConfig.clearBlock);
  overworld4.runCommandAsync(replayConfig.replenishGrass);
  if (replayConfig.cartesianDirection === "x") {
    let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location.x === replayConfig.cartesionValue);
    rodsPlaced = rodsPlaced.filter((rod) => !(rod.location && rod.location.x === replayConfig.cartesionValue));
    let perfectRunToReplay = perfectRun.filter((rod) => rod.location && rod.location.x === replayConfig.cartesionValue);
    if (perfectRunToReplay.length > 1) {
      perfectRunToReplay = perfectRunToReplay.slice(0, -1);
    }
    combinedRods = rodsPlacedToReplay.concat(perfectRunToReplay);
  } else if (replayConfig.cartesianDirection === "z") {
    let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location.z === replayConfig.cartesionValue);
    rodsPlaced = rodsPlaced.filter((rod) => !(rod.location && rod.location.z === replayConfig.cartesionValue));
    let perfectRunToReplay = perfectRun.filter((rod) => rod.location && rod.location.z === replayConfig.cartesionValue);
    if (perfectRunToReplay.length > 1) {
      perfectRunToReplay = perfectRunToReplay.slice(0, -1);
    }
    combinedRods = rodsPlacedToReplay.concat(perfectRunToReplay);
  }
  if (combinedRods.length > 0) {
    for (let i = 0; i < combinedRods.length; i++) {
      ((index2) => {
        system.runTimeout(async () => {
          let x = combinedRods[index2].location.x;
          world7.getAllPlayers().forEach(async (player) => {
            await setCameraView(player, npcIndex);
            fractions.push(combinedRods[index2].successMessage);
            await replayMessage(replayConfig.beginningMessage, fractions);
            let block = overworld4.getBlock(combinedRods[index2].location);
            placeRods(block, combinedRods[index2].blockName, combinedRods[index2].rodLength, combinedRods[index2].direction);
            if (i === combinedRods.length - 1) {
              endReplay(player, replayConfig.tpStart, replayConfig.clearBlock, replayConfig.replenishGrass, combinedRods);
            }
          });
        }, 50 * index2);
        return;
      })(i);
    }
  }
}
function endReplay(player, tpStart, clearCommand, replenishGrass, combinedRods) {
  system.runTimeout(() => {
    player.runCommandAsync(tpStart);
    player.runCommandAsync(clearCommand);
    player.runCommandAsync(replenishGrass);
    player.runCommandAsync(`camera ${player.name} clear`);
    combinedRods = [];
  }, 50);
}
async function squareReset(pos1, pos2, concreteColours) {
  for (let i = 0; i < concreteColours.length; i++) {
    let command = `fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace ${concreteColours[i]}_concrete`;
    overworld4.runCommand(command);
  }
  overworld4.runCommandAsync(
    `fill ${pos1.x} ${pos1.y - 1} ${pos1.z} ${pos2.x} ${pos2.y - 1} ${pos2.z} grass replace dirt`
  );
  overworld4.runCommandAsync(`fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace air`);
}
async function resetGrid(location) {
  let concreteColours = ["red", "green", "purple", "brown", "blue", "lime", "yellow"];
  for (let i = 0; i < 4; i++) {
    let offset_x = location.x + i * 25;
    let pos1 = { x: offset_x, y: location.y, z: location.z };
    let pos2 = { x: offset_x + 24, y: location.y, z: location.z + 24 };
    await squareReset(pos1, pos2, concreteColours);
  }
}
async function giveRods(player, rodsRemoved) {
  let rods = [
    { block: "red_concrete", amount: 2 },
    { block: "lime_concrete", amount: 1 },
    { block: "purple_concrete", amount: 2 },
    { block: "green_concrete", amount: 2 },
    { block: "brown_concrete", amount: 3 },
    { block: "yellow_concrete", amount: 1 },
    { block: "blue_concrete", amount: 2 }
  ];
  player.runCommandAsync(`clear ${player.name}`);
  player.runCommandAsync(`gamemode adventure`);
  for (let i = 0; i < rods.length; i++) {
    player.runCommandAsync(
      `give @p ${rods[i].block} ${rods[i].amount} 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`
    );
  }
}

// scripts/playerFacing.ts
async function facing(blockLocation) {
  const xDiff = Math.abs(blockLocation.x);
  const zDiff = Math.abs(blockLocation.z);
  let direction;
  if (xDiff > zDiff) {
    direction = blockLocation.x > 0 ? "east" : "west";
  } else {
    direction = blockLocation.z > 0 ? "south" : "north";
  }
  const oppositeDirections = {
    "east": "west",
    "west": "east",
    "south": "north",
    "north": "south"
  };
  let oppositeDirection = oppositeDirections[direction];
  return { direction, oppositeDirection };
}

// scripts/potion.ts
import { BlockPermutation as BlockPermutation5, system as system2, world as world8 } from "@minecraft/server";
async function getSlots(event) {
  let hopper = event.block.getComponent("inventory");
  let slots = [];
  for (let i = 0; i <= 4; i++) {
    let item = hopper?.container?.getItem(i);
    slots.push({
      slotNumber: i,
      amount: item?.amount,
      typeId: item?.typeId
    });
  }
  return slots;
}
async function givePotion() {
  world8.getDimension("overworld").runCommandAsync(`clear @p minecraft:potion`);
  world8.getDimension("overworld").runCommandAsync(`give @p minecraft:potion 1`);
}
async function calculateRatio2(ingredients) {
  let wrongIngredientsSight = ingredients.potato + ingredients.beetroot + ingredients.melon;
  let wrongIngredientsDive = ingredients.apple + ingredients.carrot;
  let appleRatio = ingredients.apple + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let carrotRatio = ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let potatoRatio = ingredients.potato + ingredients.apple + ingredients.carrot;
  let beetrootRatio = ingredients.beetroot + ingredients.apple + ingredients.carrot;
  let melonRatio = ingredients.melon + ingredients.apple + ingredients.carrot;
  let total = ingredients.apple + ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let nightVision = carrotRatio / appleRatio;
  let beetrootMelonRatio = beetrootRatio / melonRatio;
  let melonPotatoRatio = melonRatio / potatoRatio;
  if (beetrootMelonRatio === 1.5 && melonPotatoRatio === 2) {
    let potion2 = "water_breathing";
    let seconds2 = Math.ceil(beetrootRatio + melonRatio + potatoRatio);
    return { potion: potion2, seconds: seconds2 };
  } else if (nightVision === 2) {
    let potion2 = "night_vision";
    let seconds2 = Math.ceil(ingredients.apple + ingredients.carrot);
    return { potion: potion2, seconds: seconds2 };
  } else if (wrongIngredientsSight === 0 && potatoRatio + carrotRatio > 0) {
    let seconds2 = Math.ceil(potatoRatio + carrotRatio);
    let potion2 = "blindness";
    return { potion: potion2, seconds: seconds2 };
  } else if (wrongIngredientsDive === 0 && beetrootRatio + melonRatio + potatoRatio > 0) {
    let seconds2 = Math.ceil(beetrootRatio + melonRatio + potatoRatio);
    let potion2 = "levitation";
    return { potion: potion2, seconds: seconds2 };
  } else if (total === 0) {
    let seconds2 = 0;
    let potion2 = "empty";
    return { potion: potion2, seconds: seconds2 };
  } else {
    let seconds2 = Math.ceil((appleRatio + carrotRatio) / 10);
    let potion2 = "poison";
    return { potion: potion2, seconds: seconds2 };
  }
}
async function barChart(slots) {
  let ingredients = {
    apple: 0,
    carrot: 0,
    potato: 0,
    beetroot: 0,
    melon: 0
  };
  for (let slot of slots) {
    switch (slot.typeId) {
      case "minecraft:apple": {
        await setGlass(slot, "red_stained_glass");
        await setItemFrame(0, slot.slotNumber);
        ingredients.apple = (ingredients.apple || 0) + slot.amount;
        break;
      }
      case "minecraft:carrot": {
        await setGlass(slot, "orange_stained_glass");
        await setItemFrame(1, slot.slotNumber);
        ingredients.carrot = (ingredients.carrot || 0) + slot.amount;
        break;
      }
      case "minecraft:potato": {
        await setGlass(slot, "yellow_stained_glass");
        await setItemFrame(2, slot.slotNumber);
        ingredients.potato = (ingredients.potato || 0) + slot.amount;
        break;
      }
      case "minecraft:beetroot": {
        await setGlass(slot, "purple_stained_glass");
        await setItemFrame(3, slot.slotNumber);
        ingredients.beetroot = (ingredients.beetroot || 0) + slot.amount;
        break;
      }
      case "minecraft:melon_slice": {
        await setGlass(slot, "green_stained_glass");
        await setItemFrame(4, slot.slotNumber);
        ingredients.melon = (ingredients.melon || 0) + slot.amount;
        break;
      }
      default: {
        await setItemFrame(5, slot.slotNumber);
        break;
      }
    }
  }
  return ingredients;
}
async function setGlass(slot, blockName) {
  let { block } = getBlockValue({ x: -52, y: 61, z: 126 });
  block?.north(slot.slotNumber)?.setPermutation(BlockPermutation5.resolve(blockName));
  if (slot.amount > 10) {
    slot.amount = 10;
  }
  for (let i = 0; i < slot.amount; i++) {
    block?.above(i)?.north(slot.slotNumber)?.setPermutation(BlockPermutation5.resolve(blockName));
  }
}
async function setItemFrame(offset_z, slotNumber) {
  let cloneFrom = 126 - offset_z;
  let cloneTo = 126 - slotNumber;
  world8.getDimension("overworld").runCommandAsync(`clone -40 60 ${cloneFrom} -40 60 ${cloneFrom} -50 60 ${cloneTo} replace`);
}
async function potionMaker(event) {
  await resetArea2();
  let slots = await getSlots(event);
  let ingredients = await barChart(slots);
  let { potion: potion2, seconds: seconds2 } = await calculateRatio2(ingredients);
  if (potion2 !== "empty") {
    await givePotion();
  }
  return { potion: potion2, seconds: seconds2 };
}
async function resetArea2() {
  await world8.getDimension("overworld").runCommandAsync("fill -52 60 126 -52 69 122 black_stained_glass replace");
}
function displayTimer(potionStart2, seconds2, player, potionDescription) {
  let timeLeft = (potionStart2 + seconds2 * 20 - system2.currentTick) / 20;
  if (timeLeft % 1 === 0) {
    player.onScreenDisplay.setActionBar(`Time left:
 ${potionDescription} ${timeLeft} seconds`);
  }
}

// scripts/npcscriptEventHandler.ts
import { system as system3, world as world9 } from "@minecraft/server";
system3.afterEvents.scriptEventReceive.subscribe((event) => {
  switch (event.id) {
    case "rod:npcReplay": {
      world9.sendMessage(`Replay Version ${event.message}`);
      replay(parseInt(event.message));
      break;
    }
    case "rod:npcComplete": {
      world9.sendMessage(`Complete Version ${event.message}`);
      break;
    }
  }
});

// scripts/main.ts
var potion = "";
var seconds = 0;
var currentPlayer = null;
var potionStart = 0;
var potionDrank = false;
var meters = 0;
var rodsToRemove = [];
world10.afterEvents.playerSpawn.subscribe((eventData) => {
  currentPlayer = eventData.player;
  let initialSpawn = eventData.initialSpawn;
  if (initialSpawn) {
    currentPlayer.sendMessage(`\xA73Welcome back ${currentPlayer.name}!`);
    currentPlayer.runCommandAsync(
      `give @p[hasitem={item=stick,quantity=0}] stick 1 0 {"item_lock": { "mode": "lock_in_slot" }}`
    );
  } else {
    currentPlayer.sendMessage(`<BlockBuilderAI> \xA73Welcome ${currentPlayer.name}!`);
    currentPlayer.runCommandAsync(
      `give @a[hasitem={item=stick,quantity=0}] stick 1 0 {"item_lock": { "mode": "lock_in_slot" }}`
    );
  }
});
world10.afterEvents.buttonPush.subscribe(async (event) => {
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
    case "-3,-60,154": {
      scale();
      break;
    }
    case "-3,-60,153": {
      await resetArea();
      break;
    }
    case "29,97,106": {
      let player = event.source;
      rodsToRemove = [];
      await resetNPC(13);
      await giveRods(player, rodsToRemove);
      await resetGrid({ x: 19, y: 95, z: 81 });
      break;
    }
    case "24,95,45": {
      let player = event.source;
      break;
    }
  }
});
world10.afterEvents.playerPlaceBlock.subscribe(async (event) => {
  let block = event.block;
  let player = event.player;
  let colour = block.permutation?.getState("color");
  if (colour) {
    if (block.location.y === 95) {
      let viewDirection = event.player.getViewDirection();
      let { direction, oppositeDirection } = await facing(viewDirection);
      let correctDirection = await directionCheck(block.location.x, block.location.z, direction);
      let hasColour = await getBlockBehind(event, oppositeDirection);
      const rodPermutations = {
        red: { block: "red_concrete", value: 2, message: "1/12" },
        lime: { block: "lime_concrete", value: 3, message: "1/8" },
        purple: { block: "purple_concrete", value: 4, message: "1/6" },
        green: { block: "green_concrete", value: 6, message: "1/4" },
        brown: { block: "brown_concrete", value: 8, message: "1/3" },
        yellow: { block: "yellow_concrete", value: 12, message: "1/2" },
        blue: { block: "blue_concrete", value: 24, message: "1/1" }
      };
      if (!hasColour) {
        player.runCommandAsync(`title ${player.name} actionbar Place the rod in front of the magical connector.`);
        event.block.setPermutation(BlockPermutation6.resolve("tallgrass"));
        return;
      }
      if (!correctDirection) {
        player.runCommandAsync(`title ${player.name} actionbar You're facing the wrong way.`);
        event.block.setPermutation(BlockPermutation6.resolve("tallgrass"));
        return;
      }
      const rod = rodPermutations[colour];
      if (rod) {
        cuisenaire(block, rod.block, rod.value, rod.message, direction);
      }
    }
  }
});
world10.afterEvents.playerBreakBlock.subscribe((clickEvent) => {
  let hand_item = clickEvent.itemStackAfterBreak?.typeId;
  if (hand_item === "minecraft:stick") {
    cycleNumberBlock(clickEvent);
  }
});
world10.beforeEvents.itemUseOn.subscribe(async (event) => {
  if (event.itemStack?.typeId === "minecraft:stick") {
    let block = event.block;
    if (block.permutation?.matches("hopper")) {
      event.cancel = true;
      ({ potion, seconds } = await potionMaker(event));
    }
  }
});
function applyPotionEffect(player, potion2, seconds2) {
  player.runCommand("scoreboard objectives setdisplay sidebar Depth");
  let tick = seconds2 * 20;
  potionStart = system4.currentTick;
  switch (potion2) {
    case "water_breathing": {
      player.addEffect("water_breathing", tick);
      break;
    }
    case "night_vision": {
      player.addEffect("night_vision", tick);
      break;
    }
    case "blindness": {
      player.addEffect("blindness", tick);
      break;
    }
    case "poison": {
      player.addEffect("poison", tick);
      break;
    }
    case "levitation": {
      player.addEffect("levitation", tick);
      break;
    }
  }
  player.runCommand("clear @p minecraft:glass_bottle");
}
function mainTick() {
  world10.getAllPlayers().forEach((player) => {
    if (player.isInWater == true) {
      meters = 58 - Math.floor(player.location.y);
      player.runCommand(`scoreboard players set Meters Depth ${meters}`);
      if (potionDrank) {
        applyPotionEffect(player, potion, seconds);
        potionDrank = false;
      }
      if (player.getEffect("water_breathing")) {
        displayTimer(potionStart, seconds, player, "Breathing underwater");
      } else if (player.getEffect("night_vision")) {
        displayTimer(potionStart, seconds, player, "Great work you can see in the dark for");
      } else if (player.getEffect("blindness")) {
        displayTimer(potionStart, seconds, player, "Oh no! The ratios were wrong, you can't see anything for");
      } else if (player.getEffect("levitation")) {
        displayTimer(potionStart, seconds, player, "Oh no! You're floating for");
      }
      if (player.isSneaking == true) {
        surface(player);
      }
    }
  });
  system4.run(mainTick);
}
async function surface(player) {
  player.teleport({ x: -50, y: 60, z: 132 });
  player.addEffect("instant_health", 5);
  player.removeEffect("blindness");
  player.removeEffect("night_vision");
  player.removeEffect("water_breathing");
  player.runCommand("scoreboard objectives setdisplay sidebar");
}
world10.afterEvents.itemCompleteUse.subscribe(async (event) => {
  let player = event.source;
  if (event.itemStack?.typeId === "minecraft:potion") {
    if (potion === "poison") {
      player.sendMessage(
        "\xA7fYou mixed the potion with the \xA72wrong ingredients. \n\xA7fIt has had no effect.\nMake sure you're using the correct ingredients."
      );
    } else {
      potionDrank = true;
      player.sendMessage("\xA7fYou drank the potion. \n\xA72Jump in the well \xA7fto see the effect.");
    }
    event.source.runCommand("clear @p minecraft:glass_bottle");
  }
});
world10.afterEvents.entityHealthChanged.subscribe(async (event) => {
  if (event.entity.typeId === "minecraft:player") {
    let player = event.entity;
    if (player.isInWater == true) {
      await surface(player);
    }
  }
});
system4.run(mainTick);

//# sourceMappingURL=../debug/main.js.map
