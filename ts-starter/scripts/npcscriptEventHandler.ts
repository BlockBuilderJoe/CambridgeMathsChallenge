import { system, world } from "@minecraft/server";
import { moveNpc, replay } from "./cuisenaireRods";
import { perfectRun } from "./perfectRun";
import { openGate, closeGate } from "./gate";
import { npcWalk } from "./npcWalk";

let overworld = world.getDimension("overworld");
//handles the scriptEventReceive from NPCs
system.afterEvents.scriptEventReceive.subscribe(async (event) => {
  world.sendMessage(`scriptEventReceive triggered`);
  world.sendMessage(`event.id: ${event.id}`);
  world.sendMessage(`event.message: ${event.message}`);
  switch (`${event.id}`) {
    case "rod:npcReplay": {
      replay(parseInt(event.message));
      break;
    }
    case "rod:npcComplete": {
      moveNpc(parseInt(event.message));
      break;
    }
    case "spawn:npc": {
      world.sendMessage(`spawnNpc triggered`);
      openGate("spawn");
      if (event.message === "fraction") {
        overworld.runCommandAsync(`tp @e[tag=fractionNpc] 56 96 139`);
      } else if (event.message === "ratio") {
        overworld.runCommandAsync(`tp @e[tag=ratioNpc] 46 96 149`);
      } else if (event.message === "scale") {
        overworld.runCommandAsync(`tp @e[tag=scaleNpc] 59 96 156`);
      } else {
        world.sendMessage(`spawnNpc triggered with invalid message`);
      }
      break;
    }
    case "gate:open": {
      world.sendMessage(`openGate triggered`);
      openGate(event.message);
      break;
    }
    case "gate:close": {
      world.sendMessage(`closeGate triggered`);
      closeGate(event.message);
      break;
    }
    case "scale:npc": {
      world.sendMessage(`scale triggered`);
      switch (event.message) {
        case "0": {
          openGate("scale");
          closeGate("ratio");
          closeGate("fraction");
          await npcWalk("scale");
          break;
        }
      }
      break;
    }
    case "ratio:npc": {
      world.sendMessage(`ratio triggered`);
      switch (event.message) {
        case "0": {
          openGate("ratio");
          closeGate("scale");
          closeGate("fraction");
          break;
        }
      }
      break;
    }
    case "fraction:npc": {
      world.sendMessage(`fraction triggered`);
      switch (event.message) {
        case "0": {
          openGate("fraction");
          closeGate("scale");
          closeGate("ratio");
          break;
        }
      }
      break;
    }
  }
});
