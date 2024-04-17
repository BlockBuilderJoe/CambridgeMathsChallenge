import { BlockPermutation, world } from "@minecraft/server";
import { getBlockValue } from "./input";
const overworld = world.getDimension("overworld");
//outputs the total to the screen
export function outputTotal(total, location) {
    let blockName = "";
    let totalString = ('' + total).split('').reverse().join(''); //reverses the string so it can be read from right to left
    for (let i = 0; i < totalString.length; i++) {
        let { block, permutation } = getBlockValue(location);
        if (totalString[i] === '.') {
            blockName = "blockbuilders:symbol_decimalpoint";
        }
        else {
            let digit = parseInt(totalString[i]);
            blockName = "blockbuilders:number_" + digit;
        }
        block === null || block === void 0 ? void 0 : block.setPermutation(BlockPermutation.resolve(blockName));
        location.x -= 1;
    }
}
export function setBlock(location, blockName) {
    let { block } = getBlockValue(location);
    block === null || block === void 0 ? void 0 : block.setPermutation(BlockPermutation.resolve(blockName));
}
export function clearAnswer(start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommandAsync(`fill ${start.x} ${start.y} ${start.z} ${end.x} ${end.y} ${end.z} air replace`);
    });
}
export function cycleNumberBlock(clickEvent) {
    var _a, _b;
    for (let i = 0; i < 9; i++) { //check for element_0 toplement_8
        if ((_a = clickEvent.brokenBlockPermutation) === null || _a === void 0 ? void 0 : _a.matches("blockbuilders:number_" + i)) {
            let nextNumber = i + 1;
            let blockname = "blockbuilders:number_" + nextNumber;
            clickEvent.block.setPermutation(BlockPermutation.resolve(blockname));
        }
        if ((_b = clickEvent.brokenBlockPermutation) === null || _b === void 0 ? void 0 : _b.matches("blockbuilders:number_9")) {
            clickEvent.block.setPermutation(BlockPermutation.resolve("blockbuilders:number_0"));
        }
    }
}
//# sourceMappingURL=output.js.map