// scripts/main.ts
import { world, system } from "@minecraft/server";
function mainTick() {
  if (system.currentTick % 100 === 0) {
    world.sendMessage("Hello starter! Tick: " + system.currentTick);
    const block = world.getDimension("overworld").getBlock({ x: 1, y: 2, z: 3 });
    world.sendMessage(`Block Tags: ${block?.getTags()}`);
    world.sendMessage(`Block is dirt: ${block?.hasTag("dirt")}`);
    world.sendMessage(`Block is wood: ${block?.hasTag("wood")}`);
    world.sendMessage(`Block is stone: ${block?.hasTag("stone")}`);
  }
  system.run(mainTick);
}
system.run(mainTick);

//# sourceMappingURL=../debug/main.js.map
