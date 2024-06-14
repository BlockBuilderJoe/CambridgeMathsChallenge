import { system, world } from "@minecraft/server";
import { moveNpc, replay } from "./cuisenaireRods";
import { perfectRun } from "./perfectRun";
import { openGate, closeGate } from "./gate";

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
      openGate("spawn");
      if (event.message === "fraction") {
        overworld.runCommandAsync(`tp @e[tag=fractionNpc] 56 96 139`);
      } else if (event.message === "ratio") {
        overworld.runCommandAsync(`tp @e[tag=ratioNpc] 46 96 149`);
      } else if (event.message === "scale") {
        overworld.runCommandAsync(`tp @e[tag=scaleNpc] 59 96 156`);
      }
    }
    case "gate:open": {
      openGate(event.message);
    }
    case "gate:close": {
      closeGate(event.message);
    }
    case "scale:npc": {
      switch (event.message) {
        case "0": {
          openGate("scale");
          break;
        }
      }
    }
    case "ratio:npc": {
    }
    case "fraction:npc": {
    }
  }
});
