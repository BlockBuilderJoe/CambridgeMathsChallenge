import { system, world } from "@minecraft/server";
import { replay } from "./cuisenaireRods";
import { perfectRun } from "./perfectRun";

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
      overworld.runCommandAsync(`tp @e[tag=rodNpc${event.message}] 26 96 107`);
      overworld.runCommandAsync(`scoreboard players add Saved Students 1`);
      overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${event.message}] rodNpc${event.message}Saved 
      `);
      break;
    }
    case "spawn:npc": {
      if (event.message === "fraction") {
        overworld.runCommandAsync(`tp @e[tag=fractionNpc] 56 96 139`);
      } else if (event.message === "ratio") {
        overworld.runCommandAsync(`tp @e[tag=ratioNpc] 46 96 149`);
      } else if (event.message === "scale") {
        overworld.runCommandAsync(`tp @e[tag=scaleNpc] 59 96 156`);
      }
    }
  }
});
