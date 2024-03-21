// scripts/main.ts
import { world } from "@minecraft/server";
var overworld = world.getDimension("overworld");
function checkBlock(location, blockType) {
  const block = overworld.getBlock(location);
  if (!block) {
    world.sendMessage(`Block not found at ${location.x}, ${location.y}, ${location.z}`);
    return false;
  }
  const result = block.permutation.matches(blockType);
  world.sendMessage(`The block at ${location.x}, ${location.y}, ${location.z} is ${blockType}: ${result}`);
  return result;
}
world.afterEvents.buttonPush.subscribe((event) => {
  checkBlock({ x: -13, y: -60, z: 93 }, "prismarine");
});

//# sourceMappingURL=../debug/main.js.map
