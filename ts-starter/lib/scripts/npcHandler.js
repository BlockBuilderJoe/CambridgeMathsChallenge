import { system, world } from "@minecraft/server";
//handles the scriptEventReceive from NPCs
system.afterEvents.scriptEventReceive.subscribe((event) => {
    switch (event.id) {
        case "game1:npc1_correct": {
            world.sendMessage("You are correct! You may proceed to the next NPC.");
            break;
        }
        case "game1:npc1_incorrect": {
            world.sendMessage("You are incorrect! Please try again.");
        }
    }
});
//# sourceMappingURL=npcHandler.js.map