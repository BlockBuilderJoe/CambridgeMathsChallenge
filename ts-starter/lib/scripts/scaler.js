import { world } from "@minecraft/server";
import { getCube } from "./input";
import { setBlock } from "./output";
import { getInput } from "./input";
let overworld = world.getDimension("overworld");
export function scale() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        world.sendMessage("Scaling the shape");
        overworld.runCommandAsync("fill 6 -60 122 39 -35 154 air");
        overworld.runCommandAsync("fill 6 -35 122 39 -30 154 air");
        const blocks = yield getCube({ x: 8, y: -60, z: 119 }, { x: 10, y: -57, z: 121 });
        let shape = [];
        let scaleFactor = getInput([{ x: 6, y: -58, z: 116 }]);
        for (const block of blocks) {
            if ((_a = block.permutation) === null || _a === void 0 ? void 0 : _a.matches("white_concrete")) {
                let location = { x: (_b = block.block) === null || _b === void 0 ? void 0 : _b.x, y: (_c = block.block) === null || _c === void 0 ? void 0 : _c.y, z: (_d = block.block) === null || _d === void 0 ? void 0 : _d.z };
                shape.push(location);
            }
        }
        let scaledShape = yield scaleShape(shape, scaleFactor);
        for (const block of scaledShape) {
            let scaledz = block.z + 6; //shifts the shape to the right
            setBlock({ x: block.x, y: block.y, z: scaledz }, "white_concrete");
        }
    });
}
export function scaleShape(shape, scaleFactor) {
    return __awaiter(this, void 0, void 0, function* () {
        const scaledShape = [];
        // Find the minimum coordinates to use as the base point of the shape
        const basePoint = shape.reduce((min, block) => ({
            x: Math.min(min.x, block.x),
            y: Math.min(min.y, block.y),
            z: Math.min(min.z, block.z),
        }), shape[0]);
        for (const block of shape) {
            // Calculate the relative position of the block within the shape
            const relativePos = {
                x: block.x - basePoint.x,
                y: block.y - basePoint.y,
                z: block.z - basePoint.z,
            };
            // Scale the relative position
            for (let i = 0; i < scaleFactor; i++) {
                for (let j = 0; j < scaleFactor; j++) {
                    for (let k = 0; k < scaleFactor; k++) {
                        // Add the scaled relative position to the base point
                        const scaledBlock = {
                            x: basePoint.x + relativePos.x * scaleFactor + i,
                            y: basePoint.y + relativePos.y * scaleFactor + j,
                            z: basePoint.z + relativePos.z * scaleFactor + k,
                        };
                        scaledShape.push(scaledBlock);
                    }
                }
            }
        }
        return scaledShape;
    });
}
//# sourceMappingURL=scaler.js.map