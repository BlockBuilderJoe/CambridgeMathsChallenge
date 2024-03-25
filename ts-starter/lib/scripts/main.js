import { world } from "@minecraft/server";
import { calculate } from "./calculator";
import { fraction1 } from "./fraction";
const overworld = world.getDimension("overworld");
world.afterEvents.buttonPush.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    //tests for the location of the button and runs the correct function.
    switch (`${event.block.location.x},${event.block.location.y},${event.block.location.z}`) {
        case "-11,-60,94": {
            calculate();
            break;
        }
        case "-27,-60,94": {
            fraction1();
            break;
        }
    }
}));
//# sourceMappingURL=main.js.map