import { BlockPermutation, world, system } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function cuisenaire(block, blockName, rodLength, successMessage, direction, rodsPlaced, perfectRun) {
    var _a, _b, _c, _d, _e;
    if ((_a = block.permutation) === null || _a === void 0 ? void 0 : _a.matches(blockName)) {
        let runPlaceRods = true;
        overworld.runCommand("title @p actionbar " + successMessage);
        block.setPermutation(BlockPermutation.resolve("tallgrass"));
        for (let i = 0; i < rodLength; i++) {
            let colour = (_c = (_b = block[direction](i)) === null || _b === void 0 ? void 0 : _b.permutation) === null || _c === void 0 ? void 0 : _c.getState("color");
            if (colour || ((_e = (_d = block[direction](i)) === null || _d === void 0 ? void 0 : _d.permutation) === null || _e === void 0 ? void 0 : _e.matches("sandstone"))) {
                overworld.runCommand("title @p actionbar That rod is too long!");
                runPlaceRods = false;
                break;
            }
        }
        if (runPlaceRods) {
            let rodToPlace = { location: block.location, direction: direction, rodLength: rodLength, blockName: blockName };
            rodsPlaced.push(rodToPlace);
            const matchingRodIndex = perfectRun.findIndex(rod => JSON.stringify(rod) === JSON.stringify(rodToPlace));
            if (matchingRodIndex >= 0) {
                world.sendMessage("You placed a rod in the correct position!");
                changeNPC(matchingRodIndex);
            }
            placeRods(block, blockName, rodLength, direction);
        }
        else {
            block === null || block === void 0 ? void 0 : block.setPermutation(BlockPermutation.resolve("tallgrass"));
        }
    }
}
function changeNPC(matchingRodIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommandAsync(`dialogue change @e[tag=game1student${matchingRodIndex}] game1student${matchingRodIndex}_success`);
    });
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
function setCameraView(x, player) {
    return __awaiter(this, void 0, void 0, function* () {
        if (x >= 25 && x <= 48) {
            player.runCommandAsync(`camera ${player.name} set minecraft:free pos 36 120 44 facing 36 94 44`);
        }
        else if (x >= 0 && x <= 23) {
            player.runCommandAsync(`camera ${player.name} set minecraft:free pos 11 120 44 facing 11 94 44`);
        }
        else if (x >= -25 && x <= -2) {
            player.runCommandAsync(`camera ${player.name} set minecraft:free pos -14 120 44 facing -14 94 44`);
        }
        else if (x >= -50 && x <= -27) {
            player.runCommandAsync(`camera ${player.name} set minecraft:free pos -39 120 44 facing -39 94 44`);
        }
    });
}
export function getBlockBehind(event, oppositeDirection) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let hasColour = (_b = (_a = event.block[oppositeDirection](1)) === null || _a === void 0 ? void 0 : _a.permutation) === null || _b === void 0 ? void 0 : _b.getState("color");
        return hasColour;
    });
}
export function replayRods(rodsPlaced, player, perfectRun) {
    return __awaiter(this, void 0, void 0, function* () {
        yield resetGrid({ x: -50, y: 94, z: 33 }); //clears the grid.
        let matchingRods = rodsPlaced.filter((rod, index) => JSON.stringify(rod) === JSON.stringify(perfectRun[index]));
        if (matchingRods) {
            player.runCommandAsync("tp 38 96 -76"); //moves the player out of sight.
            for (let i = 0; i < matchingRods.length; i++) {
                ((index) => {
                    system.runTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        let x = matchingRods[index].location.x;
                        yield setCameraView(x, player);
                        let block = overworld.getBlock(matchingRods[index].location);
                        placeRods(block, matchingRods[index].blockName, matchingRods[index].rodLength, matchingRods[index].direction);
                        if (i === matchingRods.length - 1) { //resets the camera 2 seconds after last rod placed.
                            world.sendMessage(`tp ${player.name} ${matchingRods[index].location.x} ${matchingRods[index].location.y + 1} ${matchingRods[index].location.z}`);
                            let tpCommand = `tp ${player.name} ${matchingRods[index].location.x} ${matchingRods[index].location.y + 1} ${matchingRods[index].location.z}`;
                            endReplay(player, tpCommand);
                        }
                    }), 40 * index);
                    return;
                })(i);
            }
        }
    });
}
function endReplay(player, tpCommand) {
    system.runTimeout(() => {
        player.runCommandAsync(tpCommand);
        player.runCommandAsync(`camera ${player.name} clear`);
    }, 40);
}
//Resets the area to the original state, one area at a time. 
function squareReset(pos1, pos2, concreteColours) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < concreteColours.length; i++) {
            let command = `fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace ${concreteColours[i]}_concrete`;
            overworld.runCommand(command);
        }
        overworld.runCommandAsync(`fill ${pos1.x} ${pos1.y - 1} ${pos1.z} ${pos2.x} ${pos2.y - 1} ${pos2.z} grass replace dirt`);
        overworld.runCommandAsync(`fill ${pos1.x} ${pos1.y} ${pos1.z} ${pos2.x} ${pos2.y} ${pos2.z} tallgrass replace air`);
    });
}
//preps the grid coordinates for the squareReset function.
export function resetGrid(location) {
    return __awaiter(this, void 0, void 0, function* () {
        let concreteColours = ["red", "green", "purple", "brown", "blue", "lime", "yellow"]; // What rods will be replaced. 
        for (let i = 0; i < 4; i++) {
            let offset_x = location.x + i * 25; // 25 is the distance between each starting point of the grid.
            let pos1 = { x: offset_x, y: location.y, z: location.z };
            let pos2 = { x: offset_x + 24, y: location.y, z: location.z + 24 };
            yield squareReset(pos1, pos2, concreteColours);
        }
    });
}
export function giveRods(player, rodsRemoved) {
    return __awaiter(this, void 0, void 0, function* () {
        let rods = [{ block: "red_concrete", amount: 10 }, { block: "lime_concrete", amount: 10 }, { block: "purple_concrete", amount: 10 }, { block: "green_concrete", amount: 10 }, { block: "brown_concrete", amount: 10 }, { block: "yellow_concrete", amount: 10 }, { block: "blue_concrete", amount: 10 }];
        player.runCommandAsync(`clear ${player.name}`);
        for (let i = 0; i < rods.length; i++) {
            player.runCommandAsync(`give @p ${rods[i].block} ${rods[i].amount} 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`);
        }
    });
}
//# sourceMappingURL=rod.js.map