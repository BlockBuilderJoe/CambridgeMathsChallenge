// scripts/main.ts
import { world as world10 } from "@minecraft/server";

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

// scripts/scaler.ts
import { world as world6 } from "@minecraft/server";
var overworld3 = world6.getDimension("overworld");
var glass = ["magenta", "orange", "light_blue", "yellow", "lime", "pink", "gray", "light_gray", "cyan", "purple", "blue", "brown", "green", "red", "black", "white"];
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
import { BlockPermutation as BlockPermutation4, world as world7 } from "@minecraft/server";
var overworld4 = world7.getDimension("overworld");
var left = {
  east: "south",
  south: "west",
  west: "north",
  north: "east"
};
var right = {
  east: "north",
  north: "west",
  west: "south",
  south: "east"
};
function cuisenaire(event, blockName, rodLength, successMessage, direction) {
  let extend = true;
  if (event.block.permutation?.matches(blockName)) {
    overworld4.runCommand("title @p actionbar " + successMessage);
    for (let i = 0; i < rodLength; i++) {
      if (event.block[direction](i)?.permutation?.matches("sandstone")) {
        world7.sendMessage("It's gone over a whole rod length!");
        event.block.setPermutation(BlockPermutation4.resolve("grass"));
        extend = false;
        break;
      } else {
        if (["east", "west", "north", "south"].includes(direction)) {
          event.block[direction](i)?.setPermutation(BlockPermutation4.resolve(blockName));
        } else {
          throw new Error(`Invalid direction: ${direction}`);
        }
      }
    }
    if (extend == true) {
      extendRods(event, blockName, rodLength, direction);
    }
  }
}
function extendRods(event, blockName, rodLength, direction) {
  const leftDirection = left[direction];
  const rightDirection = right[direction];
  for (let i = 0; i < 10; i++) {
    if (event.block[leftDirection](i)?.permutation?.matches("sandstone") || event.block[leftDirection](i)?.permutation?.matches("white_concrete")) {
      break;
    } else {
      for (let j = 0; j < rodLength; j++) {
        event.block[leftDirection](i)?.setPermutation(BlockPermutation4.resolve(blockName));
        event.block[leftDirection](i)?.[direction](j)?.setPermutation(BlockPermutation4.resolve(blockName));
      }
    }
  }
  for (let i = 0; i < 9; i++) {
    if (event.block[rightDirection](i)?.permutation?.matches("sandstone") || event.block[rightDirection](i)?.permutation?.matches("white_concrete")) {
      break;
    } else {
      for (let j = 0; j < rodLength; j++) {
        event.block[rightDirection](i)?.setPermutation(BlockPermutation4.resolve(blockName));
        event.block[rightDirection](i)?.[direction](j)?.setPermutation(BlockPermutation4.resolve(blockName));
      }
    }
  }
}

// scripts/grid.ts
import { world as world8 } from "@minecraft/server";
var overworld5 = world8.getDimension("overworld");
async function square(location) {
  overworld5.runCommandAsync("fill " + location.x + " " + location.y + " " + location.z + " " + (location.x + 11) + " " + location.y + " " + (location.z + 11) + " sandstone");
  overworld5.runCommandAsync("fill " + (location.x + 1) + " " + location.y + " " + (location.z + 1) + " " + (location.x + 10) + " " + location.y + " " + (location.z + 10) + " grass replace");
  overworld5.runCommandAsync("fill " + (location.x + 1) + " " + (location.y + 1) + " " + (location.z + 1) + " " + (location.x + 10) + " " + (location.y + 1) + " " + (location.z + 10) + " tallgrass replace");
  overworld5.runCommandAsync("fill " + (location.x + 1) + " " + (location.y + 2) + " " + (location.z + 1) + " " + (location.x + 10) + " " + (location.y + 2) + " " + (location.z + 10) + " air replace");
}
async function grid(location) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let offset_x = location.x + i * 11;
      let offset_z = location.z + j * 11;
      const squareLocation = { x: offset_x, y: location.y, z: offset_z };
      await square(squareLocation);
    }
  }
}

// scripts/playerFacing.ts
async function facing(blockLocation) {
  const xDiff = Math.abs(blockLocation.x);
  const zDiff = Math.abs(blockLocation.z);
  if (xDiff > zDiff) {
    return blockLocation.x > 0 ? "east" : "west";
  } else {
    return blockLocation.z > 0 ? "south" : "north";
  }
}

// scripts/potion.ts
import { BlockPermutation as BlockPermutation5, world as world9 } from "@minecraft/server";
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
  ;
  return slots;
}
async function calculateRatio2(ingredients) {
  let wrongIngredients = ingredients.potato + ingredients.beetroot + ingredients.melon;
  let appleRatio = ingredients.apple + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let carrotRatio = ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let potatoRatio = ingredients.potato + ingredients.apple + ingredients.beetroot + ingredients.melon;
  let beetrootRatio = ingredients.beetroot + ingredients.apple + ingredients.carrot + ingredients.melon;
  let total = ingredients.apple + ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let nightVision = carrotRatio / appleRatio;
  let waterBreathing = carrotRatio / appleRatio;
  if (nightVision === 2) {
    let seconds = Math.ceil((ingredients.apple + ingredients.carrot) * 2);
    world9.sendMessage(`Potion of Night Vision for ${seconds} seconds`);
  } else if (wrongIngredients === 0 && potatoRatio + carrotRatio > 0) {
    let seconds = Math.ceil((potatoRatio + carrotRatio) / 5);
    world9.sendMessage(`Potion of Darkness for ${seconds} seconds`);
  } else if (total === 0) {
    world9.sendMessage(`No potion`);
  } else {
    let seconds = Math.ceil((appleRatio + carrotRatio) / 10);
    world9.sendMessage(`Potion of Poison for ${seconds} seconds`);
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
      case "minecraft:melon": {
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
    ;
  }
  ;
  calculateRatio2(ingredients);
}
async function setGlass(slot, blockName) {
  let { block } = getBlockValue({ x: -52, y: -59, z: 126 });
  block?.north(slot.slotNumber)?.setPermutation(BlockPermutation5.resolve(blockName));
  for (let i = 0; i < slot.amount; i++) {
    block?.above(i)?.north(slot.slotNumber)?.setPermutation(BlockPermutation5.resolve(blockName));
  }
}
async function setItemFrame(offset_z, slotNumber) {
  let cloneFrom = 126 - offset_z;
  let cloneTo = 126 - slotNumber;
  world9.getDimension("overworld").runCommandAsync(`clone -40 -60 ${cloneFrom} -40 -60 ${cloneFrom} -50 -60 ${cloneTo} replace`);
}
async function potion(event) {
  await resetArea2();
  let slots = await getSlots(event);
  await barChart(slots);
}
async function resetArea2() {
  await world9.getDimension("overworld").runCommandAsync("fill -52 -60 126 -52 -51 122 black_stained_glass replace");
}

// scripts/main.ts
world10.afterEvents.itemUseOn.subscribe(async (event) => {
  if (event.itemStack?.typeId === "minecraft:stick") {
    if (event.block.permutation?.matches("hopper")) {
      await potion(event);
    }
  }
  null;
});
world10.beforeEvents.playerBreakBlock.subscribe(async (event) => {
  if (event.itemStack?.typeId === "minecraft:stick") {
    if (event.block.permutation?.matches("hopper")) {
      event.cancel = true;
      await potion(event);
    }
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
    case "-3,-60,90": {
      world10.getDimension("overworld").runCommand("function lava");
      break;
    }
    case "608,-59,1007": {
      await grid({ x: 608, y: -61, z: 995 });
      break;
    }
  }
});
world10.afterEvents.playerPlaceBlock.subscribe(async (event) => {
  let viewDirection = event.player.getViewDirection();
  let direction = await facing(viewDirection);
  if (event.block.permutation?.matches("red_concrete")) {
    cuisenaire(event, "red_concrete", 2, "Placed two blocks", direction);
  } else if (event.block.permutation?.matches("green_concrete")) {
    cuisenaire(event, "green_concrete", 6, "Placed six blocks", direction);
  } else if (event.block.permutation?.matches("purple_concrete")) {
    cuisenaire(event, "purple_concrete", 4, "Placed four blocks", direction);
  } else if (event.block.permutation?.matches("blue_concrete")) {
    cuisenaire(event, "blue_concrete", 3, "Placed three blocks", direction);
  }
});
world10.afterEvents.playerBreakBlock.subscribe((clickEvent) => {
  let hand_item = clickEvent.itemStackAfterBreak?.typeId;
  if (hand_item === "minecraft:stick") {
    cycleNumberBlock(clickEvent);
  }
});

//# sourceMappingURL=../debug/main.js.map
