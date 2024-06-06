import { BlockPermutation, world, system, } from "@minecraft/server";
import { perfectRun, validRanges, finalBlock } from "./perfectRun";
let overworld = world.getDimension("overworld");
let rodsPlaced = [];
export function directionCheck(x, z, direction) {
    return __awaiter(this, void 0, void 0, function* () {
        let correctDirection = false;
        for (const range of validRanges) {
            //world.sendMessage(`x: ${x} z: ${z}`);
            if ((range.x !== undefined && x === range.x && isInRange(z, range.zMin, range.zMax)) ||
                (range.z !== undefined && z === range.z && isInRange(x, range.xMin, range.xMax))) {
                correctDirection = true;
                break;
            }
        }
        return correctDirection;
    });
}
function isInRange(value, min, max) {
    return value >= min && value <= max;
}
export function cuisenaire(block, blockName, rodLength, successMessage, direction) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        if ((_a = block.permutation) === null || _a === void 0 ? void 0 : _a.matches(blockName)) {
            let runPlaceRods = true;
            overworld.runCommand(`title @p actionbar ${successMessage} placed`);
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
                let rodToPlace = { location: block.location, direction: direction, rodLength: rodLength, blockName: blockName, successMessage: successMessage };
                rodsPlaced.push(rodToPlace);
                placeRods(block, blockName, rodLength, direction);
                const matchingRodIndex = perfectRun.findIndex((rod) => rod.location.x === rodToPlace.location.x &&
                    rod.location.y === rodToPlace.location.y &&
                    rod.location.z === rodToPlace.location.z &&
                    rod.direction === rodToPlace.direction &&
                    rod.rodLength === rodToPlace.rodLength &&
                    rod.blockName === rodToPlace.blockName);
                if (matchingRodIndex >= 0) {
                    //means you match the perfect run.
                    yield changeNPC(matchingRodIndex, true);
                }
            }
            else {
                block === null || block === void 0 ? void 0 : block.setPermutation(BlockPermutation.resolve("tallgrass"));
            }
        }
    });
}
function changeNPC(matchingRodIndex, win) {
    return __awaiter(this, void 0, void 0, function* () {
        //changes the NPC to the success state based on the matchingRodIndex in cuisenaire function.
        if (win) {
            overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Win`);
        }
        else { //changes the NPC
            overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Fail`);
        }
    });
}
export function resetNPC(npcAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        rodsPlaced = []; //resets the rods placed array.
        for (let i = 0; i < npcAmount; i++) {
            overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${i}] rodNpc${i}Default`);
        }
    });
}
function placeRods(block, blockName, rodLength, direction) {
    const validDirections = ["east", "west", "north", "south"];
    if (validDirections.includes(direction)) {
        for (let i = 0; i < rodLength; i++) {
            block[direction](i).setPermutation(BlockPermutation.resolve(blockName));
            const newRodIndex = finalBlock.findIndex((finalBlockElement) => JSON.stringify(finalBlockElement.location) === JSON.stringify(block[direction](i).location));
            if (newRodIndex >= 0) {
                changeNPC(newRodIndex, false);
            }
        }
    }
    else {
        throw new Error(`Invalid direction: ${direction}`);
    }
}
function setCameraView(x, player) {
    return __awaiter(this, void 0, void 0, function* () {
        if (x >= 19 && x <= 42) { //room1
            player.runCommandAsync(`camera ${player.name} set minecraft:free pos 30 120 92 facing 30 90 92`);
        }
        else if (x >= 44 && x <= 67) { //room2
            player.runCommandAsync(`camera ${player.name} set minecraft:free pos 11 120 44 facing 11 94 44`);
        }
        else if (x >= 69 && x <= 92) { //room3
            player.runCommandAsync(`camera ${player.name} set minecraft:free pos -14 120 44 facing -14 94 44`);
        }
        else if (x >= 94 && x <= 117) { //room4
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
function replayMessage(beginningMessage, fractions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fractions.length > 0) {
            const playerPlacedFractions = fractions.filter(fraction => fraction.startsWith("1")); //filters out the fractions
            const perfectRunFractions = fractions.filter(fraction => !fraction.startsWith("1")); //filters out the fractions
            if (perfectRunFractions.length > 0) { //if you've reached the end of the list
                const perfectRunFractionsSum = perfectRunFractions.join(" + ");
                overworld.runCommandAsync(`title @p actionbar ${perfectRunFractionsSum}`);
            }
            else if (playerPlacedFractions.length > 0) { //else if there are fractions print them
                const fractionsSum = playerPlacedFractions.join(" + ");
                overworld.runCommandAsync(`title @p actionbar ${beginningMessage} ${fractionsSum}`);
            }
        }
    });
}
export function replay(index) {
    return __awaiter(this, void 0, void 0, function* () {
        let beginningMessage = `To make 1/2 you placed: `;
        let fractions = [];
        let tpStart = `tp @p 31 96 107 facing 31 96 100`;
        let clearBlock = `fill 30 95 104 30 95 93 tallgrass replace`;
        let replenishGrass = `fill 30 94 104 30 94 93 grass_block replace`;
        overworld.runCommandAsync(clearBlock);
        overworld.runCommandAsync(replenishGrass);
        let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location.x === 30);
        let perfectRunToReplay = perfectRun.filter((rod) => rod.location && rod.location.x === 30);
        let combinedRods = rodsPlacedToReplay.concat(perfectRunToReplay);
        for (let i = 0; i < combinedRods.length; i++) {
            ((index) => {
                system.runTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    let x = combinedRods[index].location.x;
                    world.getAllPlayers().forEach((player) => __awaiter(this, void 0, void 0, function* () {
                        yield setCameraView(x, player);
                        world.sendMessage(`${combinedRods[index].successMessage}`);
                        fractions.push(combinedRods[index].successMessage);
                        yield replayMessage(beginningMessage, fractions);
                        let block = overworld.getBlock(combinedRods[index].location);
                        placeRods(block, combinedRods[index].blockName, combinedRods[index].rodLength, combinedRods[index].direction);
                        if (i === combinedRods.length - 1) {
                            //resets the camera 2 seconds after last rod placed.
                            endReplay(player, tpStart, clearBlock, replenishGrass);
                        }
                    }));
                }), 50 * index);
                return;
            })(i);
        }
    });
}
function endReplay(player, tpStart, clearCommand, replenishGrass) {
    system.runTimeout(() => {
        player.runCommandAsync(tpStart);
        player.runCommandAsync(clearCommand);
        player.runCommandAsync(replenishGrass);
        player.runCommandAsync(`camera ${player.name} clear`);
    }, 50);
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
        let rods = [
            { block: "red_concrete", amount: 10 },
            { block: "lime_concrete", amount: 10 },
            { block: "purple_concrete", amount: 10 },
            { block: "green_concrete", amount: 10 },
            { block: "brown_concrete", amount: 10 },
            { block: "yellow_concrete", amount: 10 },
            { block: "blue_concrete", amount: 10 },
        ];
        player.runCommandAsync(`clear ${player.name}`);
        for (let i = 0; i < rods.length; i++) {
            player.runCommandAsync(`give @p ${rods[i].block} ${rods[i].amount} 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`);
        }
    });
}
//# sourceMappingURL=rod.js.map