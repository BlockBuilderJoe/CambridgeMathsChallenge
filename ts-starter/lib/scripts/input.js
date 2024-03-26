import { BlockPermutation, world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
//combines multiple digits into a single number
export function getInput(digits) {
    let combinedString = '';
    for (let digit of digits) {
        let digitValue = getNumberValue(digit);
        combinedString += digitValue;
    }
    let combinedNumber = parseInt(combinedString);
    return combinedNumber;
}
//converts a block to a number value
function getNumberValue(location) {
    let { block, permutation } = getBlockValue(location);
    for (let i = 0; i < 10; i++) { //check for element_0 to element_9
        if (permutation === null || permutation === void 0 ? void 0 : permutation.matches("element_" + i)) {
            return i;
        }
    }
    block === null || block === void 0 ? void 0 : block.setPermutation(BlockPermutation.resolve("element_0")); //if no match is found, default to element_0
    return 0; //if no match is found, return 0
}
//gets the block and permutation of a block at a specific location
export function getBlockValue(location) {
    const block = overworld.getBlock(location); //get the block at the location
    const permutation = block === null || block === void 0 ? void 0 : block.permutation; //get the permutation of the block
    return { block, permutation };
}
//# sourceMappingURL=input.js.map