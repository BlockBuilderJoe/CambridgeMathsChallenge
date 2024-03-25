import { BlockPermutation, world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
//combines 3 digits into a single number
export function getInput(digit0, digit1, digit2) {
    let digit0Value = getNumberValue(digit0);
    let digit1Value = getNumberValue(digit1);
    let digit2Value = getNumberValue(digit2);
    let combinedString = '' + digit0Value + digit1Value + digit2Value;
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