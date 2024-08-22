import { BlockPermutation, world, system, } from "@minecraft/server";
import { perfectRun, validRanges, finalBlock, replaySettings, npcLocation } from "./perfectRun";
let overworld = world.getDimension("overworld");
let rodsPlaced = [];
let checkPoint = "tp @p 29 96 114 facing 29 96 112";
//tickingarea add -447.91 -27.00 73.83 -326.23 -27.00 78.08 mapArea true
export function startCuisenaireTutorial() {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync(`camera @p fade time 0.1 2 0.4`);
        yield overworld.runCommandAsync(`tp @p -386 -31 126`);
        yield overworld.runCommandAsync(`tp @e[tag=fractionNpc] -391 -31 126`);
        yield overworld.runCommandAsync(`dialogue open @e[tag=fractionNpc] @p fractionNpc7`);
        yield overworld.runCommandAsync(`replaceitem entity @p slot.weapon.offhand 0 filled_map`);
    });
}
export function resetCuisenaireGame() {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync(`tp @p 29 96 114 facing 29 96 112`);
        yield overworld.runCommandAsync(`tp @e[tag=fractionNpc] 29 96 112 facing 29 96 114`);
        yield overworld.runCommandAsync(`scoreboard objectives setdisplay sidebar Students`);
        yield overworld.runCommandAsync(`scoreboard players set Saved Students 0`);
        yield resetNPC(9);
        yield resetGrid({ x: 19, y: 95, z: 81 }); //top left corner of the area.
    });
}
export function startCuisenaireGame() {
    return __awaiter(this, void 0, void 0, function* () {
        yield giveRods();
        yield giveMap();
        yield resetCuisenaireGame();
    });
}
export function giveMap() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let chest = (_a = overworld.getBlock({ x: 30, y: 91, z: 107 })) === null || _a === void 0 ? void 0 : _a.getComponent("inventory");
        let map = (_b = chest.container) === null || _b === void 0 ? void 0 : _b.getItem(0);
        overworld.getPlayers().forEach((player) => {
            var _a;
            const getPlayerInventoryComponent = player.getComponent("inventory");
            if (map) {
                (_a = getPlayerInventoryComponent.container) === null || _a === void 0 ? void 0 : _a.setItem(22, map);
            }
            else {
                world.sendMessage(`Error: Map not found it needs to be placed in the chest at 30 90 107`);
            }
        });
    });
}
export function moveNpc(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let { x, y, z } = getRandomCoordinate();
        overworld.runCommandAsync(`tp @e[tag=rodNpc${id}] ${x} ${y} ${z}`);
        overworld.runCommandAsync(`scoreboard players add Saved Students 1`);
        overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${id}] rodNpc${id}Saved`);
        overworld.runCommandAsync(`tp @e[tag=fractionNpc] ${npcLocation[id].x} ${npcLocation[id].y} ${npcLocation[id].z}`);
        checkPoint = replaySettings[id + 1].tpStart; //sets the checkpoint to the start location of the next rod from replaySettings
        overworld.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc5`);
    });
}
export function movePlayerToCheckpoint() {
    return __awaiter(this, void 0, void 0, function* () {
        let player = world.getPlayers()[0];
        let locationBeforeTp = player.location;
        yield overworld.runCommandAsync(checkPoint);
        //gets rid of lightblock and replaces it with grass. Light block reqired to stop dialogue triggering twice.
        yield overworld.runCommandAsync(`fill ${locationBeforeTp.x - 5} 95 ${locationBeforeTp.z - 5} ${locationBeforeTp.x + 5} 95 ${locationBeforeTp.z + 5} short_grass replace light_block`);
        //moves player to checkpoint
    });
}
function getRandomCoordinate() {
    const minX = 19;
    const maxX = 28;
    const y = 96;
    const minZ = 106;
    const maxZ = 110;
    const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const z = Math.floor(Math.random() * (maxZ - minZ + 1)) + minZ;
    return { x, y, z };
}
export function directionCheck(x, z, direction) {
    return __awaiter(this, void 0, void 0, function* () {
        let correctDirection = false;
        for (const range of validRanges) {
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
                    overworld.runCommandAsync(`give @p ${blockName} 1 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`);
                    runPlaceRods = false;
                    break;
                }
            }
            if (runPlaceRods) {
                let rodToPlace = {
                    location: block.location,
                    direction: direction,
                    rodLength: rodLength,
                    blockName: blockName,
                    successMessage: successMessage,
                };
                rodsPlaced.push(rodToPlace);
                placeRods(block, blockName, rodLength, direction);
                checkFinalBlock(block, direction, rodLength);
            }
            else {
                block === null || block === void 0 ? void 0 : block.setPermutation(BlockPermutation.resolve("tallgrass"));
            }
        }
    });
}
export function resetNPC(npcAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        rodsPlaced = []; //resets the rods placed array.
        for (let i = 0; i < npcAmount; i++) {
            overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${i}] rodNpc${i}Default`);
            overworld.runCommandAsync(
            //tps the npc back based on the location parameter in npcLocation.
            `tp @e[tag=rodNpc${i}] ${npcLocation[i].x} ${npcLocation[i].y} ${npcLocation[i].z}`);
        }
    });
}
function queueSound(index) {
    return __awaiter(this, void 0, void 0, function* () {
        system.runTimeout(() => {
            overworld.runCommandAsync(`playsound note.xylophone @p`);
        }, index * 10);
    });
}
function placeRods(block, blockName, rodLength, direction) {
    const validDirections = ["east", "west", "north", "south"];
    if (validDirections.includes(direction)) {
        for (let i = 0; i < rodLength; i++) {
            //queues a sound for each block of the rod placed.
            queueSound(i);
            block[direction](i).setPermutation(BlockPermutation.resolve(blockName));
        }
    }
    else {
        throw new Error(`Invalid direction: ${direction}`);
    }
}
function setCameraView(player, index) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (index) {
            case 0: //gap1
                player.runCommandAsync(`camera ${player.name} set minecraft:free pos 30 120 99 facing 30 90 99`);
                break;
            case 1: //gap2
                player.runCommandAsync(`camera ${player.name} set minecraft:free pos 37 120 92 facing 37 90 92`);
                break;
            case 2: //gap3
                player.runCommandAsync(`camera ${player.name} set minecraft:free pos 45 107 91 facing 45 90 91`);
                break;
            case 3: //gap4
                player.runCommandAsync(`camera ${player.name} set minecraft:free pos 57 110 86 facing 57 90 86`);
                break;
            case 4: //gap5
                player.runCommandAsync(`camera ${player.name} set minecraft:free pos 66 109 93 facing 66 90 93`);
                break;
            case 5: //gap6
                player.runCommandAsync(`camera ${player.name} set minecraft:free pos 89 116 100 facing 89 90 100`);
                break;
            case 6: //gap7
                player.runCommandAsync(`camera ${player.name} set minecraft:free pos 90 113 93 facing 90 90 93`);
                break;
            case 7: //gap8
                player.runCommandAsync(`camera ${player.name} set minecraft:free pos 80 106 85 facing 80 90 85`);
                break;
            case 8: //gap9
                player.runCommandAsync(`camera ${player.name} set minecraft:free pos 93 106 85 facing 93 90 85`);
                break;
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
        if (fractions) {
            if (fractions.length > 0) {
                const playerPlacedFractions = fractions.filter((fraction) => fraction !== undefined && fraction.startsWith("1")); // filters out the fractions
                const perfectRunFractions = fractions.filter((fraction) => fraction !== undefined && !fraction.startsWith("1")); //filters out the fractions
                if (perfectRunFractions.length > 0) {
                    //if you've reached the end of the list
                    const perfectRunFractionsSum = perfectRunFractions.join(" + ");
                    overworld.runCommandAsync(`title @p actionbar ${perfectRunFractionsSum}`);
                }
                else if (playerPlacedFractions.length > 0) {
                    //else if there are fractions print them
                    const fractionsSum = playerPlacedFractions.join(" + ");
                    overworld.runCommandAsync(`title @p actionbar ${beginningMessage} ${fractionsSum}`);
                }
            }
        }
        else {
            world.sendMessage(`Error: No fractions found`);
        }
    });
}
export function replay(index) {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${index}] rodNpc${index}Default`);
        overworld.runCommandAsync(`tp @p 31 96 116`); //moves the player out of frame.
        //sets up the arrays.
        let npcIndex = index;
        let fractions = [];
        let combinedRods = [];
        let replayConfig = replaySettings[index]; //stores all the replay settings for the different rods.
        //cleans the area up
        overworld.runCommandAsync(replayConfig.clearBlock);
        overworld.runCommandAsync(replayConfig.replenishGrass);
        //filters the rods placed for this gap.
        const direction = replayConfig.cartesianDirection;
        const value = replayConfig.cartesionValue;
        let rodsPlacedToReplay = rodsPlaced.filter((rod) => rod.location && rod.location[direction] === value);
        rodsPlaced = rodsPlaced.filter((rod) => !(rod.location && rod.location[direction] === value));
        //gives the player the rods they placed back before replay.
        for (let i = 0; i < rodsPlacedToReplay.length; i++) {
            overworld.runCommandAsync(`give @p ${rodsPlacedToReplay[i].blockName} 1 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`);
        }
        //filters the perfectRun list based on the index.
        let perfectRunToReplay = perfectRun.filter((rod) => rod.number === index); //gets the perfect rods from the number component.
        //concantentates the rods placed and the perfect rods together.
        combinedRods = rodsPlacedToReplay.concat(perfectRunToReplay);
        //Runs the replay using the combinedRods array.
        if (combinedRods.length > 0) {
            for (let i = 0; i < combinedRods.length; i++) {
                ((index) => {
                    system.runTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        let x = combinedRods[index].location.x;
                        world.getAllPlayers().forEach((player) => __awaiter(this, void 0, void 0, function* () {
                            yield setCameraView(player, npcIndex);
                            fractions.push(combinedRods[index].successMessage);
                            yield replayMessage(replayConfig.beginningMessage, fractions);
                            let block = overworld.getBlock(combinedRods[index].location);
                            placeRods(block, combinedRods[index].blockName, combinedRods[index].rodLength, combinedRods[index].direction);
                            if (i === combinedRods.length - 1) {
                                //resets the camera 2 seconds after last rod placed.
                                endReplay(player, replayConfig.tpStart, replayConfig.clearBlock, replayConfig.replenishGrass, combinedRods);
                            }
                        }));
                    }), 50 * index);
                    return;
                })(i);
            }
        }
    });
}
function endReplay(player, tpStart, clearCommand, replenishGrass, combinedRods) {
    system.runTimeout(() => {
        player.runCommandAsync(tpStart);
        player.runCommandAsync(clearCommand);
        player.runCommandAsync(replenishGrass);
        player.runCommandAsync(`camera ${player.name} clear`);
        combinedRods = []; //clears the combined rods to stop looping values
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
        let concreteColours = ["red", "green", "purple", "brown", "blue", "lime", "yellow", "orange", "pink"]; // What rods will be replaced.
        for (let i = 0; i < 4; i++) {
            let offset_x = location.x + i * 25; // 25 is the distance between each starting point of the grid.
            let pos1 = { x: offset_x, y: location.y, z: location.z };
            let pos2 = { x: offset_x + 24, y: location.y, z: location.z + 24 };
            yield squareReset(pos1, pos2, concreteColours);
        }
    });
}
export function giveRods() {
    return __awaiter(this, void 0, void 0, function* () {
        let rods = [
            { block: "green_concrete", amount: 2 },
            { block: "orange_concrete", amount: 4 },
            { block: "purple_concrete", amount: 3 },
            { block: "lime_concrete", amount: 3 },
            { block: "yellow_concrete", amount: 2 },
            { block: "red_concrete", amount: 1 },
            { block: "pink_concrete", amount: 1 },
        ];
        //overworld.runCommandAsync(`clear @p`);
        overworld.runCommandAsync(`gamemode adventure`);
        for (let i = 0; i < rods.length; i++) {
            overworld.runCommandAsync(`replaceitem entity @p slot.hotbar ${i} ${rods[i].block} ${rods[i].amount} 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`);
        }
    });
}
function checkFinalBlock(block, direction, rodLength) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let rodEnd = block[direction](rodLength - 1);
        let hasColour = (_a = rodEnd.permutation) === null || _a === void 0 ? void 0 : _a.getState("color");
        let rodEndLocation = rodEnd.location;
        //Does it match the expected final block and start block?
        const isCorrectFinalBlock = finalBlock.find((block) => {
            var _a, _b;
            const rodStart = overworld.getBlock(block.startLocation);
            return (((_a = rodEnd === null || rodEnd === void 0 ? void 0 : rodEnd.permutation) === null || _a === void 0 ? void 0 : _a.matches(block.blockName)) &&
                rodEndLocation.x === block.location.x &&
                rodEndLocation.z === block.location.z &&
                ((_b = rodStart === null || rodStart === void 0 ? void 0 : rodStart.permutation) === null || _b === void 0 ? void 0 : _b.matches(block.startBlockName)));
        });
        //Is it the wrong block in the right place?
        const isIncorrectFinalBlock = finalBlock.find((block) => {
            var _a;
            return !((_a = rodEnd === null || rodEnd === void 0 ? void 0 : rodEnd.permutation) === null || _a === void 0 ? void 0 : _a.matches(block.blockName)) &&
                rodEndLocation.x === block.location.x &&
                rodEndLocation.z === block.location.z;
        });
        if (isCorrectFinalBlock) {
            //Correct rod in the right place
            changeNPC(isCorrectFinalBlock.number, true);
        }
        else if (isIncorrectFinalBlock) {
            changeNPC(isIncorrectFinalBlock.number, false);
        }
        // Checks if the rodEnd has a colour, if it does, it will change the NPC to the fail state.
    });
}
function changeNPC(matchingRodIndex, win) {
    return __awaiter(this, void 0, void 0, function* () {
        //changes the NPC to the success state based on the matchingRodIndex in cuisenaire function.
        if (win) {
            overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Win`);
        }
        else {
            //changes the NPC
            overworld.runCommandAsync(`dialogue change @e[tag=rodNpc${matchingRodIndex}] rodNpc${matchingRodIndex}Fail`);
        }
    });
}
export function moveGroundsKeeper(location) {
    return __awaiter(this, void 0, void 0, function* () {
        const locations = [
            { x: 32, y: 101, z: 79 },
            { x: 56, y: 101, z: 79 },
            { x: 94, y: 101, z: 79 },
        ];
        let closestLocation = locations[0];
        let minDistance = calculateDistance(location, closestLocation);
        for (let i = 1; i < locations.length; i++) {
            const distance = calculateDistance(location, locations[i]);
            if (distance < minDistance) {
                minDistance = distance;
                closestLocation = locations[i];
            }
        }
        overworld.runCommandAsync(`tp @e[tag=groundskeeper] ${closestLocation.x} ${closestLocation.y} ${closestLocation.z}`);
    });
}
function calculateDistance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
}
//# sourceMappingURL=cuisenaireRods.js.map