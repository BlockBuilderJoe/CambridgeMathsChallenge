import { system, world } from "@minecraft/server";
import { moveNpc, replay, startCuisenaireGame, movePlayerToCheckpoint, startCuisenaireTutorial, } from "./cuisenaireRods";
import { openGate, closeGate } from "./gate";
import { npcWalk } from "./npcWalk";
import { startWindowGame, giveGlass } from "./stainedGlassWindow";
import { startPotionGame, giveIngredients } from "./potionGame";
import { resetGame } from "./resetGame";
import { giveWand } from "./wand";
let overworld = world.getDimension("overworld");
//handles the scriptEventReceive from NPCs
system.afterEvents.scriptEventReceive.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    switch (event.id) {
        case "game:reset": {
            yield resetGame();
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
                overworld.runCommandAsync(`tp @e[tag=fractionNpc] 57 96 148 facing 66 97 148`);
                overworld.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
            }
            else if (event.message === "ratio") {
                overworld.runCommandAsync(`tp @e[tag=ratioNpc] 57 96 148 facing 66 97 148`);
                overworld.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
            }
            else if (event.message === "scale") {
                overworld.runCommandAsync(`tp @e[tag=scaleNpc] 57 96 148 facing 66 97 148`);
                overworld.runCommandAsync(`tp @e[tag=spawnNpc] 63 92 146`);
            }
            else {
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
                    yield npcWalk("scale");
                    break;
                }
                case "1": {
                    overworld.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc3`);
                    startWindowGame();
                    break;
                }
                case "2": {
                    giveGlass();
                    break;
                }
            }
            break;
        }
        case "ratio:npc": {
            switch (event.message) {
                // guide to the game - walk at the beginning.
                case "0": {
                    openGate("ratio");
                    closeGate("scale");
                    closeGate("fraction");
                    yield npcWalk("ratio");
                    break;
                }
                // start of main game.
                case "1": {
                    overworld.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc3`);
                    startPotionGame();
                    break;
                }
                // player asks for ingredients.
                case "2": {
                    yield giveIngredients();
                    break;
                }
                // start of tutorial mode.
                case "3": {
                    giveWand();
                    overworld.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc2`);
                    overworld.runCommand("replaceitem entity @p slot.hotbar 1 cocoa_beans 2");
                    overworld.runCommand("replaceitem entity @p slot.hotbar 2 milk_bucket 1");
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
                    yield npcWalk("fraction");
                    break;
                }
                case "1": {
                    yield startCuisenaireTutorial();
                    overworld.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc3`);
                    break;
                }
                case "2": {
                    overworld.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc3`);
                    yield startCuisenaireGame();
                    break;
                }
            }
            break;
        }
    }
    if (event.id === "fraction:groundskeeper") {
        yield movePlayerToCheckpoint();
    }
}));
//# sourceMappingURL=npcscriptEventHandler.js.map