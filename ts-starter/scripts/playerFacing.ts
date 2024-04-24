import { Vector3 } from "@minecraft/server";

export async function facing(blockLocation: Vector3) {
  const xDiff = Math.abs(blockLocation.x);
  const zDiff = Math.abs(blockLocation.z);
  
  let direction;
  
  if (xDiff > zDiff) {
    direction = blockLocation.x > 0 ? "east" : "west";
  } else {
    direction = blockLocation.z > 0 ? "south" : "north";
  }

  const oppositeDirections: { [key: string]: string } = {
    "east": "west",
    "west": "east",
    "south": "north",
    "north": "south"
  };
  let oppositeDirection = oppositeDirections[direction];

  return {direction, oppositeDirection};
}