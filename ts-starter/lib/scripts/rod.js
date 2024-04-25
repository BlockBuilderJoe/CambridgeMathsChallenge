import { BlockPermutation, world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function cuisenaire(event, blockName, rodLength, successMessage, direction, rodsPlaced) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if ((_a = event.block.permutation) === null || _a === void 0 ? void 0 : _a.matches(blockName)) {
        let placeRods = true;
        overworld.runCommand("title @p actionbar " + successMessage);
        for (let i = 0; i < rodLength; i++) {
            //runs east to the rod length
            if (((_c = (_b = event.block[direction](i)) === null || _b === void 0 ? void 0 : _b.permutation) === null || _c === void 0 ? void 0 : _c.matches("sandstone")) || ((_e = (_d = event.block[direction](i)) === null || _d === void 0 ? void 0 : _d.permutation) === null || _e === void 0 ? void 0 : _e.matches("white_concrete")) || ((_g = (_f = event.block[direction](1)) === null || _f === void 0 ? void 0 : _f.permutation) === null || _g === void 0 ? void 0 : _g.getState("color"))) {
                world.sendMessage("It's gone over a whole rod length!");
                placeRods = false;
                break;
            }
        }
        if (placeRods) {
            rodsPlaced.push({ location: event.block.location, direction: direction, rodLength: rodLength, blockName: blockName });
            for (let i = 0; i < rodLength; i++) {
                if (["east", "west", "north", "south"].includes(direction)) {
                    (_h = event.block[direction](i)) === null || _h === void 0 ? void 0 : _h.setPermutation(BlockPermutation.resolve(blockName));
                }
                else {
                    throw new Error(`Invalid direction: ${direction}`);
                }
            }
        }
        else {
            (_j = event.block) === null || _j === void 0 ? void 0 : _j.setPermutation(BlockPermutation.resolve("air"));
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
export function replayRods(rodsPlaced) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < rodsPlaced.length; i++) {
            let rod = rodsPlaced[i];
            world.sendMessage(`Replaying rod ${rod.blockName} at ${rod.location.x} ${rod.location.y} ${rod.location.z} in direction ${rod.direction} for length ${rod.rodLength}`);
        }
    });
}
export function squareReset(location, concreteColours) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < concreteColours.length; i++) {
            let command = `fill ${location.x} ${location.y} ${location.z} ${location.x + 11} ${location.y} ${location.z + 11} tallgrass replace ${concreteColours[i]}_concrete`;
            overworld.runCommand(command);
        }
        overworld.runCommandAsync(`fill ${location.x} ${location.y - 1} ${location.z} ${location.x + 11} ${location.y - 1} ${location.z + 11} grass replace dirt`);
        overworld.runCommandAsync(`fill ${location.x} ${location.y} ${location.z} ${location.x + 11} ${location.y} ${location.z + 11} tallgrass replace air`);
    });
}
export function grid(location) {
    return __awaiter(this, void 0, void 0, function* () {
        let concreteColours = ["red", "green", "purple"];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let offset_x = location.x + i * 11;
                let offset_z = location.z + j * 11;
                const squareLocation = { x: offset_x, y: location.y, z: offset_z };
                yield squareReset(squareLocation, concreteColours);
            }
        }
    });
}
//# sourceMappingURL=rod.js.map