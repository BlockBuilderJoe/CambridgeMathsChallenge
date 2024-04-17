import { BlockPermutation, world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function cuisenaire(event, blockName, rodLength, successMessage) {
    var _a, _b, _c, _d;
    let extend = true;
    if ((_a = event.block.permutation) === null || _a === void 0 ? void 0 : _a.matches(blockName)) {
        overworld.runCommand("title @p actionbar " + successMessage);
        for (let i = 0; i < rodLength; i++) { //runs east to the rod length
            if ((_c = (_b = event.block.east(i)) === null || _b === void 0 ? void 0 : _b.permutation) === null || _c === void 0 ? void 0 : _c.matches("sandstone")) {
                world.sendMessage("It's gone over a whole rod length!");
                event.block.setPermutation(BlockPermutation.resolve("grass"));
                extend = false;
                break;
            }
            else {
                (_d = event.block.east(i)) === null || _d === void 0 ? void 0 : _d.setPermutation(BlockPermutation.resolve(blockName));
            }
        }
        if (extend == true) {
            extendRods(event, blockName, rodLength);
        }
    }
}
export function clearMap() {
    overworld.runCommand("clear @a filled_map");
    overworld.runCommand("give @a empty_map");
}
export function extendRods(event, blockName, rodLength) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    for (let i = 0; i < 10; i++) { //runs south
        if (((_b = (_a = event.block.south(i)) === null || _a === void 0 ? void 0 : _a.permutation) === null || _b === void 0 ? void 0 : _b.matches("sandstone")) || ((_d = (_c = event.block.south(i)) === null || _c === void 0 ? void 0 : _c.permutation) === null || _d === void 0 ? void 0 : _d.matches("white_concrete"))) {
            break;
        }
        else {
            for (let j = 0; j < rodLength; j++) { //runs south to the rod length
                (_e = event.block.south(i)) === null || _e === void 0 ? void 0 : _e.setPermutation(BlockPermutation.resolve(blockName));
                (_g = (_f = event.block.south(i)) === null || _f === void 0 ? void 0 : _f.east(j)) === null || _g === void 0 ? void 0 : _g.setPermutation(BlockPermutation.resolve(blockName));
            }
        }
    }
    for (let i = 0; i < 9; i++) { //runs north
        if (((_j = (_h = event.block.north(i)) === null || _h === void 0 ? void 0 : _h.permutation) === null || _j === void 0 ? void 0 : _j.matches("sandstone")) || ((_l = (_k = event.block.north(i)) === null || _k === void 0 ? void 0 : _k.permutation) === null || _l === void 0 ? void 0 : _l.matches("white_concrete"))) {
            break;
        }
        else {
            for (let j = 0; j < rodLength; j++) { //runs north to the rod length
                (_m = event.block.north(i)) === null || _m === void 0 ? void 0 : _m.setPermutation(BlockPermutation.resolve(blockName));
                (_p = (_o = event.block.north(i)) === null || _o === void 0 ? void 0 : _o.east(j)) === null || _p === void 0 ? void 0 : _p.setPermutation(BlockPermutation.resolve(blockName));
            }
        }
    }
}
//# sourceMappingURL=rod.js.map