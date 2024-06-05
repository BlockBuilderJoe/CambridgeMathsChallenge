import { world, system, BlockPermutation } from "@minecraft/server";
import { calculate } from "./calculator";
import { fraction1 } from "./fraction";
import { ratio1 } from "./ratio";
import { scale, resetArea } from "./scaler";
import { cuisenaire, getBlockBehind, resetGrid, giveRods, resetNPC, directionCheck } from "./rod";
import { cycleNumberBlock } from "./output";
import { facing } from "./playerFacing";
import { potionMaker, displayTimer } from "./potion";
import "./npcscriptEventHandler"; //handles the NPC script events
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
        currentPlayer.runCommandAsync(`give @p[hasitem={item=stick,quantity=0}] stick 1 0 {"item_lock": { "mode": "lock_in_slot" }}`);
    }
    else {
        currentPlayer.sendMessage(`<BlockBuilderAI> §3Welcome ${currentPlayer.name}!`);
        currentPlayer.runCommandAsync(`give @a[hasitem={item=stick,quantity=0}] stick 1 0 {"item_lock": { "mode": "lock_in_slot" }}`);
    }
});
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
        case "39,95,31": {
            let player = event.source; // Cast event.source to Player type
            rodsToRemove = []; //resets the rods to remove array
            yield resetNPC(2);
            yield giveRods(player, rodsToRemove);
            yield resetGrid({ x: -50, y: 94, z: 33 });
            break;
        }
        case "24,95,45": {
            let player = event.source; // Cast event.source to Player type
            //await replayRods(player, perfectRun); // Pass the casted player as an argument
            break;
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
        if (block.location.y === 94) {
            //is it placed on the grid?
            let viewDirection = event.player.getViewDirection();
            let { direction, oppositeDirection } = yield facing(viewDirection);
            let correctDirection = yield directionCheck(block.location.x, block.location.z, direction);
            let hasColour = yield getBlockBehind(event, oppositeDirection);
            const rodPermutations = {
                red: { block: "red_concrete", value: 2, message: "Placed a twelth rod" },
                lime: { block: "lime_concrete", value: 3, message: "Placed an eigth rod" },
                purple: { block: "purple_concrete", value: 4, message: "Placed a sixth rod" },
                green: { block: "green_concrete", value: 6, message: "Placed a quarter rod" },
                brown: { block: "brown_concrete", value: 8, message: "Placed a third rod" },
                yellow: { block: "yellow_concrete", value: 12, message: "Placed a half rod" },
                blue: { block: "blue_concrete", value: 24, message: "Placed a whole rod" },
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
world.afterEvents.playerBreakBlock.subscribe((clickEvent) => {
    var _a;
    let hand_item = (_a = clickEvent.itemStackAfterBreak) === null || _a === void 0 ? void 0 : _a.typeId; //gets the item in the players hand
    if (hand_item === "minecraft:stick") {
        cycleNumberBlock(clickEvent);
    }
});
world.beforeEvents.itemUseOn.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    if (((_b = event.itemStack) === null || _b === void 0 ? void 0 : _b.typeId) === "minecraft:stick") {
        let block = event.block;
        if ((_c = block.permutation) === null || _c === void 0 ? void 0 : _c.matches("hopper")) {
            event.cancel = true;
            ({ potion, seconds } = yield potionMaker(event));
        }
    }
}));
//wellwellwell
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
            meters = 58 - Math.floor(player.location.y);
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
        player.teleport({ x: -50, y: 60, z: 132 });
        player.addEffect("instant_health", 5);
        player.removeEffect("blindness");
        player.removeEffect("night_vision");
        player.removeEffect("water_breathing");
        player.runCommand("scoreboard objectives setdisplay sidebar");
    });
}
//listens for the potion to be fully drunk.
world.afterEvents.itemCompleteUse.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    let player = event.source;
    if (((_d = event.itemStack) === null || _d === void 0 ? void 0 : _d.typeId) === "minecraft:potion") {
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
            yield surface(player);
            //player.sendMessage(`§fYou made it to a depth of: §2${meters} meters \n§fOnly ${98 - meters} meters to the bottom. `);
        }
    }
}));
system.run(mainTick);
//# sourceMappingURL=main.js.map