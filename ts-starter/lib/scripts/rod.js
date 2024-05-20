import { BlockPermutation, world, system } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function cuisenaire(block, blockName, rodLength, successMessage, direction, rodsPlaced) {
    var _a, _b, _c, _d, _e, _f, _g;
    if ((_a = block.permutation) === null || _a === void 0 ? void 0 : _a.matches(blockName)) {
        let runPlaceRods = true;
        overworld.runCommand("title @p actionbar " + successMessage);
        for (let i = 0; i < rodLength; i++) {
            //cancels the rod placement if it goes over a whole rod length.
            if (((_c = (_b = block[direction](i)) === null || _b === void 0 ? void 0 : _b.permutation) === null || _c === void 0 ? void 0 : _c.matches("sandstone")) || ((_e = (_d = block[direction](i)) === null || _d === void 0 ? void 0 : _d.permutation) === null || _e === void 0 ? void 0 : _e.matches("white_concrete")) || ((_g = (_f = block[direction](1)) === null || _f === void 0 ? void 0 : _f.permutation) === null || _g === void 0 ? void 0 : _g.getState("color"))) {
                world.sendMessage("It's gone over a whole rod length!");
                runPlaceRods = false;
                break;
            }
        }
        if (runPlaceRods) {
            rodsPlaced.push({ location: block.location, direction: direction, rodLength: rodLength, blockName: blockName });
            placeRods(block, blockName, rodLength, direction);
        }
        else {
            block === null || block === void 0 ? void 0 : block.setPermutation(BlockPermutation.resolve("air"));
        }
    }
}
function placeRods(block, blockName, rodLength, direction) {
    var _a;
    for (let i = 0; i < rodLength; i++) {
        if (["east", "west", "north", "south"].includes(direction)) {
            (_a = block[direction](i)) === null || _a === void 0 ? void 0 : _a.setPermutation(BlockPermutation.resolve(blockName));
        }
        else {
            throw new Error(`Invalid direction: ${direction}`);
        }
    }
}
export function getBlockBehind(event, oppositeDirection) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let hasColour = (_b = (_a = event.block[oppositeDirection](1)) === null || _a === void 0 ? void 0 : _a.permutation) === null || _b === void 0 ? void 0 : _b.getState("color");
        return hasColour;
    });
}
export function replayRods(rodsPlaced, player) {
    return __awaiter(this, void 0, void 0, function* () {
        let perfectRun = [{ location: { z: 33, y: 94, x: 37 }, direction: "south", rodLength: 12, blockName: "yellow_concrete" }, { location: { z: 45, y: 94, x: 36 }, direction: "west", rodLength: 12, blockName: "yellow_concrete" }];
        if (JSON.stringify(rodsPlaced) === JSON.stringify(perfectRun)) {
            world.sendMessage('You placed the rods in the most efficient way! Well done!');
        }
        else {
            player.runCommandAsync(`camera ${player.name} set minecraft:free pos 36 120 44 facing 36 94 44`);
            player.runCommandAsync(`title ${player.name} actionbar This was how you placed the rods.`);
            yield resetGrid({ x: -50, y: 94, z: 33 });
            for (let i = 0; i < rodsPlaced.length; i++) {
                ((index) => {
                    system.runTimeout(() => {
                        let block = overworld.getBlock(rodsPlaced[index].location);
                        placeRods(block, rodsPlaced[index].blockName, rodsPlaced[index].rodLength, rodsPlaced[index].direction);
                        if (perfectRun[index] && rodsPlaced[index].blockName !== perfectRun[index].blockName) {
                            player.runCommandAsync(`title ${player.name} actionbar ${rodsPlaced[index].rodLength} is not the most efficient factor.`);
                        }
                        else if (!perfectRun[index]) {
                            // Handle the case where there is no corresponding value in perfectRun to stop errors.
                            player.runCommandAsync(`title ${player.name} actionbar ${rodsPlaced[index].rodLength} is not the most efficient factor.`);
                        }
                    }, 40 * index);
                })(i);
            }
        }
    });
}
//Resets the area to the original state, one area at a time. 
function squareReset(pos1, pos2, concreteColours) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < concreteColours.length; i++) {
            let command = `fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace ${concreteColours[i]}_concrete`;
            overworld.runCommand(command);
        }
        overworld.runCommandAsync(`fill ${pos1.x} ${pos1.y - 1} ${pos1.z} ${pos2.x} ${pos2.y - 1} ${pos2.z} grass replace dirt`);
        overworld.runCommandAsync(`fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace air`);
    });
}
//preps the grid coordinates for the squareReset function.
export function resetGrid(location) {
    return __awaiter(this, void 0, void 0, function* () {
        let concreteColours = ["red", "green", "purple", "brown", "blue", "lime", "yellow"]; // What rods will be replaced. 
        for (let i = 0; i < 4; i++) {
            let offset_x = location.x + i * 25; // 25 is the distance between each starting point of the grid.
            let pos1 = { x: offset_x, y: location.y, z: location.z };
            let pos2 = { x: offset_x + 24, y: location.y, z: location.z + 24 };
            yield squareReset(pos1, pos2, concreteColours);
        }
    });
}
//# sourceMappingURL=rod.js.map