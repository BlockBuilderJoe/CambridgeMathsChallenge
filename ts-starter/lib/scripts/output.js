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
            blockName = "anvil";
        }
        else {
            let digit = parseInt(totalString[i]);
            blockName = "element_" + digit;
        }
        block === null || block === void 0 ? void 0 : block.setPermutation(BlockPermutation.resolve(blockName));
        location.x -= 1;
    }
}
export function clearAnswer(start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommandAsync(`fill ${start.x} ${start.y} ${start.z} ${end.x} ${end.y} ${end.z} air replace`);
    });
}
//# sourceMappingURL=output.js.map