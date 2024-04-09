import { world  } from "@minecraft/server";
import { getCube } from "./input";

export async function test() {
  world.sendMessage("This is a test");
  const blocks = await getCube({x: 8, y: -60, z: 118}, {x: 10, y: -57, z: 120});
  let shape = []
  for (const block of blocks) {
    if (block.permutation?.matches("white_concrete")) {
      let location = {x: block.block?.x, y: block.block?.y, z: block.block?.z};
      world.sendMessage("white_concrete at " + block.block?.x + "," + block.block?.y + "," + block.block?.z);
      shape.push(location);
    }
  }
}
