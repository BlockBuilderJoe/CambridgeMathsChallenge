import { world, system, Player } from "@minecraft/server";

let overworld = world.getDimension("overworld");

const ratioMessage = [
  { message: "You should know, no one has \nwon my well game in 50 years.", step: 0 },
  {
    message: "The trick to getting the coins is to mix §astronger potions §fto the \n§acorrect ratios.",
    step: 18,
  },
  {
    message: "You'll need to make a §aNight Vision§f potion first.\nThen a strong §aBreathing§f potion to succeed.",
    step: 38,
  },
];

const fractionMessage = [
  { message: "You can't jump or step on the grass in the gardens.\nYou'll be told off if you do!", step: 0 },
  { message: "I'll give you magical rods that you can cross the gardens with.", step: 25 },
  { message: "The gardens are 24x24 blocks wide.\nEach student is a different fraction away.", step: 45 },
];

const scaleMessage = [
  { message: "You'll need to change the numerator (the top number) \nto scale the windows.", step: 0 },
  {
    message:
      "To make the window larger you'll need to make the \nnumerator larger than the denominator (bottom number).",
    step: 25,
  },
  { message: "The windows must fit in the frame!\nSo make sure you don't make the window too big.", step: 50 },
];
export async function npcWalk(type: string) {
  switch (type) {
    case "scale": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: 57, y: 96, z: 221 },
        { x: 72, y: 96, z: 221 },
        { x: 72, y: 96, z: 226 },
      ]);
      moveNpc(path, "scale", scaleMessage);
      break;
    }
    case "fraction": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: 57, y: 96, z: 116 },
        { x: 29, y: 96, z: 116 },
        { x: 29, y: 96, z: 112 },
        { x: 29, y: 96, z: 113 },
      ]);
      moveNpc(path, "fraction", fractionMessage);
      break;
    }
    case "ratio": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: -2, y: 96, z: 148 },
        { x: -2, y: 96, z: 153 },
        { x: -2, y: 96, z: 152 },
      ]);
      moveNpc(path, "ratio", ratioMessage);
      break;
    }
  }
}

async function moveNpc(
  path: { x: number; y: number; z: number }[],
  type: string,
  messages: { message: string; step: number }[]
) {
  let message = "";
  overworld.runCommandAsync(`dialogue change @e[tag=${type}Npc] ${type}Npc1`); // in motion dialogue
  for (let i = 0; i < path.length - 1; i++) {
    let { x, y, z } = path[i];
    const nextPoint = path[i + 1];
    const facingX = nextPoint.x;
    const facingY = nextPoint.y;
    const facingZ = nextPoint.z;
    system.runTimeout(async () => {
      await overworld.runCommandAsync(`tp @e[tag=${type}Npc] ${x} ${y} ${z} facing ${facingX} ${facingY} ${facingZ}`);
      const messageMatch = messages.find((msg) => msg.step === i);
      if (messageMatch) {
        message = messageMatch.message;
      }
      if (message) {
        overworld.runCommandAsync(`title @p actionbar ${message}`);
      }
      if (path.length - 2 == i) {
        // final point.
        await overworld.runCommandAsync(`dialogue open @e[tag=${type}Npc] @p ${type}Npc2`); // end of walk dialogue
      }
    }, i * 5);
  }
}

async function generatePath(
  path: { x: number; y: number; z: number }[]
): Promise<{ x: number; y: number; z: number }[]> {
  const generatedPath: { x: number; y: number; z: number }[] = [];

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
