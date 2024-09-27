import { world, system, Player } from "@minecraft/server";

let overworld = world.getDimension("overworld");

const ratioMessage = [
  { message: `[{"translate":"actionbar.npcWalk.ratioMessage.0.0"},{"text":"\n"},{"translate":"actionbar.npcWalk.ratioMessage.0.1"}]`, step: 0 },
  {
    message: `[{"translate":"actionbar.npcWalk.ratioMessage.1.0"},{"text":"\n"},{"translate":"actionbar.npcWalk.ratioMessage.1.1"}]`,
    step: 18,
  },
  {
    message: `[{"translate":"actionbar.npcWalk.ratioMessage.2.0"},{"text":"\n"},{"translate":"actionbar.npcWalk.ratioMessage.2.1"}]`,
    step: 38,
  },
];

const fractionMessage = [
  { message: `[{"translate":"actionbar.npcWalk.fractionMessage.0.0"},{"text":"\n"},{"translate":"actionbar.npcWalk.fractionMessage.0.1"}]`, step: 0 },
  { message: `[{"translate":"actionbar.npcWalk.fractionMessage.1.0"},{"text":"\n"},{"translate":"actionbar.npcWalk.fractionMessage.1.1"}]`, step: 25 },
  {
    message: `[{"translate":"actionbar.npcWalk.fractionMessage.2.0"},{"text":"\n"},{"translate":"actionbar.npcWalk.fractionMessage.2.1"}]`,
    step: 45,
  },
];

const scaleMessage = [
  { message: `[{"translate":"actionbar.npcWalk.scaleMessage.0.0"},{"text":"\n"},{"translate":"actionbar.npcWalk.scaleMessage.0.1"}]`, step: 0 },
  {
    message:
      `[{"translate":"actionbar.npcWalk.scaleMessage.1.0"},{"text":"\n"},{"translate":"actionbar.npcWalk.scaleMessage.1.1"}]`,
    step: 25,
  },
  { message: `[{"translate":"actionbar.npcWalk.scaleMessage.2.0"},{"text":"\n"},{"translate":"actionbar.npcWalk.scaleMessage.2.1"}]`, step: 50 },
];
export async function npcWalk(type: string) {
  switch (type) {
    case "scale": {
      let path = await generatePath([
        { x: 57, y: 96, z: 148 },
        { x: 57, y: 96, z: 182 },
        { x: 40, y: 96, z: 182 },
        { x: 40, y: 96, z: 186 },
        { x: 40, y: 97, z: 188 },
        { x: 40, y: 98, z: 189 },
        { x: 40, y: 98, z: 191 },
        { x: 40, y: 98, z: 195 },
        { x: 42, y: 98, z: 195 },
        { x: 42, y: 98, z: 197 },
        { x: 42, y: 98, z: 196 },
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
        { x: -3, y: 96, z: 148 },
        { x: -3, y: 96, z: 141 },
        { x: -3, y: 96, z: 142 },
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
        overworld.runCommandAsync(`titleraw @p actionbar {"rawtext": ${message}}`);
      }
      if (path.length - 2 == i) {
        // final point.
        await overworld.runCommandAsync(`dialogue open @e[tag=${type}Npc] @p ${type}Npc2`); // end of walk dialogue
        if (type == "ratio"){
          await overworld.runCommandAsync(`dialogue change @e[tag=${type}Npc] ${type}Npc2`);
        }
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
