import { system, world } from "@minecraft/server";
//handles the scriptEventReceive from NPCs
system.afterEvents.scriptEventReceive.subscribe((event) => {
    switch (event.id) {
        case "rod:npcReplay": {
            world.sendMessage(`Replay Version ${event.message}`);
            break;
        }
        case "rod:npcComplete": {
            world.sendMessage(`Complete Version ${event.message}`);
            break;
        }
    }
});
//# sourceMappingURL=npcscriptEventHandler.js.map