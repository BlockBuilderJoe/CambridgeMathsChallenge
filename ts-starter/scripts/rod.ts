import { BlockPermutation, world, Vector3} from "@minecraft/server";
import { ActionFormResponse } from "@minecraft/server-ui";

let overworld = world.getDimension("overworld");

export function cuisenaire(
  event: any,
  blockName: string,
  rodLength: number,
  successMessage: string,
  direction: string,
  rodsPlaced: any[]
) {
  if (event.block.permutation?.matches(blockName)) {
    let placeRods = true;
    overworld.runCommand("title @p actionbar " + successMessage);
    for (let i = 0; i < rodLength; i++) {
      //runs east to the rod length
      if (event.block[direction](i)?.permutation?.matches("sandstone") || event.block[direction](i)?.permutation?.matches("white_concrete") || event.block[direction](1)?.permutation?.getState("color") ) {
        world.sendMessage("It's gone over a whole rod length!");
        placeRods = false;
        break;
      }
    }
    if (placeRods) {
      rodsPlaced.push({location: event.block.location, direction: direction, rodLength: rodLength, blockName: blockName});
      for (let i = 0; i < rodLength; i++) {
          if (["east", "west", "north", "south"].includes(direction)) {
            event.block[direction](i)?.setPermutation(BlockPermutation.resolve(blockName));
          } else {
            throw new Error(`Invalid direction: ${direction}`);
          }
        }
      }
      else {
        event.block?.setPermutation(BlockPermutation.resolve("air"));
      
      }
  }
}

export async function getBlockBehind(event: any, oppositeDirection: string) {
  let hasColour = event.block[oppositeDirection](1)?.permutation?.getState("color");
  return hasColour;    
}

export async function replayRods(rodsPlaced: any[]){
  for (let i = 0; i < rodsPlaced.length; i++) {
    let rod = rodsPlaced[i];
    world.sendMessage(`Replaying rod ${rod.blockName} at ${rod.location.x} ${rod.location.y} ${rod.location.z} in direction ${rod.direction} for length ${rod.rodLength}`);
  }
}

export async function squareReset(location: Vector3, concreteColours: string[]) {
  for (let i = 0; i < concreteColours.length; i++) {
    let command = `fill ${location.x} ${location.y} ${location.z} ${location.x + 11} ${location.y} ${location.z + 11} tallgrass replace ${concreteColours[i]}_concrete`;
    overworld.runCommand(command);
  }
  overworld.runCommandAsync(`fill ${location.x} ${location.y - 1} ${location.z} ${location.x + 11} ${location.y - 1} ${location.z + 11} grass replace dirt`);
  overworld.runCommandAsync(`fill ${location.x} ${location.y} ${location.z} ${location.x + 11} ${location.y} ${location.z + 11} tallgrass replace air`);
}

export async function grid(location: Vector3) {
  let concreteColours = ["red", "green", "purple"];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let offset_x = location.x + i * 11;
      let offset_z = location.z + j * 11;
      const squareLocation = { x: offset_x, y: location.y, z: offset_z };
      await squareReset(squareLocation, concreteColours);
    }
  }
}