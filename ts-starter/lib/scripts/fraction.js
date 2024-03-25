import { world } from "@minecraft/server";
import { clearAnswer } from "./output";
export function fraction1() {
    return __awaiter(this, void 0, void 0, function* () {
        yield clearAnswer({ x: -26, y: -59, z: 93 }, { x: -21, y: -59, z: 93 });
        world.sendMessage("Hello, World!");
    });
}
//# sourceMappingURL=fraction.js.map