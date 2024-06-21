import { world } from "@minecraft/server";
import { resetCuisenaireGame } from "./cuisenaireRods";
import { resetPotionGame } from "./potionGame";
import { resetWindowGame } from "./stainedGlassWindow";
import { closeGate } from "./gate";
let overworld = world.getDimension("overworld");
export function resetGame() {
    return __awaiter(this, void 0, void 0, function* () {
        //Reset the game areas
        yield overworld.runCommandAsync(`tp @p 30 96 106`);
        yield resetCuisenaireGame();
        yield overworld.runCommandAsync(`tp @p -10 97 143`);
        yield resetPotionGame();
        yield overworld.runCommandAsync(`tp @p 71 96 221`);
        yield resetWindowGame();
        //Reset the NPCs
        yield overworld.runCommandAsync(`tp @e[tag=fractionNpc] 57 88 148`);
        yield overworld.runCommandAsync(`tp @e[tag=scaleNpc] 57 88 148`);
        yield overworld.runCommandAsync(`tp @e[tag=ratioNpc] 57 88 148`);
        yield overworld.runCommandAsync(`tp @e[tag=spawnNpc] 63 97 146 facing 69 97 147`);
        yield overworld.runCommandAsync(`dialogue change @e[tag=spawnNpc] spawnNpc`);
        yield overworld.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc0`);
        yield overworld.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc0`);
        yield overworld.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc0`);
        //Close the gates
        yield closeGate("spawn");
        yield closeGate("scale");
        yield closeGate("ratio");
        yield closeGate("fraction");
        //Clean up the player
        yield overworld.runCommandAsync(`gamemode adventure @p`);
        yield overworld.runCommandAsync(`gamerule showcoordinates false`);
        yield overworld.runCommandAsync(`scoreboard objectives setdisplay sidebar`);
        yield overworld.runCommandAsync(`scoreboard players set Coins Depth 0`);
        yield overworld.runCommandAsync(`clear @p`);
        yield overworld.runCommandAsync(`effect @p clear`);
        yield overworld.runCommandAsync(`tp @p 69 97 147 facing 41 97 147`);
    });
}
//# sourceMappingURL=resetGame.js.map