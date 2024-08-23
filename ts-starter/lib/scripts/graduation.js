import { world } from "@minecraft/server";
import { startFlythrough } from "./flythroughs";
let overworld = world.getDimension("overworld");
export function startGraduation(level) {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync(`camera @p fade time 0.1 0.2 0.2`);
        overworld.runCommandAsync(`clear @p`);
        yield overworld.runCommandAsync(`tp @p -15 94 159`);
        if (level == "junior") {
            overworld.runCommandAsync(`fill -15 94 159 -117 96 107 green_carpet replace purple_carpet`);
            overworld.runCommandAsync(`fill -15 94 159 -117 96 107 yellow_carpet replace red_carpet`);
            overworld.runCommandAsync(`fill -106.69 111.00 164.45 -113.74 114.00 112.13 yellow_wool replace red_wool`);
            overworld.runCommandAsync(`fill -106.69 111.00 164.45 -113.74 114.00 112.13 green_wool replace purple_wool`);
            overworld.runCommandAsync(`dialogue change @e[tag=spawnNpc] spawnNpc2`);
        }
        else if (level == "senior") {
            overworld.runCommandAsync(`fill -15 94 159 -117 96 107 purple_carpet replace green_carpet`);
            overworld.runCommandAsync(`fill -15 94 159 -117 96 107 red_carpet replace yellow_carpet`);
            overworld.runCommandAsync(`fill -106.69 111.00 164.45 -113.74 114.00 112.13 red_wool replace yellow_wool`);
            overworld.runCommandAsync(`fill -106.69 111.00 164.45 -113.74 114.00 112.13 purple_wool replace green_wool`);
            overworld.runCommandAsync(`dialogue change @e[tag=spawnNpc] spawnNpc3`);
        }
        overworld.runCommandAsync(`replaceitem entity @p slot.armor.head 0 blockbuilders:mortar_board`);
        overworld.runCommandAsync(`tp @e[tag=spawnNpc] -103.02 96.06 142.69 facing -104 96 134`);
        overworld.runCommandAsync(`tp @e[tag=fractionNpc] -107.49 96.00 138.56 facing -101.49 96.00 138.56`);
        overworld.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc9`);
        overworld.runCommandAsync(`tp @e[tag=ratioNpc] -107.39 96.00 140.05 facing -101.39 96.00 140.05`);
        overworld.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc11`);
        overworld.runCommandAsync(`tp @e[tag=scaleNpc] -107.31 96.00 141.96 facing -101.31 96.00 141.96`);
        overworld.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc16`);
        startFlythrough("graduation");
    });
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
world.afterEvents.buttonPush.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    placeStudents();
}));
function placeStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        let startCoords = { x: -90, y: 94, z: 139 };
        for (let i = 0; i < 10; i++) {
            const randomNum = getRandomNumber(1, 8);
            yield overworld.runCommandAsync(`summon blockbuilders:student${randomNum} ${startCoords.x} ${startCoords.y} ${startCoords.z}`);
            yield overworld.runCommandAsync(`replaceitem entity @e[type=blockbuilders:student${randomNum}] slot.armor.head 0 blockbuilders:mortar_board`);
            startCoords.z += 2;
        }
    });
}
//# sourceMappingURL=graduation.js.map