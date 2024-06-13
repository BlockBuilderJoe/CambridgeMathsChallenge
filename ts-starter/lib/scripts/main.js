import { world, system, BlockPermutation } from "@minecraft/server";
import { windowUndoHandler, windowScaleHandler } from "./scaler";
import { cuisenaire, getBlockBehind, resetGrid, giveRods, resetNPC, directionCheck } from "./rod";
import { cycleNumberBlock } from "./output";
import { facing } from "./playerFacing";
import { potionMaker, displayTimer, getSlots, giveIngredients } from "./potion";
import { giveWand } from "./wand";
import "./npcscriptEventHandler"; //handles the NPC script events
let overworld = world.getDimension("overworld");
let potion = "";
let seconds = 0;
let currentPlayer = null;
let potionStart = 0;
let potionDrank = false;
let meters = 0;
let rodsToRemove = [];
//welcome player
world.afterEvents.playerSpawn.subscribe((eventData) => {
    currentPlayer = eventData.player;
    let initialSpawn = eventData.initialSpawn;
    if (initialSpawn) {
        currentPlayer.sendMessage(`§3Welcome back ${currentPlayer.name}!`);
        giveWand();
    }
    else {
        currentPlayer.sendMessage(`§3Welcome ${currentPlayer.name}!`);
        giveWand();
    }
});
//listens for the button push event.
world.afterEvents.buttonPush.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    switch (`${event.block.location.x},${event.block.location.y},${event.block.location.z}`) {
        case "29,97,106": {
            let player = event.source; // Cast event.source to Player type
            rodsToRemove = []; //resets the rods to remove array
            yield resetNPC(13);
            yield giveRods();
            yield resetGrid({ x: 19, y: 95, z: 81 }); //top left corner of the area.
            break;
        }
        case "66,97,224": {
            overworld.runCommandAsync(`clear @p`);
            yield giveWand();
        }
        case "24,95,45": {
            let player = event.source; // Cast event.source to Player type
            //await replayRods(player, perfectRun); // Pass the casted player as an argument
            break;
        }
        case "1,97,151": {
            overworld.runCommandAsync(`clear @p`);
            overworld.runCommandAsync(`effect @p haste 9999 99 true`);
            yield giveWand();
            yield giveIngredients();
        }
    }
}));
//listens for the block place event.
world.afterEvents.playerPlaceBlock.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let block = event.block;
    let player = event.player;
    let colour = (_a = block.permutation) === null || _a === void 0 ? void 0 : _a.getState("color");
    if (colour) {
        //is it a rod block?
        if (block.location.y === 95) {
            //is it placed on the grid?
            let viewDirection = event.player.getViewDirection();
            let { direction, oppositeDirection } = yield facing(viewDirection);
            let correctDirection = yield directionCheck(block.location.x, block.location.z, direction);
            let hasColour = yield getBlockBehind(event, oppositeDirection);
            const rodPermutations = {
                red: { block: "red_concrete", value: 2, message: "1/12" },
                lime: { block: "lime_concrete", value: 3, message: "1/8" },
                purple: { block: "purple_concrete", value: 4, message: "1/6" },
                green: { block: "green_concrete", value: 6, message: "1/4" },
                brown: { block: "brown_concrete", value: 8, message: "1/3" },
                yellow: { block: "yellow_concrete", value: 12, message: "1/2" },
                blue: { block: "blue_concrete", value: 24, message: "1/1" },
            };
            if (!hasColour) {
                player.runCommandAsync(`title ${player.name} actionbar Place the rod in front of the magical connector.`);
                event.block.setPermutation(BlockPermutation.resolve("tallgrass"));
                return;
            }
            if (!correctDirection) {
                player.runCommandAsync(`title ${player.name} actionbar You're facing the wrong way.`);
                event.block.setPermutation(BlockPermutation.resolve("tallgrass"));
                return;
            }
            const rod = rodPermutations[colour];
            if (rod) {
                cuisenaire(block, rod.block, rod.value, rod.message, direction);
            }
        }
    }
}));
world.beforeEvents.playerBreakBlock.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let block = event.block;
    if ((_b = block.permutation) === null || _b === void 0 ? void 0 : _b.matches("hopper")) {
        event.cancel;
        overworld.runCommandAsync(`kill @e[type=item]`);
        let slots = yield getSlots(event);
        ({ potion, seconds } = yield potionMaker(slots));
    }
}));
//left click after break
world.afterEvents.playerBreakBlock.subscribe((clickEvent) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    let hand_item = (_c = clickEvent.itemStackAfterBreak) === null || _c === void 0 ? void 0 : _c.typeId; //gets the item in the players hand
    let block = clickEvent.block;
    let brokenBlock = clickEvent.brokenBlockPermutation;
    if (hand_item === "minecraft:stick") {
        if (brokenBlock.matches("blockbuilders:symbol_subtract") && block.location.z === 225) {
            // if it is the window vinculum run the undo function. 
            yield windowUndoHandler(block.location);
            block.setPermutation(BlockPermutation.resolve("blockbuilders:symbol_subtract"));
        }
        else if (block.location.x === 71 && block.location.y === 98 && block.location.z === 225 || block.location.x === 82 && block.location.y === 98 && block.location.z === 225) {
            // if it is the window numerator cycle the number. 
            cycleNumberBlock(clickEvent);
        }
        else {
            //if it is anything else replace the block. 
            block.setPermutation(brokenBlock);
        }
    }
}));
//right click
world.beforeEvents.itemUseOn.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    let block = event.block;
    if ((_d = block.permutation) === null || _d === void 0 ? void 0 : _d.matches("blockbuilders:symbol_subtract")) {
        yield windowScaleHandler(block.location);
    }
}));
//well
function applyPotionEffect(player, potion, seconds) {
    player.runCommand("scoreboard objectives setdisplay sidebar Depth");
    let tick = seconds * 20; //converts seconds to ticks
    potionStart = system.currentTick;
    switch (potion) {
        case "water_breathing": {
            player.addEffect("water_breathing", tick);
            break;
        }
        case "night_vision": {
            player.addEffect("night_vision", tick);
            break;
        }
        case "blindness": {
            player.addEffect("blindness", tick);
            break;
        }
        case "poison": {
            player.addEffect("poison", tick);
            break;
        }
        case "levitation": {
            player.addEffect("levitation", tick);
            break;
        }
    }
    player.runCommand("clear @p minecraft:glass_bottle");
}
function mainTick() {
    world.getAllPlayers().forEach((player) => {
        if (player.isInWater == true) {
            player.runCommand(`scoreboard objectives setdisplay sidebar Depth`);
            meters = 95 - Math.floor(player.location.y);
            player.runCommand(`scoreboard players set Meters Depth ${meters}`);
            if (potionDrank) {
                //applies the potion effect once
                applyPotionEffect(player, potion, seconds);
                potionDrank = false;
            }
            if (player.getEffect("water_breathing")) {
                displayTimer(potionStart, seconds, player, "Breathing underwater");
            }
            else if (player.getEffect("night_vision")) {
                displayTimer(potionStart, seconds, player, "Great work you can see in the dark for");
            }
            else if (player.getEffect("blindness")) {
                displayTimer(potionStart, seconds, player, "Oh no! The ratios were wrong, you can't see anything for");
            }
            else if (player.getEffect("levitation")) {
                displayTimer(potionStart, seconds, player, "Oh no! You're floating for");
            }
            if (player.isSneaking == true) {
                surface(player);
                //player.sendMessage("§fThat's poor form you can't try and sink faster, whatever happened to honour?");
            }
        }
    });
    system.run(mainTick);
}
function surface(player) {
    return __awaiter(this, void 0, void 0, function* () {
        player.runCommandAsync("scoreboard objectives setdisplay sidebar");
        player.teleport({ x: -3, y: 96, z: 144 });
        player.addEffect("instant_health", 5);
        player.removeEffect("blindness");
        player.removeEffect("night_vision");
        player.removeEffect("water_breathing");
    });
}
//listens for the potion to be fully drunk.
world.afterEvents.itemCompleteUse.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    let player = event.source;
    if (((_e = event.itemStack) === null || _e === void 0 ? void 0 : _e.typeId) === "minecraft:potion") {
        if (potion === "poison") {
            player.sendMessage("§fYou mixed the potion with the §2wrong ingredients. \n§fIt has had no effect.\nMake sure you're using the correct ingredients.");
        }
        else {
            potionDrank = true;
            player.sendMessage("§fYou drank the potion. \n§2Jump in the well §fto see the effect.");
        }
        event.source.runCommand("clear @p minecraft:glass_bottle");
    }
}));
//listens for the entity health changed event so they don't drown.
world.afterEvents.entityHealthChanged.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.entity.typeId === "minecraft:player") {
        let player = event.entity;
        if (player.isInWater == true) {
            if (event.newValue === 18) {
                player.runCommandAsync("scoreboard objectives setdisplay sidebar");
                yield surface(player);
                player.sendMessage(`§fYou made it to a depth of: §2${meters} meters \n§fOnly ${98 - meters} meters to the bottom. `);
            }
        }
    }
}));
system.run(mainTick);
//# sourceMappingURL=main.js.map