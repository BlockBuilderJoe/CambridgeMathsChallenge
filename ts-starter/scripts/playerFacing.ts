import { Vector3 } from "@minecraft/server";

export async function facing(blockLocation: Vector3) {
  const xDiff = Math.abs(blockLocation.x);
  const zDiff = Math.abs(blockLocation.z);

  if (xDiff > zDiff) {
    return blockLocation.x > 0 ? "east" : "west";
  } else {
    return blockLocation.z > 0 ? "south" : "north";
  }
}
