// scripts/main.ts
import { world as world11, system as system6, BlockPermutation as BlockPermutation5 } from "@minecraft/server";

// scripts/stainedGlassWindow.ts
import { world as world4 } from "@minecraft/server";

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
    `give @p[hasitem={item=blockbuilders:mathmogicians_wand,quantity=0}] blockbuilders:mathmogicians_wand 1 0 {"item_lock": { "mode": "lock_in_slot" }, "minecraft:can_destroy":{"blocks":["minecraft:hopper", "blockbuilders:number_0","blockbuilders:number_1","blockbuilders:number_2","blockbuilders:number_3","blockbuilders:number_4","blockbuilders:number_5","blockbuilders:number_6","blockbuilders:number_7","blockbuilders:number_8","blockbuilders:number_9","blockbuilders:symbol_subtract"]}}`
  );
}

// scripts/stainedGlassWindow.ts
var overworld4 = world4.getDimension("overworld");
async function resetWindowGame() {
  overworld4.runCommandAsync(`fill 69 98 225 69 102 225 air replace`);
  overworld4.runCommandAsync(`fill 78 98 225 80 98 225 air replace`);
  overworld4.runCommandAsync(`fill 78 99 225 79 99 225 air replace`);
  overworld4.runCommandAsync(`fill 78 100 225 78 100 225 air replace`);
  overworld4.runCommandAsync(`setblock 71 98 225 blockbuilders:number_0`);
  overworld4.runCommandAsync(`setblock 82 98 225 blockbuilders:number_0`);
  windowUndoHandler({ x: 71, y: 97, z: 225 });
  windowUndoHandler({ x: 82, y: 97, z: 225 });
}
async function startWindowGame() {
  overworld4.runCommandAsync(`clear @p`);
  await giveWand();
  giveGlass();
}
async function windowScaleHandler(location) {
  switch (true) {
    case (location.x === 71 && location.y === 97 && location.z === 225): {
      await windowUndo({ x: 67, y: 47, z: 218 }, { x: 76, y: 82, z: 218 }, { x: 67, y: 97, z: 218 });
      scale({ x: 69, y: 98, z: 225 }, { x: 69, y: 102, z: 225 }, { x: 71, y: 98, z: 225 });
      break;
    }
    case (location.x === 82 && location.y === 97 && location.z === 225): {
      await windowUndo({ x: 75, y: 47, z: 218 }, { x: 107, y: 66, z: 218 }, { x: 75, y: 97, z: 218 });
      scale({ x: 78, y: 97, z: 225 }, { x: 80, y: 100, z: 225 }, { x: 82, y: 98, z: 225 });
      break;
    }
  }
}
async function windowUndoHandler(location) {
  giveGlass();
  switch (true) {
    case (location.x === 71 && location.y === 97 && location.z === 225): {
      await windowUndo({ x: 67, y: 47, z: 218 }, { x: 76, y: 82, z: 218 }, { x: 67, y: 97, z: 218 });
      break;
    }
    case (location.x === 82 && location.y === 97 && location.z === 225): {
      await windowUndo({ x: 75, y: 47, z: 218 }, { x: 107, y: 66, z: 218 }, { x: 75, y: 97, z: 218 });
      break;
    }
  }
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
async function scale(cubePos1, cubePos2, inputNumber) {
  const blocks = await getCube(cubePos1, cubePos2);
  let shape = [];
  let scaleFactor = getInput([inputNumber]);
  for (const block of blocks) {
    let colour = block.permutation?.getState(`color`);
    if (colour) {
      let location = { x: block.block?.x, y: block.block?.y, z: block.block?.z, colour };
      shape.push(location);
    }
  }
  let scaledShape = await scaleShape(shape, scaleFactor, "yx");
  for (const block of scaledShape) {
    let offset_z = block.z - 7;
    let offset_x = block.x;
    let offset_y = block.y + 1;
    setBlock({ x: offset_x, y: offset_y, z: offset_z }, block.colour + "_stained_glass");
  }
}
async function windowUndo(from, to, into) {
  await overworld4.runCommandAsync(
    `clone ${from.x} ${from.y} ${from.z} ${to.x} ${to.y} ${to.z} ${into.x} ${into.y} ${into.z} replace`
  );
  await overworld4.runCommandAsync(`fill ${from.x} 116 ${from.z} ${to.x} 120 ${to.z} air replace`);
  await overworld4.runCommandAsync(`fill ${from.x} 120 ${from.z} ${to.x} 150 ${to.z} air replace`);
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

// scripts/cuisenaireRods.ts
import { BlockPermutation as BlockPermutation3, world as world5, system } from "@minecraft/server";

// scripts/perfectRun.ts
var perfectRun = [
  {
    location: { z: 104, y: 95, x: 30 },
    direction: "north",
    rodLength: 12,
    blockName: "yellow_concrete",
    successMessage: `Instead use a 1/2 rod as that is half of 24.`
  },
  //1/2
  {
    location: { z: 92, y: 95, x: 31 },
    direction: "east",
    rodLength: 6,
    blockName: "green_concrete",
    successMessage: `For 1/4 of 24 use a 6 rod.`
  },
  //1/4
  {
    location: { z: 91, y: 95, x: 44 },
    direction: "east",
    rodLength: 8,
    blockName: "brown_concrete",
    successMessage: `Use an 8 rod to make up a 1/3.`
  },
  //1/3
  {
    location: { z: 94, y: 95, x: 53 },
    direction: "south",
    rodLength: 4,
    blockName: "purple_concrete",
    successMessage: `Four is a sixth of 24.`
  },
  //1/6
  {
    location: { z: 100, y: 95, x: 55 },
    direction: "east",
    rodLength: 8,
    blockName: "brown_concrete",
    successMessage: `The most efficient way is to simplify 2/6 to 1/3.`
  },
  //2/6
  //{ location: { z: 99, y: 95, x: 69 }, direction: "east", rodLength: 24, blockName: "blue_concrete", successMessage: `The largest rod you have is a whole, so place two of them.` }, //1/1
  {
    location: { z: 99, y: 95, x: 93 },
    direction: "east",
    rodLength: 24,
    blockName: "blue_concrete",
    successMessage: `The largest rod you have is a whole, so place two of them.`
  },
  //1/1
  {
    location: { z: 95, y: 95, x: 115 },
    direction: "west",
    rodLength: 3,
    blockName: "lime_concrete",
    successMessage: `Three is 1/8 of 24. `
  },
  //1/3
  {
    location: { z: 94, y: 95, x: 109 },
    direction: "west",
    rodLength: 6,
    blockName: "green_concrete",
    successMessage: `Simplify 2/8 to 1/4 to get the most efficient way across`
  },
  //1/6
  {
    location: { z: 92, y: 95, x: 99 },
    direction: "north",
    rodLength: 2,
    blockName: "red_concrete",
    successMessage: `Two is 1/2 of 24.`
  },
  //1/2
  {
    location: { z: 89, y: 95, x: 97 },
    direction: "west",
    rodLength: 4,
    blockName: "purple_concrete",
    successMessage: `Simplify 2/12 to get the most optimum route`
  },
  //1/4
  {
    location: { z: 89, y: 95, x: 92 },
    direction: "west",
    rodLength: 2,
    blockName: "red_concrete",
    successMessage: `Two is 1/2 of 24.`
  },
  //1/2
  {
    location: { z: 89, y: 95, x: 87 },
    direction: "west",
    rodLength: 8,
    blockName: "brown_concrete",
    successMessage: `Error this message shouldn't be able to be seen. It means the rod amounts are incorrect.`
  }
  //1/3
];
var validRanges = [
  { x: 30, zMin: 93, zMax: 104 },
  { xMin: 31, xMax: 36, z: 92 },
  { xMin: 44, xMax: 51, z: 91 },
  { x: 53, zMin: 94, zMax: 97 },
  { xMin: 55, xMax: 62, z: 100 },
  { xMin: 69, xMax: 116, z: 99 },
  { xMin: 113, xMax: 115, z: 95 },
  { xMin: 101, xMax: 109, z: 94 },
  { x: 99, zMin: 91, zMax: 92 },
  { xMin: 94, xMax: 97, z: 89 },
  { xMin: 91, xMax: 92, z: 89 },
  { xMin: 80, xMax: 87, z: 89 }
];
var finalBlock = [
  { location: { z: 93, y: 95, x: 30 }, blockName: "yellow_concrete" },
  { location: { z: 92, y: 95, x: 36 }, blockName: "green_concrete" },
  { location: { z: 91, y: 95, x: 51 }, blockName: "brown_concrete" },
  { location: { z: 97, y: 95, x: 53 }, blockName: "purple_concrete" },
  { location: { z: 100, y: 95, x: 62 }, blockName: "brown_concrete" },
  { location: { z: 99, y: 95, x: 92 }, blockName: "blue_concrete" },
  { location: { z: 99, y: 95, x: 116 }, blockName: "blue_concrete" },
  { location: { z: 95, y: 95, x: 113 }, blockName: "lime_concrete" },
  { location: { z: 94, y: 95, x: 104 }, blockName: "green_concrete" },
  { location: { z: 91, y: 95, x: 99 }, blockName: "red_concrete" },
  { location: { z: 89, y: 95, x: 94 }, blockName: "purple_concrete" },
  { location: { z: 89, y: 95, x: 91 }, blockName: "red_concrete" },
  { location: { z: 89, y: 95, x: 80 }, blockName: "brown_concrete" }
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
  {
    beginningMessage: `To make 1/4 you placed: `,
    tpStart: `tp @p 30 96 92 facing 38 96 92`,
    clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`,
    replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 92
  },
  {
    beginningMessage: `To make 1/3 you placed: `,
    tpStart: `tp @p 41 96 91 facing 53 96 91`,
    clearBlock: `fill 51 95 91 44 95 91 tallgrass replace`,
    replenishGrass: `fill 51 94 91 44 94 91 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 91
  },
  {
    beginningMessage: `To make 1/6 you placed: `,
    tpStart: `tp @p 53 96 92 facing 53 96 98`,
    clearBlock: `fill 53 95 94 53 95 97 tallgrass replace`,
    replenishGrass: `fill 53 94 94 53 94 97 grass_block replace`,
    cartesianDirection: "x",
    cartesionValue: 53
  },
  {
    beginningMessage: `To make 2/6 you placed: `,
    tpStart: `tp @p 54 96 99 facing 63 96 99`,
    clearBlock: `fill 55 95 100 62 95 100 tallgrass replace`,
    replenishGrass: `fill 55 94 100 62 94 100 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 100
  },
  {
    beginningMessage: `To make 2/1 you placed: `,
    tpStart: `tp @p 67 96 99 facing 117 96 99`,
    clearBlock: `fill 69 95 99 116 95 99 tallgrass replace`,
    replenishGrass: `fill 69 94 99 116 94 99 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 99
  },
  {
    beginningMessage: `To make 1/8 you placed: `,
    tpStart: `tp @p 117 96 95 facing 112 96 95`,
    clearBlock: `fill 115 95 95 113 95 95 tallgrass replace`,
    replenishGrass: `fill 115 94 95 113 94 95 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 95
  },
  {
    beginningMessage: `To make 2/8 you placed: `,
    tpStart: `tp @p 111 96 94 facing 103 96 94`,
    clearBlock: `fill 109 95 94 104 95 94 tallgrass replace`,
    replenishGrass: `fill 109 94 94 104 94 94 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 94
  },
  {
    beginningMessage: `To make 1/12 you placed: `,
    tpStart: `tp @p 99 96 94 facing 99 96 90`,
    clearBlock: `fill 99 95 92 99 95 91 tallgrass replace`,
    replenishGrass: `fill 99 94 92 99 94 91 grass_block replace`,
    cartesianDirection: "x",
    cartesionValue: 99
  },
  {
    beginningMessage: `To make 2/12 you placed: `,
    tpStart: `tp @p 99 96 89 facing 93 96 89`,
    clearBlock: `fill 97 95 89 94 95 89 tallgrass replace`,
    replenishGrass: `fill 97 94 89 94 94 89 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 89
  },
  {
    beginningMessage: `To make 1/12 you placed: `,
    tpStart: `tp @p 93 96 88 facing 90 96 89`,
    clearBlock: `fill 92 95 89 91 95 89 tallgrass replace`,
    replenishGrass: `fill 92 94 89 91 94 89 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 89
  },
  {
    beginningMessage: `To make 1/3 you placed: `,
    tpStart: `tp @p 89 96 89 facing 79 96 89`,
    clearBlock: `fill 87 95 89 80 95 89 tallgrass replace`,
    replenishGrass: `fill 87 94 89 80 94 89 grass_block replace`,
    cartesianDirection: "z",
    cartesionValue: 89
  }
];
var npcLocation = [
  { x: 29, y: 96, z: 90 },
  { x: 38, y: 96, z: 92 },
  { x: 53, y: 96, z: 90 },
  { x: 53, y: 96, z: 100 },
  { x: 66, y: 96, z: 100 }
];

// scripts/cuisenaireRods.ts
var overworld5 = world5.getDimension("overworld");
var rodsPlaced = [];
async function resetCuisenaireGame() {
  await overworld5.runCommandAsync(`scoreboard objectives setdisplay sidebar Students`);
  await overworld5.runCommandAsync(`scoreboard players set Saved Students 0`);
  await resetNPC(5);
  await resetGrid({ x: 19, y: 95, z: 81 });
}
async function startCuisenaireGame() {
  resetCuisenaireGame();
  await giveRods();
}
async function moveNpc(id) {
  let { x, y, z } = getRandomCoordinate();
  overworld5.runCommandAsync(`tp @e[tag=rodNpc${id}] ${x} ${y} ${z}`);
  overworld5.runCommandAsync(`scoreboard players add Saved Students 1`);
  overworld5.runCommandAsync(`dialogue change @e[tag=rodNpc${id}] rodNpc${id}Saved
      `);
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
      checkFinalBlock();
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
      `tp @e[type=npc,tag=rodNpc${i}] ${npcLocation[i].x} ${npcLocation[i].y} ${npcLocation[i].z}`
    );
  }
}
function placeRods(block, blockName, rodLength, direction) {
  const validDirections = ["east", "west", "north", "south"];
  if (validDirections.includes(direction)) {
    for (let i = 0; i < rodLength; i++) {
      block[direction](i).setPermutation(BlockPermutation3.resolve(blockName));
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
  } else if (index == 6 || index == 7 || index == 8 || index == 9) {
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 105 120 92 facing 105 90 92`);
  } else if (index == 10 || index == 11 || index == 12) {
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
  overworld5.runCommandAsync(`tp @p 31 96 116`);
  let npcIndex = index;
  let fractions = [];
  let combinedRods = [];
  let replayConfig = replaySettings[index];
  overworld5.runCommandAsync(replayConfig.clearBlock);
  overworld5.runCommandAsync(replayConfig.replenishGrass);
  if (replayConfig.cartesianDirection === "x") {
    let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location.x === replayConfig.cartesionValue);
    for (let i = 0; i < rodsPlacedToReplay.length; i++) {
      overworld5.runCommandAsync(
        `give @p ${rodsPlacedToReplay[i].blockName} 1 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`
      );
    }
    rodsPlaced = rodsPlaced.filter((rod) => !(rod.location && rod.location.x === replayConfig.cartesionValue));
    let perfectRunToReplay = perfectRun.filter((rod) => rod.location && rod.location.x === replayConfig.cartesionValue);
    if (perfectRunToReplay.length > 1) {
      perfectRunToReplay = perfectRunToReplay.slice(0, -1);
    }
    combinedRods = rodsPlacedToReplay.concat(perfectRunToReplay);
  } else if (replayConfig.cartesianDirection === "z") {
    let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location.z === replayConfig.cartesionValue);
    for (let i = 0; i < rodsPlacedToReplay.length; i++) {
      overworld5.runCommandAsync(
        `give @p ${rodsPlacedToReplay[i].blockName} 1 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`
      );
    }
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
    overworld5.runCommand(command);
  }
  overworld5.runCommandAsync(
    `fill ${pos1.x} ${pos1.y - 1} ${pos1.z} ${pos2.x} ${pos2.y - 1} ${pos2.z} grass replace dirt`
  );
  overworld5.runCommandAsync(`fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace air`);
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
async function giveRods() {
  let rods = [
    { block: "red_concrete", amount: 2 },
    { block: "lime_concrete", amount: 1 },
    { block: "purple_concrete", amount: 2 },
    { block: "green_concrete", amount: 2 },
    { block: "brown_concrete", amount: 3 },
    { block: "yellow_concrete", amount: 1 },
    { block: "blue_concrete", amount: 2 }
  ];
  overworld5.runCommandAsync(`clear @p`);
  overworld5.runCommandAsync(`gamemode adventure`);
  for (let i = 0; i < rods.length; i++) {
    overworld5.runCommandAsync(
      `give @p ${rods[i].block} ${rods[i].amount} 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`
    );
  }
}
async function checkFinalBlock() {
  for (let i = 0; i < finalBlock.length; i++) {
    let rodEnd = overworld5.getBlock(finalBlock[i].location);
    let hasColour = rodEnd?.permutation?.getState("color");
    if (rodEnd?.permutation?.matches(finalBlock[i].blockName)) {
      changeNPC(i, true);
    } else if (hasColour) {
      changeNPC(i, false);
    }
  }
}
async function changeNPC(matchingRodIndex, win) {
  if (win) {
    overworld5.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Win`);
  } else {
    overworld5.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Fail`);
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
    east: "west",
    west: "east",
    south: "north",
    north: "south"
  };
  let oppositeDirection = oppositeDirections[direction];
  return { direction, oppositeDirection };
}

// scripts/potionGame.ts
import { BlockPermutation as BlockPermutation4, system as system2, world as world6 } from "@minecraft/server";
var overworld6 = world6.getDimension("overworld");
async function resetPotionGame() {
  await overworld6.runCommandAsync("tp @e[tag=coin1] -6 90 155");
  await overworld6.runCommandAsync("tp @e[tag=coin2] -5 86 154");
  await overworld6.runCommandAsync("tp @e[tag=coin3] -6 82 155");
  await overworld6.runCommandAsync("tp @e[tag=coin4] -5 78 154");
  await overworld6.runCommandAsync("tp @e[tag=coin5] -6 75 155");
  await overworld6.runCommandAsync("tp @e[tag=coin6] -5 75 154");
  await overworld6.runCommandAsync("fill -11 97 146 -11 97 140 minecraft:air");
  await overworld6.runCommandAsync("fill -12 124 145 -12 124 141 minecraft:black_concrete");
  await resetArea();
}
async function startPotionGame() {
  await overworld6.runCommandAsync(`clear @p`);
  await overworld6.runCommandAsync("fill -12 124 145 -12 124 141 minecraft:air");
  await giveWand();
  await giveIngredients();
}
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
  world6.getDimension("overworld").runCommandAsync(`clear @p minecraft:potion`);
  world6.getDimension("overworld").runCommandAsync(`give @p minecraft:potion 1`);
}
async function calculateRatio(ingredients) {
  let wrongIngredientsSight = ingredients.potato + ingredients.beetroot + ingredients.melon;
  let wrongIngredientsDive = ingredients.apple + ingredients.carrot;
  let appleRatio = ingredients.apple + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let carrotRatio = ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let potatoRatio = ingredients.potato + ingredients.apple + ingredients.carrot;
  let beetrootRatio = ingredients.beetroot + ingredients.apple + ingredients.carrot;
  let melonRatio = ingredients.melon + ingredients.apple + ingredients.carrot;
  let total = ingredients.apple + ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let nightVision = ingredients.carrot / ingredients.apple;
  let beetrootMelonRatio = beetrootRatio / melonRatio;
  let melonPotatoRatio = melonRatio / potatoRatio;
  if (beetrootMelonRatio === 1.5 && melonPotatoRatio === 2) {
    let potion2 = "water_breathing";
    let seconds2 = Math.ceil((beetrootRatio + melonRatio + potatoRatio) * 1.7);
    return { potion: potion2, seconds: seconds2 };
  } else if (nightVision === 2) {
    let potion2 = "night_vision";
    let seconds2 = Math.ceil((ingredients.apple + ingredients.carrot) * 1.7);
    return { potion: potion2, seconds: seconds2 };
  } else if (wrongIngredientsSight === 0 && potatoRatio + carrotRatio > 0) {
    let seconds2 = 4;
    let potion2 = "blindness";
    return { potion: potion2, seconds: seconds2 };
  } else if (wrongIngredientsDive === 0 && beetrootRatio + melonRatio + potatoRatio > 0) {
    let seconds2 = 4;
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
  let { block } = getBlockValue({ x: -12, y: 97, z: 145 });
  block?.north(slot.slotNumber)?.setPermutation(BlockPermutation4.resolve(blockName));
  if (slot.amount > 10) {
    slot.amount = 10;
  }
  for (let i = 0; i < slot.amount; i++) {
    block?.above(i)?.north(slot.slotNumber)?.setPermutation(BlockPermutation4.resolve(blockName));
  }
}
async function setItemFrame(offset_z, slotNumber) {
  let cloneFrom = 145 - offset_z;
  let cloneTo = 145 - slotNumber;
  world6.getDimension("overworld").runCommandAsync(`clone -11 109 ${cloneFrom} -11 109 ${cloneFrom} -11 97 ${cloneTo} replace`);
}
async function potionMaker(slots) {
  await resetArea();
  let ingredients = await barChart(slots);
  let { potion: potion2, seconds: seconds2 } = await calculateRatio(ingredients);
  if (potion2 !== "empty") {
    await givePotion();
  }
  return { potion: potion2, seconds: seconds2 };
}
async function resetArea() {
  await world6.getDimension("overworld").runCommandAsync("fill -12 106 141 -12 96 145 black_stained_glass replace");
}
async function giveIngredients() {
  overworld6.runCommand("replaceitem entity @p slot.hotbar 1 apple 10");
  overworld6.runCommand("replaceitem entity @p slot.hotbar 2 carrot 10");
  overworld6.runCommand("replaceitem entity @p slot.hotbar 3 beetroot 10");
  overworld6.runCommand("replaceitem entity @p slot.hotbar 4 potato 10");
  overworld6.runCommand("replaceitem entity @p slot.hotbar 5 melon_slice 10");
}
function displayTimer(potionStart2, seconds2, player, potionDescription) {
  let timeLeft = (potionStart2 + seconds2 * 20 - system2.currentTick) / 20;
  if (timeLeft % 1 === 0) {
    player.onScreenDisplay.setActionBar(`Time left:
 ${potionDescription} ${timeLeft} seconds`);
  }
}

// scripts/npcscriptEventHandler.ts
import { system as system5, world as world10 } from "@minecraft/server";

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
import { world as world8, system as system3 } from "@minecraft/server";
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
async function npcWalk(type) {
  switch (type) {
    case "scale": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: 57, y: 96, z: 221 },
        { x: 72, y: 96, z: 221 },
        { x: 72, y: 96, z: 226 }
      ]);
      world8.sendMessage("scale moveNpc");
      break;
    }
    case "fraction": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: 57, y: 96, z: 116 },
        { x: 29, y: 96, z: 116 },
        { x: 29, y: 96, z: 111 },
        { x: 29, y: 96, z: 112 }
      ]);
      break;
    }
    case "ratio": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: -2, y: 96, z: 148 },
        { x: -2, y: 96, z: 153 },
        { x: -2, y: 96, z: 152 }
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
    system3.runTimeout(async () => {
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
  await overworld9.runCommandAsync(`clear @p`);
  await overworld9.runCommandAsync(`effect @p clear`);
  await overworld9.runCommandAsync(`tp @p 69 97 147 facing 41 97 147`);
}

// scripts/npcscriptEventHandler.ts
var overworld10 = world10.getDimension("overworld");
system5.afterEvents.scriptEventReceive.subscribe(async (event) => {
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
        overworld10.runCommandAsync(`tp @e[tag=fractionNpc] 57 96 148 facing 66 96 148`);
        overworld10.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
      } else if (event.message === "ratio") {
        overworld10.runCommandAsync(`tp @e[tag=ratioNpc] 57 96 148 facing 66 96 148`);
        overworld10.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
      } else if (event.message === "scale") {
        overworld10.runCommandAsync(`tp @e[tag=scaleNpc] 57 96 148 facing 66 96 148`);
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
          startWindowGame();
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
          startCuisenaireGame();
          break;
        }
      }
      break;
    }
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
world11.afterEvents.buttonPush.subscribe(async (event) => {
  switch (`${event.block.location.x},${event.block.location.y},${event.block.location.z}`) {
    case "29,97,106": {
      await startCuisenaireGame();
      break;
    }
    case "66,97,224": {
      await startWindowGame();
      break;
    }
    case "1,97,151": {
      await startPotionGame();
      break;
    }
  }
});
world11.afterEvents.entityHitEntity.subscribe(async (event) => {
  let hitEntity = event.hitEntity;
  if (hitEntity.typeId === `blockbuilders:coin`) {
    let tag = hitEntity.getTags();
    let y_location = parseInt(tag[0].substring(4)) + 95;
    overworld11.runCommandAsync(
      `tp @e[type=blockbuilders:coin,tag=${tag}] -1 ${y_location} 157 facing 1 ${y_location} 157`
    );
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
world11.beforeEvents.playerBreakBlock.subscribe(async (event) => {
  let block = event.block;
  if (block.permutation?.matches("hopper")) {
    event.cancel;
    overworld11.runCommandAsync(`kill @e[type=item]`);
    let slots = await getSlots(event);
    ({ potion, seconds } = await potionMaker(slots));
  }
});
world11.afterEvents.playerBreakBlock.subscribe(async (clickEvent) => {
  let hand_item = clickEvent.itemStackAfterBreak?.typeId;
  let block = clickEvent.block;
  let brokenBlock = clickEvent.brokenBlockPermutation;
  if (hand_item === "blockbuilders:mathmogicians_wand") {
    if (brokenBlock.matches("blockbuilders:symbol_subtract") && block.location.z === 225) {
      await windowUndoHandler(block.location);
      block.setPermutation(BlockPermutation5.resolve("blockbuilders:symbol_subtract"));
    } else if (block.location.x === 71 && block.location.y === 98 && block.location.z === 225 || block.location.x === 82 && block.location.y === 98 && block.location.z === 225) {
      cycleNumberBlock(clickEvent);
    } else {
      block.setPermutation(brokenBlock);
    }
  }
});
world11.beforeEvents.itemUseOn.subscribe(async (event) => {
  let block = event.block;
  if (block.permutation?.matches("blockbuilders:symbol_subtract")) {
    await windowScaleHandler(block.location);
  }
});
function applyPotionEffect(player, potion2, seconds2) {
  player.runCommand("scoreboard objectives setdisplay sidebar Depth");
  let tick = seconds2 * 20;
  potionStart = system6.currentTick;
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
  world11.getAllPlayers().forEach((player) => {
    if (player.isInWater) {
      player.runCommand(`scoreboard objectives setdisplay sidebar Depth`);
      meters = 94 - Math.floor(player.location.y);
      player.runCommand(`scoreboard players set Meters Depth ${meters}`);
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
        if (!playerCanSeeInDark) {
          playerCanSeeInDark = true;
          overworld11.runCommandAsync(`title @p actionbar You can now permanently see in the dark!`);
        }
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
  system6.run(mainTick);
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
system6.run(mainTick);

//# sourceMappingURL=../debug/main.js.map
