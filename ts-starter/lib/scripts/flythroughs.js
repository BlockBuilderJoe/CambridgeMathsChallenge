import { world, system } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function startFlythrough(type) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (type) {
            case "graduation": {
                let path = yield generatePath([
                    { x: -25, y: 98, z: 134 },
                    { x: -104, y: 98, z: 134 },
                ]);
                let commands = [
                    { command: "tp @p -104 96 134 facing -104 96 142", interval: 0 },
                    { command: "particle blockbuilders:spell -111.47 114.00 148.60", interval: 44 },
                    { command: "particle blockbuilders:spell -112.02 105.06 118.80", interval: 56 },
                    { command: "particle blockbuilders:spell -119.70 115.98 134.62", interval: 74 },
                    { command: "particle blockbuilders:spell -98.90 105.53 158.17", interval: 36 },
                    { command: "particle blockbuilders:spell -108.35 110.22 143.91", interval: 62 },
                    { command: "particle blockbuilders:spell -115.80 108.75 139.30", interval: 51 },
                    { command: "particle blockbuilders:spell -103.64 112.40 152.08", interval: 68 },
                    { command: "particle blockbuilders:spell -117.93 106.88 129.75", interval: 47 },
                    { command: "particle blockbuilders:spell -101.21 109.60 146.53", interval: 59 },
                ];
                playerFlythrough(path, 1.5, commands);
                break;
            }
            default:
                world.sendMessage("Flythough type: " + type + " not found");
                break;
        }
    });
}
function playerFlythrough(path, speed, commands) {
    return __awaiter(this, void 0, void 0, function* () {
        let player = world.getAllPlayers()[0];
        let message = "";
        for (let i = 0; i < path.length - 1; i++) {
            let location = path[i];
            const nextPoint = path[i + 1];
            const facingLocation = { x: nextPoint.x, y: nextPoint.y, z: nextPoint.z };
            system.runTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield overworld.runCommandAsync(`camera @p set minecraft:free pos ${location.x} ${location.y} ${location.z} facing ${facingLocation.x} ${facingLocation.y} ${facingLocation.z}`); // start of walk dialogue
                for (const command of commands) {
                    if (command.interval === 0) {
                        yield overworld.runCommandAsync(command.command);
                    }
                    else if (i % command.interval === 0) {
                        yield overworld.runCommandAsync(command.command);
                    }
                }
                if (path.length - 5 == i) {
                    yield overworld.runCommandAsync(`camera @p fade time 0.2 0.2 0.2`); // end of walk dialogue
                }
                if (path.length - 2 == i) {
                    // final point.
                    yield overworld.runCommandAsync(`camera @p clear`); // end of walk dialogue
                }
            }), i * speed);
        }
    });
}
function generatePath(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const generatedPath = [];
        for (let i = 0; i < path.length - 1; i++) {
            const startCoord = path[i];
            const endCoord = path[i + 1];
            const xDiff = endCoord.x - startCoord.x;
            const yDiff = endCoord.y - startCoord.y;
            const zDiff = endCoord.z - startCoord.z;
            const xStep = Math.sign(xDiff);
            const yStep = Math.sign(yDiff);
            const zStep = Math.sign(zDiff);
            const steps = Math.max(Math.abs(xDiff), Math.abs(yDiff), Math.abs(zDiff));
            for (let j = 0; j <= steps; j++) {
                const x = startCoord.x + xStep * j;
                const y = startCoord.y + yStep * j;
                const z = startCoord.z + zStep * j;
                generatedPath.push({ x, y, z });
            }
        }
        return generatedPath;
    });
}
//# sourceMappingURL=flythroughs.js.map