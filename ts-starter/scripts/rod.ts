import {
  BlockPermutation,
  world,
  system,
  Vector3,
  Player,
  EntityInventoryComponent,
  EquipmentSlot,
  EntityItemComponent,
} from "@minecraft/server";
import { roundToDigits } from "./numberHandler";
import { perfectRun, validRanges, finalBlock } from "./perfectRun";

let overworld = world.getDimension("overworld");
let rodsPlaced: any[] = [];

export async function directionCheck(x: number, z: number, direction: string) {
  let correctDirection = false;

  for (const range of validRanges) {
    //world.sendMessage(`x: ${x} z: ${z}`);
    if (
      (range.x !== undefined && x === range.x && isInRange(z, range.zMin!, range.zMax!)) ||
      (range.z !== undefined && z === range.z && isInRange(x, range.xMin!, range.xMax!))
    ) {
      correctDirection = true;
      break;
    }
  }

  return correctDirection;
}
function isInRange(value: number, min: any, max: any): boolean {
  return value >= min && value <= max;
}

export async function cuisenaire(
  block: any,
  blockName: string,
  rodLength: number,
  successMessage: string,
  direction: string
) {
  if (block.permutation?.matches(blockName)) {
    let runPlaceRods = true;
    overworld.runCommand("title @p actionbar " + successMessage);
    block.setPermutation(BlockPermutation.resolve("tallgrass"));
    for (let i = 0; i < rodLength; i++) {
      let colour = block[direction](i)?.permutation?.getState("color");
      if (colour || block[direction](i)?.permutation?.matches("sandstone")) {
        overworld.runCommand("title @p actionbar That rod is too long!");
        runPlaceRods = false;
        break;
      }
    }
    if (runPlaceRods) {
      let rodToPlace = { location: block.location, direction: direction, rodLength: rodLength, blockName: blockName };
      rodsPlaced.push(rodToPlace);
      placeRods(block, blockName, rodLength, direction);
      
      const matchingRodIndex = perfectRun.findIndex((rod) => JSON.stringify(rod) === JSON.stringify(rodToPlace));
      if (matchingRodIndex >= 0) {
        //means you match the perfect run.
        await changeNPC(matchingRodIndex, true);
      }
    } else {
      block?.setPermutation(BlockPermutation.resolve("tallgrass"));
    }
  }
}

async function changeNPC(matchingRodIndex: number, win: boolean) {
  //changes the NPC to the success state based on the matchingRodIndex in cuisenaire function.
  if (win) {
    overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Win`);
  } else {//changes the NPC
    overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Fail`);
}
}

export async function resetNPC(npcAmount: number) {
  rodsPlaced = []; //resets the rods placed array.
  for (let i = 0; i < npcAmount; i++) {
    overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${i}] rodNpc${i}Default`);
  }
}

function placeRods(block: any, blockName: string, rodLength: number, direction: string) {
  const validDirections = ["east", "west", "north", "south"];
  if (validDirections.includes(direction)) {
    for (let i = 0; i < rodLength; i++) {
      block[direction](i).setPermutation(BlockPermutation.resolve(blockName))
      const newRodIndex = finalBlock.findIndex((finalBlockElement) => 
        JSON.stringify(finalBlockElement.location) === JSON.stringify(block[direction](i).location)
      );
      if (newRodIndex >= 0) {
        changeNPC(newRodIndex, false);
      }
    }
  } else {
    throw new Error(`Invalid direction: ${direction}`);
  }
}

async function setCameraView(x: number, player: any) {
  if (x >= 19 && x <= 42) {//room1
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 30 120 92 facing 30 90 92`);
  } else if (x >= 44 && x <= 67) {//room2
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 11 120 44 facing 11 94 44`);
  } else if (x >= 69 && x <= 92) {//room3
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos -14 120 44 facing -14 94 44`);
  } else if (x >= 94 && x <= 117) {//room4
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos -39 120 44 facing -39 94 44`);
  }
}

export async function getBlockBehind(event: any, oppositeDirection: string) {
  let hasColour = event.block[oppositeDirection](1)?.permutation?.getState("color");
  return hasColour;
}

export async function replay(index: number) {
  let tpStart = `tp @p 31 96 107 facing 31 96 100`;
  let clearBlock = `fill 30 95 104 30 95 93 tallgrass replace`;
  let replenishGrass = `fill 30 94 104 30 94 93 grass_block replace`;
  overworld.runCommandAsync(clearBlock);
  overworld.runCommandAsync(replenishGrass);
  let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location.x === 30);
  let perfectRunToReplay = perfectRun.filter((rod) => rod.location && rod.location.x === 30);
  let combinedRods = rodsPlacedToReplay.concat(perfectRunToReplay);
  for (let i = 0; i < combinedRods.length; i++) {
    ((index) => {
      system.runTimeout(async () => {
        let x = combinedRods[index].location.x;
        world.getAllPlayers().forEach(async (player) => {
          await setCameraView(x, player);

          let block = overworld.getBlock(combinedRods[index].location);
          placeRods(block, combinedRods[index].blockName, combinedRods[index].rodLength, combinedRods[index].direction);
          if (i === combinedRods.length - 1) {
            //resets the camera 2 seconds after last rod placed.
            endReplay(player, tpStart, clearBlock, replenishGrass);
          }
        });
      }, 40 * index);
      return;
    })(i);
  }
}

function endReplay(player: any, tpStart: string, clearCommand: string, replenishGrass: string) {
  system.runTimeout(() => {
    player.runCommandAsync(tpStart);
    player.runCommandAsync(clearCommand);
    player.runCommandAsync(replenishGrass);
    player.runCommandAsync(`camera ${player.name} clear`);
  }, 40);
}

//Resets the area to the original state, one area at a time.
async function squareReset(pos1: Vector3, pos2: Vector3, concreteColours: string[]) {
  for (let i = 0; i < concreteColours.length; i++) {
    let command = `fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace ${concreteColours[i]}_concrete`;
    overworld.runCommand(command);
  }
  overworld.runCommandAsync(
    `fill ${pos1.x} ${pos1.y - 1} ${pos1.z} ${pos2.x} ${pos2.y - 1} ${pos2.z} grass replace dirt`
  );
  overworld.runCommandAsync(`fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace air`);
}

//preps the grid coordinates for the squareReset function.
export async function resetGrid(location: Vector3) {
  let concreteColours = ["red", "green", "purple", "brown", "blue", "lime", "yellow"]; // What rods will be replaced.
  for (let i = 0; i < 4; i++) {
    let offset_x = location.x + i * 25; // 25 is the distance between each starting point of the grid.
    let pos1 = { x: offset_x, y: location.y, z: location.z };
    let pos2 = { x: offset_x + 24, y: location.y, z: location.z + 24 };
    await squareReset(pos1, pos2, concreteColours);
  }
}

export async function giveRods(player: any, rodsRemoved: any[]) {
  let rods = [
    { block: "red_concrete", amount: 10 },
    { block: "lime_concrete", amount: 10 },
    { block: "purple_concrete", amount: 10 },
    { block: "green_concrete", amount: 10 },
    { block: "brown_concrete", amount: 10 },
    { block: "yellow_concrete", amount: 10 },
    { block: "blue_concrete", amount: 10 },
  ];
  player.runCommandAsync(`clear ${player.name}`);
  for (let i = 0; i < rods.length; i++) {
    player.runCommandAsync(
      `give @p ${rods[i].block} ${rods[i].amount} 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`
    );
  }
}
