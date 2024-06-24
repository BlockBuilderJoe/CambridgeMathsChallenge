import { world } from "@minecraft/server";
import { getCube } from "./input";
import { setBlock } from "./output";
import { getInput } from "./input";
import { giveWand } from "./wand";
let overworld = world.getDimension("overworld");
const windows = [
    {
        pos1: { x: 68, y: 97, z: 226 },
        pos2: { x: 68, y: 101, z: 226 },
        numerator: { x: 71, y: 98, z: 225 },
        cloneTo: { x: 68, y: 97, z: 226 },
        cloneFrom: { x: 76, y: 82, z: 218 },
        cloneInto: { x: 67, y: 97, z: 218 },
        scaledLeftCorner: { x: 69, y: 99, z: 218 }, //Bottom left corner of the scaled window.
    },
    //Clone to from etc { x: 75, y: 47, z: 218 }, { x: 107, y: 66, z: 218 }, { x: 75, y: 97, z: 218 }
];
export function resetWindowGame() {
    return __awaiter(this, void 0, void 0, function* () {
        //window1 clear
        overworld.runCommandAsync(`fill 69 98 225 69 102 225 air replace`);
        //window2 clear
        overworld.runCommandAsync(`fill 78 98 225 80 98 225 air replace`);
        overworld.runCommandAsync(`fill 78 99 225 79 99 225 air replace`);
        overworld.runCommandAsync(`fill 78 100 225 78 100 225 air replace`);
        //replace the numerator with 0
        overworld.runCommandAsync(`setblock 71 98 225 blockbuilders:number_0`);
        overworld.runCommandAsync(`setblock 82 98 225 blockbuilders:number_0`);
        //clear the stained glass windows
        windowUndoHandler({ x: 71, y: 97, z: 225 });
        windowUndoHandler({ x: 82, y: 97, z: 225 });
    });
}
export function startWindowGame() {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommandAsync(`clear @p`);
        yield giveWand();
        giveGlass();
    });
}
export function windowScaleHandler(location) {
    return __awaiter(this, void 0, void 0, function* () {
        world.sendMessage("Scale the window " + location.x + " " + location.y + " " + location.z);
        const windowIndex = windows.findIndex((window) => window.numerator.x === location.x && window.numerator.y === location.y + 1 && window.numerator.z === location.z);
        world.sendMessage(`${windowIndex}`);
        if (windowIndex !== -1) {
            const window = windows[windowIndex]; //gets the correct window.
            yield windowUndo(window.cloneTo, window.cloneFrom, window.cloneInto);
            scale(window.pos1, window.pos2, window.numerator, window.scaledLeftCorner);
        }
    });
}
export function windowUndoHandler(location) {
    return __awaiter(this, void 0, void 0, function* () {
        giveGlass();
        switch (true) {
            case location.x === 71 && location.y === 97 && location.z === 225: {
                yield windowUndo({ x: 67, y: 47, z: 218 }, { x: 76, y: 82, z: 218 }, { x: 67, y: 97, z: 218 });
                break;
            }
            case location.x === 82 && location.y === 97 && location.z === 225: {
                yield windowUndo({ x: 75, y: 47, z: 218 }, { x: 107, y: 66, z: 218 }, { x: 75, y: 97, z: 218 });
                break;
            }
        }
    });
}
export function giveGlass() {
    overworld.runCommand("replaceitem entity @p slot.hotbar 1 yellow_stained_glass 10");
    overworld.runCommand("replaceitem entity @p slot.hotbar 2 green_stained_glass 10");
    overworld.runCommand("replaceitem entity @p slot.hotbar 3 blue_stained_glass 10");
    overworld.runCommand("replaceitem entity @p slot.hotbar 4 purple_stained_glass 10");
    overworld.runCommand("replaceitem entity @p slot.hotbar 5 red_stained_glass 10");
    overworld.runCommand("replaceitem entity @p slot.hotbar 6 lime_stained_glass 10");
    overworld.runCommand("replaceitem entity @p slot.hotbar 7 black_stained_glass 10");
    overworld.runCommand("replaceitem entity @p slot.hotbar 8 brown_stained_glass 10");
}
export function scale(cubePos1, cubePos2, inputNumber, scaledLeftCorner) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        //if it doesn't work make sure pos1 is the bottom left corner and pos2 is the top right corner
        const blocks = yield getCube(cubePos1, cubePos2);
        world.sendMessage("blocks = " + blocks.length);
        let shape = [];
        let scaleFactor = getInput([inputNumber]);
        for (const block of blocks) {
            let colour = (_a = block.permutation) === null || _a === void 0 ? void 0 : _a.getState(`color`);
            if (colour) {
                let location = { x: (_c = (_b = block.block) === null || _b === void 0 ? void 0 : _b.x) !== null && _c !== void 0 ? _c : 0, y: (_e = (_d = block.block) === null || _d === void 0 ? void 0 : _d.y) !== null && _e !== void 0 ? _e : 0, z: (_g = (_f = block.block) === null || _f === void 0 ? void 0 : _f.z) !== null && _g !== void 0 ? _g : 0, colour: colour };
                shape.push(location);
            }
        }
        let scaledShape = yield scaleShape(shape, scaleFactor, "yz");
        for (const block of scaledShape) {
            let offset_x = block.x - cubePos1.x; //applies the offset from the z to the x.
            let offset_y = block.y - cubePos1.y;
            let offset_z = block.z - cubePos1.z;
            let finalWindow_x = scaledLeftCorner.x + offset_z; //swapped x and z around
            let finalWindow_y = scaledLeftCorner.y + offset_y;
            let finalWindow_z = scaledLeftCorner.z + offset_x;
            world.sendMessage("offset_x = " + offset_x + " offset_y = " + offset_y + " offset_z = " + offset_z);
            world.sendMessage("finalWindow_x = " + finalWindow_x + " finalWindow_y = " + finalWindow_y + " finalWindow_z = " + finalWindow_z);
            setBlock({ x: finalWindow_x, y: finalWindow_y, z: finalWindow_z }, block.colour + "_stained_glass");
        }
    });
}
export function windowUndo(from, to, into) {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync(`clone ${from.x} ${from.y} ${from.z} ${to.x} ${to.y} ${to.z} ${into.x} ${into.y} ${into.z} replace`); //clones from below.
        yield overworld.runCommandAsync(`fill ${from.x} 116 ${from.z} ${to.x} 120 ${to.z} air replace`);
        yield overworld.runCommandAsync(`fill ${from.x} 120 ${from.z} ${to.x} 150 ${to.z} air replace`); //cleans any extra above
        //cleans any extra above
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
//# sourceMappingURL=stainedGlassWindow.js.map