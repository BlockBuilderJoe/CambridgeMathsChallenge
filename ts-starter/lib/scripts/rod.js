import { BlockPermutation, world, system } from "@minecraft/server";
import { grid } from "./grid";
let overworld = world.getDimension("overworld");
export function cuisenaire(block, blockName, rodLength, successMessage, direction, rodsPlaced) {
    var _a, _b, _c, _d, _e, _f, _g;
    if ((_a = block.permutation) === null || _a === void 0 ? void 0 : _a.matches(blockName)) {
        let runPlaceRods = true;
        overworld.runCommand("title @p actionbar " + successMessage);
        for (let i = 0; i < rodLength; i++) {
            //runs east to the rod length
            if (((_c = (_b = block[direction](i)) === null || _b === void 0 ? void 0 : _b.permutation) === null || _c === void 0 ? void 0 : _c.matches("sandstone")) || ((_e = (_d = block[direction](i)) === null || _d === void 0 ? void 0 : _d.permutation) === null || _e === void 0 ? void 0 : _e.matches("white_concrete")) || ((_g = (_f = block[direction](1)) === null || _f === void 0 ? void 0 : _f.permutation) === null || _g === void 0 ? void 0 : _g.getState("color"))) {
                world.sendMessage("It's gone over a whole rod length!");
                runPlaceRods = false;
                break;
            }
        }
        if (runPlaceRods) {
            rodsPlaced.push({ location: block.location, direction: direction, rodLength: rodLength, blockName: blockName });
            placeRods(block, blockName, rodLength, direction);
        }
        else {
            block === null || block === void 0 ? void 0 : block.setPermutation(BlockPermutation.resolve("air"));
        }
    }
}
function placeRods(block, blockName, rodLength, direction) {
    var _a;
    for (let i = 0; i < rodLength; i++) {
        if (["east", "west", "north", "south"].includes(direction)) {
            (_a = block[direction](i)) === null || _a === void 0 ? void 0 : _a.setPermutation(BlockPermutation.resolve(blockName));
        }
        else {
            throw new Error(`Invalid direction: ${direction}`);
        }
    }
}
export function getBlockBehind(event, oppositeDirection) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let hasColour = (_b = (_a = event.block[oppositeDirection](1)) === null || _a === void 0 ? void 0 : _a.permutation) === null || _b === void 0 ? void 0 : _b.getState("color");
        return hasColour;
    });
}
export function replayRods(rodsPlaced, entity) {
    return __awaiter(this, void 0, void 0, function* () {
        let perfectRun = [{ location: { x: 609, y: -60, z: 1009 }, direction: "east", rodLength: 2, blockName: "red_concrete" }, { location: { x: 610, y: -60, z: 1008 }, direction: "north", rodLength: 2, blockName: "red_concrete" }, { location: { x: 610, y: -60, z: 1005 }, direction: "north", rodLength: 4, blockName: "purple_concrete" }, { location: { x: 611, y: -60, z: 1002 }, direction: "east", rodLength: 8, blockName: "brown_concrete" }];
        world.sendMessage('Replaying rods');
        entity.runCommandAsync(`title ${entity.name} actionbar Replaying rods`);
        entity.runCommandAsync(`clear ${entity.name}`);
        entity.runCommandAsync(`replaceitem entity ${entity.name} slot.weapon.mainhand 0 filled_map`);
        yield grid({ x: 608, y: -60, z: 995 });
        let shouldContinue = true;
        for (let i = 0; i < rodsPlaced.length; i++) {
            ((index) => {
                system.runTimeout(() => {
                    if (!shouldContinue) {
                        return;
                    }
                    let offsetLocation = { x: perfectRun[index].location.x, y: perfectRun[index].location.y, z: perfectRun[index].location.z + 33 };
                    let offsetBlock = overworld.getBlock(offsetLocation);
                    let block = overworld.getBlock(rodsPlaced[index].location);
                    placeRods(block, rodsPlaced[index].blockName, rodsPlaced[index].rodLength, rodsPlaced[index].direction);
                    placeRods(offsetBlock, perfectRun[index].blockName, perfectRun[index].rodLength, perfectRun[index].direction);
                    if (rodsPlaced[index].blockName !== perfectRun[index].blockName) {
                        world.sendMessage(`${rodsPlaced[index].rodLength} is not the most efficient rod to place here. If you want to get further try again!`);
                        shouldContinue = false;
                    }
                }, 40 * index);
            })(i);
        }
    });
}
//# sourceMappingURL=rod.js.map