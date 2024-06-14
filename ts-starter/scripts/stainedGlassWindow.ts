import { world } from "@minecraft/server";
import { getCube } from "./input";
import { setBlock } from "./output";
import { getInput } from "./input";
import { Vector3 } from "@minecraft/server";
import { giveWand } from "./wand";

let overworld = world.getDimension("overworld");

export async function startWindowGame() {
  //sets up inventory
  overworld.runCommandAsync(`clear @p`);
  await giveWand();
  //window1 clear
  overworld.runCommandAsync(`fill 69 98 225 69 102 225 air replace`);
  //window2 clear
  overworld.runCommandAsync(`fill 78 98 225 80 98 225 air replace`);
  overworld.runCommandAsync(`fill 78 99 225 79 99 225 air replace`);
  overworld.runCommandAsync(`fill 78 100 225 78 100 225 air replace`);
  //replace the numerator with 0
  overworld.runCommandAsync(`setblock 71 98 225 blockbuilders:number_0`);
  overworld.runCommandAsync(`setblock 82 98 225 blockbuilders:number_0`);
  //clear the stained glass windows
  windowUndoHandler({ x: 71, y: 97, z: 225 });
  windowUndoHandler({ x: 82, y: 97, z: 225 });
}
export async function windowScaleHandler(location: Vector3) {
  switch (true) {
    case location.x === 71 && location.y === 97 && location.z === 225: {
      await windowUndo({ x: 67, y: 47, z: 218 }, { x: 80, y: 82, z: 218 }, { x: 67, y: 97, z: 218 });
      scale({ x: 69, y: 98, z: 225 }, { x: 69, y: 102, z: 225 }, { x: 71, y: 98, z: 225 });
      break;
    }
    case location.x === 82 && location.y === 97 && location.z === 225: {
      await windowUndo({ x: 75, y: 47, z: 218 }, { x: 107, y: 66, z: 218 }, { x: 75, y: 97, z: 218 });
      scale({ x: 78, y: 97, z: 225 }, { x: 80, y: 100, z: 225 }, { x: 82, y: 98, z: 225 });
      break;
    }
  }
}

export async function windowUndoHandler(location: Vector3) {
  giveGlass();
  switch (true) {
    case location.x === 71 && location.y === 97 && location.z === 225: {
      await windowUndo({ x: 67, y: 47, z: 218 }, { x: 80, y: 82, z: 218 }, { x: 67, y: 97, z: 218 });
      break;
    }
    case location.x === 82 && location.y === 97 && location.z === 225: {
      await windowUndo({ x: 75, y: 47, z: 218 }, { x: 107, y: 66, z: 218 }, { x: 75, y: 97, z: 218 });
      break;
    }
  }
}

export function giveGlass() {
  overworld.runCommand("replaceitem entity @p slot.hotbar 1 yellow_stained_glass 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 2 green_stained_glass 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 3 blue_stained_glass 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 4 purple_stained_glass 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 5 red_stained_glass 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 6 lime_stained_glass 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 7 black_stained_glass 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 8 brown_stained_glass 10");
}

export async function scale(cubePos1: Vector3, cubePos2: Vector3, inputNumber: Vector3) {
  //if it doesn't work make sure pos1 is the bottom left corner and pos2 is the top right corner
  const blocks = await getCube(cubePos1, cubePos2);
  let shape = [];
  let scaleFactor = getInput([inputNumber]);

  for (const block of blocks) {
    let colour = block.permutation?.getState(`color`);
    if (colour) {
      let location = { x: block.block?.x, y: block.block?.y, z: block.block?.z, colour: colour };
      shape.push(location);
    }
  }
  let scaledShape = await scaleShape(shape, scaleFactor, "yx");
  for (const block of scaledShape) {
    let offset_z = block.z - 7; //shifts the shape to the right
    let offset_x = block.x;
    let offset_y = block.y + 1;
    setBlock({ x: offset_x, y: offset_y, z: offset_z }, block.colour + "_stained_glass");
  }
}

export async function windowUndo(from: Vector3, to: Vector3, into: Vector3) {
  await overworld.runCommandAsync(
    `clone ${from.x} ${from.y} ${from.z} ${to.x} ${to.y} ${to.z} ${into.x} ${into.y} ${into.z} replace`
  ); //clones from below.
  await overworld.runCommandAsync(`fill ${from.x} 116 ${from.z} ${to.x} 120 ${to.z} air replace`);
  await overworld.runCommandAsync(`fill ${from.x} 120 ${from.z} ${to.x} 150 ${to.z} air replace`); //cleans any extra above
  //cleans any extra above
}

export async function scaleShape(shape: any, scaleFactor: any, axes: string) {
  const scaledShape = [];
  // Find the minimum coordinates to use as the base point of the shape
  const basePoint = shape.reduce(
    (min: any, block: any) => ({
      x: Math.min(min.x, block.x),
      y: Math.min(min.y, block.y),
      z: Math.min(min.z, block.z),
    }),
    shape[0]
  );

  for (const block of shape) {
    // Calculate the relative position of the block within the shape
    const relativePos = {
      x: block.x - basePoint.x,
      y: block.y - basePoint.y,
      z: block.z - basePoint.z,
    };

    // Scale the relative position
    for (let i = axes.includes("x") ? 0 : scaleFactor - 1; i < scaleFactor; i++) {
      for (let j = axes.includes("y") ? 0 : scaleFactor - 1; j < scaleFactor; j++) {
        for (let k = axes.includes("z") ? 0 : scaleFactor - 1; k < scaleFactor; k++) {
          // Add the scaled relative position to the base point
          const scaledBlock = {
            x: basePoint.x + (axes.includes("x") ? relativePos.x * scaleFactor + i : relativePos.x),
            y: basePoint.y + (axes.includes("y") ? relativePos.y * scaleFactor + j : relativePos.y),
            z: basePoint.z + (axes.includes("z") ? relativePos.z * scaleFactor + k : relativePos.z),
            colour: block.colour,
          };
          scaledShape.push(scaledBlock);
        }
      }
    }
  }
  return scaledShape;
}
