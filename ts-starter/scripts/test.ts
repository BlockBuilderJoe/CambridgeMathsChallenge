import { world  } from "@minecraft/server";
import { getCube } from "./input";
import { scaleShape } from "./scaler";
import { setBlock } from "./output";
import { getInput } from "./input";

let overworld = world.getDimension("overworld");
export async function test() {
  overworld.runCommandAsync("fill 6 -60 122 39 -35 154 air");
  overworld.runCommandAsync("fill 6 -35 122 39 -30 154 air");
  const blocks = await getCube({x: 8, y: -60, z: 119}, {x: 10, y: -57, z: 121});
  let shape = []
  let scaleFactor = getInput([{x: 6, y: -58, z: 116}]);

  for (const block of blocks) {
    if (block.permutation?.matches("white_concrete")) {
      let location = {x: block.block?.x, y: block.block?.y, z: block.block?.z};
      shape.push(location);
    }
  }
  let scaledShape = await scaleShape(shape, scaleFactor);
  for (const block of scaledShape) {
    let scaledz = block.z + 6; //shifts the shape to the right
    setBlock({x: block.x, y: block.y, z: scaledz}, "white_concrete")
  }
}