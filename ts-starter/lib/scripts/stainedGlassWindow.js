import { world, system } from "@minecraft/server";
import { getCube } from "./input";
import { setBlock } from "./output";
import { getInput } from "./input";
import { giveWand } from "./wand";
let overworld = world.getDimension("overworld");
let seniorMode = false;
export const windows = [
    {
        //window 1
        pos1: { x: 46, y: 98, z: 192 },
        pos2: { x: 41, y: 107, z: 192 },
        numerator: { x: 40, y: 100, z: 197 },
        cloneFrom: { x: 50, y: 10, z: 219 },
        cloneTo: { x: -6, y: 36, z: 219 },
        cloneInto: { x: -6, y: 96, z: 219 },
        scaledLeftCorner: { x: 46, y: 98, z: 219 }, //Bottom left corner of the scaled window.
        correctNumerator: 1,
        numberOfBlocks: 34,
    },
    {
        //window 2
        pos1: { x: 36, y: 98, z: 192 },
        pos2: { x: 34, y: 104, z: 192 },
        numerator: { x: 32, y: 100, z: 197 },
        cloneFrom: { x: 39, y: 10, z: 219 },
        cloneTo: { x: -6, y: 36, z: 219 },
        cloneInto: { x: -6, y: 96, z: 219 },
        scaledLeftCorner: { x: 36, y: 98, z: 219 }, //Bottom left corner of the scaled window.
        correctNumerator: 2,
        numberOfBlocks: 9,
    },
    {
        //window 3
        pos1: { x: 24, y: 98, z: 192 },
        pos2: { x: 21, y: 103, z: 192 },
        numerator: { x: 20, y: 100, z: 197 },
        cloneFrom: { x: 27, y: 10, z: 219 },
        cloneTo: { x: -6, y: 36, z: 219 },
        cloneInto: { x: -6, y: 96, z: 219 },
        scaledLeftCorner: { x: 24, y: 98, z: 219 }, //Bottom left corner of the scaled window.
        correctNumerator: 4,
        numberOfBlocks: 6,
    },
    {
        //window 4
        pos1: { x: 113, y: 98, z: 193 },
        pos2: { x: 108, y: 105, z: 193 },
        numerator: { x: 107, y: 100, z: 197 },
        cloneFrom: { x: 117, y: 10, z: 219 },
        cloneTo: { x: 49, y: 71, z: 219 },
        cloneInto: { x: 49, y: 96, z: 219 },
        scaledLeftCorner: { x: 115, y: 98, z: 219 }, //Bottom left corner of the scaled window.
        correctNumerator: 8,
        numberOfBlocks: 20,
    },
    {
        //window 5
        pos1: { x: 99, y: 98, z: 193 },
        pos2: { x: 95, y: 104, z: 193 },
        numerator: { x: 94, y: 100, z: 197 },
        cloneFrom: { x: 100, y: 10, z: 219 },
        cloneTo: { x: 49, y: 71, z: 219 },
        cloneInto: { x: 49, y: 96, z: 219 },
        scaledLeftCorner: { x: 97, y: 98, z: 219 }, //Bottom left corner of the scaled window.
        correctNumerator: 6,
        numberOfBlocks: 6,
    },
    {
        //window 6
        pos1: { x: 84, y: 98, z: 193 },
        pos2: { x: 81, y: 103, z: 193 },
        numerator: { x: 80, y: 100, z: 197 },
        cloneFrom: { x: 85, y: 10, z: 219 },
        cloneTo: { x: 49, y: 71, z: 219 },
        cloneInto: { x: 49, y: 96, z: 219 },
        scaledLeftCorner: { x: 82, y: 98, z: 219 }, //Bottom left corner of the scaled window.
        correctNumerator: 12,
        numberOfBlocks: 6,
    },
];
function nextOrbTag(windowIndex) {
    overworld.runCommandAsync(`tag @e[tag=orb] remove window${windowIndex}`);
    overworld.runCommandAsync(`tag @e[tag=orb] add window${windowIndex + 1}`);
    return windowIndex + 1;
}
function moveWindowCharaters(newWindowIndex) {
    overworld.runCommandAsync(`tp @e[type=blockbuilders:scale] ${windows[newWindowIndex].numerator.x + 2} 98 197 facing ${windows[newWindowIndex].numerator.x + 2} 98 94`);
    overworld.runCommandAsync(`tp @e[type=blockbuilders:orb] ${windows[newWindowIndex].numerator.x + 4} 98 197 facing ${windows[newWindowIndex].numerator.x + 4} 98 94`);
}
function moveWindowEntities(newWindowIndex) {
    overworld.runCommandAsync(`tp @e[type=blockbuilders:scale] ${windows[newWindowIndex].numerator.x + 2} 98 197 facing ${windows[newWindowIndex].numerator.x + 2} 98 94`);
    overworld.runCommandAsync(`tp @e[type=blockbuilders:orb] ${windows[newWindowIndex].numerator.x + 4} 98 197 facing ${windows[newWindowIndex].numerator.x + 4} 98 94`);
}
export function nextWindow() {
    return __awaiter(this, void 0, void 0, function* () {
        let windowIndex = yield getWindowIndex();
        world.sendMessage("windowIndex = " + windowIndex + "Senior mode = " + seniorMode);
        if (typeof windowIndex === "number") {
            if (windowIndex === 2) {
                overworld.runCommandAsync(`dialogue open @e[tag=scaleNpc] @p scaleNpc8`);
                nextOrbTag(windowIndex);
            }
            else if (windowIndex === 5) {
                overworld.runCommandAsync(`dialogue open @e[tag=scaleNpc] @p scaleNpc10`);
            }
            else if (windowIndex === 3 && seniorMode === false) {
                seniorMode = true;
                overworld.runCommandAsync(`tp @p 111 96 183 facing 110 102 193`);
                moveWindowCharaters(windowIndex);
                giveWand();
                giveGlass();
            }
            else {
                let newWindowIndex = nextOrbTag(windowIndex);
                moveWindowCharaters(newWindowIndex);
                giveWand();
                giveGlass();
            }
        }
    });
}
export function getWindowIndex() {
    return __awaiter(this, void 0, void 0, function* () {
        let orb = overworld.getEntities({
            tags: ["orb"],
        });
        let windowTag = orb[0].getTags()[1];
        let windowNumber = parseInt(windowTag.substring(6));
        if (windowNumber >= 0) {
            return windowNumber;
        }
    });
}
export function redoWindowGame() {
    return __awaiter(this, void 0, void 0, function* () {
        let windowIndex = yield getWindowIndex();
        if (typeof windowIndex === "number") {
            let player = overworld.getPlayers()[0];
            player.runCommandAsync(`tp @p ~ ~ 190`); //moves the player in front of the window design.
            yield windowUndo(windows[windowIndex].cloneFrom, windows[windowIndex].cloneTo, windows[windowIndex].cloneInto);
            yield giveWand();
            giveGlass();
        }
    });
}
export function resetWindowGame() {
    return __awaiter(this, void 0, void 0, function* () {
        //resets the orb.
        overworld.runCommandAsync(`tp @e[tag=orb] 44 98 197`);
        overworld.runCommandAsync(`tag @e[tag=orb] add window0`);
        overworld.runCommandAsync(`tag @e[tag=orb] remove window1`);
        overworld.runCommandAsync(`tag @e[tag=orb] remove window2`);
        overworld.runCommandAsync(`tag @e[tag=orb] remove window3`);
        overworld.runCommandAsync(`tag @e[tag=orb] remove window4`);
        overworld.runCommandAsync(`tag @e[tag=orb] remove window5`);
        overworld.runCommandAsync(`setblock ${windows[0].numerator.x} ${windows[0].numerator.y} ${windows[0].numerator.z} blockbuilders:number_0`);
        for (let i = 1; i < windows.length; i++) {
            const window = windows[i];
            overworld.runCommandAsync(`setblock ${window.numerator.x} ${window.numerator.y} ${window.numerator.z} blockbuilders:number_0`);
            let colours = ["yellow", "green", "blue", "purple", "red", "lime", "black", "brown"];
            for (const colour in colours) {
                overworld.runCommandAsync(`fill ${window.pos1.x} ${window.pos1.y} ${window.pos1.z} ${window.pos2.x} ${window.pos2.y} ${window.pos2.z} air replace ${colours[colour]}_stained_glass`);
            }
        }
        yield windowUndo(windows[0].cloneTo, windows[0].cloneFrom, windows[0].cloneInto);
        yield windowUndo(windows[3].cloneTo, windows[3].cloneFrom, windows[3].cloneInto);
    });
}
export function startWindowTutorial() {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommandAsync(`clear @p`);
        yield giveWand();
    });
}
export function startWindowGame() {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommandAsync(`clear @p`);
        yield giveWand();
        giveGlass();
    });
}
export function guildMasterCheck(windowIndex, enoughGlass) {
    return __awaiter(this, void 0, void 0, function* () {
        const window = windows[windowIndex]; //gets the correct window.
        let numerator = getInput([{ x: window.numerator.x, y: window.numerator.y, z: window.numerator.z }]);
        world.sendMessage(`${numerator}`);
        if (!enoughGlass) {
            system.runTimeout(() => {
                overworld.runCommand(`dialogue open @e[tag=scaleNpc] @p scaleNpc11`);
            }, 20);
        }
        else if (numerator === window.correctNumerator) {
            system.runTimeout(() => {
                overworld.runCommand(`dialogue open @e[tag=scaleNpc] @p scaleNpc5`);
            }, 30);
        }
        else if (numerator === 0) {
            system.runTimeout(() => {
                overworld.runCommand(`title @p actionbar The window has been scaled by 0.`);
            }, 20);
        }
        else if (numerator > window.correctNumerator) {
            system.runTimeout(() => {
                overworld.runCommand(`dialogue open @e[tag=scaleNpc] @p scaleNpc6`);
            }, 20);
        }
        else if (numerator < window.correctNumerator) {
            system.runTimeout(() => {
                overworld.runCommand(`dialogue open @e[tag=scaleNpc] @p scaleNpc7`);
            }, 20);
        }
    });
}
export function windowScaleHandler(windowIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const window = windows[windowIndex]; //gets the correct window.
        yield windowUndo(window.cloneTo, window.cloneFrom, window.cloneInto);
        let enoughGlass = yield scale(window.pos1, window.pos2, window.numerator, window.scaledLeftCorner, window.numberOfBlocks, windowIndex);
        //has enoughGlass been returned?
        if (enoughGlass === true || enoughGlass === false) {
            guildMasterCheck(windowIndex, enoughGlass);
        }
        else {
            overworld.runCommand(`dialogue open @e[tag=scaleNpc] @p scaleNpc12`);
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
export function scale(cubePos1, cubePos2, inputNumber, scaledLeftCorner, numberOfBlocks, windowIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        //if it doesn't work make sure pos1 is the bottom left corner and pos2 is the top right corner
        const blocks = yield getCube(cubePos1, cubePos2);
        let shape = [];
        let scaleFactor = getInput([inputNumber]);
        for (const block of blocks) {
            let colour = (_a = block.permutation) === null || _a === void 0 ? void 0 : _a.getState(`color`);
            if (colour) {
                if (block.block) {
                    let offset_x = block.block.x - cubePos1.x; //x axis shouldn't change
                    let offset_y = block.block.y - cubePos1.y; // cube pos will always be larger than block pos
                    let offset_z = cubePos1.z - block.block.z; // cube pos will always be smaller than block pos
                    let finalWindow_x = scaledLeftCorner.x - offset_x; //swapped x and z if you want to change axis it places.
                    let finalWindow_y = scaledLeftCorner.y + offset_y;
                    let finalWindow_z = scaledLeftCorner.z + offset_z;
                    let location = { x: finalWindow_x, y: finalWindow_y, z: finalWindow_z, colour: colour };
                    shape.push(location);
                }
            }
        }
        ////// special operation for the last three windows
        const divisors = {
            3: 4,
            4: 3,
            5: 3,
        };
        if (windowIndex in divisors) {
            //divides scaleFactor by the divisor
            let tempScaleFactor = scaleFactor / divisors[windowIndex];
            //checks if the tempScaleFactor is a whole number
            if (tempScaleFactor % 1 === 0) {
                //allows the function to continue
                scaleFactor = tempScaleFactor;
            }
            else {
                //stops the function and runs the dialogue ( see else statement line 237)
                return;
            }
        }
        let scaledShape = yield scaleShape(shape, scaleFactor, "yx");
        for (const block of scaledShape) {
            setBlock({ x: block.x, y: block.y, z: block.z }, block.colour + "_stained_glass");
        }
        let enoughGlass = false;
        if (shape.length == numberOfBlocks) {
            enoughGlass = true;
        }
        return enoughGlass;
    });
}
export function windowUndo(from, to, into) {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync(`clone ${from.x} ${from.y} ${from.z} ${to.x} ${to.y} ${to.z} ${into.x} ${into.y} ${into.z} replace`); //clones from below.
        //cleans up the left side.
        yield overworld.runCommandAsync(`fill 50 116 219 -13 120 219 air replace`);
        yield overworld.runCommandAsync(`fill 50 120 219 -13 150 219 air replace`);
        yield overworld.runCommandAsync(`fill 50 150 219 -13 172 219 air replace`); //cleans any extra above
        yield overworld.runCommandAsync(`fill 50 172 219 -13 200 219 air replace`);
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
                            x: basePoint.x - (axes.includes("x") ? relativePos.x * scaleFactor + i : relativePos.x),
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