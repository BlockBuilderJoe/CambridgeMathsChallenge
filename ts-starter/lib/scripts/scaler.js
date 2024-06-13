import { world } from "@minecraft/server";
import { getCube } from "./input";
import { setBlock } from "./output";
import { getInput } from "./input";
let overworld = world.getDimension("overworld");
export function windowScaleHandler(location) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (true) {
            case location.x === 71 && location.y === 97 && location.z === 225: {
                yield windowUndo({ x: 67, y: 47, z: 218 }, { x: 80, y: 82, z: 218 }, { x: 67, y: 97, z: 218 });
                scale({ x: 69, y: 98, z: 225 }, { x: 69, y: 102, z: 225 }, { x: 71, y: 98, z: 225 });
                break;
            }
            case location.x === 82 && location.y === 97 && location.z === 225: {
                yield windowUndo({ x: 75, y: 47, z: 218 }, { x: 107, y: 66, z: 218 }, { x: 75, y: 97, z: 218 });
                scale({ x: 78, y: 97, z: 225 }, { x: 80, y: 100, z: 225 }, { x: 82, y: 98, z: 225 });
                break;
            }
        }
    });
}
export function windowUndoHandler(location) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (true) {
            case location.x === 71 && location.y === 97 && location.z === 225: {
                yield windowUndo({ x: 67, y: 47, z: 218 }, { x: 80, y: 82, z: 218 }, { x: 67, y: 97, z: 218 });
                break;
            }
            case location.x === 82 && location.y === 97 && location.z === 225: {
                yield windowUndo({ x: 75, y: 47, z: 218 }, { x: 107, y: 66, z: 218 }, { x: 75, y: 97, z: 218 });
                break;
            }
        }
    });
}
export function scale(cubePos1, cubePos2, inputNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        //if it doesn't work make sure pos1 is the bottom left corner and pos2 is the top right corner
        const blocks = yield getCube(cubePos1, cubePos2);
        let shape = [];
        let scaleFactor = getInput([inputNumber]);
        for (const block of blocks) {
            let colour = (_a = block.permutation) === null || _a === void 0 ? void 0 : _a.getState(`color`);
            if (colour) {
                let location = { x: (_b = block.block) === null || _b === void 0 ? void 0 : _b.x, y: (_c = block.block) === null || _c === void 0 ? void 0 : _c.y, z: (_d = block.block) === null || _d === void 0 ? void 0 : _d.z, colour: colour };
                shape.push(location);
            }
        }
        let scaledShape = yield scaleShape(shape, scaleFactor, "yx");
        for (const block of scaledShape) {
            let offset_z = block.z - 7; //shifts the shape to the right
            let offset_x = block.x;
            let offset_y = block.y + 1;
            setBlock({ x: offset_x, y: offset_y, z: offset_z }, block.colour + "_stained_glass");
        }
    });
}
export function windowUndo(from, to, into) {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync(`clone ${from.x} ${from.y} ${from.z} ${to.x} ${to.y} ${to.z} ${into.x} ${into.y} ${into.z} replace`); //clones from below.
        yield overworld.runCommandAsync(`fill ${from.x} 116 ${from.z} ${to.x} 140 ${to.z} air replace`); //cleans any extra above 
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
            for (let i = axes.includes("x") ? 0 : scaleFactor - 1; i < scaleFactor; i++) {
                for (let j = axes.includes("y") ? 0 : scaleFactor - 1; j < scaleFactor; j++) {
                    for (let k = axes.includes("z") ? 0 : scaleFactor - 1; k < scaleFactor; k++) {
                        // Add the scaled relative position to the base point
                        const scaledBlock = {
                            x: basePoint.x + (axes.includes("x") ? relativePos.x * scaleFactor + i : relativePos.x),
                            y: basePoint.y + (axes.includes("y") ? relativePos.y * scaleFactor + j : relativePos.y),
                            z: basePoint.z + (axes.includes("z") ? relativePos.z * scaleFactor + k : relativePos.z),
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