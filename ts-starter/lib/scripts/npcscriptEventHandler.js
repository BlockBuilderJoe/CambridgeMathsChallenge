import { system, world } from "@minecraft/server";
import { moveNpc, replay } from "./cuisenaireRods";
import { openGates } from "./spawn";
let overworld = world.getDimension("overworld");
//handles the scriptEventReceive from NPCs
system.afterEvents.scriptEventReceive.subscribe((event) => {
    world.sendMessage(`${event.message}, ${event.id}`);
    switch (event.id) {
        case "rod:npcReplay": {
            replay(parseInt(event.message));
            break;
        }
        case "rod:npcComplete": {
            moveNpc(parseInt(event.message));
            break;
        }
        case "spawn:npc": {
            openGates("spawn");
            if (event.message === "fraction") {
                overworld.runCommandAsync(`tp @e[tag=fractionNpc] 56 96 139`);
            }
            else if (event.message === "ratio") {
                overworld.runCommandAsync(`tp @e[tag=ratioNpc] 46 96 149`);
            }
            else if (event.message === "scale") {
                overworld.runCommandAsync(`tp @e[tag=scaleNpc] 59 96 156`);
            }
        }
    }
});
//# sourceMappingURL=npcscriptEventHandler.js.map