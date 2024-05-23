import { world } from "@minecraft/server";
export function rodNpcDialogue(event) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (event) {
            case "rod:npc1_correct": {
                world.sendMessage("You are correct! You may proceed to the next NPC.");
                break;
            }
            case "rod:npc1_incorrect": {
                world.sendMessage("You are incorrect! Please try again.");
            }
        }
    });
}
//# sourceMappingURL=npcDialogueHandler.js.map