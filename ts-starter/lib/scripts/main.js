import { world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
world.beforeEvents.playerBreakBlock.subscribe((event) => {
    let block = event.block;
    let player = event.player;
    let grass = block.permutation.matches("prismarine");
    player.sendMessage('The block is grass ' + grass);
    player.sendMessage('The block type is ' + JSON.stringify(event));
});
//# sourceMappingURL=main.js.map