import { world, system, Player } from "@minecraft/server";

let overworld = world.getDimension("overworld");

const ratioMessage = [
  { message: "You should know, no one has \nwon my well game in 50 years.", step: 2 },
  {
    message: "The trick to getting the coins is to mix §astronger potions §fto the \n§acorrect ratios",
    step: 25,
  },
  {
    message: "You'll need to make §aNight Vision§f potion first.\nThen a strong §aBreathing§f potion to succeed.",
    step: 55,
  },
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
      world.sendMessage("scale moveNpc");
      //moveNpc(path, "scale", scaleMessage);
      break;
    }
    case "fraction": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: 57, y: 96, z: 116 },
        { x: 29, y: 96, z: 116 },
        { x: 29, y: 96, z: 111 },
        { x: 29, y: 96, z: 112 },
      ]);
      //moveNpc(path, "fraction", message);
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
  overworld.runCommandAsync(`dialogue change @e[tag=${type}Npc] ${type}Npc1`); // in motion dialogue
  for (let i = 0; i < path.length - 1; i++) {
    let { x, y, z } = path[i];
    const nextPoint = path[i + 1];
    const facingX = nextPoint.x;
    const facingY = nextPoint.y;
    const facingZ = nextPoint.z;
    system.runTimeout(async () => {
      await overworld.runCommandAsync(`tp @e[tag=${type}Npc] ${x} ${y} ${z} facing ${facingX} ${facingY} ${facingZ}`);
      const message = messages.find((msg) => msg.step === i);
      if (message) {
        // Send the message to the player
        overworld.runCommandAsync(`title @p actionbar ${message.message}`);
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
