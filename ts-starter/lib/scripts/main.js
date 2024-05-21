import { world, system, BlockPermutation } from "@minecraft/server";
import { calculate } from "./calculator";
import { fraction1 } from "./fraction";
import { ratio1 } from "./ratio";
import { scale, resetArea } from "./scaler";
import { cuisenaire, getBlockBehind, replayRods, resetGrid } from "./rod";
import { cycleNumberBlock } from "./output";
import { facing } from "./playerFacing";
import { potionMaker, displayTimer } from "./potion";
let potion = "";
let seconds = 0;
let currentPlayer = null;
let potionStart = 0;
let potionDrank = false;
let meters = 0;
let rodsPlaced = [];
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
        case "-3,-60,90": {
            world.getDimension("overworld").runCommand("function lava");
            break;
        }
        case "38,95,31": {
            rodsPlaced = []; //resets the rods placed array
            world.getDimension("overworld").runCommand("function lava");
            yield resetGrid({ x: -50, y: 94, z: 33 });
            break;
        }
        case "24,95,45": {
            let player = event.source; // Cast event.source to Player type
            let perfectRun = [{ location: { z: 33, y: 94, x: 37 }, direction: "south", rodLength: 12, blockName: "yellow_concrete" }, { location: { z: 45, y: 94, x: 36 }, direction: "west", rodLength: 12, blockName: "yellow_concrete" }];
            yield replayRods(rodsPlaced, player, perfectRun); // Pass the casted player as an argument
            break;
        }
    }
}));
//listens for the block place event.
world.afterEvents.playerPlaceBlock.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let block = event.block;
    if ((_a = block.permutation) === null || _a === void 0 ? void 0 : _a.getState("color")) {
        if (block.location.y === 94) {
            let viewDirection = event.player.getViewDirection();
            let { direction, oppositeDirection } = yield facing(viewDirection);
            let hasColour = yield getBlockBehind(event, oppositeDirection);
            if (hasColour) { //checks if the block has a colour (meaning it's a cuisenaire rod block)
                if ((_b = block.permutation) === null || _b === void 0 ? void 0 : _b.matches("red_concrete")) {
                    cuisenaire(block, "red_concrete", 2, "Placed a twelth rod", direction, rodsPlaced);
                }
                else if ((_c = block.permutation) === null || _c === void 0 ? void 0 : _c.matches("lime_concrete")) {
                    cuisenaire(block, "lime_concrete", 3, "Placed an eigth rod", direction, rodsPlaced);
                }
                else if ((_d = block.permutation) === null || _d === void 0 ? void 0 : _d.matches("purple_concrete")) {
                    cuisenaire(block, "purple_concrete", 4, "Placed a sixth rod", direction, rodsPlaced);
                }
                else if ((_e = block.permutation) === null || _e === void 0 ? void 0 : _e.matches("green_concrete")) {
                    cuisenaire(block, "green_concrete", 6, "Placed a quarter rod", direction, rodsPlaced);
                }
                else if ((_f = block.permutation) === null || _f === void 0 ? void 0 : _f.matches("brown_concrete")) {
                    cuisenaire(block, "brown_concrete", 8, "Placed a third rod", direction, rodsPlaced);
                }
                else if ((_g = block.permutation) === null || _g === void 0 ? void 0 : _g.matches("yellow_concrete")) {
                    cuisenaire(block, "yellow_concrete", 12, "Placed a half rod", direction, rodsPlaced);
                }
                else if ((_h = block.permutation) === null || _h === void 0 ? void 0 : _h.matches("blue_concrete")) {
                    cuisenaire(block, "blue_concrete", 24, "Placed a whole rod", direction, rodsPlaced);
                }
            }
            else {
                world.sendMessage("You need to place a cuisenaire rod block first.");
                event.block.setPermutation(BlockPermutation.resolve("air"));
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
    var _j, _k;
    if (((_j = event.itemStack) === null || _j === void 0 ? void 0 : _j.typeId) === "minecraft:stick") {
        let block = event.block;
        if ((_k = block.permutation) === null || _k === void 0 ? void 0 : _k.matches("hopper")) {
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
            if (potionDrank) { //applies the potion effect once
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
    var _l;
    let player = event.source;
    if (((_l = event.itemStack) === null || _l === void 0 ? void 0 : _l.typeId) === "minecraft:potion") {
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