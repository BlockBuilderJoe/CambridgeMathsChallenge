import { getBlockValue } from "./input";
import { world } from "@minecraft/server";
import { getInput } from "./input";
import { outputTotal, clearAnswer } from "./output";
import { roundToDigits } from "./numberHandler";
//calculates the total based on the block in the center
function calculateTotal(leftvalue, rightvalue) {
    let { block, permutation } = getBlockValue({ x: -11, y: -59, z: 93 });
    world.sendMessage("The sum is:");
    if (permutation === null || permutation === void 0 ? void 0 : permutation.matches("cut_copper")) {
        world.sendMessage(leftvalue + "+" + rightvalue);
        let total = leftvalue + rightvalue;
        return total;
    }
    else if (permutation === null || permutation === void 0 ? void 0 : permutation.matches("raw_gold_block")) {
        world.sendMessage(leftvalue + "-" + rightvalue);
        let total = leftvalue - rightvalue;
        return total;
    }
    else if (permutation === null || permutation === void 0 ? void 0 : permutation.matches("gold_block")) {
        world.sendMessage(leftvalue + "*" + rightvalue);
        let total = leftvalue * rightvalue;
        return total;
    }
    else if (permutation === null || permutation === void 0 ? void 0 : permutation.matches("cobblestone")) {
        world.sendMessage(leftvalue + "/" + rightvalue);
        let total = leftvalue / rightvalue;
        return total;
    }
    else {
        world.sendMessage("Add a +, -, *, or / block to the center to perform an operation.");
    }
}
export function calculate() {
    return __awaiter(this, void 0, void 0, function* () {
        yield clearAnswer({ x: -14, y: -57, z: 93 }, { x: -8, y: -57, z: 93 });
        let leftInput = getInput([{ x: -14, y: -59, z: 93 }, { x: -13, y: -59, z: 93 }, { x: -12, y: -59, z: 93 }]);
        let rightInput = getInput([{ x: -10, y: -59, z: 93 }, { x: -9, y: -59, z: 93 }, { x: -8, y: -59, z: 93 }]);
        let total = calculateTotal(leftInput, rightInput);
        if (total !== null && total !== undefined) {
            let roundedTotal = roundToDigits(total, 6);
            outputTotal(roundedTotal, { x: -8, y: -57, z: 93 });
            world.sendMessage("The total is:");
            if (roundedTotal === total) {
                world.sendMessage(`${total}.`);
            }
            else {
                world.sendMessage(`${total} and has been rounded to ${roundedTotal}.`);
            }
        }
        else {
            world.sendMessage("Please input a number.");
        }
    });
}
//# sourceMappingURL=calculator.js.map