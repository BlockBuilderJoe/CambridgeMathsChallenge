import { system, world } from "@minecraft/server";
import { replay } from "./cuisenaireRods";
import { perfectRun } from "./perfectRun";

let overworld = world.getDimension("overworld");
//handles the scriptEventReceive from NPCs
system.afterEvents.scriptEventReceive.subscribe((event) => {
  switch (event.id) {
    case "rod:npcReplay": {
      world.sendMessage(`Replay Version ${event.message}`);
      replay(parseInt(event.message));
      break;
    }
    case "rod:npcComplete": {
      overworld.runCommandAsync(`tp @e[type=npc,tag=npc${event.message}] 26 96 107`);
      break;
    }
  }
});
