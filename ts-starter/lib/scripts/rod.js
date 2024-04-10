import { BlockPermutation, world } from "@minecraft/server";
export function cuisenaire(event, blockName, rodLength, successMessage, failureMessage) {
    var _a, _b;
    if ((_a = event.block.permutation) === null || _a === void 0 ? void 0 : _a.matches(blockName)) {
        world.sendMessage(successMessage);
        for (let i = 0; i < rodLength; i++) {
            (_b = event.block.north(i)) === null || _b === void 0 ? void 0 : _b.setPermutation(BlockPermutation.resolve(blockName));
        }
    }
    else {
        world.sendMessage(failureMessage);
        event.block.setPermutation(BlockPermutation.resolve("lava"));
    }
}
//# sourceMappingURL=rod.js.map