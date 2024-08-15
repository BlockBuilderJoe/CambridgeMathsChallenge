import { world, system } from "@minecraft/server";
import { getCube } from "./input";
import { setBlock } from "./output";
import { getInput } from "./input";
import { Vector3 } from "@minecraft/server";
import { giveWand } from "./wand";

let overworld = world.getDimension("overworld");

const windows = [
  {
    pos1: { x: 46, y: 98, z: 192 },
    pos2: { x: 41, y: 107, z: 192 },
    numerator: { x: 40, y: 100, z: 197 },
    cloneFrom: { x: 50, y: 10, z: 219 },
    cloneTo: { x: -6, y: 36, z: 219 },
    cloneInto: { x: -6, y: 96, z: 219 },
    scaledLeftCorner: { x: 46, y: 98, z: 219 }, //Bottom left corner of the scaled window.
    correctNumerator: 1,
  },
  {
    pos1: { x: 77, y: 97, z: 227 },
    pos2: { x: 77, y: 100, z: 224 },
    numerator: { x: 82, y: 98, z: 225 },
    cloneFrom: { x: 75, y: 47, z: 218 },
    cloneTo: { x: 107, y: 66, z: 218 },
    cloneInto: { x: 75, y: 97, z: 218 },
    scaledLeftCorner: { x: 78, y: 99, z: 218 }, //Bottom left corner of the scaled window.
  },
];

export async function getWindowIndex() {
  let orb = overworld.getEntities({
    tags: ["orb"],
  });
  let windowTag = orb[0].getTags()[1];
  let windowNumber = parseInt(windowTag.substring(6));
  if (windowNumber >= 0) {
    return windowNumber;
  }
}

export async function redoWindowGame() {
  let windowIndex = await getWindowIndex();
  world.sendMessage(`${windowIndex}`);
  if (typeof windowIndex === "number") {
    let player = overworld.getPlayers()[0];
    player.runCommandAsync(`tp @p ~ ~ 190`); //moves the player in front of the window design.
    await windowUndo(windows[windowIndex].cloneFrom, windows[windowIndex].cloneTo, windows[windowIndex].cloneInto);
    await giveWand();
    giveGlass();
  }
}
export async function resetWindowGame() {
  //resets the orb.
  overworld.runCommandAsync(`tp @e[tag=orb] 44 98 197`);
  overworld.runCommandAsync(`tag @e[tag=orb] add window0`);
  overworld.runCommandAsync(`tag @e[tag=orb] remove window1`);
  overworld.runCommandAsync(`tag @e[tag=orb] remove window2`);
  overworld.runCommandAsync(`tag @e[tag=orb] remove window3`);
  overworld.runCommandAsync(`tag @e[tag=orb] remove window4`);
  overworld.runCommandAsync(`tag @e[tag=orb] remove window5`);
  overworld.runCommandAsync(
    `setblock ${windows[0].numerator.x} ${windows[0].numerator.y} ${windows[0].numerator.z} blockbuilders:number_0`
  );
  for (let i = 1; i < windows.length; i++) {
    const window = windows[i];
    overworld.runCommandAsync(
      `setblock ${window.numerator.x} ${window.numerator.y} ${window.numerator.z} blockbuilders:number_0`
    );
    let colours = ["yellow", "green", "blue", "purple", "red", "lime", "black", "brown"];
    for (const colour in colours) {
      overworld.runCommandAsync(
        `fill ${window.pos1.x} ${window.pos1.y} ${window.pos1.z} ${window.pos2.x} ${window.pos2.y} ${window.pos2.z} air replace ${colours[colour]}_stained_glass`
      );
    }
  }
  windowUndo(windows[0].cloneTo, windows[0].cloneFrom, windows[0].cloneInto);
}
export async function startWindowTutorial() {
  overworld.runCommandAsync(`clear @p`);
  await giveWand();
}

export async function startWindowGame() {
  overworld.runCommandAsync(`clear @p`);
  await giveWand();
  giveGlass();
}

export async function guildMasterCheck(windowIndex: number) {
  const window = windows[windowIndex]; //gets the correct window.
  let numerator = getInput([{ x: window.numerator.x, y: window.numerator.y, z: window.numerator.z }]);
  if (numerator === window.correctNumerator) {
    system.runTimeout(() => {
      overworld.runCommand(`dialogue open @e[tag=scaleNpc] @p scaleNpc5`);
    }, 30);
  } else if (numerator === 0) {
    system.runTimeout(() => {
      overworld.runCommand(`title @p actionbar The window has been scaled by 0.`);
    }, 30);
  } else {
    system.runTimeout(() => {
      overworld.runCommand(`dialogue open @e[tag=scaleNpc] @p scaleNpc6`);
    }, 30);
  }
}

export async function windowScaleHandler(windowIndex: number) {
  const window = windows[windowIndex]; //gets the correct window.
  await windowUndo(window.cloneTo, window.cloneFrom, window.cloneInto);
  scale(window.pos1, window.pos2, window.numerator, window.scaledLeftCorner);

  guildMasterCheck(windowIndex);
}

export async function windowUndoHandler(location: Vector3) {
  giveGlass();
  switch (true) {
    case location.x === 71 && location.y === 97 && location.z === 225: {
      await windowUndo({ x: 67, y: 47, z: 218 }, { x: 76, y: 82, z: 218 }, { x: 67, y: 97, z: 218 });
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

export async function scale(cubePos1: Vector3, cubePos2: Vector3, inputNumber: Vector3, scaledLeftCorner: Vector3) {
  //if it doesn't work make sure pos1 is the bottom left corner and pos2 is the top right corner
  const blocks = await getCube(cubePos1, cubePos2);
  let shape = [];
  let scaleFactor = getInput([inputNumber]);
  for (const block of blocks) {
    let colour = block.permutation?.getState(`color`);
    if (colour) {
      if (block.block) {
        let offset_x = block.block.x - cubePos1.x; //x axis shouldn't change
        let offset_y = block.block.y - cubePos1.y; // cube pos will always be larger than block pos
        let offset_z = cubePos1.z - block.block.z; // cube pos will always be smaller than block pos
        let finalWindow_x = scaledLeftCorner.x - offset_x; //swapped x and z if you want to change axis it places.
        let finalWindow_y = scaledLeftCorner.y + offset_y;
        let finalWindow_z = scaledLeftCorner.z + offset_z;
        let location = { x: finalWindow_x, y: finalWindow_y, z: finalWindow_z, colour: colour };
        shape.push(location);
      }
    }
  }
  let scaledShape = await scaleShape(shape, scaleFactor, "yx");
  for (const block of scaledShape) {
    setBlock({ x: block.x, y: block.y, z: block.z }, block.colour + "_stained_glass");
  }
}

export async function windowUndo(from: Vector3, to: Vector3, into: Vector3) {
  await overworld.runCommandAsync(
    `clone ${from.x} ${from.y} ${from.z} ${to.x} ${to.y} ${to.z} ${into.x} ${into.y} ${into.z} replace`
  ); //clones from below.
  await overworld.runCommandAsync(`fill ${from.x} 116 ${from.z} ${to.x} 120 ${to.z} air replace`);
  await overworld.runCommandAsync(`fill ${from.x} 120 ${from.z} ${to.x} 150 ${to.z} air replace`);
  await overworld.runCommandAsync(`fill ${from.x} 150 ${from.z} ${to.x} 172 ${to.z} air replace`); //cleans any extra above
  //cleans any extra above
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
            x: basePoint.x - (axes.includes("x") ? relativePos.x * scaleFactor + i : relativePos.x),
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
