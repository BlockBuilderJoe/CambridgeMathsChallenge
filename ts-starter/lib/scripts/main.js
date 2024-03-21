import { world, system } from "@minecraft/server";
function mainTick() {
    if (system.currentTick % 100 === 0) {
        world.sendMessage("Hello starter! Tick: " + system.currentTick);
        // Fetch the block
        const block = world.getDimension("overworld").getBlock({ x: 1, y: 2, z: 3 });
        world.sendMessage(`Block Tags: ${block === null || block === void 0 ? void 0 : block.getTags()}`);
        world.sendMessage(`Block is dirt: ${block === null || block === void 0 ? void 0 : block.hasTag("dirt")}`);
        world.sendMessage(`Block is wood: ${block === null || block === void 0 ? void 0 : block.hasTag("wood")}`);
        world.sendMessage(`Block is stone: ${block === null || block === void 0 ? void 0 : block.hasTag("stone")}`);
    }
    system.run(mainTick);
}
system.run(mainTick);
//# sourceMappingURL=main.js.map