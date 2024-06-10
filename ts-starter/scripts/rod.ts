import {
  BlockPermutation,
  world,
  system,
  Vector3,
  Player,
  EntityInventoryComponent,
  EquipmentSlot,
  EntityItemComponent,
  PressurePlatePopAfterEvent,
} from "@minecraft/server";
import { roundToDigits } from "./numberHandler";
import { perfectRun, validRanges, finalBlock, replaySettings } from "./perfectRun";

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

export async function moveNPC(index:number){
  overworld.runCommandAsync(`tp @e[type=npc,tag=npc${index}] 26 96 107`);
  overworld.runCommandAsync('scoreboard players @p Students 1')
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
    overworld.runCommand(`title @p actionbar ${successMessage} placed`);
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
      let rodToPlace = { location: block.location, direction: direction, rodLength: rodLength, blockName: blockName, successMessage: successMessage };
      rodsPlaced.push(rodToPlace);
      placeRods(block, blockName, rodLength, direction);
      checkFinalBlock()
    } else {
      block?.setPermutation(BlockPermutation.resolve("tallgrass"));
    }
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
    }
  } else {
    throw new Error(`Invalid direction: ${direction}`);
  }
}

async function setCameraView(player: any, index: number) {
  if (index == 0 || index == 1) {//room1
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 30 120 92 facing 30 90 92`);
  } else if (index == 2 || index == 3 || index == 4 ) {//room2
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 55 120 92 facing 55 90 92`);
  } else if (index == 5) {//room3
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 93 120 92 facing 93 90 92`);
    } else if (index == 6 || index == 7 || index == 8 || index == 9) {//room4
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos 105 120 92 facing 105 90 92`);
  } else if (index == 10 || index == 11 || index == 12) {//room4
    player.runCommandAsync(`camera ${player.name} set minecraft:free pos -39 120 44 facing -39 94 44`);
  }
}

export async function getBlockBehind(event: any, oppositeDirection: string) {
  let hasColour = event.block[oppositeDirection](1)?.permutation?.getState("color");
  return hasColour;
}

async function replayMessage(beginningMessage: string, fractions: any []) {
  if (fractions){
    if (fractions.length > 0) {
      const playerPlacedFractions = fractions.filter(fraction => fraction !== undefined && fraction.startsWith("1")); // filters out the fractions
      const perfectRunFractions = fractions.filter(fraction => fraction !== undefined && !fraction.startsWith("1")); //filters out the fractions
      if (perfectRunFractions.length > 0) { //if you've reached the end of the list
        const perfectRunFractionsSum = perfectRunFractions.join(" + ");
        overworld.runCommandAsync(`title @p actionbar ${perfectRunFractionsSum}`);
      } else if (playerPlacedFractions.length > 0) { //else if there are fractions print them
        const fractionsSum = playerPlacedFractions.join(" + ");
        overworld.runCommandAsync(`title @p actionbar ${beginningMessage} ${fractionsSum}`);
      }
    }
  } else {
    world.sendMessage(`Error: No fractions found`);
  }
}

export async function replay(index: number) {
  giveRods();
  overworld.runCommandAsync(`tp @p 31 96 116`); //moves the player out of frame.
  let npcIndex = index;
  let fractions: any[] = []
  let combinedRods: any[] = [];
  let replayConfig = replaySettings[index]; //stores all the replay settings for the different rods.
  overworld.runCommandAsync(replayConfig.clearBlock);
  overworld.runCommandAsync(replayConfig.replenishGrass);

  if (replayConfig.cartesianDirection === 'x') {

    let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location.x === replayConfig.cartesionValue);
    rodsPlaced = rodsPlaced.filter((rod) => !(rod.location && rod.location.x === replayConfig.cartesionValue));
    let perfectRunToReplay = perfectRun.filter((rod) => rod.location && rod.location.x === replayConfig.cartesionValue); //ISSUE appears to be here
    //if (perfectRunToReplay.length > 1) {
      //perfectRunToReplay = perfectRunToReplay.slice(0, -1); //gets the last one so you don't have a bunch of them appearing.
    //}
    combinedRods = rodsPlacedToReplay.concat(perfectRunToReplay);

  } else if (replayConfig.cartesianDirection === 'z'){
      let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location.z === replayConfig.cartesionValue);
      rodsPlaced = rodsPlaced.filter((rod) => !(rod.location && rod.location.z === replayConfig.cartesionValue));
      let perfectRunToReplay = perfectRun.filter((rod) => rod.location && rod.location.z === replayConfig.cartesionValue);
      //if (perfectRunToReplay.length > 1) {
        //perfectRunToReplay = perfectRunToReplay.slice(0, -1); //gets the last one so you don't have a bunch of them appearing.
      //}
      combinedRods = rodsPlacedToReplay.concat(perfectRunToReplay);
  }
  if (combinedRods.length > 0) {
    for (let i = 0; i < combinedRods.length; i++)  {
      ((index) => {
        system.runTimeout(async () => {
          let x = combinedRods[index].location.x;
          world.getAllPlayers().forEach(async (player) => {
            await setCameraView(player, npcIndex);
            fractions.push(combinedRods[index].successMessage); 
            await replayMessage(replayConfig.beginningMessage, fractions);
            let block = overworld.getBlock(combinedRods[index].location);
            placeRods(block, combinedRods[index].blockName, combinedRods[index].rodLength, combinedRods[index].direction);
            if (i === combinedRods.length - 1) {
              //resets the camera 2 seconds after last rod placed.
              endReplay(player, replayConfig.tpStart, replayConfig.clearBlock, replayConfig.replenishGrass, combinedRods);
            }
          });
        }, 50 * index);
        return;
      })(i);
  }
}

}

function endReplay(player: any, tpStart: string, clearCommand: string, replenishGrass: string, combinedRods: any[]) {
  system.runTimeout(() => {
    player.runCommandAsync(tpStart);
    player.runCommandAsync(clearCommand);
    player.runCommandAsync(replenishGrass);
    player.runCommandAsync(`camera ${player.name} clear`);
    combinedRods = []; //clears the combined rods to stop looping values
  }, 50);
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

export async function giveRods() {
  let rods = [
    { block: "red_concrete", amount: 2 },
    { block: "lime_concrete", amount: 1 },
    { block: "purple_concrete", amount: 2 },
    { block: "green_concrete", amount: 2 },
    { block: "brown_concrete", amount: 3 },
    { block: "yellow_concrete", amount: 1 },
    { block: "blue_concrete", amount: 2 },
  ];
  overworld.runCommandAsync(`clear @p`);
  overworld.runCommandAsync(`gamemode adventure`);
  for (let i = 0; i < rods.length; i++) {
    overworld.runCommandAsync(
      `give @p ${rods[i].block} ${rods[i].amount} 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`
    );
  }
}

async function checkFinalBlock(){
  for (let i = 0; i < finalBlock.length; i++){
    let rodEnd = overworld.getBlock(finalBlock[i].location);
    let hasColour = rodEnd?.permutation?.getState("color");
    if (rodEnd?.permutation?.matches(finalBlock[i].blockName)){
      changeNPC(i, true);
    } else if (hasColour){
      changeNPC(i, false);
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
