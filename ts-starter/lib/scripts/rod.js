import { BlockPermutation, world, system } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function cuisenaire(block, blockName, rodLength, successMessage, direction, rodsPlaced) {
    var _a, _b, _c, _d, _e, _f, _g;
    if ((_a = block.permutation) === null || _a === void 0 ? void 0 : _a.matches(blockName)) {
        let runPlaceRods = true;
        overworld.runCommand("title @p actionbar " + successMessage);
        for (let i = 0; i < rodLength; i++) {
            //runs east to the rod length
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
export function replayRods(rodsPlaced, entity) {
    return __awaiter(this, void 0, void 0, function* () {
        entity.runCommandAsync(`title ${entity.name} actionbar Replaying rods`);
        entity.runCommandAsync(`clear ${entity.name}`);
        entity.runCommandAsync(`replaceitem entity ${entity.name} slot.weapon.mainhand 0 filled_map`);
        let i = 0;
        for (let i = 0; i < rodsPlaced.length; i++) {
            ((index) => {
                system.runInterval(() => __awaiter(this, void 0, void 0, function* () {
                    let location = { x: rodsPlaced[index].location.x, y: rodsPlaced[index].location.y, z: rodsPlaced[index].location.z + 33 };
                    let block = overworld.getBlock(location);
                    placeRods(block, rodsPlaced[index].blockName, rodsPlaced[index].rodLength, rodsPlaced[index].direction);
                }), 40 * index);
            })(i);
        }
    });
}
//# sourceMappingURL=rod.js.map