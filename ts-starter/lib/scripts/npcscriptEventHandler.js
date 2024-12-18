import { system, world } from "@minecraft/server";
import { moveNpc, replay, startCuisenaireGame, movePlayerToCheckpoint, startCuisenaireTutorial, noReplay, } from "./cuisenaireRods";
import { openGate, closeGate } from "./gate";
import { npcWalk } from "./npcWalk";
import { nextWindow, giveGlass, startWindowTutorial, redoWindowGame } from "./stainedGlassWindow";
import { startPotionGame, giveIngredients } from "./potionGame";
import { resetGame } from "./resetGame";
import { giveWand } from "./wand";
import { startGraduation } from "./graduation";
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
        case "rod:noReplay": {
            noReplay(parseInt(event.message));
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
                    overworld.runCommandAsync(`clear @a`);
                    break;
                }
                case "1": {
                    startWindowTutorial();
                    break;
                }
                case "2": {
                    giveGlass();
                    break;
                }
                case `3`: {
                    overworld.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc3`);
                    nextWindow();
                    break;
                }
                case `4`: {
                    overworld.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc3`);
                    redoWindowGame();
                    break;
                }
                case `5`: {
                    overworld.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc9`);
                    overworld.runCommandAsync(`tp @p 6 96 230 facing 44 96 230`);
                    overworld.runCommandAsync(`tp @e[tag=scaleNpc] 44 96 230 facing 6 96 230`);
                    overworld.runCommandAsync(`clear @p`);
                    break;
                }
                case `6`: {
                    world.sendMessage(`Graduation ceremony coming soon!`);
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
                    yield overworld.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc3`);
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
        case "graduation:junior": {
            yield startGraduation("junior");
            break;
        }
        case "graduation:senior": {
            yield startGraduation("senior");
            break;
        }
        case "graduation:finale": {
            try {
                //if passes means they are running education
                yield overworld.runCommandAsync(`replaceitem entity @p slot.weapon.mainhand 0 portfolio`);
                yield overworld.runCommandAsync(`give @p camera`);
                finalChapter();
            }
            catch (error) {
                //running bedrock
                overworld.runCommandAsync(`function reset`);
            }
        }
    }
    if (event.id === "fraction:groundskeeper") {
        yield movePlayerToCheckpoint();
    }
}));
function finalChapter() {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync(`camera @p fade time 0.1 1 0.1`);
        yield overworld.runCommandAsync(`tp @p 27.83 96.00 182.98`);
        yield overworld.runCommandAsync(`tp @e[tag=spawnNpc] 63 97 146 facing 69 97 147`);
        yield openGate("scale1");
        yield openGate("scale2");
        yield overworld.runCommandAsync(`tp @p 69 97 147 facing 41 97 147`);
        yield overworld.runCommandAsync(`dialogue open @e[tag=spawnNpc] @p spawnNpc5`);
        yield overworld.runCommandAsync(`dialogue change @e[tag=spawnNpc] spawnNpc6`);
    });
}
//# sourceMappingURL=npcscriptEventHandler.js.map