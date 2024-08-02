import { BlockPermutation, system, world } from "@minecraft/server";
import { getBlockValue } from "./input";
import { giveWand } from "./wand";
let overworld = world.getDimension("overworld");
export function resetPotionGame() {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync("tp @e[tag=coin1] -6 90 155");
        yield overworld.runCommandAsync("tp @e[tag=coin2] -5 86 154");
        yield overworld.runCommandAsync("tp @e[tag=coin3] -6 82 155");
        yield overworld.runCommandAsync("tp @e[tag=coin4] -5 78 154");
        yield overworld.runCommandAsync("tp @e[tag=coin5] -6 75 155");
        yield overworld.runCommandAsync("tp @e[tag=coin6] -5 75 154");
        yield overworld.runCommandAsync("fill -7 97 139 -3 97 139 minecraft:air");
        yield overworld.runCommandAsync("fill -3 126 138 -7 126 138 minecraft:black_concrete");
        yield resetArea();
    });
}
export function startPotionGame() {
    return __awaiter(this, void 0, void 0, function* () {
        yield overworld.runCommandAsync(`clear @p`);
        yield overworld.runCommandAsync("fill -3 126 138 -7 126 138 minecraft:air");
        yield giveWand();
        yield giveIngredients();
    });
}
export function getSlots(hopper) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let slots = [];
        for (let i = 0; i <= 4; i++) {
            let item = (_a = hopper === null || hopper === void 0 ? void 0 : hopper.container) === null || _a === void 0 ? void 0 : _a.getItem(i);
            slots.push({
                slotNumber: i,
                amount: item === null || item === void 0 ? void 0 : item.amount,
                typeId: item === null || item === void 0 ? void 0 : item.typeId,
            });
        }
        return slots;
    });
}
function givePotion() {
    return __awaiter(this, void 0, void 0, function* () {
        world.getDimension("overworld").runCommandAsync(`clear @p minecraft:potion`);
        world.getDimension("overworld").runCommandAsync(`give @p minecraft:potion 1`);
    });
}
function calculateRatio(ingredients) {
    return __awaiter(this, void 0, void 0, function* () {
        //remaps ingredients from Minecraft name to in game name.
        let carrot = ingredients.carrot;
        let glowDust = ingredients.apple;
        let kelp = ingredients.potato;
        let pufferFish = ingredients.beetroot;
        let mermaidTears = ingredients.melon;
        const hasIngredients = carrot + glowDust + kelp + pufferFish + mermaidTears > 0;
        //calculates the ratio of ingredients. Testing for correct ratio and wrong ratio.
        const isCorrectNightVisionPotion = carrot * 5 === glowDust * 3 && kelp + pufferFish + mermaidTears === 0 && hasIngredients;
        const isCorrectWaterBreathingPotion = kelp * 40 === pufferFish * 24 && kelp * 40 === mermaidTears * 15 && carrot + glowDust === 0 && hasIngredients;
        const isWrongNightVisionPotion = carrot * 5 !== glowDust * 3 && kelp + pufferFish + mermaidTears === 0 && hasIngredients;
        const isWrongWaterBreathingPotion = (kelp * 40 !== pufferFish * 24 || kelp * 40 !== mermaidTears * 15) && carrot + glowDust === 0 && hasIngredients;
        //maps the correct outcomes of the potion game to the correct potion and seconds.
        if (hasIngredients) {
            if (isCorrectNightVisionPotion) {
                return { potion: "night_vision", seconds: 5 };
            }
            else if (isCorrectWaterBreathingPotion) {
                return { potion: "water_breathing", seconds: mermaidTears };
            }
            else if (isWrongNightVisionPotion) {
                return { potion: "blindness", seconds: 4 };
            }
            else if (isWrongWaterBreathingPotion) {
                return { potion: "levitation", seconds: 4 };
            }
            else {
                return { potion: "empty", seconds: 0 };
            }
        }
        else {
            return { potion: "none", seconds: 0 };
        }
    });
}
function barChart(slots) {
    return __awaiter(this, void 0, void 0, function* () {
        let ingredients = {
            apple: 0,
            carrot: 0,
            potato: 0,
            beetroot: 0,
            melon: 0,
        };
        for (let slot of slots) {
            switch (slot.typeId) {
                case "minecraft:apple": {
                    yield setGlass(slot, "red_stained_glass");
                    yield setItemFrame(0, slot.slotNumber);
                    ingredients.apple = (ingredients.apple || 0) + slot.amount;
                    break;
                }
                case "minecraft:carrot": {
                    yield setGlass(slot, "orange_stained_glass");
                    yield setItemFrame(1, slot.slotNumber);
                    ingredients.carrot = (ingredients.carrot || 0) + slot.amount;
                    break;
                }
                case "minecraft:potato": {
                    yield setGlass(slot, "yellow_stained_glass");
                    yield setItemFrame(2, slot.slotNumber);
                    ingredients.potato = (ingredients.potato || 0) + slot.amount;
                    break;
                }
                case "minecraft:beetroot": {
                    yield setGlass(slot, "purple_stained_glass");
                    yield setItemFrame(3, slot.slotNumber);
                    ingredients.beetroot = (ingredients.beetroot || 0) + slot.amount;
                    break;
                }
                case "minecraft:melon_slice": {
                    yield setGlass(slot, "green_stained_glass");
                    yield setItemFrame(4, slot.slotNumber);
                    ingredients.melon = (ingredients.melon || 0) + slot.amount;
                    break;
                }
                default: {
                    //empty
                    yield setItemFrame(5, slot.slotNumber);
                    break;
                }
            }
        }
        return ingredients;
    });
}
function setGlass(slot, blockName) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        let { block } = getBlockValue({ x: -7, y: 97, z: 138 });
        (_a = block === null || block === void 0 ? void 0 : block.east(slot.slotNumber)) === null || _a === void 0 ? void 0 : _a.setPermutation(BlockPermutation.resolve(blockName));
        if (slot.amount > 20) {
            slot.amount = 20;
        }
        for (let i = 0; i < slot.amount; i++) {
            (_c = (_b = block === null || block === void 0 ? void 0 : block.above(i)) === null || _b === void 0 ? void 0 : _b.east(slot.slotNumber)) === null || _c === void 0 ? void 0 : _c.setPermutation(BlockPermutation.resolve(blockName));
        }
    });
}
function setItemFrame(offset_z, slotNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        let cloneFrom = -7 + offset_z;
        let cloneTo = -7 + slotNumber;
        world
            .getDimension("overworld")
            .runCommandAsync(`clone ${cloneFrom} 121 139 ${cloneFrom} 121 139 ${cloneTo} 97 139 replace`);
    });
}
export function potionMaker(slots) {
    return __awaiter(this, void 0, void 0, function* () {
        yield resetArea();
        let ingredients = yield barChart(slots);
        let { potion, seconds } = yield calculateRatio(ingredients);
        if (potion !== "empty" && potion !== "none") {
            yield givePotion();
        }
        return { potion, seconds };
    });
}
function resetArea() {
    return __awaiter(this, void 0, void 0, function* () {
        yield world.getDimension("overworld").runCommandAsync("fill -7 96 138 -3 116 138 black_stained_glass replace");
    });
}
export function giveIngredients() {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommand("replaceitem entity @p slot.hotbar 1 apple 20");
        overworld.runCommand("replaceitem entity @p slot.hotbar 2 carrot 20");
        overworld.runCommand("replaceitem entity @p slot.hotbar 3 beetroot 20");
        overworld.runCommand("replaceitem entity @p slot.hotbar 4 potato 20");
        overworld.runCommand("replaceitem entity @p slot.hotbar 5 melon_slice 20");
    });
}
export function displayTimer(potionStart, seconds, player, potionDescription) {
    let timeLeft = (potionStart + seconds * 20 - system.currentTick) / 20;
    if (timeLeft % 1 === 0) {
        player.onScreenDisplay.setActionBar(`Time left:\n ${potionDescription} ${timeLeft} seconds`);
    }
}
//# sourceMappingURL=potionGame.js.map