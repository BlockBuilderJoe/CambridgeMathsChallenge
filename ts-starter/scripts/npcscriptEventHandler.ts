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
    case "spawnNPC": {
      if (event.message === "fraction") {
        world.sendMessage("Starting Fraction Game...");
      } else if (event.message === "ratio") {
        world.sendMessage("Starting Ratio Game...");
      } else if (event.message === "scale") {
        world.sendMessage("Starting Scale Game...");
      }
    }
  }
});
