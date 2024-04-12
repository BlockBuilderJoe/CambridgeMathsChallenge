import { world } from "@minecraft/server";
import { getCube } from "./input";
import { setBlock } from "./output";
import { getInput } from "./input";
let overworld = world.getDimension("overworld");
let glass = ["magenta", "orange", "light_blue", "yellow", "lime", "pink", "gray", "light_gray", "cyan", "purple", "blue", "brown", "green", "red", "black", "white"];
export function scale() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const blocks = yield getCube({ x: 13, y: -60, z: 142 }, { x: 13, y: -51, z: 148 });
        let shape = [];
        let scaleFactor = getInput([{ x: 12, y: -58, z: 149 }]);
        for (const block of blocks) {
            for (const colour of glass) {
                if ((_a = block.permutation) === null || _a === void 0 ? void 0 : _a.matches(colour + "_stained_glass")) {
                    let location = { x: (_b = block.block) === null || _b === void 0 ? void 0 : _b.x, y: (_c = block.block) === null || _c === void 0 ? void 0 : _c.y, z: (_d = block.block) === null || _d === void 0 ? void 0 : _d.z, colour: colour };
                    shape.push(location);
                }
            }
            let scaledShape = yield scaleShape(shape, scaleFactor, "yz");
            for (const block of scaledShape) {
                let offset_z = block.z + 15; //shifts the shape to the right
                let offset_x = block.x + 10;
                let offset_y = block.y + 5;
                setBlock({ x: offset_x, y: offset_y, z: offset_z }, block.colour + "_stained_glass");
            }
        }
    });
}
export function resetArea() {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync("fill 20 -60 153 32 -40 221 air replace");
        yield overworld.runCommandAsync("fill 20 -40 153 32 -20 221 air replace");
        yield overworld.runCommandAsync("fill 20 -20 153 32 0 221 air replace");
        yield overworld.runCommandAsync("fill 20 0 153 32 30 221 air replace");
        yield overworld.runCommandAsync("clone -49 -60 151 -47 -23 175 21 -60 153 replace");
    });
}
export function scaleShape(shape, scaleFactor, axes) {
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
            for (let i = axes.includes('x') ? 0 : scaleFactor - 1; i < scaleFactor; i++) {
                for (let j = axes.includes('y') ? 0 : scaleFactor - 1; j < scaleFactor; j++) {
                    for (let k = axes.includes('z') ? 0 : scaleFactor - 1; k < scaleFactor; k++) {
                        // Add the scaled relative position to the base point
                        const scaledBlock = {
                            x: basePoint.x + (axes.includes('x') ? relativePos.x * scaleFactor + i : relativePos.x),
                            y: basePoint.y + (axes.includes('y') ? relativePos.y * scaleFactor + j : relativePos.y),
                            z: basePoint.z + (axes.includes('z') ? relativePos.z * scaleFactor + k : relativePos.z),
                            colour: block.colour,
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