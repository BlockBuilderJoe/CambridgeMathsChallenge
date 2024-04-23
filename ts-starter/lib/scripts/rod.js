import { BlockPermutation, world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
const left = {
    east: "south",
    south: "west",
    west: "north",
    north: "east",
};
const right = {
    east: "north",
    north: "west",
    west: "south",
    south: "east",
};
export function cuisenaire(event, blockName, rodLength, successMessage, direction) {
    var _a, _b, _c, _d;
    let extend = true;
    if ((_a = event.block.permutation) === null || _a === void 0 ? void 0 : _a.matches(blockName)) {
        overworld.runCommand("title @p actionbar " + successMessage);
        for (let i = 0; i < rodLength; i++) {
            //runs east to the rod length
            if ((_c = (_b = event.block[direction](i)) === null || _b === void 0 ? void 0 : _b.permutation) === null || _c === void 0 ? void 0 : _c.matches("sandstone")) {
                world.sendMessage("It's gone over a whole rod length!");
                event.block.setPermutation(BlockPermutation.resolve("grass"));
                extend = false;
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
        if (extend == true) {
            extendRods(event, blockName, rodLength, direction);
        }
    }
}
export function extendRods(event, blockName, rodLength, direction) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const leftDirection = left[direction];
    const rightDirection = right[direction];
    //copy to the left
    for (let i = 0; i < 10; i++) {
        //runs south
        if (((_b = (_a = event.block[leftDirection](i)) === null || _a === void 0 ? void 0 : _a.permutation) === null || _b === void 0 ? void 0 : _b.matches("sandstone")) ||
            ((_d = (_c = event.block[leftDirection](i)) === null || _c === void 0 ? void 0 : _c.permutation) === null || _d === void 0 ? void 0 : _d.matches("white_concrete"))) {
            break;
        }
        else {
            for (let j = 0; j < rodLength; j++) {
                //runs south to the rod length
                (_e = event.block[leftDirection](i)) === null || _e === void 0 ? void 0 : _e.setPermutation(BlockPermutation.resolve(blockName));
                (_g = (_f = event.block[leftDirection](i)) === null || _f === void 0 ? void 0 : _f[direction](j)) === null || _g === void 0 ? void 0 : _g.setPermutation(BlockPermutation.resolve(blockName));
            }
        }
    }
    //copy to the right
    for (let i = 0; i < 9; i++) {
        //runs north
        if (((_j = (_h = event.block[rightDirection](i)) === null || _h === void 0 ? void 0 : _h.permutation) === null || _j === void 0 ? void 0 : _j.matches("sandstone")) ||
            ((_l = (_k = event.block[rightDirection](i)) === null || _k === void 0 ? void 0 : _k.permutation) === null || _l === void 0 ? void 0 : _l.matches("white_concrete"))) {
            break;
        }
        else {
            for (let j = 0; j < rodLength; j++) {
                //runs north to the rod length
                (_m = event.block[rightDirection](i)) === null || _m === void 0 ? void 0 : _m.setPermutation(BlockPermutation.resolve(blockName));
                (_p = (_o = event.block[rightDirection](i)) === null || _o === void 0 ? void 0 : _o[direction](j)) === null || _p === void 0 ? void 0 : _p.setPermutation(BlockPermutation.resolve(blockName));
            }
        }
    }
}
//# sourceMappingURL=rod.js.map