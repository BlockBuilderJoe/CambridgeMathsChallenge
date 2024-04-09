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
//gets the block and permutation of a cuboid selection
//if it doesn't work make sure pos1 is the bottom left corner and pos2 is the top right corner
export function getCube(pos1, pos2) {
    return __awaiter(this, void 0, void 0, function* () {
        const blocks = [];
        //world.sendMessage("pos1 = " + pos1.x + "," + pos1.y + "," + pos1.z);
        //world.sendMessage("pos2 = " + pos2.x + "," + pos2.y + "," + pos2.z);
        try {
            for (let x3 = pos1.x; x3 <= pos2.x; x3++) {
                for (let y3 = pos1.y; y3 <= pos2.y; y3++) {
                    for (let z3 = pos1.z; z3 <= pos2.z; z3++) {
                        const location = { x: x3, y: y3, z: z3 };
                        const blockValue = getBlockValue(location);
                        blocks.push(blockValue);
                    }
                }
            }
        }
        catch (error) {
            world.sendMessage('An error occurred:   ' + error);
        }
        return blocks;
    });
}
//converts a block to a number value
function getNumberValue(location) {
    let { block, permutation } = getBlockValue(location);
    for (let i = 0; i < 10; i++) { //check for element_0 to element_9
        if (permutation === null || permutation === void 0 ? void 0 : permutation.matches("blockbuilders:number_" + i)) {
            return i;
        }
    }
    block === null || block === void 0 ? void 0 : block.setPermutation(BlockPermutation.resolve("blockbuilders:number_0")); //if no match is found, default to element_0
    return 0; //if no match is found, return 0
}
//gets the block and permutation of a block at a specific location
export function getBlockValue(location) {
    const block = overworld.getBlock(location); //get the block at the location
    const permutation = block === null || block === void 0 ? void 0 : block.permutation; //get the permutation of the block
    return { block, permutation };
}
//gets the block and permutation of a block at a specific location
export function getAsyncBlockValue(location) {
    return __awaiter(this, void 0, void 0, function* () {
        const block = overworld.getBlock(location); //get the block at the location
        const permutation = block === null || block === void 0 ? void 0 : block.permutation; //get the permutation of the block
        return { block, permutation };
    });
}
//# sourceMappingURL=input.js.map