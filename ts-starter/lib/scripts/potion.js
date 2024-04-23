import { BlockPermutation, world } from "@minecraft/server";
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
                typeId: item === null || item === void 0 ? void 0 : item.typeId
            });
        }
        ;
        return slots;
    });
}
;
function givePotion() {
    return __awaiter(this, void 0, void 0, function* () {
        world.getDimension("overworld").runCommandAsync(`clear @p minecraft:potion`);
        world.getDimension("overworld").runCommandAsync(`give @p minecraft:potion 1`);
    });
}
function calculateRatio(ingredients) {
    return __awaiter(this, void 0, void 0, function* () {
        let wrongIngredients = ingredients.potato + ingredients.beetroot + ingredients.melon;
        let appleRatio = ingredients.apple + ingredients.potato + ingredients.beetroot + ingredients.melon;
        let carrotRatio = ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
        let potatoRatio = ingredients.potato + ingredients.apple + ingredients.beetroot + ingredients.melon;
        let beetrootRatio = ingredients.beetroot + ingredients.apple + ingredients.carrot + ingredients.melon;
        let total = ingredients.apple + ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
        let nightVision = carrotRatio / appleRatio;
        let waterBreathing = carrotRatio / appleRatio;
        if (nightVision === 2) {
            let potion = "night_vision";
            let seconds = Math.ceil((ingredients.apple + ingredients.carrot) * 2);
            return { potion, seconds };
        }
        else if (wrongIngredients === 0 && (potatoRatio + carrotRatio) > 0) {
            let seconds = Math.ceil((potatoRatio + carrotRatio) / 5);
            let potion = "blindness";
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
            melon: 0
        };
        for (let slot of slots) {
            switch (slot.typeId) {
                case 'minecraft:apple': {
                    yield setGlass(slot, 'red_stained_glass');
                    yield setItemFrame(0, slot.slotNumber);
                    ingredients.apple = (ingredients.apple || 0) + slot.amount;
                    break;
                }
                case 'minecraft:carrot': {
                    yield setGlass(slot, 'orange_stained_glass');
                    yield setItemFrame(1, slot.slotNumber);
                    ingredients.carrot = (ingredients.carrot || 0) + slot.amount;
                    break;
                }
                case 'minecraft:potato': {
                    yield setGlass(slot, 'yellow_stained_glass');
                    yield setItemFrame(2, slot.slotNumber);
                    ingredients.potato = (ingredients.potato || 0) + slot.amount;
                    break;
                }
                case 'minecraft:beetroot': {
                    yield setGlass(slot, 'purple_stained_glass');
                    yield setItemFrame(3, slot.slotNumber);
                    ingredients.beetroot = (ingredients.beetroot || 0) + slot.amount;
                    break;
                }
                case 'minecraft:melon': {
                    yield setGlass(slot, 'green_stained_glass');
                    yield setItemFrame(4, slot.slotNumber);
                    ingredients.melon = (ingredients.melon || 0) + slot.amount;
                    break;
                }
                default: { //empty
                    yield setItemFrame(5, slot.slotNumber);
                    break;
                }
            }
            ;
        }
        ;
        return ingredients;
    });
}
;
function setGlass(slot, blockName) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        let { block } = getBlockValue({ x: -52, y: 61, z: 126 });
        (_a = block === null || block === void 0 ? void 0 : block.north(slot.slotNumber)) === null || _a === void 0 ? void 0 : _a.setPermutation(BlockPermutation.resolve(blockName));
        if (slot.amount > 9) {
            slot.amount = 9;
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
        world.getDimension("overworld").runCommandAsync(`clone -40 60 ${cloneFrom} -40 60 ${cloneFrom} -50 60 ${cloneTo} replace`);
    });
}
;
export function potionMaker(event) {
    return __awaiter(this, void 0, void 0, function* () {
        yield resetArea();
        let slots = yield getSlots(event);
        let ingredients = yield barChart(slots);
        let { potion, seconds } = yield calculateRatio(ingredients);
        yield givePotion();
        return { potion, seconds };
    });
}
;
function resetArea() {
    return __awaiter(this, void 0, void 0, function* () {
        yield world.getDimension("overworld").runCommandAsync("fill -52 60 126 -52 69 122 black_stained_glass replace");
    });
}
//# sourceMappingURL=potion.js.map