import { system, world } from "@minecraft/server";
import { replay } from "./cuisenaireRods";
let overworld = world.getDimension("overworld");
//handles the scriptEventReceive from NPCs
system.afterEvents.scriptEventReceive.subscribe((event) => {
    switch (event.id) {
        case "rod:npcReplay": {
            replay(parseInt(event.message));
            break;
        }
        case "rod:npcComplete": {
            overworld.runCommandAsync(`tp @e[tag=rodNpc${event.message}] 26 96 107`);
            overworld.runCommandAsync(`scoreboard players add Saved Students 1`);
            overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${event.message}] rodNpc${event.message}Saved 
      `);
            break;
        }
    }
});
//# sourceMappingURL=npcscriptEventHandler.js.map