// scripts/main.ts
import { world } from "@minecraft/server";
var overworld = world.getDimension("overworld");
world.beforeEvents.playerBreakBlock.subscribe(
  (event) => {
    let block = event.block;
    let player = event.player;
    let grass = block.permutation.matches("prismarine");
    player.sendMessage("The block is grass " + grass);
    player.sendMessage("The block type is " + JSON.stringify(event));
  }
);

//# sourceMappingURL=../debug/main.js.map
