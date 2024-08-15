// scripts/main.ts
import {
  world as world11,
  system as system7,
  BlockPermutation as BlockPermutation5
} from "@minecraft/server";

// scripts/stainedGlassWindow.ts
import { world as world4, system } from "@minecraft/server";

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
  for (let x = Math.min(pos1.x, pos2.x); x <= Math.max(pos1.x, pos2.x); x++) {
    for (let y = Math.min(pos1.y, pos2.y); y <= Math.max(pos1.y, pos2.y); y++) {
      for (let z = Math.min(pos1.z, pos2.z); z <= Math.max(pos1.z, pos2.z); z++) {
        const location = { x, y, z };
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

// scripts/output.ts
import { BlockPermutation as BlockPermutation2, world as world2 } from "@minecraft/server";
var overworld2 = world2.getDimension("overworld");
function setBlock(location, blockName) {
  let { block } = getBlockValue(location);
  let isCopper = block?.permutation?.matches("waxed_weathered_copper");
  if (!isCopper) {
    block?.setPermutation(BlockPermutation2.resolve(blockName));
  }
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

// scripts/wand.ts
import { world as world3 } from "@minecraft/server";
var overworld3 = world3.getDimension("overworld");
async function giveWand() {
  overworld3.runCommandAsync(
    `give @p[hasitem={item=blockbuilders:mathmogicians_wand,quantity=0}] blockbuilders:mathmogicians_wand 1 0 {"item_lock": { "mode": "lock_in_slot" }, "minecraft:can_destroy":{"blocks":["minecraft:hopper", "blockbuilders:number_0","blockbuilders:number_1","blockbuilders:number_2","blockbuilders:number_3","blockbuilders:number_4","blockbuilders:number_5","blockbuilders:number_6","blockbuilders:number_7","blockbuilders:number_8","blockbuilders:number_9"]}}`
  );
}

// scripts/stainedGlassWindow.ts
var overworld4 = world4.getDimension("overworld");
var windows = [
  {
    pos1: { x: 46, y: 98, z: 192 },
    pos2: { x: 41, y: 107, z: 192 },
    numerator: { x: 40, y: 100, z: 197 },
    cloneFrom: { x: 50, y: 10, z: 219 },
    cloneTo: { x: -6, y: 36, z: 219 },
    cloneInto: { x: -6, y: 96, z: 219 },
    scaledLeftCorner: { x: 46, y: 98, z: 219 },
    //Bottom left corner of the scaled window.
    correctNumerator: 1
  },
  {
    pos1: { x: 36, y: 98, z: 192 },
    pos2: { x: 34, y: 104, z: 192 },
    numerator: { x: 32, y: 100, z: 197 },
    cloneFrom: { x: 39, y: 10, z: 219 },
    cloneTo: { x: -6, y: 36, z: 219 },
    cloneInto: { x: -6, y: 96, z: 219 },
    scaledLeftCorner: { x: 36, y: 98, z: 219 },
    //Bottom left corner of the scaled window.
    correctNumerator: 2
  },
  {
    pos1: { x: 24, y: 98, z: 192 },
    pos2: { x: 21, y: 103, z: 192 },
    numerator: { x: 20, y: 100, z: 197 },
    cloneFrom: { x: 27, y: 10, z: 219 },
    cloneTo: { x: -6, y: 36, z: 219 },
    cloneInto: { x: -6, y: 96, z: 219 },
    scaledLeftCorner: { x: 24, y: 98, z: 219 },
    //Bottom left corner of the scaled window.
    correctNumerator: 4
  }
];
async function nextWindow() {
  let windowIndex = await getWindowIndex();
  if (typeof windowIndex === "number") {
    if (windowIndex === 2) {
      overworld4.runCommandAsync(`dialogue open @e[tag=scaleNpc] @p scaleNpc8`);
    } else if (windowIndex === 5) {
    } else {
      overworld4.runCommandAsync(`tag @e[tag=orb] remove window${windowIndex}`);
      let newWindowIndex = windowIndex + 1;
      overworld4.runCommandAsync(`tag @e[tag=orb] add window${newWindowIndex}`);
      overworld4.runCommandAsync(
        `tp @e[type=blockbuilders:scale] ${windows[newWindowIndex].numerator.x + 2} 98 197 facing ${windows[newWindowIndex].numerator.x + 2} 98 94`
      );
      overworld4.runCommandAsync(
        `tp @e[type=blockbuilders:orb] ${windows[newWindowIndex].numerator.x + 4} 98 197 facing ${windows[newWindowIndex].numerator.x + 4} 98 94`
      );
      giveWand();
      giveGlass();
    }
  }
}
async function getWindowIndex() {
  let orb = overworld4.getEntities({
    tags: ["orb"]
  });
  let windowTag = orb[0].getTags()[1];
  let windowNumber = parseInt(windowTag.substring(6));
  if (windowNumber >= 0) {
    return windowNumber;
  }
}
async function redoWindowGame() {
  let windowIndex = await getWindowIndex();
  if (typeof windowIndex === "number") {
    let player = overworld4.getPlayers()[0];
    player.runCommandAsync(`tp @p ~ ~ 190`);
    await windowUndo(windows[windowIndex].cloneFrom, windows[windowIndex].cloneTo, windows[windowIndex].cloneInto);
    await giveWand();
    giveGlass();
  }
}
async function resetWindowGame() {
  overworld4.runCommandAsync(`tp @e[tag=orb] 44 98 197`);
  overworld4.runCommandAsync(`tag @e[tag=orb] add window0`);
  overworld4.runCommandAsync(`tag @e[tag=orb] remove window1`);
  overworld4.runCommandAsync(`tag @e[tag=orb] remove window2`);
  overworld4.runCommandAsync(`tag @e[tag=orb] remove window3`);
  overworld4.runCommandAsync(`tag @e[tag=orb] remove window4`);
  overworld4.runCommandAsync(`tag @e[tag=orb] remove window5`);
  overworld4.runCommandAsync(
    `setblock ${windows[0].numerator.x} ${windows[0].numerator.y} ${windows[0].numerator.z} blockbuilders:number_0`
  );
  for (let i = 1; i < windows.length; i++) {
    const window = windows[i];
    overworld4.runCommandAsync(
      `setblock ${window.numerator.x} ${window.numerator.y} ${window.numerator.z} blockbuilders:number_0`
    );
    let colours = ["yellow", "green", "blue", "purple", "red", "lime", "black", "brown"];
    for (const colour in colours) {
      overworld4.runCommandAsync(
        `fill ${window.pos1.x} ${window.pos1.y} ${window.pos1.z} ${window.pos2.x} ${window.pos2.y} ${window.pos2.z} air replace ${colours[colour]}_stained_glass`
      );
    }
  }
  windowUndo(windows[0].cloneTo, windows[0].cloneFrom, windows[0].cloneInto);
}
async function startWindowTutorial() {
  overworld4.runCommandAsync(`clear @p`);
  await giveWand();
}
async function guildMasterCheck(windowIndex) {
  const window = windows[windowIndex];
  let numerator = getInput([{ x: window.numerator.x, y: window.numerator.y, z: window.numerator.z }]);
  world4.sendMessage(`${numerator}`);
  if (numerator === window.correctNumerator) {
    system.runTimeout(() => {
      overworld4.runCommand(`dialogue open @e[tag=scaleNpc] @p scaleNpc5`);
    }, 30);
  } else if (numerator === 0) {
    system.runTimeout(() => {
      overworld4.runCommand(`title @p actionbar The window has been scaled by 0.`);
    }, 20);
  } else if (numerator > window.correctNumerator) {
    system.runTimeout(() => {
      overworld4.runCommand(`dialogue open @e[tag=scaleNpc] @p scaleNpc6`);
    }, 20);
  } else if (numerator < window.correctNumerator) {
    system.runTimeout(() => {
      overworld4.runCommand(`dialogue open @e[tag=scaleNpc] @p scaleNpc7`);
    }, 20);
  }
}
async function windowScaleHandler(windowIndex) {
  const window = windows[windowIndex];
  await windowUndo(window.cloneTo, window.cloneFrom, window.cloneInto);
  scale(window.pos1, window.pos2, window.numerator, window.scaledLeftCorner);
  guildMasterCheck(windowIndex);
}
function giveGlass() {
  overworld4.runCommand("replaceitem entity @p slot.hotbar 1 yellow_stained_glass 10");
  overworld4.runCommand("replaceitem entity @p slot.hotbar 2 green_stained_glass 10");
  overworld4.runCommand("replaceitem entity @p slot.hotbar 3 blue_stained_glass 10");
  overworld4.runCommand("replaceitem entity @p slot.hotbar 4 purple_stained_glass 10");
  overworld4.runCommand("replaceitem entity @p slot.hotbar 5 red_stained_glass 10");
  overworld4.runCommand("replaceitem entity @p slot.hotbar 6 lime_stained_glass 10");
  overworld4.runCommand("replaceitem entity @p slot.hotbar 7 black_stained_glass 10");
  overworld4.runCommand("replaceitem entity @p slot.hotbar 8 brown_stained_glass 10");
}
async function scale(cubePos1, cubePos2, inputNumber, scaledLeftCorner) {
  const blocks = await getCube(cubePos1, cubePos2);
  let shape = [];
  let scaleFactor = getInput([inputNumber]);
  for (const block of blocks) {
    let colour = block.permutation?.getState(`color`);
    if (colour) {
      if (block.block) {
        let offset_x = block.block.x - cubePos1.x;
        let offset_y = block.block.y - cubePos1.y;
        let offset_z = cubePos1.z - block.block.z;
        let finalWindow_x = scaledLeftCorner.x - offset_x;
        let finalWindow_y = scaledLeftCorner.y + offset_y;
        let finalWindow_z = scaledLeftCorner.z + offset_z;
        let location = { x: finalWindow_x, y: finalWindow_y, z: finalWindow_z, colour };
        shape.push(location);
      }
    }
  }
  let scaledShape = await scaleShape(shape, scaleFactor, "yx");
  for (const block of scaledShape) {
    setBlock({ x: block.x, y: block.y, z: block.z }, block.colour + "_stained_glass");
  }
}
async function windowUndo(from, to, into) {
  await overworld4.runCommandAsync(
    `clone ${from.x} ${from.y} ${from.z} ${to.x} ${to.y} ${to.z} ${into.x} ${into.y} ${into.z} replace`
  );
  await overworld4.runCommandAsync(`fill ${from.x} 116 ${from.z} ${to.x} 120 ${to.z} air replace`);
  await overworld4.runCommandAsync(`fill ${from.x} 120 ${from.z} ${to.x} 150 ${to.z} air replace`);
  await overworld4.runCommandAsync(`fill ${from.x} 150 ${from.z} ${to.x} 172 ${to.z} air replace`);
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
            x: basePoint.x - (axes.includes("x") ? relativePos.x * scaleFactor + i : relativePos.x),
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

// scripts/cuisenaireRods.ts
import {
  BlockPermutation as BlockPermutation3,
  world as world5,
  system as system2
} from "@minecraft/server";

// scripts/perfectRun.ts
var perfectRun = [
  //Gap 1 = 1/2 td | Optimum rod = 1/2 rod
  {
    number: 0,
    location: { z: 104, y: 95, x: 30 },
    direction: "north",
    rodLength: 12,
    blockName: "orange_concrete",
    successMessage: `Instead use a 1/2 rod as that is half of 24.`
  },
  //Gap 2 = 1/2 td or 12 blocks | Optimum rod = 1/2 rod
  {
    number: 1,
    location: { z: 92, y: 95, x: 31 },
    direction: "east",
    rodLength: 12,
    blockName: "orange_concrete",
    successMessage: `Instead use a 1/2 rod as that is half of 24.`
  },
  //Gap 3 = 1/6 td or 4 blocks | Optimum rod = 1/6 rod
  {
    number: 2,
    location: { z: 91, y: 95, x: 44 },
    direction: "east",
    rodLength: 4,
    blockName: "yellow_concrete",
    successMessage: `Instead use a 1/6 rod which equals 4 blocks.`
  },
  //Gap 4 = 3/4 td or 18 blocks | Optimum rod = 1/2,1/4 rod
  {
    number: 3,
    location: { z: 86, y: 95, x: 48 },
    direction: "east",
    rodLength: 12,
    blockName: "orange_concrete",
    successMessage: `Instead use a 1/2 rod which = 2/4`
  },
  {
    number: 3,
    location: { z: 86, y: 95, x: 60 },
    direction: "east",
    rodLength: 6,
    blockName: "lime_concrete",
    successMessage: `a 1/4 rod which = 3/4.`
  },
  //Gap 5 = 3/8 td or 9 blocks | Optimum rod = 1/4,1/8 rod
  {
    number: 4,
    location: { z: 89, y: 95, x: 66 },
    direction: "south",
    rodLength: 6,
    blockName: "lime_concrete",
    successMessage: `Instead use a 1/4 rod which = 2/8.`
  },
  {
    number: 4,
    location: { z: 95, y: 95, x: 66 },
    direction: "south",
    rodLength: 3,
    blockName: "red_concrete",
    successMessage: `a 1/8 rod which = 3/8`
  },
  //Gap 6 = 1 2/3 td or 40 blocks | Optimum rod = 1, 1/3, 1/3 rod
  {
    number: 5,
    location: { z: 100, y: 95, x: 69 },
    direction: "east",
    rodLength: 24,
    blockName: "green_concrete",
    successMessage: `Instead use 1 tweed`
  },
  {
    number: 5,
    location: { z: 100, y: 95, x: 93 },
    direction: "east",
    rodLength: 8,
    blockName: "purple_concrete",
    successMessage: `a 1/3 rod`
  },
  {
    number: 5,
    location: { z: 100, y: 95, x: 101 },
    direction: "east",
    rodLength: 8,
    blockName: "purple_concrete",
    successMessage: `a 1/3 rod to make 1 2/3`
  },
  //Gap 7 = 3/2 td or 36 blocks | Optimum rod = 1, 1/2 rod
  {
    number: 6,
    location: { z: 93, y: 95, x: 108 },
    direction: "west",
    rodLength: 24,
    blockName: "green_concrete",
    successMessage: `Instead use 1 tweed`
  },
  {
    number: 6,
    location: { z: 93, y: 95, x: 84 },
    direction: "west",
    rodLength: 12,
    blockName: "orange_concrete",
    successMessage: `a 1/2 rod to make 3/2`
  },
  //Gap 8 = 7/12 td or 14 blocks | Optimum rod = 1/3,1/4 rod
  {
    number: 7,
    location: { z: 85, y: 95, x: 73 },
    direction: "east",
    rodLength: 8,
    blockName: "purple_concrete",
    successMessage: `1/3`
  },
  {
    number: 7,
    location: { z: 85, y: 95, x: 81 },
    direction: "east",
    rodLength: 6,
    blockName: "lime_concrete",
    successMessage: `1/4`
  },
  //Gap 9 = 5/24 td or 5 blocks | Optimum rod = 1/6,1/24 rod
  {
    number: 8,
    location: { z: 85, y: 95, x: 91 },
    direction: "east",
    rodLength: 4,
    blockName: "yellow_concrete",
    successMessage: `1/6`
  },
  {
    number: 8,
    location: { z: 85, y: 95, x: 95 },
    direction: "east",
    rodLength: 1,
    blockName: "pink_concrete",
    successMessage: `1/24`
  }
];
var validRanges = [
  { x: 30, zMin: 93, zMax: 104 },
  //1/2 gap 1
  { xMin: 31, xMax: 42, z: 92 },
  //1/2 gap 2
  { xMin: 44, xMax: 47, z: 91 },
  //1/6 gap 3
  { z: 86, xMin: 48, xMax: 65 },
  //3/4 gap 4
  { zMin: 89, zMax: 97, x: 66 },
  //3/8 gap 5
  { xMin: 69, xMax: 108, z: 100 },
  //1 2/3 gap 6
  { xMin: 73, xMax: 108, z: 93 },
  //3/2 gap 7
  { xMin: 73, xMax: 86, z: 85 },
  //7/12 gap 8
  { xMin: 91, xMax: 95, z: 85 }
  //5/24 gap 9
];
var finalBlock = [
  {
    location: { z: 93, y: 95, x: 30 },
    blockName: "orange_concrete",
    startLocation: { z: 104, y: 95, x: 30 },
    startBlockName: "orange_concrete",
    number: 0
  },
  //1/2 gap 1
  {
    location: { z: 92, y: 95, x: 42 },
    blockName: "orange_concrete",
    startLocation: { z: 92, y: 95, x: 31 },
    startBlockName: "orange_concrete",
    number: 1
  },
  //1/2 gap 2
  {
    location: { z: 91, y: 95, x: 47 },
    blockName: "yellow_concrete",
    startLocation: { z: 91, y: 95, x: 44 },
    startBlockName: "yellow_concrete",
    number: 2
  },
  //1/6 gap 3
  {
    location: { z: 86, y: 95, x: 65 },
    blockName: "orange_concrete",
    startLocation: { z: 86, y: 95, x: 48 },
    startBlockName: "lime_concrete",
    number: 3
  },
  //3/4 gap 4
  {
    location: { z: 86, y: 95, x: 65 },
    blockName: "lime_concrete",
    startLocation: { z: 86, y: 95, x: 48 },
    startBlockName: "orange_concrete",
    number: 3
  },
  //3/4 gap 4
  {
    location: { z: 97, y: 95, x: 66 },
    blockName: "lime_concrete",
    startLocation: { z: 97, y: 95, x: 66 },
    startBlockName: "red_concrete",
    number: 4
  },
  //3/8 gap 5
  {
    location: { z: 97, y: 95, x: 66 },
    blockName: "red_concrete",
    startLocation: { z: 97, y: 95, x: 66 },
    startBlockName: "lime_concrete",
    number: 4
  },
  //3/8 gap 5
  {
    location: { z: 100, y: 95, x: 108 },
    blockName: "purple_concrete",
    startLocation: { z: 100, y: 95, x: 69 },
    startBlockName: "green_concrete",
    number: 5
  },
  //1 2/3 gap 6
  {
    location: { z: 100, y: 95, x: 108 },
    blockName: "green_concrete",
    startLocation: { z: 100, y: 95, x: 69 },
    startBlockName: "purple_concrete",
    number: 5
  },
  //1 2/3 gap 6
  {
    location: { z: 100, y: 95, x: 108 },
    blockName: "purple_concrete",
    startLocation: { z: 100, y: 95, x: 69 },
    startBlockName: "purple_concrete",
    number: 5
  },
  //1 2/3 gap 6
  {
    location: { z: 93, y: 95, x: 73 },
    blockName: "orange_concrete",
    startLocation: { z: 93, y: 95, x: 108 },
    startBlockName: "green_concrete",
    number: 6
  },
  //3/2 gap 7
  {
    location: { z: 93, y: 95, x: 73 },
    blockName: "green_concrete",
    startLocation: { z: 93, y: 95, x: 108 },
    startBlockName: "orange_concrete",
    number: 6
  },
  //3/2 gap 7
  {
    location: { z: 85, y: 95, x: 86 },
    blockName: "purple_concrete",
    startLocation: { z: 85, y: 95, x: 73 },
    startBlockName: "lime_concrete",
    number: 7
  },
  //7/12 gap 8
  {
    location: { z: 85, y: 95, x: 86 },
    blockName: "lime_concrete",
    startLocation: { z: 85, y: 95, x: 73 },
    startBlockName: "purple_concrete",
    number: 7
  },
  //7/12 gap 8
  {
    location: { z: 85, y: 95, x: 95 },
    blockName: "pink_concrete",
    startLocation: { z: 85, y: 95, x: 91 },
    startBlockName: "yellow_concrete",
    number: 8
  },
  //5/24 gap 9
  {
    location: { z: 85, y: 95, x: 95 },
    blockName: "yellow_concrete",
    startLocation: { z: 85, y: 95, x: 91 },
    startBlockName: "pink_concrete",
    number: 8
  }
  //5/24 gap 9
];
var replaySettings = [
  {
    // 1/2 gap 1
    // Message to display at the beginning of the replay
    beginningMessage: `To make 1/2 you placed: `,
    // Command to teleport the player to the starting position of the last platform they were on and set their facing direction
    tpStart: `tp @p 31 96 107 facing 31 96 100`,
    // Command to clear the rods they just placed by replacing blocks with short_grass
    clearBlock: `fill 30 95 104 30 95 93 short_grass replace`,
    // Command to replenish the grass under the rods they just placed, same coordinates as above with y axis 94.
    replenishGrass: `fill 30 94 104 30 94 93 grass_block replace`,
    //Direction along which the rods are placed ('x' or 'z'). (The one that stays the same.)
    cartesianDirection: "x",
    // Specific value of the x or z that is the same on all the coordinates.
    cartesionValue: 30
  },
  {
    // 1/2 gap 2
    beginningMessage: `To make 1/2 you placed: `,
    tpStart: `tp @p 30 96 92 facing 38 96 92`,
    clearBlock: `fill 31 95 92 42 95 92 short_grass replace`,
    replenishGrass: `fill 31 94 92 42 94 92 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 92
  },
  {
    // 1/6 gap 3
    beginningMessage: `To make 1/6 you placed: `,
    tpStart: `tp @p 43 96 91 facing 53 96 91`,
    clearBlock: `fill 44 95 91 47 95 91 short_grass replace`,
    replenishGrass: `fill 44 94 91 47 94 91 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 91
  },
  {
    // 3/4 gap 4
    beginningMessage: `To make 3/4 you placed: `,
    tpStart: `tp @p 47 96 86 facing 67 96 86`,
    clearBlock: `fill 48 95 86 65 95 86 short_grass replace`,
    replenishGrass: `fill 48 94 86 65 94 86 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 86
  },
  {
    // 3/8 gap 5
    beginningMessage: `To make 3/8 you placed: `,
    tpStart: `tp @p 66 96 87 facing 66 96 87`,
    clearBlock: `fill 66 95 89 66 95 97 short_grass replace`,
    replenishGrass: `fill 66 94 89 66 94 97 grass_block replace`,
    cartesianDirection: "x",
    cartesionValue: 66
  },
  {
    // 1 2/3 gap 6
    beginningMessage: `To make 1 2/3 you placed: `,
    tpStart: `tp @p 67 96 100 facing 108 96 100`,
    clearBlock: `fill 69 95 100 108 95 100 short_grass replace`,
    replenishGrass: `fill 69 94 100 108 94 100 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 100
  },
  {
    // 3/2 gap 7
    beginningMessage: `To make 3/2 you placed: `,
    tpStart: `tp @p 110 96 93 facing 72 96 93`,
    clearBlock: `fill 108 95 93 73 95 93 short_grass replace`,
    replenishGrass: `fill 108 94 93 73 94 93 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 93
  },
  {
    // 7/12 gap 8
    beginningMessage: `To make 7/12 you placed: `,
    tpStart: `tp @p 71 96 85 facing 86 96 85`,
    clearBlock: `fill 73 95 85 86 95 85 short_grass replace`,
    replenishGrass: `fill 73 94 85 86 94 85 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 85
  },
  // To do
  {
    // 5/24 gap 9
    beginningMessage: `To make 5/24 you placed: `,
    tpStart: `tp @p 89 96 85 facing 95 96 85`,
    clearBlock: `fill 91 95 85 95 95 85 short_grass replace`,
    replenishGrass: `fill 91 94 85 95 94 85 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 85
  }
];
var npcLocation = [
  { x: 30, y: 96, z: 90 },
  // 1/2 gap 1
  { x: 43, y: 96, z: 92 },
  // 1/2 gap 2
  { x: 49, y: 96, z: 92 },
  // 1/6 gap 3
  { x: 67, y: 96, z: 87 },
  // 3/4 gap 4
  { x: 66, y: 96, z: 100 },
  // 3/8 gap 5
  { x: 110, y: 96, z: 101 },
  // 1 2/3 gap 6
  { x: 71, y: 96, z: 93 },
  // 3/2 gap 7
  { x: 88, y: 96, z: 86 },
  // 7/12 gap 8
  { x: 98, y: 96, z: 85 }
  // 5/24 gap 9f
];

// scripts/cuisenaireRods.ts
var overworld5 = world5.getDimension("overworld");
var rodsPlaced = [];
var checkPoint = "tp @p 29 96 114 facing 29 96 112";
async function startCuisenaireTutorial() {
  await overworld5.runCommandAsync(`tp @p -390 -31 126`);
  await overworld5.runCommandAsync(`camera @p set minecraft:free pos -385 125 160 facing -385 -50 158`);
  await overworld5.runCommandAsync(`replaceitem entity @p slot.weapon.offhand 0 filled_map`);
  await overworld5.runCommandAsync(`title @p actionbar Around here, we measure distance in Tweeds (td).`);
  system2.runTimeout(async () => {
    overworld5.runCommandAsync(`title @p actionbar 1 td = 24 blocks`);
  }, 60);
  system2.runTimeout(async () => {
    overworld5.runCommandAsync(`title @p actionbar We have rods that are different fractions of 1 td`);
  }, 120);
  system2.runTimeout(async () => {
    overworld5.runCommandAsync(
      `title @p actionbar We do not have too many, so use them carefully!
You have just enough to rescue everyone.`
    );
  }, 180);
  system2.runTimeout(async () => {
    await startCuisenaireGame();
    overworld5.runCommandAsync(`camera @p clear`);
  }, 240);
}
async function resetCuisenaireGame() {
  await overworld5.runCommandAsync(`tp @p 29 96 114 facing 29 96 112`);
  await overworld5.runCommandAsync(`tp @e[tag=fractionNpc] 29 96 112 facing 29 96 114`);
  await overworld5.runCommandAsync(`scoreboard objectives setdisplay sidebar Students`);
  await overworld5.runCommandAsync(`scoreboard players set Saved Students 0`);
  await resetNPC(9);
  await resetGrid({ x: 19, y: 95, z: 81 });
}
async function startCuisenaireGame() {
  await giveRods();
  await giveMap();
  await resetCuisenaireGame();
}
async function giveMap() {
  let chest = overworld5.getBlock({ x: 30, y: 91, z: 107 })?.getComponent("inventory");
  let map = chest.container?.getItem(0);
  overworld5.getPlayers().forEach((player) => {
    const getPlayerInventoryComponent = player.getComponent("inventory");
    if (map) {
      getPlayerInventoryComponent.container?.setItem(22, map);
    } else {
      world5.sendMessage(`Error: Map not found it needs to be placed in the chest at 30 90 107`);
    }
  });
}
async function moveNpc(id) {
  let { x, y, z } = getRandomCoordinate();
  overworld5.runCommandAsync(`tp @e[tag=rodNpc${id}] ${x} ${y} ${z}`);
  overworld5.runCommandAsync(`scoreboard players add Saved Students 1`);
  overworld5.runCommandAsync(`dialogue change @e[tag=rodNpc${id}] rodNpc${id}Saved`);
  overworld5.runCommandAsync(`tp @e[tag=fractionNpc] ${npcLocation[id].x} ${npcLocation[id].y} ${npcLocation[id].z}`);
  checkPoint = replaySettings[id + 1].tpStart;
  overworld5.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc5`);
}
async function movePlayerToCheckpoint() {
  let player = world5.getPlayers()[0];
  let locationBeforeTp = player.location;
  await overworld5.runCommandAsync(checkPoint);
  await overworld5.runCommandAsync(
    `fill ${locationBeforeTp.x - 5} 95 ${locationBeforeTp.z - 5} ${locationBeforeTp.x + 5} 95 ${locationBeforeTp.z + 5} short_grass replace light_block`
  );
}
function getRandomCoordinate() {
  const minX = 19;
  const maxX = 28;
  const y = 96;
  const minZ = 106;
  const maxZ = 110;
  const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  const z = Math.floor(Math.random() * (maxZ - minZ + 1)) + minZ;
  return { x, y, z };
}
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
    overworld5.runCommand(`title @p actionbar ${successMessage} placed`);
    block.setPermutation(BlockPermutation3.resolve("tallgrass"));
    for (let i = 0; i < rodLength; i++) {
      let colour = block[direction](i)?.permutation?.getState("color");
      if (colour || block[direction](i)?.permutation?.matches("sandstone")) {
        overworld5.runCommand("title @p actionbar That rod is too long!");
        overworld5.runCommandAsync(`give @p ${blockName} 1 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`);
        runPlaceRods = false;
        break;
      }
    }
    if (runPlaceRods) {
      let rodToPlace = {
        location: block.location,
        direction,
        rodLength,
        blockName,
        successMessage
      };
      rodsPlaced.push(rodToPlace);
      placeRods(block, blockName, rodLength, direction);
      checkFinalBlock(block, direction, rodLength);
    } else {
      block?.setPermutation(BlockPermutation3.resolve("tallgrass"));
    }
  }
}
async function resetNPC(npcAmount) {
  rodsPlaced = [];
  for (let i = 0; i < npcAmount; i++) {
    overworld5.runCommandAsync(`dialogue change @e[tag=rodNpc${i}] rodNpc${i}Default`);
    overworld5.runCommandAsync(
      //tps the npc back based on the location parameter in npcLocation.
      `tp @e[tag=rodNpc${i}] ${npcLocation[i].x} ${npcLocation[i].y} ${npcLocation[i].z}`
    );
  }
}
async function queueSound(index) {
  system2.runTimeout(() => {
    overworld5.runCommandAsync(`playsound note.xylophone @p`);
  }, index * 10);
}
function placeRods(block, blockName, rodLength, direction) {
  const validDirections = ["east", "west", "north", "south"];
  if (validDirections.includes(direction)) {
    for (let i = 0; i < rodLength; i++) {
      queueSound(i);
      block[direction](i).setPermutation(BlockPermutation3.resolve(blockName));
    }
  } else {
    throw new Error(`Invalid direction: ${direction}`);
  }
}
async function setCameraView(player, index) {
  switch (index) {
    case 0:
      player.runCommandAsync(`camera ${player.name} set minecraft:free pos 30 120 99 facing 30 90 99`);
      break;
    case 1:
      player.runCommandAsync(`camera ${player.name} set minecraft:free pos 37 120 92 facing 37 90 92`);
      break;
    case 2:
      player.runCommandAsync(`camera ${player.name} set minecraft:free pos 45 107 91 facing 45 90 91`);
      break;
    case 3:
      player.runCommandAsync(`camera ${player.name} set minecraft:free pos 57 110 86 facing 57 90 86`);
      break;
    case 4:
      player.runCommandAsync(`camera ${player.name} set minecraft:free pos 66 109 93 facing 66 90 93`);
      break;
    case 5:
      player.runCommandAsync(`camera ${player.name} set minecraft:free pos 89 116 100 facing 89 90 100`);
      break;
    case 6:
      player.runCommandAsync(`camera ${player.name} set minecraft:free pos 90 113 93 facing 90 90 93`);
      break;
    case 7:
      player.runCommandAsync(`camera ${player.name} set minecraft:free pos 80 106 85 facing 80 90 85`);
      break;
    case 8:
      player.runCommandAsync(`camera ${player.name} set minecraft:free pos 93 106 85 facing 93 90 85`);
      break;
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
        overworld5.runCommandAsync(`title @p actionbar ${perfectRunFractionsSum}`);
      } else if (playerPlacedFractions.length > 0) {
        const fractionsSum = playerPlacedFractions.join(" + ");
        overworld5.runCommandAsync(`title @p actionbar ${beginningMessage} ${fractionsSum}`);
      }
    }
  } else {
    world5.sendMessage(`Error: No fractions found`);
  }
}
async function replay(index) {
  overworld5.runCommandAsync(`dialogue change @e[tag=rodNpc${index}] rodNpc${index}Default`);
  overworld5.runCommandAsync(`tp @p 31 96 116`);
  let npcIndex = index;
  let fractions = [];
  let combinedRods = [];
  let replayConfig = replaySettings[index];
  overworld5.runCommandAsync(replayConfig.clearBlock);
  overworld5.runCommandAsync(replayConfig.replenishGrass);
  const direction = replayConfig.cartesianDirection;
  const value = replayConfig.cartesionValue;
  let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location[direction] === value);
  rodsPlaced = rodsPlaced.filter((rod) => !(rod.location && rod.location[direction] === value));
  for (let i = 0; i < rodsPlacedToReplay.length; i++) {
    overworld5.runCommandAsync(
      `give @p ${rodsPlacedToReplay[i].blockName} 1 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`
    );
  }
  let perfectRunToReplay = perfectRun.filter((rod) => rod.number === index);
  combinedRods = rodsPlacedToReplay.concat(perfectRunToReplay);
  if (combinedRods.length > 0) {
    for (let i = 0; i < combinedRods.length; i++) {
      ((index2) => {
        system2.runTimeout(async () => {
          let x = combinedRods[index2].location.x;
          world5.getAllPlayers().forEach(async (player) => {
            await setCameraView(player, npcIndex);
            fractions.push(combinedRods[index2].successMessage);
            await replayMessage(replayConfig.beginningMessage, fractions);
            let block = overworld5.getBlock(combinedRods[index2].location);
            placeRods(
              block,
              combinedRods[index2].blockName,
              combinedRods[index2].rodLength,
              combinedRods[index2].direction
            );
            if (i === combinedRods.length - 1) {
              endReplay(
                player,
                replayConfig.tpStart,
                replayConfig.clearBlock,
                replayConfig.replenishGrass,
                combinedRods
              );
            }
          });
        }, 50 * index2);
        return;
      })(i);
    }
  }
}
function endReplay(player, tpStart, clearCommand, replenishGrass, combinedRods) {
  system2.runTimeout(() => {
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
    overworld5.runCommand(command);
  }
  overworld5.runCommandAsync(
    `fill ${pos1.x} ${pos1.y - 1} ${pos1.z} ${pos2.x} ${pos2.y - 1} ${pos2.z} grass replace dirt`
  );
  overworld5.runCommandAsync(`fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace air`);
}
async function resetGrid(location) {
  let concreteColours = ["red", "green", "purple", "brown", "blue", "lime", "yellow", "orange", "pink"];
  for (let i = 0; i < 4; i++) {
    let offset_x = location.x + i * 25;
    let pos1 = { x: offset_x, y: location.y, z: location.z };
    let pos2 = { x: offset_x + 24, y: location.y, z: location.z + 24 };
    await squareReset(pos1, pos2, concreteColours);
  }
}
async function giveRods() {
  let rods = [
    { block: "green_concrete", amount: 2 },
    { block: "orange_concrete", amount: 4 },
    { block: "purple_concrete", amount: 3 },
    { block: "lime_concrete", amount: 3 },
    { block: "yellow_concrete", amount: 2 },
    { block: "red_concrete", amount: 1 },
    { block: "pink_concrete", amount: 1 }
  ];
  overworld5.runCommandAsync(`gamemode adventure`);
  for (let i = 0; i < rods.length; i++) {
    overworld5.runCommandAsync(
      `replaceitem entity @p slot.hotbar ${i} ${rods[i].block} ${rods[i].amount} 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`
    );
  }
}
async function checkFinalBlock(block, direction, rodLength) {
  let rodEnd = block[direction](rodLength - 1);
  let hasColour = rodEnd.permutation?.getState("color");
  let rodEndLocation = rodEnd.location;
  const isCorrectFinalBlock = finalBlock.find((block2) => {
    const rodStart = overworld5.getBlock(block2.startLocation);
    return rodEnd?.permutation?.matches(block2.blockName) && rodEndLocation.x === block2.location.x && rodEndLocation.z === block2.location.z && rodStart?.permutation?.matches(block2.startBlockName);
  });
  const isIncorrectFinalBlock = finalBlock.find(
    (block2) => !rodEnd?.permutation?.matches(block2.blockName) && rodEndLocation.x === block2.location.x && rodEndLocation.z === block2.location.z
  );
  if (isCorrectFinalBlock) {
    changeNPC(isCorrectFinalBlock.number, true);
  } else if (isIncorrectFinalBlock) {
    changeNPC(isIncorrectFinalBlock.number, false);
  }
}
async function changeNPC(matchingRodIndex, win) {
  if (win) {
    overworld5.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Win`);
  } else {
    overworld5.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Fail`);
  }
}
async function moveGroundsKeeper(location) {
  const locations = [
    { x: 32, y: 101, z: 79 },
    { x: 56, y: 101, z: 79 },
    { x: 94, y: 101, z: 79 }
  ];
  let closestLocation = locations[0];
  let minDistance = calculateDistance(location, closestLocation);
  for (let i = 1; i < locations.length; i++) {
    const distance = calculateDistance(location, locations[i]);
    if (distance < minDistance) {
      minDistance = distance;
      closestLocation = locations[i];
    }
  }
  overworld5.runCommandAsync(`tp @e[tag=groundskeeper] ${closestLocation.x} ${closestLocation.y} ${closestLocation.z}`);
}
function calculateDistance(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
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
    east: "west",
    west: "east",
    south: "north",
    north: "south"
  };
  let oppositeDirection = oppositeDirections[direction];
  return { direction, oppositeDirection };
}

// scripts/potionGame.ts
import { BlockPermutation as BlockPermutation4, system as system3, world as world6 } from "@minecraft/server";
var overworld6 = world6.getDimension("overworld");
async function resetPotionGame() {
  await overworld6.runCommandAsync("tp @e[tag=coin0] -6 90 155");
  await overworld6.runCommandAsync("tp @e[tag=coin2] -5 86 154");
  await overworld6.runCommandAsync("tp @e[tag=coin4] -6 82 155");
  await overworld6.runCommandAsync("tp @e[tag=coin6] -5 78 154");
  await overworld6.runCommandAsync("tp @e[tag=coin8] -6 75 155");
  await overworld6.runCommandAsync("tp @e[tag=coin10] -5 75 154");
  await overworld6.runCommandAsync("fill -7 97 139 -3 97 139 minecraft:air");
  await overworld6.runCommandAsync("fill -3 126 138 -7 126 138 minecraft:black_concrete");
  await resetArea();
}
async function startPotionGame() {
  await overworld6.runCommandAsync(`clear @p`);
  await overworld6.runCommandAsync("fill -3 126 138 -7 126 138 minecraft:air");
  await giveWand();
  await giveIngredients();
}
async function getSlots(hopper) {
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
  world6.getDimension("overworld").runCommandAsync(`clear @p minecraft:potion`);
  world6.getDimension("overworld").runCommandAsync(`give @p minecraft:potion 1`);
}
async function calculateRatio(ingredients) {
  let carrot = ingredients.carrot;
  let glowDust = ingredients.apple;
  let kelp = ingredients.potato;
  let pufferFish = ingredients.beetroot;
  let mermaidTears = ingredients.melon;
  let milk = ingredients.milk_bucket;
  let cocoaBeans = ingredients.cocoa_beans;
  const hasIngredients = carrot + glowDust + kelp + pufferFish + mermaidTears + milk + cocoaBeans > 0;
  const isChocolateMilk = cocoaBeans * 1 === milk * 2 && carrot + glowDust + kelp + pufferFish + mermaidTears === 0 && hasIngredients;
  const isNotChocolateMilk = cocoaBeans * 1 !== milk * 2 && carrot + glowDust + kelp + pufferFish + mermaidTears === 0 && hasIngredients;
  if (isChocolateMilk) {
    overworld6.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc3`);
    overworld6.runCommandAsync(`dialogue open @e[tag=ratioNpc] @p ratioNpc6`);
    return { potion: "none", seconds: 0 };
  } else if (isNotChocolateMilk) {
    overworld6.runCommandAsync(`dialogue open @e[tag=ratioNpc] @p ratioNpc7`);
    return { potion: "none", seconds: 0 };
  } else {
    const isCorrectNightVisionPotion = carrot * 5 === glowDust * 3 && kelp + pufferFish + mermaidTears === 0 && hasIngredients;
    const isCorrectWaterBreathingPotion = kelp * 40 === pufferFish * 24 && kelp * 40 === mermaidTears * 15 && carrot + glowDust === 0 && hasIngredients;
    const isWrongNightVisionPotion = carrot * 5 !== glowDust * 3 && kelp + pufferFish + mermaidTears === 0 && hasIngredients;
    const isWrongWaterBreathingPotion = (kelp * 40 !== pufferFish * 24 || kelp * 40 !== mermaidTears * 15) && carrot + glowDust === 0 && hasIngredients;
    if (hasIngredients) {
      if (isCorrectNightVisionPotion) {
        return { potion: "night_vision", seconds: 5 };
      } else if (isCorrectWaterBreathingPotion) {
        return { potion: "water_breathing", seconds: mermaidTears * 2 };
      } else if (isWrongNightVisionPotion) {
        return { potion: "blindness", seconds: 4 };
      } else if (isWrongWaterBreathingPotion) {
        return { potion: "levitation", seconds: 4 };
      } else {
        return { potion: "empty", seconds: 0 };
      }
    } else {
      return { potion: "none", seconds: 0 };
    }
  }
}
async function barChart(slots) {
  let ingredients = {
    apple: 0,
    carrot: 0,
    potato: 0,
    beetroot: 0,
    melon: 0,
    milk_bucket: 0,
    cocoa_beans: 0
  };
  for (let slot of slots) {
    switch (slot.typeId) {
      case "minecraft:milk_bucket": {
        ingredients.milk_bucket = (ingredients.milk_bucket || 0) + slot.amount;
        break;
      }
      case "minecraft:cocoa_beans": {
        ingredients.cocoa_beans = (ingredients.cocoa_beans || 0) + slot.amount;
        break;
      }
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
  let { block } = getBlockValue({ x: -7, y: 97, z: 138 });
  block?.east(slot.slotNumber)?.setPermutation(BlockPermutation4.resolve(blockName));
  let height = 0;
  if (slot.amount > 20) {
    height = 20;
  } else {
    height = slot.amount;
  }
  for (let i = 0; i < height; i++) {
    block?.above(i)?.east(slot.slotNumber)?.setPermutation(BlockPermutation4.resolve(blockName));
  }
}
async function setItemFrame(offset_z, slotNumber) {
  let cloneFrom = -7 + offset_z;
  let cloneTo = -7 + slotNumber;
  world6.getDimension("overworld").runCommandAsync(`clone ${cloneFrom} 121 139 ${cloneFrom} 121 139 ${cloneTo} 97 139 replace`);
}
async function potionMaker(slots) {
  await resetArea();
  let ingredients = await barChart(slots);
  let { potion: potion2, seconds: seconds2 } = await calculateRatio(ingredients);
  if (potion2 !== "empty" && potion2 !== "none") {
    await givePotion();
  }
  return { potion: potion2, seconds: seconds2 };
}
async function resetArea() {
  await world6.getDimension("overworld").runCommandAsync("fill -7 96 138 -3 116 138 black_stained_glass replace");
}
async function giveIngredients() {
  overworld6.runCommand("replaceitem entity @p slot.hotbar 1 apple 20");
  overworld6.runCommand("replaceitem entity @p slot.hotbar 2 carrot 20");
  overworld6.runCommand("replaceitem entity @p slot.hotbar 3 beetroot 20");
  overworld6.runCommand("replaceitem entity @p slot.hotbar 4 potato 20");
  overworld6.runCommand("replaceitem entity @p slot.hotbar 5 melon_slice 20");
}
function displayTimer(potionStart2, seconds2, player, potionDescription) {
  let timeLeft = (potionStart2 + seconds2 * 20 - system3.currentTick) / 20;
  if (timeLeft % 1 === 0) {
    player.onScreenDisplay.setActionBar(`Time left:
 ${potionDescription} ${timeLeft} seconds`);
  }
}

// scripts/npcscriptEventHandler.ts
import { system as system6, world as world10 } from "@minecraft/server";

// scripts/gate.ts
import { world as world7 } from "@minecraft/server";
var overworld7 = world7.getDimension("overworld");
async function openGate(location) {
  switch (location) {
    case "spawn": {
      overworld7.runCommandAsync(`setblock 62 97 148 air`);
      overworld7.runCommandAsync(`setblock 62 97 147 air`);
      overworld7.runCommandAsync(`setblock 62 98 148 air`);
      overworld7.runCommandAsync(`setblock 62 98 147 air`);
      overworld7.runCommandAsync(`setblock 61 97 146 iron_bars`);
      overworld7.runCommandAsync(`setblock 60 97 146 iron_bars`);
      overworld7.runCommandAsync(`setblock 61 98 146 iron_bars`);
      overworld7.runCommandAsync(`setblock 60 98 146 iron_bars`);
      overworld7.runCommandAsync(`setblock 61 97 149 iron_bars`);
      overworld7.runCommandAsync(`setblock 60 97 149 iron_bars`);
      overworld7.runCommandAsync(`setblock 61 98 149 iron_bars`);
      overworld7.runCommandAsync(`setblock 60 98 149 iron_bars`);
      break;
    }
    case "scale": {
      overworld7.runCommandAsync(`setblock 56 96 158 air`);
      overworld7.runCommandAsync(`setblock 57 96 158 air`);
      overworld7.runCommandAsync(`setblock 56 97 158 air`);
      overworld7.runCommandAsync(`setblock 57 97 158 air`);
      overworld7.runCommandAsync(`setblock 58 96 159 iron_bars`);
      overworld7.runCommandAsync(`setblock 58 96 160 iron_bars`);
      overworld7.runCommandAsync(`setblock 58 97 159 iron_bars`);
      overworld7.runCommandAsync(`setblock 58 97 160 iron_bars`);
      overworld7.runCommandAsync(`setblock 55 96 159 iron_bars`);
      overworld7.runCommandAsync(`setblock 55 96 160 iron_bars`);
      overworld7.runCommandAsync(`setblock 55 97 159 iron_bars`);
      overworld7.runCommandAsync(`setblock 55 97 160 iron_bars`);
      break;
    }
    case "ratio": {
      overworld7.runCommandAsync(`setblock 45 96 148 air`);
      overworld7.runCommandAsync(`setblock 45 96 147 air`);
      overworld7.runCommandAsync(`setblock 45 97 148 air`);
      overworld7.runCommandAsync(`setblock 45 97 147 air`);
      overworld7.runCommandAsync(`setblock 44 96 149 iron_bars`);
      overworld7.runCommandAsync(`setblock 43 96 149 iron_bars`);
      overworld7.runCommandAsync(`setblock 44 97 149 iron_bars`);
      overworld7.runCommandAsync(`setblock 43 97 149 iron_bars`);
      overworld7.runCommandAsync(`setblock 44 96 146 iron_bars`);
      overworld7.runCommandAsync(`setblock 43 96 146 iron_bars`);
      overworld7.runCommandAsync(`setblock 44 97 146 iron_bars`);
      overworld7.runCommandAsync(`setblock 43 97 146 iron_bars`);
      break;
    }
    case "fraction": {
      overworld7.runCommandAsync(`setblock 56 96 137 air`);
      overworld7.runCommandAsync(`setblock 57 96 137 air`);
      overworld7.runCommandAsync(`setblock 56 97 137 air`);
      overworld7.runCommandAsync(`setblock 57 97 137 air`);
      overworld7.runCommandAsync(`setblock 55 96 136 iron_bars`);
      overworld7.runCommandAsync(`setblock 55 96 135 iron_bars`);
      overworld7.runCommandAsync(`setblock 55 97 136 iron_bars`);
      overworld7.runCommandAsync(`setblock 55 97 135 iron_bars`);
      overworld7.runCommandAsync(`setblock 58 96 136 iron_bars`);
      overworld7.runCommandAsync(`setblock 58 96 135 iron_bars`);
      overworld7.runCommandAsync(`setblock 58 97 136 iron_bars`);
      overworld7.runCommandAsync(`setblock 58 97 135 iron_bars`);
      break;
    }
  }
}
async function closeGate(location) {
  switch (location) {
    case "spawn": {
      overworld7.runCommandAsync(`setblock 62 97 148 iron_bars`);
      overworld7.runCommandAsync(`setblock 62 97 147 iron_bars`);
      overworld7.runCommandAsync(`setblock 62 98 148 iron_bars`);
      overworld7.runCommandAsync(`setblock 62 98 147 iron_bars`);
      overworld7.runCommandAsync(`setblock 61 97 146 air`);
      overworld7.runCommandAsync(`setblock 60 97 146 air`);
      overworld7.runCommandAsync(`setblock 61 98 146 air`);
      overworld7.runCommandAsync(`setblock 60 98 146 air`);
      overworld7.runCommandAsync(`setblock 61 97 149 air`);
      overworld7.runCommandAsync(`setblock 60 97 149 air`);
      overworld7.runCommandAsync(`setblock 61 98 149 air`);
      overworld7.runCommandAsync(`setblock 60 98 149 air`);
      break;
    }
    case "scale": {
      overworld7.runCommandAsync(`setblock 56 96 158 iron_bars`);
      overworld7.runCommandAsync(`setblock 57 96 158 iron_bars`);
      overworld7.runCommandAsync(`setblock 56 97 158 iron_bars`);
      overworld7.runCommandAsync(`setblock 57 97 158 iron_bars`);
      overworld7.runCommandAsync(`setblock 58 96 159 air`);
      overworld7.runCommandAsync(`setblock 58 96 160 air`);
      overworld7.runCommandAsync(`setblock 58 97 159 air`);
      overworld7.runCommandAsync(`setblock 58 97 160 air`);
      overworld7.runCommandAsync(`setblock 55 96 159 air`);
      overworld7.runCommandAsync(`setblock 55 96 160 air`);
      overworld7.runCommandAsync(`setblock 55 97 159 air`);
      overworld7.runCommandAsync(`setblock 55 97 160 air`);
      break;
    }
    case "ratio": {
      overworld7.runCommandAsync(`setblock 45 96 148 iron_bars`);
      overworld7.runCommandAsync(`setblock 45 96 147 iron_bars`);
      overworld7.runCommandAsync(`setblock 45 97 148 iron_bars`);
      overworld7.runCommandAsync(`setblock 45 97 147 iron_bars`);
      overworld7.runCommandAsync(`setblock 44 96 149 air`);
      overworld7.runCommandAsync(`setblock 43 96 149 air`);
      overworld7.runCommandAsync(`setblock 44 97 149 air`);
      overworld7.runCommandAsync(`setblock 43 97 149 air`);
      overworld7.runCommandAsync(`setblock 44 96 146 air`);
      overworld7.runCommandAsync(`setblock 43 96 146 air`);
      overworld7.runCommandAsync(`setblock 44 97 146 air`);
      overworld7.runCommandAsync(`setblock 43 97 146 air`);
      break;
    }
    case "fraction": {
      overworld7.runCommandAsync(`setblock 56 96 137 iron_bars`);
      overworld7.runCommandAsync(`setblock 57 96 137 iron_bars`);
      overworld7.runCommandAsync(`setblock 56 97 137 iron_bars`);
      overworld7.runCommandAsync(`setblock 57 97 137 iron_bars`);
      overworld7.runCommandAsync(`setblock 55 96 136 air`);
      overworld7.runCommandAsync(`setblock 55 96 135 air`);
      overworld7.runCommandAsync(`setblock 55 97 136 air`);
      overworld7.runCommandAsync(`setblock 55 97 135 air`);
      overworld7.runCommandAsync(`setblock 58 96 136 air`);
      overworld7.runCommandAsync(`setblock 58 96 135 air`);
      overworld7.runCommandAsync(`setblock 58 97 136 air`);
      overworld7.runCommandAsync(`setblock 58 97 135 air`);
      break;
    }
  }
}

// scripts/npcWalk.ts
import { world as world8, system as system4 } from "@minecraft/server";
var overworld8 = world8.getDimension("overworld");
var ratioMessage = [
  { message: "You should know, no one has \nwon my well game in 50 years.", step: 0 },
  {
    message: "The trick to getting the coins is to mix \xA7astronger potions \xA7fto the \n\xA7acorrect ratios.",
    step: 18
  },
  {
    message: "You'll need to make a \xA7aNight Vision\xA7f potion first.\nThen a strong \xA7aBreathing\xA7f potion to succeed.",
    step: 38
  }
];
var fractionMessage = [
  { message: "You \xA7acan't jump or step on the grass \xA7fin the gardens.\nYou'll be told off if you do!", step: 0 },
  { message: "I'll give you \xA7adifferent sized magical rods\xA7f\nto cross the gaps to save the students.", step: 25 },
  {
    message: "Two gardens are \xA7a24x24\xA7f blocks wide and one is \xA7a24x48\xA7f.\nEach gap will be a fraction of 24. ",
    step: 45
  }
];
var scaleMessage = [
  { message: "You'll need to change the \xA7anumerator\xA7f (the top number) \nto scale the windows.", step: 0 },
  {
    message: "To make the window larger you'll need to make the \n\xA7anumerator larger\xA7f than the denominator (bottom number).",
    step: 25
  },
  { message: "The windows must fit in the frame!\nSo make sure you don't make the windows too big.", step: 50 }
];
async function npcWalk(type) {
  switch (type) {
    case "scale": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: 57, y: 96, z: 182 },
        { x: 40, y: 96, z: 182 },
        { x: 40, y: 96, z: 186 },
        { x: 40, y: 97, z: 188 },
        { x: 40, y: 98, z: 189 },
        { x: 40, y: 98, z: 191 },
        { x: 40, y: 98, z: 195 },
        { x: 42, y: 98, z: 195 },
        { x: 42, y: 98, z: 197 },
        { x: 42, y: 98, z: 196 }
      ]);
      moveNpc2(path, "scale", scaleMessage);
      break;
    }
    case "fraction": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: 57, y: 96, z: 116 },
        { x: 29, y: 96, z: 116 },
        { x: 29, y: 96, z: 112 },
        { x: 29, y: 96, z: 113 }
      ]);
      moveNpc2(path, "fraction", fractionMessage);
      break;
    }
    case "ratio": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: -3, y: 96, z: 148 },
        { x: -3, y: 96, z: 141 },
        { x: -3, y: 96, z: 142 }
      ]);
      moveNpc2(path, "ratio", ratioMessage);
      break;
    }
  }
}
async function moveNpc2(path, type, messages) {
  let message = "";
  overworld8.runCommandAsync(`dialogue change @e[tag=${type}Npc] ${type}Npc1`);
  for (let i = 0; i < path.length - 1; i++) {
    let { x, y, z } = path[i];
    const nextPoint = path[i + 1];
    const facingX = nextPoint.x;
    const facingY = nextPoint.y;
    const facingZ = nextPoint.z;
    system4.runTimeout(async () => {
      await overworld8.runCommandAsync(`tp @e[tag=${type}Npc] ${x} ${y} ${z} facing ${facingX} ${facingY} ${facingZ}`);
      const messageMatch = messages.find((msg) => msg.step === i);
      if (messageMatch) {
        message = messageMatch.message;
      }
      if (message) {
        overworld8.runCommandAsync(`title @p actionbar ${message}`);
      }
      if (path.length - 2 == i) {
        await overworld8.runCommandAsync(`dialogue open @e[tag=${type}Npc] @p ${type}Npc2`);
      }
    }, i * 5);
  }
}
async function generatePath(path) {
  const generatedPath = [];
  for (let i = 0; i < path.length - 1; i++) {
    const startCoord = path[i];
    const endCoord = path[i + 1];
    const xDiff = endCoord.x - startCoord.x;
    const yDiff = endCoord.y - startCoord.y;
    const zDiff = endCoord.z - startCoord.z;
    const xStep = Math.sign(xDiff);
    const yStep = Math.sign(yDiff);
    const zStep = Math.sign(zDiff);
    const steps = Math.max(Math.abs(xDiff), Math.abs(yDiff), Math.abs(zDiff));
    for (let j = 0; j <= steps; j++) {
      const x = startCoord.x + xStep * j;
      const y = startCoord.y + yStep * j;
      const z = startCoord.z + zStep * j;
      generatedPath.push({ x, y, z });
    }
  }
  return generatedPath;
}

// scripts/resetGame.ts
import { world as world9 } from "@minecraft/server";
var overworld9 = world9.getDimension("overworld");
async function resetGame() {
  await overworld9.runCommandAsync(`tp @p 30 96 106`);
  await resetCuisenaireGame();
  await overworld9.runCommandAsync(`tp @p -10 97 143`);
  await resetPotionGame();
  await overworld9.runCommandAsync(`tp @p 71 96 221`);
  await resetWindowGame();
  await overworld9.runCommandAsync(`tp @e[tag=fractionNpc] 57 88 148`);
  await overworld9.runCommandAsync(`tp @e[tag=scaleNpc] 57 88 148`);
  await overworld9.runCommandAsync(`tp @e[tag=ratioNpc] 57 88 148`);
  await overworld9.runCommandAsync(`tp @e[tag=spawnNpc] 63 97 146 facing 69 97 147`);
  await overworld9.runCommandAsync(`dialogue change @e[tag=spawnNpc] spawnNpc`);
  await overworld9.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc0`);
  await overworld9.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc0`);
  await overworld9.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc0`);
  await closeGate("spawn");
  await closeGate("scale");
  await closeGate("ratio");
  await closeGate("fraction");
  await overworld9.runCommandAsync(`gamemode adventure @p`);
  await overworld9.runCommandAsync(`gamerule showcoordinates false`);
  await overworld9.runCommandAsync(`scoreboard objectives setdisplay sidebar`);
  await overworld9.runCommandAsync(`scoreboard players set Coins Depth 0`);
  await overworld9.runCommandAsync(`clear @p`);
  await overworld9.runCommandAsync(`effect @p clear`);
  await overworld9.runCommandAsync(`tp @p 69 97 147 facing 41 97 147`);
  await overworld9.runCommandAsync(`camera @p clear`);
}

// scripts/npcscriptEventHandler.ts
var overworld10 = world10.getDimension("overworld");
system6.afterEvents.scriptEventReceive.subscribe(async (event) => {
  switch (event.id) {
    case "game:reset": {
      await resetGame();
      break;
    }
    case "rod:npcReplay": {
      replay(parseInt(event.message));
      break;
    }
    case "rod:npcComplete": {
      moveNpc(parseInt(event.message));
      break;
    }
    case "spawn:npc": {
      openGate("spawn");
      if (event.message === "fraction") {
        overworld10.runCommandAsync(`tp @e[tag=fractionNpc] 57 96 148 facing 66 97 148`);
        overworld10.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
      } else if (event.message === "ratio") {
        overworld10.runCommandAsync(`tp @e[tag=ratioNpc] 57 96 148 facing 66 97 148`);
        overworld10.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
      } else if (event.message === "scale") {
        overworld10.runCommandAsync(`tp @e[tag=scaleNpc] 57 96 148 facing 66 97 148`);
        overworld10.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
      } else {
        world10.sendMessage(`spawnNpc triggered with invalid message`);
      }
      break;
    }
    case "gate:open": {
      openGate(event.message);
      break;
    }
    case "gate:close": {
      closeGate(event.message);
      break;
    }
    case "scale:npc": {
      switch (event.message) {
        case "0": {
          openGate("scale");
          closeGate("ratio");
          closeGate("fraction");
          await npcWalk("scale");
          break;
        }
        case "1": {
          startWindowTutorial();
          break;
        }
        case "2": {
          giveGlass();
          break;
        }
        case `3`: {
          overworld10.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc3`);
          nextWindow();
          break;
        }
        case `4`: {
          overworld10.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc3`);
          redoWindowGame();
          break;
        }
        case `5`: {
          overworld10.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc9`);
          overworld10.runCommandAsync(`tp @p 6 96 230 facing 44 96 230`);
          overworld10.runCommandAsync(`tp @e[tag=scaleNpc] 44 96 230 facing 6 96 230`);
          overworld10.runCommandAsync(`clear @p`);
          break;
        }
      }
      break;
    }
    case "ratio:npc": {
      switch (event.message) {
        case "0": {
          openGate("ratio");
          closeGate("scale");
          closeGate("fraction");
          await npcWalk("ratio");
          break;
        }
        case "1": {
          overworld10.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc3`);
          startPotionGame();
          break;
        }
        case "2": {
          await giveIngredients();
          break;
        }
        case "3": {
          giveWand();
          overworld10.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc2`);
          overworld10.runCommand("replaceitem entity @p slot.hotbar 1 cocoa_beans 2");
          overworld10.runCommand("replaceitem entity @p slot.hotbar 2 milk_bucket 1");
        }
      }
      break;
    }
    case "fraction:npc": {
      switch (event.message) {
        case "0": {
          openGate("fraction");
          closeGate("scale");
          closeGate("ratio");
          await npcWalk("fraction");
          break;
        }
        case "1": {
          await startCuisenaireTutorial();
          overworld10.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc3`);
          break;
        }
        case "2": {
          overworld10.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc3`);
          await startCuisenaireGame();
          break;
        }
      }
      break;
    }
  }
  if (event.id === "fraction:groundskeeper") {
    await movePlayerToCheckpoint();
  }
});

// scripts/main.ts
var overworld11 = world11.getDimension("overworld");
var potion = "";
var seconds = 0;
var potionStart = 0;
var potionDrank = false;
var meters = 0;
var playerCanSeeInDark = false;
world11.afterEvents.entityHitEntity.subscribe(async (event) => {
  let hitEntity = event.hitEntity;
  if (hitEntity.typeId === `blockbuilders:orb`) {
    let tag = hitEntity.getTags();
    overworld11.runCommandAsync(
      `particle blockbuilders:spell ${hitEntity.location.x} ${hitEntity.location.y} ${hitEntity.location.z}`
    );
    let windowNumber = parseInt(tag[1].substring(6));
    if (windowNumber >= 0) {
      windowScaleHandler(windowNumber);
    }
  }
  if (hitEntity.typeId === `blockbuilders:coin`) {
    let tag = hitEntity.getTags();
    let x_location = 0 - parseInt(tag[0].substring(4));
    overworld11.runCommandAsync(`scoreboard players add Coins Depth 1`);
    overworld11.runCommandAsync(`tp @e[type=blockbuilders:coin,tag=${tag}] ${x_location} 104 156 facing -11 104 156`);
  }
  if (hitEntity.typeId === `blockbuilders:cauldron`) {
    let cauldron = hitEntity.getComponent("inventory");
    overworld11.runCommand(
      `particle minecraft:cauldron_explosion_emitter ${hitEntity.location.x} ${hitEntity.location.y} ${hitEntity.location.z}`
    );
    let slots = await getSlots(cauldron);
    cauldron.container?.clearAll();
    ({ potion, seconds } = await potionMaker(slots));
  }
});
world11.afterEvents.playerPlaceBlock.subscribe(async (event) => {
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
        green: { block: "green_concrete", value: 24, message: "1/1" },
        orange: { block: "orange_concrete", value: 12, message: "1/2" },
        purple: { block: "purple_concrete", value: 8, message: "1/3" },
        lime: { block: "lime_concrete", value: 6, message: "1/4" },
        yellow: { block: "yellow_concrete", value: 4, message: "1/6" },
        red: { block: "red_concrete", value: 3, message: "1/8" },
        light_blue: { block: "light_blue_concrete", value: 2, message: "1/12" },
        pink: { block: "pink_concrete", value: 1, message: "1/24" }
      };
      if (!hasColour) {
        player.runCommandAsync(`title ${player.name} actionbar Place the rod in front of the magical connector.`);
        const rod2 = rodPermutations[colour];
        player.runCommandAsync(`give @p ${rod2.block} 1 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`);
        event.block.setPermutation(BlockPermutation5.resolve("tallgrass"));
        return;
      }
      if (!correctDirection) {
        player.runCommandAsync(`title ${player.name} actionbar You're facing the wrong way.`);
        event.block.setPermutation(BlockPermutation5.resolve("tallgrass"));
        return;
      }
      const rod = rodPermutations[colour];
      if (rod) {
        cuisenaire(block, rod.block, rod.value, rod.message, direction);
      }
    }
  }
});
world11.afterEvents.playerBreakBlock.subscribe(async (clickEvent) => {
  let hand_item = clickEvent.itemStackAfterBreak?.typeId;
  let block = clickEvent.block;
  let brokenBlock = clickEvent.brokenBlockPermutation;
  if (hand_item === "blockbuilders:mathmogicians_wand") {
    if (
      //cycles the numerators for the window game as they are the only ones that need to change.
      windows.some(
        (window) => block.location.x === window.numerator.x && block.location.y === window.numerator.y && block.location.z === window.numerator.z
      )
    ) {
      cycleNumberBlock(clickEvent);
    } else {
      block.setPermutation(brokenBlock);
    }
  }
});
function applyPotionEffect(player, potion2, seconds2) {
  player.runCommand("scoreboard objectives setdisplay sidebar Depth");
  let tick = seconds2 * 20;
  potionStart = system7.currentTick;
  switch (potion2) {
    case "water_breathing": {
      player.addEffect("water_breathing", tick);
      break;
    }
    case "night_vision": {
      playerCanSeeInDark = true;
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
  world11.getAllPlayers().forEach(async (player) => {
    if (player.isOnGround) {
      let isOnGrass = overworld11.getBlock(player.location)?.permutation?.matches("minecraft:short_grass");
      if (isOnGrass && player.location.z <= 104.99) {
        overworld11.getBlock(player.location)?.setPermutation(BlockPermutation5.resolve("minecraft:light_block"));
        await moveGroundsKeeper(player.location);
        overworld11.runCommand(`dialogue open @e[tag=groundskeeper] ${player.name} groundskeeper`);
        overworld11.runCommand(`playsound mob.villager.no @p`);
      }
    }
    if (player.isJumping && player.location.z <= 104.99) {
      await moveGroundsKeeper(player.location);
      player.runCommandAsync(`dialogue open @e[tag=groundskeeper] ${player.name} groundskeeper1`);
      overworld11.runCommand(`playsound mob.villager.no @p`);
    }
    if (player.isInWater) {
      if (player.location.x < 0) {
        player.runCommand(`scoreboard objectives setdisplay sidebar Depth`);
        meters = 94 - Math.floor(player.location.y);
        player.runCommand(`scoreboard players set Meters Depth ${meters}`);
      }
      if (potionDrank) {
        applyPotionEffect(player, potion, seconds);
        potionDrank = false;
      }
      if (player.getEffect("water_breathing")) {
        if (playerCanSeeInDark) {
          overworld11.runCommandAsync(`effect @p night_vision ${seconds} 1 true`);
        }
        displayTimer(potionStart, seconds, player, "Breathing underwater");
      } else if (player.getEffect("night_vision")) {
        overworld11.runCommandAsync(`title @p actionbar You can now permanently see in the dark!`);
      } else if (player.getEffect("blindness")) {
        displayTimer(potionStart, seconds, player, "Oh no! The ratios were wrong, you can't see anything for");
      } else if (player.getEffect("levitation")) {
        displayTimer(potionStart, seconds, player, "Oh no! You're floating for");
      }
      if (player.isSneaking == true) {
        player.runCommandAsync(`dialogue open @e[tag=ratioNpc] @p ratioNpc5`);
        surface(player);
      }
      if (player.isSwimming == true) {
        player.runCommandAsync(`dialogue open @e[tag=ratioNpc] @p ratioNpc5`);
        surface(player);
      }
    }
  });
  system7.run(mainTick);
}
async function surface(player) {
  player.runCommandAsync(`scoreboard objectives setdisplay sidebar`);
  player.teleport({ x: -3, y: 96, z: 144 });
  player.runCommandAsync(`scoreboard objectives setdisplay sidebar`);
  player.addEffect("instant_health", 5);
  player.removeEffect("blindness");
  player.removeEffect("night_vision");
  player.removeEffect("water_breathing");
  player.removeEffect("levitation");
}
world11.afterEvents.itemCompleteUse.subscribe(async (event) => {
  let player = event.source;
  if (event.itemStack?.typeId === "minecraft:potion") {
    if (potion === "poison") {
      player.runCommandAsync(
        "title @p actionbar \xA7fYou mixed the potion with the \xA72wrong ingredients. \n\xA7fIt has had no effect.\nMake sure you're using the correct ingredients."
      );
    } else {
      potionDrank = true;
      player.runCommandAsync("title @p actionbar You drank the potion! \xA72Jump in the well \xA7fto see the effect.");
    }
    event.source.runCommand("clear @p minecraft:glass_bottle");
  }
});
world11.afterEvents.entityHealthChanged.subscribe(async (event) => {
  if (event.entity.typeId === "minecraft:player") {
    let player = event.entity;
    if (player.isInWater == true) {
      if (event.newValue === 18) {
        await surface(player);
        player.runCommandAsync("scoreboard objectives setdisplay sidebar");
        if (meters > 0) {
          player.sendMessage(`\xA7fYou made it to a depth of: \xA72${meters}m 
\xA7fOnly ${20 - meters}m to the bottom. `);
        }
      }
    }
  }
});
system7.run(mainTick);

//# sourceMappingURL=../debug/main.js.map
