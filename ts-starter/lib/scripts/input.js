import { BlockPermutation, world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
//combines multiple digits into a single number
export function getInput(digits) {
    let combinedString = "";
    for (let digit of digits) {
        let digitValue = getNumberValue(digit);
        combinedString += digitValue;
    }
    let combinedNumber = parseInt(combinedString);
    return combinedNumber;
}
export function isCoordinateWithinRange(toTest, pos1, pos2) {
    return __awaiter(this, void 0, void 0, function* () {
        const minX = Math.min(pos1.x, pos2.x);
        const maxX = Math.max(pos1.x, pos2.x);
        const minY = Math.min(pos1.y, pos2.y);
        const maxY = Math.max(pos1.y, pos2.y);
        const minZ = Math.min(pos1.z, pos2.z);
        const maxZ = Math.max(pos1.z, pos2.z);
        return (toTest.x >= minX && toTest.x <= maxX && toTest.y >= minY && toTest.y <= maxY && toTest.z >= minZ && toTest.z <= maxZ);
    });
}
//gets the block and permutation of a cuboid selection
//if it doesn't work make sure pos1 is the bottom left corner and pos2 is the top right corner
export function getCube(pos1, pos2) {
    return __awaiter(this, void 0, void 0, function* () {
        const blocks = [];
        for (let x = Math.min(pos1.x, pos2.x); x <= Math.max(pos1.x, pos2.x); x++) {
            for (let y = Math.min(pos1.y, pos2.y); y <= Math.max(pos1.y, pos2.y); y++) {
                for (let z = Math.min(pos1.z, pos2.z); z <= Math.max(pos1.z, pos2.z); z++) {
                    const location = { x: x, y: y, z: z };
                    const blockValue = getBlockValue(location);
                    blocks.push(blockValue);
                }
            }
        }
        return blocks;
    });
}
//converts a block to a number value
function getNumberValue(location) {
    let { block, permutation } = getBlockValue(location);
    for (let i = 0; i < 10; i++) {
        //check for element_0 to element_9
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