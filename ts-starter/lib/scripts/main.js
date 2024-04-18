import { world } from "@minecraft/server";
import { calculate } from "./calculator";
import { fraction1 } from "./fraction";
import { ratio1 } from "./ratio";
import { scale, resetArea } from "./scaler";
import { cuisenaire } from "./rod";
import { cycleNumberBlock } from "./output";
import { grid } from "./grid";
import { facing } from "./playerFacing";
//listens for the button push event.
world.afterEvents.buttonPush.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    switch (`${event.block.location.x},${event.block.location.y},${event.block.location.z}`) {
        case "-11,-60,94": {
            calculate();
            break;
        }
        case "-27,-60,94": {
            fraction1();
            break;
        }
        case "-40,-60,94": {
            ratio1();
            break;
        }
        case "-3,-60,154": {
            scale();
            break;
        }
        case "-3,-60,153": {
            yield resetArea();
            break;
        }
        case "-3,-60,90": {
            world.getDimension("overworld").runCommand("function lava");
            break;
        }
        case "608,-59,1007": {
            yield grid({ x: 608, y: -61, z: 995 });
            break;
        }
    }
}));
//listens for the block place event.
world.afterEvents.playerPlaceBlock.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    let viewDirection = event.player.getViewDirection();
    let direction = yield facing(viewDirection);
    world.sendMessage(direction);
    if ((_a = event.block.permutation) === null || _a === void 0 ? void 0 : _a.matches("red_concrete")) {
        cuisenaire(event, "red_concrete", 2, "Placed two blocks", direction);
    }
    else if ((_b = event.block.permutation) === null || _b === void 0 ? void 0 : _b.matches("green_concrete")) {
        cuisenaire(event, "green_concrete", 6, "Placed six blocks", direction);
    }
    else if ((_c = event.block.permutation) === null || _c === void 0 ? void 0 : _c.matches("purple_concrete")) {
        cuisenaire(event, "purple_concrete", 4, "Placed four blocks", direction);
    }
    else if ((_d = event.block.permutation) === null || _d === void 0 ? void 0 : _d.matches("blue_concrete")) {
        cuisenaire(event, "blue_concrete", 3, "Placed three blocks", direction);
    }
}));
world.afterEvents.playerBreakBlock.subscribe((clickEvent) => {
    var _a;
    let hand_item = (_a = clickEvent.itemStackAfterBreak) === null || _a === void 0 ? void 0 : _a.typeId; //gets the item in the players hand
    if (hand_item === "minecraft:stick") {
        cycleNumberBlock(clickEvent);
    }
});
//right click
world.afterEvents.itemUse.subscribe((eventData) => __awaiter(void 0, void 0, void 0, function* () {
    let player = eventData.source; // Get the player that waved the wand
    if (eventData.itemStack.typeId === "minecraft:stick") { //tests for the wand.
        player.sendMessage("Right click"); //sends a message to the player
    }
}));
//# sourceMappingURL=main.js.map