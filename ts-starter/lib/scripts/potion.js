import { BlockPermutation, system, world } from "@minecraft/server";
import { getBlockValue } from "./input";
function getSlots(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let hopper = event.block.getComponent("inventory");
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
        let wrongIngredientsSight = ingredients.potato + ingredients.beetroot + ingredients.melon;
        let wrongIngredientsDive = ingredients.apple + ingredients.carrot;
        let appleRatio = ingredients.apple + ingredients.potato + ingredients.beetroot + ingredients.melon;
        let carrotRatio = ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
        let potatoRatio = ingredients.potato + ingredients.apple + ingredients.carrot;
        let beetrootRatio = ingredients.beetroot + ingredients.apple + ingredients.carrot;
        let melonRatio = ingredients.melon + ingredients.apple + ingredients.carrot;
        let total = ingredients.apple + ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
        let nightVision = carrotRatio / appleRatio;
        let beetrootMelonRatio = beetrootRatio / melonRatio;
        let melonPotatoRatio = melonRatio / potatoRatio;
        if (beetrootMelonRatio === 1.5 && melonPotatoRatio === 2) {
            let potion = "water_breathing";
            let seconds = Math.ceil(beetrootRatio + melonRatio + potatoRatio);
            return { potion, seconds };
        }
        else if (nightVision === 2) {
            let potion = "night_vision";
            let seconds = Math.ceil(ingredients.apple + ingredients.carrot);
            return { potion, seconds };
        }
        else if (wrongIngredientsSight === 0 && potatoRatio + carrotRatio > 0) {
            let seconds = Math.ceil(potatoRatio + carrotRatio);
            let potion = "blindness";
            return { potion, seconds };
        }
        else if (wrongIngredientsDive === 0 && beetrootRatio + melonRatio + potatoRatio > 0) {
            let seconds = Math.ceil(beetrootRatio + melonRatio + potatoRatio);
            let potion = "levitation";
            return { potion, seconds };
        }
        else if (total === 0) {
            let seconds = 0;
            let potion = "empty";
            return { potion, seconds };
        }
        else {
            let seconds = Math.ceil((appleRatio + carrotRatio) / 10);
            let potion = "poison";
            return { potion, seconds };
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
        let { block } = getBlockValue({ x: -52, y: 61, z: 126 });
        (_a = block === null || block === void 0 ? void 0 : block.north(slot.slotNumber)) === null || _a === void 0 ? void 0 : _a.setPermutation(BlockPermutation.resolve(blockName));
        if (slot.amount > 10) {
            slot.amount = 10;
        }
        for (let i = 0; i < slot.amount; i++) {
            (_c = (_b = block === null || block === void 0 ? void 0 : block.above(i)) === null || _b === void 0 ? void 0 : _b.north(slot.slotNumber)) === null || _c === void 0 ? void 0 : _c.setPermutation(BlockPermutation.resolve(blockName));
        }
    });
}
function setItemFrame(offset_z, slotNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        let cloneFrom = 126 - offset_z;
        let cloneTo = 126 - slotNumber;
        world
            .getDimension("overworld")
            .runCommandAsync(`clone -40 60 ${cloneFrom} -40 60 ${cloneFrom} -50 60 ${cloneTo} replace`);
    });
}
export function potionMaker(event) {
    return __awaiter(this, void 0, void 0, function* () {
        yield resetArea();
        let slots = yield getSlots(event);
        let ingredients = yield barChart(slots);
        let { potion, seconds } = yield calculateRatio(ingredients);
        if (potion !== "empty") {
            yield givePotion();
        }
        return { potion, seconds };
    });
}
function resetArea() {
    return __awaiter(this, void 0, void 0, function* () {
        yield world.getDimension("overworld").runCommandAsync("fill -52 60 126 -52 69 122 black_stained_glass replace");
    });
}
export function displayTimer(potionStart, seconds, player, potionDescription) {
    let timeLeft = (potionStart + seconds * 20 - system.currentTick) / 20;
    if (timeLeft % 1 === 0) {
        player.onScreenDisplay.setActionBar(`Time left:\n ${potionDescription} ${timeLeft} seconds`);
    }
}
;
//# sourceMappingURL=potion.js.map