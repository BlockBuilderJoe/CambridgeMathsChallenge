import { world } from "@minecraft/server";
import { getCube } from "./input";
import { scaleShape } from "./scaler";
import { setBlock } from "./output";
import { getInput } from "./input";
let overworld = world.getDimension("overworld");
export function test() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        overworld.runCommandAsync("fill 6 -60 122 39 -35 154 air");
        overworld.runCommandAsync("fill 6 -35 122 39 -30 154 air");
        const blocks = yield getCube({ x: 8, y: -60, z: 119 }, { x: 10, y: -57, z: 121 });
        let shape = [];
        let scaleFactor = getInput([{ x: 6, y: -58, z: 116 }]);
        for (const block of blocks) {
            if ((_a = block.permutation) === null || _a === void 0 ? void 0 : _a.matches("white_concrete")) {
                let location = { x: (_b = block.block) === null || _b === void 0 ? void 0 : _b.x, y: (_c = block.block) === null || _c === void 0 ? void 0 : _c.y, z: (_d = block.block) === null || _d === void 0 ? void 0 : _d.z };
                shape.push(location);
            }
        }
        let scaledShape = yield scaleShape(shape, scaleFactor);
        for (const block of scaledShape) {
            let scaledz = block.z + 6; //shifts the shape to the right
            setBlock({ x: block.x, y: block.y, z: scaledz }, "white_concrete");
        }
    });
}
//# sourceMappingURL=test.js.map