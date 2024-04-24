import { BlockPermutation, world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function cuisenaire(event, blockName, rodLength, successMessage, direction) {
    var _a, _b, _c, _d;
    if ((_a = event.block.permutation) === null || _a === void 0 ? void 0 : _a.matches(blockName)) {
        overworld.runCommand("title @p actionbar " + successMessage);
        for (let i = 0; i < rodLength; i++) {
            //runs east to the rod length
            if ((_c = (_b = event.block[direction](i)) === null || _b === void 0 ? void 0 : _b.permutation) === null || _c === void 0 ? void 0 : _c.matches("sandstone")) {
                world.sendMessage("It's gone over a whole rod length!");
                event.block.setPermutation(BlockPermutation.resolve("grass"));
                break;
            }
            else {
                if (["east", "west", "north", "south"].includes(direction)) {
                    (_d = event.block[direction](i)) === null || _d === void 0 ? void 0 : _d.setPermutation(BlockPermutation.resolve(blockName));
                }
                else {
                    throw new Error(`Invalid direction: ${direction}`);
                }
            }
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