import { BlockPermutation, world } from "@minecraft/server";
const overworld = world.getDimension("overworld");
//gets the block and permutation of a block at a specific location
function getBlockValue(location) {
    const block = overworld.getBlock(location); //get the block at the location
    const permutation = block === null || block === void 0 ? void 0 : block.permutation; //get the permutation of the block
    return { block, permutation };
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
//calculates the total based on the block in the center
function calculateTotal(leftvalue, rightvalue) {
    let { block, permutation } = getBlockValue({ x: -11, y: -59, z: 93 });
    if (permutation === null || permutation === void 0 ? void 0 : permutation.matches("cut_copper")) {
        let total = leftvalue + rightvalue;
        return total;
    }
    else if (permutation === null || permutation === void 0 ? void 0 : permutation.matches("raw_gold_block")) {
        let total = leftvalue - rightvalue;
        return total;
    }
    else if (permutation === null || permutation === void 0 ? void 0 : permutation.matches("gold_block")) {
        let total = leftvalue * rightvalue;
        return total;
    }
    else if (permutation === null || permutation === void 0 ? void 0 : permutation.matches("cobblestone")) {
        let total = leftvalue / rightvalue;
        return total;
    }
    else {
        world.sendMessage("Add a +, -, *, or / block to the center to perform an operation.");
    }
}
//outputs the total to the screen
function outputTotal(total, location) {
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
function roundToDigits(num, digits) {
    let numStr = num.toString();
    if (numStr.length > digits) {
        if (numStr.includes('.')) {
            let [whole, decimal] = numStr.split('.');
            if (whole.length >= digits) {
                return parseFloat(whole.slice(0, digits));
            }
            else {
                let decimalDigits = digits - whole.length;
                return parseFloat(num.toFixed(decimalDigits));
            }
        }
        else {
            return parseFloat(numStr.slice(0, digits));
        }
    }
    else {
        return num;
    }
}
function clearAnswer() {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommandAsync("fill -14 -57 93 -8 -57 93 air replace");
    });
}
//combines 3 digits into a single number
function getInput(digit0, digit1, digit2) {
    let digit0Value = getNumberValue(digit0);
    let digit1Value = getNumberValue(digit1);
    let digit2Value = getNumberValue(digit2);
    let combinedString = '' + digit0Value + digit1Value + digit2Value;
    let combinedNumber = parseInt(combinedString);
    return combinedNumber;
}
world.afterEvents.buttonPush.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    yield clearAnswer();
    let leftInput = getInput({ x: -14, y: -59, z: 93 }, { x: -13, y: -59, z: 93 }, { x: -12, y: -59, z: 93 });
    let rightInput = getInput({ x: -10, y: -59, z: 93 }, { x: -9, y: -59, z: 93 }, { x: -8, y: -59, z: 93 });
    let total = calculateTotal(leftInput, rightInput);
    if (total) {
        let roundedTotal = roundToDigits(total, 6);
        outputTotal(roundedTotal, { x: -8, y: -57, z: 93 });
        if (roundedTotal === total) {
            world.sendMessage(`The total is ${total}.`);
        }
        else {
            world.sendMessage(`The total is ${total} and has been rounded to ${roundedTotal}.`);
        }
    }
}));
//# sourceMappingURL=main.js.map