import { setBlock } from "./output";
import { Vector3, world } from "@minecraft/server";

let overworld = world.getDimension("overworld");

export async function square(location: Vector3) {
  overworld.runCommandAsync(
    "fill " +
      location.x +
      " " +
      location.y +
      " " +
      location.z +
      " " +
      (location.x + 11) +
      " " +
      location.y +
      " " +
      (location.z + 11) +
      " " +
      "sandstone"
  );
  overworld.runCommandAsync(
    "fill " +
      (location.x + 1) +
      " " +
      location.y +
      " " +
      (location.z + 1) +
      " " +
      (location.x + 10) +
      " " +
      location.y +
      " " +
      (location.z + 10) +
      " " +
      "grass replace"
  );
  overworld.runCommandAsync(
    "fill " +
      (location.x + 1) +
      " " +
      (location.y + 1) +
      " " +
      (location.z + 1) +
      " " +
      (location.x + 10) +
      " " +
      (location.y + 1) +
      " " +
      (location.z + 10) +
      " " +
      "tallgrass replace concrete"
  );
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
