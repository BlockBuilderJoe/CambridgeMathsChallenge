
import { system, world } from "@minecraft/server";
import { replay } from "./rod"; 
import { perfectRun } from "./perfectRun";

//handles the scriptEventReceive from NPCs
system.afterEvents.scriptEventReceive.subscribe((event) => {
    switch (event.id) {
      case "rod:npcReplay": {
        replay(parseInt(event.message));
        break;
      }
      case "rod:npcComplete": {
        world.sendMessage(`Complete Version ${event.message}`);
        break;
      }
    }
  });
  
