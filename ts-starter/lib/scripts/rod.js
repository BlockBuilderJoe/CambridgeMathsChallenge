import { BlockPermutation, world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function cuisenaire(event, blockName, rodLength, successMessage, direction) {
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
//# sourceMappingURL=rod.js.map