import { system, world } from "@minecraft/server";
import { startFlythrough } from "./flythroughs";
let overworld = world.getDimension("overworld");
export function startGraduation(level) {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync(`camera @p fade time 0.1 4 0.2`);
        yield overworld.runCommandAsync(`clear @p`);
        yield overworld.runCommandAsync(`tp @p -16.95 94.06 133.80`);
        yield overworld.runCommandAsync(`replaceitem entity @p slot.armor.head 0 blockbuilders:mortar_board`);
        yield overworld.runCommandAsync(`tp @e[tag=spawnNpc] -103.02 96.06 142.69 facing -104 96 134`);
        yield overworld.runCommandAsync(`tp @e[tag=fractionNpc] -107.49 96.00 138.56 facing -101.49 96.00 138.56`);
        yield overworld.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc9`);
        yield overworld.runCommandAsync(`tp @e[tag=ratioNpc] -107.39 96.00 140.05 facing -101.39 96.00 140.05`);
        yield overworld.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc11`);
        yield overworld.runCommandAsync(`tp @e[tag=scaleNpc] -107.31 96.00 141.96 facing -101.31 96.00 141.96`);
        yield overworld.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc16`);
        if (level == "junior") {
            overworld.runCommandAsync(`fill -16.30 94.06 137.54 -96.95 94.06 131.43 green_carpet replace purple_carpet`);
            overworld.runCommandAsync(`fill -16.30 94.06 137.54 -96.95 94.06 131.43 yellow_carpet replace red_carpet`);
            overworld.runCommandAsync(`fill -96 96 157 -107 96 107 green_carpet replace purple_carpet`);
            overworld.runCommandAsync(`fill -96 96 157 -107 96 107 yellow_carpet replace red_carpet`);
            overworld.runCommandAsync(`fill -95 94 109 25 94 131 yellow_carpet replace red_carpet`);
            overworld.runCommandAsync(`fill -95 94 109 25 94 131 green_carpet replace purple_carpet`);
            overworld.runCommandAsync(`fill -25 94 159 -93.60 94.06 138.67 yellow_carpet replace red_carpet`);
            overworld.runCommandAsync(`fill -25 94 159 -93.60 94.06 138.67 green_carpet replace purple_carpet`);
            overworld.runCommandAsync(`fill -106.69 111.00 164.45 -113.74 114.00 112.13 yellow_wool replace red_wool`);
            overworld.runCommandAsync(`fill -106.69 111.00 164.45 -113.74 114.00 112.13 green_wool replace purple_wool`);
            overworld.runCommandAsync(`dialogue change @e[tag=spawnNpc] spawnNpc3`);
        }
        else if (level == "senior") {
            overworld.runCommandAsync(`fill -16.30 94.06 137.54 -96.95 94.06 131.43 purple_carpet replace green_carpet`);
            overworld.runCommandAsync(`fill -16.30 94.06 137.54 -96.95 94.06 131.43 red_carpet replace yellow_carpet`);
            overworld.runCommandAsync(`fill -96 96 157 -107 96 107 purple_carpet replace green_carpet`);
            overworld.runCommandAsync(`fill -96 96 157 -107 96 107 red_carpet replace yellow_carpet`);
            overworld.runCommandAsync(`fill -95 94 109 25 94 131 red_carpet replace yellow_carpet`);
            overworld.runCommandAsync(`fill -95 94 109 25 94 131 purple_carpet replace green_carpet`);
            overworld.runCommandAsync(`fill -25 94 159 -93.60 94.06 138.67 red_carpet replace yellow_carpet`);
            overworld.runCommandAsync(`fill -25 94 159 -93.60 94.06 138.67 purple_carpet replace green_carpet`);
            overworld.runCommandAsync(`fill -106.69 111.00 164.45 -113.74 114.00 112.13 red_wool replace yellow_wool`);
            overworld.runCommandAsync(`fill -106.69 111.00 164.45 -113.74 114.00 112.13 purple_wool replace green_wool`);
            overworld.runCommandAsync(`dialogue change @e[tag=spawnNpc] spawnNpc3`);
        }
        system.runTimeout(() => {
            startFlythrough("graduation");
        }, 40);
    });
}
//# sourceMappingURL=graduation.js.map