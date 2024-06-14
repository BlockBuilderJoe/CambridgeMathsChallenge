import { world, system } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function npcWalk(type) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (type) {
            case "scale": {
                let path = yield generatePath([
                    { x: 56, y: 96, z: 156 },
                    { x: 56, y: 96, z: 221 },
                    { x: 65, y: 96, z: 221 },
                ]);
                moveNpc(path, "scale");
            }
        }
    });
}
function moveNpc(path, type) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < path.length; i++) {
            let { x, y, z } = path[i];
            system.runTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield overworld.runCommandAsync(`tp @e[tag=${type}Npc] ${x} ${y} ${z} `);
                yield overworld.runCommandAsync(`scoreboard players add Saved Students 1`);
            }), i * 5);
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
//# sourceMappingURL=npcWalk.js.map