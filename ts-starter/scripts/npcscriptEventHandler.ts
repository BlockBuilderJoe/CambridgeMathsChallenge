import { system, world } from "@minecraft/server";
import { moveNpc, replay, startCuisenaireGame, resetCuisenaireGame } from "./cuisenaireRods";
import { perfectRun } from "./perfectRun";
import { openGate, closeGate } from "./gate";
import { npcWalk } from "./npcWalk";
import { startWindowGame, resetWindowGame } from "./stainedGlassWindow";
import { startPotionGame, resetPotionGame } from "./potionGame";
import { resetGame } from "./resetGame";

let overworld = world.getDimension("overworld");
//handles the scriptEventReceive from NPCs
system.afterEvents.scriptEventReceive.subscribe(async (event) => {
  switch (event.id) {
    case "game:reset": {
      await resetGame();
      break;
    }
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
        overworld.runCommandAsync(`tp @e[tag=fractionNpc] 57 96 148 facing 66 96 148`);
        overworld.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
      } else if (event.message === "ratio") {
        overworld.runCommandAsync(`tp @e[tag=ratioNpc] 57 96 148 facing 66 96 148`);
        overworld.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
      } else if (event.message === "scale") {
        overworld.runCommandAsync(`tp @e[tag=scaleNpc] 57 96 148 facing 66 96 148`);
        overworld.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
      } else {
        world.sendMessage(`spawnNpc triggered with invalid message`);
      }
      break;
    }
    case "gate:open": {
      openGate(event.message);
      break;
    }
    case "gate:close": {
      closeGate(event.message);
      break;
    }
    case "scale:npc": {
      switch (event.message) {
        case "0": {
          openGate("scale");
          closeGate("ratio");
          closeGate("fraction");
          await npcWalk("scale");
          break;
        }
        case "1": {
          startWindowGame();
          break;
        }
      }
      break;
    }
    case "ratio:npc": {
      switch (event.message) {
        case "0": {
          openGate("ratio");
          closeGate("scale");
          closeGate("fraction");
          await npcWalk("ratio");
          break;
        }
        case "1": {
          startPotionGame();
          break;
        }
      }
      break;
    }
    case "fraction:npc": {
      switch (event.message) {
        case "0": {
          openGate("fraction");
          closeGate("scale");
          closeGate("ratio");
          await npcWalk("fraction");
          break;
        }
        case "1": {
          world.sendMessage("rods triggered");
          startCuisenaireGame();
          break;
        }
      }
      break;
    }
  }
});
