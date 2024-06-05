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
import { perfectRun } from "./perfectRun";

let overworld = world.getDimension("overworld");
let rodsPlaced: any[] = [];

export async function directionCheck(x: number, z: number, direction: string) {
  let correctDirection = false;

  const validRanges = [
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
    { xMin: 80, xMax: 87, z: 89 },
  ];

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
      const matchingRodIndex = perfectRun.findIndex((rod) => JSON.stringify(rod) === JSON.stringify(rodToPlace));
      if (matchingRodIndex >= 0) {
        world.sendMessage("You placed a rod in the correct position!");
        await changeNPC(matchingRodIndex);
      }
      placeRods(block, blockName, rodLength, direction);
    } else {
      block?.setPermutation(BlockPermutation.resolve("tallgrass"));
    }
  }
}

async function changeNPC(matchingRodIndex: number) {
  //changes the NPC to the success state based on the matchingRodIndex.
  overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Win`);
}

export async function resetNPC(npcAmount: number) {
  rodsPlaced = []; //resets the rods placed array.
  for (let i = 0; i < npcAmount; i++) {
    overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${i}] rodNpc${i}Fail`);
  }
}

function placeRods(block: any, blockName: string, rodLength: number, direction: string) {
  const validDirections = ["east", "west", "north", "south"];
  if (validDirections.includes(direction)) {
    for (let i = 0; i < rodLength; i++) {
      block[direction](i)?.setPermutation(BlockPermutation.resolve(blockName));
    }
  } else {
    throw new Error(`Invalid direction: ${direction}`);
  }
}

async function setCameraView(x: number, player: any) {
  if (x >= 25 && x <= 48) {
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 36 120 44 facing 36 94 44`);
  } else if (x >= 0 && x <= 23) {
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 11 120 44 facing 11 94 44`);
  } else if (x >= -25 && x <= -2) {
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos -14 120 44 facing -14 94 44`);
  } else if (x >= -50 && x <= -27) {
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos -39 120 44 facing -39 94 44`);
  }
}

export async function getBlockBehind(event: any, oppositeDirection: string) {
  let hasColour = event.block[oppositeDirection](1)?.permutation?.getState("color");
  return hasColour;
}
export async function replayRods(player: any) {
  await resetGrid({ x: -50, y: 94, z: 33 }); //clears the grid.
  let matchingRods = rodsPlaced.filter((rod, index) => JSON.stringify(rod) === JSON.stringify(perfectRun[index]));
  if (matchingRods) {
    player.runCommandAsync("tp 38 96 -76"); //moves the player out of sight.
    for (let i = 0; i < matchingRods.length; i++) {
      ((index) => {
        system.runTimeout(async () => {
          let x = matchingRods[index].location.x;
          await setCameraView(x, player);
          let block = overworld.getBlock(matchingRods[index].location);
          placeRods(block, matchingRods[index].blockName, matchingRods[index].rodLength, matchingRods[index].direction);
          if (i === matchingRods.length - 1) {
            //resets the camera 2 seconds after last rod placed.
            world.sendMessage(
              `tp ${player.name} ${matchingRods[index].location.x} ${matchingRods[index].location.y + 1} ${
                matchingRods[index].location.z
              }`
            );
            let tpCommand = `tp ${player.name} ${matchingRods[index].location.x} ${
              matchingRods[index].location.y + 1
            } ${matchingRods[index].location.z}`;
            //endReplay(player, tpCommand);
          }
        }, 40 * index);
        return;
      })(i);
    }
  }
}

export async function replay(index: number) {
  let tpStart = `tp @p 37 95 31 facing 37 95 45`;
  let clearCommand = `fill 37 94 33 37 94 44 tallgrass replace`;
  overworld.runCommandAsync(clearCommand);
  let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location.x === 37);
  let perfectRunToReplay = perfectRun.filter((rod) => rod.location && rod.location.x === 37);
  let combinedRods = rodsPlacedToReplay.concat(perfectRunToReplay);
  world.sendMessage(`Replaying rods ${combinedRods}`);
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
            endReplay(player, tpStart, clearCommand);
          }
        });
      }, 40 * index);
      return;
    })(i);

    world.sendMessage(`Replaying Rods ${JSON.stringify(combinedRods)}`);
  }
}

function endReplay(player: any, tpStart: string, clearCommand: string) {
  system.runTimeout(() => {
    player.runCommandAsync(tpStart);
    player.runCommandAsync(clearCommand);
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
