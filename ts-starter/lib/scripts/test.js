import { world } from "@minecraft/server";
import { getCube } from "./input";
export function test() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        world.sendMessage("This is a test");
        const blocks = yield getCube({ x: 8, y: -60, z: 118 }, { x: 10, y: -57, z: 120 });
        let shape = [];
        for (const block of blocks) {
            if ((_a = block.permutation) === null || _a === void 0 ? void 0 : _a.matches("white_concrete")) {
                let location = { x: (_b = block.block) === null || _b === void 0 ? void 0 : _b.x, y: (_c = block.block) === null || _c === void 0 ? void 0 : _c.y, z: (_d = block.block) === null || _d === void 0 ? void 0 : _d.z };
                world.sendMessage("white_concrete at " + ((_e = block.block) === null || _e === void 0 ? void 0 : _e.x) + "," + ((_f = block.block) === null || _f === void 0 ? void 0 : _f.y) + "," + ((_g = block.block) === null || _g === void 0 ? void 0 : _g.z));
                shape.push(location);
            }
        }
    });
}
//# sourceMappingURL=test.js.map