import { BlockPermutation, BlockInventoryComponent, system, world } from "@minecraft/server";
import { getBlockValue } from "./input";
import { giveWand } from "./wand";

let overworld = world.getDimension("overworld");

export async function startPotionGame() {
  overworld.runCommandAsync(`clear @p`);
  overworld.runCommandAsync(`effect @p haste 9999 99 true`);
  await giveWand();
  await giveIngredients();
}

export async function getSlots(event: any) {
  let hopper: BlockInventoryComponent | undefined = event.block.getComponent("inventory");
  let slots = [];
  for (let i = 0; i <= 4; i++) {
    let item = hopper?.container?.getItem(i);
    slots.push({
      slotNumber: i,
      amount: item?.amount,
      typeId: item?.typeId,
    });
  }
  return slots;
}
async function givePotion() {
  world.getDimension("overworld").runCommandAsync(`clear @p minecraft:potion`);
  world.getDimension("overworld").runCommandAsync(`give @p minecraft:potion 1`);
}
async function calculateRatio(ingredients: any) {
  let wrongIngredientsSight = ingredients.potato + ingredients.beetroot + ingredients.melon;
  let wrongIngredientsDive = ingredients.apple + ingredients.carrot;
  let appleRatio = ingredients.apple + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let carrotRatio = ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let potatoRatio = ingredients.potato + ingredients.apple + ingredients.carrot;
  let beetrootRatio = ingredients.beetroot + ingredients.apple + ingredients.carrot;
  let melonRatio = ingredients.melon + ingredients.apple + ingredients.carrot;
  let total: number =
    ingredients.apple + ingredients.carrot + ingredients.potato + ingredients.beetroot + ingredients.melon;
  let nightVision: number = carrotRatio / appleRatio;
  let beetrootMelonRatio: number = beetrootRatio / melonRatio;
  let melonPotatoRatio: number = melonRatio / potatoRatio;

  if (beetrootMelonRatio === 1.5 && melonPotatoRatio === 2) {
    let potion = "water_breathing";
    let seconds = Math.ceil((beetrootRatio + melonRatio + potatoRatio) * 1.7);
    return { potion, seconds };
  } else if (nightVision === 2) {
    let potion = "night_vision";
    let seconds = Math.ceil((ingredients.apple + ingredients.carrot) * 1.7);
    return { potion, seconds };
  } else if (wrongIngredientsSight === 0 && potatoRatio + carrotRatio > 0) {
    //let seconds = Math.ceil(potatoRatio + carrotRatio);
    let seconds = 4;
    let potion = "blindness";
    return { potion, seconds };
  } else if (wrongIngredientsDive === 0 && beetrootRatio + melonRatio + potatoRatio > 0) {
    //let seconds = Math.ceil(beetrootRatio + melonRatio + potatoRatio);
    let seconds = 4;
    let potion = "levitation";
    return { potion, seconds };
  } else if (total === 0) {
    let seconds = 0;
    let potion = "empty";
    return { potion, seconds };
  } else {
    let seconds = Math.ceil((appleRatio + carrotRatio) / 10);
    let potion = "poison";
    return { potion, seconds };
  }
}

async function barChart(slots: any) {
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
        await setGlass(slot, "red_stained_glass");
        await setItemFrame(0, slot.slotNumber);
        ingredients.apple = (ingredients.apple || 0) + slot.amount;
        break;
      }
      case "minecraft:carrot": {
        await setGlass(slot, "orange_stained_glass");
        await setItemFrame(1, slot.slotNumber);
        ingredients.carrot = (ingredients.carrot || 0) + slot.amount;
        break;
      }
      case "minecraft:potato": {
        await setGlass(slot, "yellow_stained_glass");
        await setItemFrame(2, slot.slotNumber);
        ingredients.potato = (ingredients.potato || 0) + slot.amount;
        break;
      }
      case "minecraft:beetroot": {
        await setGlass(slot, "purple_stained_glass");
        await setItemFrame(3, slot.slotNumber);
        ingredients.beetroot = (ingredients.beetroot || 0) + slot.amount;
        break;
      }
      case "minecraft:melon_slice": {
        await setGlass(slot, "green_stained_glass");
        await setItemFrame(4, slot.slotNumber);
        ingredients.melon = (ingredients.melon || 0) + slot.amount;
        break;
      }
      default: {
        //empty
        await setItemFrame(5, slot.slotNumber);
        break;
      }
    }
  }
  return ingredients;
}
async function setGlass(slot: any, blockName: string) {
  let { block } = getBlockValue({ x: -12, y: 97, z: 145 });
  block?.north(slot.slotNumber)?.setPermutation(BlockPermutation.resolve(blockName));
  if (slot.amount > 10) {
    slot.amount = 10;
  }
  for (let i = 0; i < slot.amount; i++) {
    block?.above(i)?.north(slot.slotNumber)?.setPermutation(BlockPermutation.resolve(blockName));
  }
}
async function setItemFrame(offset_z: number, slotNumber: number) {
  let cloneFrom = 145 - offset_z;
  let cloneTo = 145 - slotNumber;
  world
    .getDimension("overworld")
    .runCommandAsync(`clone -11 109 ${cloneFrom} -11 109 ${cloneFrom} -11 97 ${cloneTo} replace`);
}

export async function potionMaker(slots: any) {
  await resetArea();
  let ingredients = await barChart(slots);
  let { potion, seconds } = await calculateRatio(ingredients);
  if (potion !== "empty") {
    await givePotion();
  }
  return { potion, seconds };
}

async function resetArea() {
  await world.getDimension("overworld").runCommandAsync("fill -12 106 141 -12 96 145 black_stained_glass replace");
}

export async function giveIngredients() {
  overworld.runCommand("replaceitem entity @p slot.hotbar 1 apple 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 2 carrot 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 3 beetroot 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 4 potato 10");
  overworld.runCommand("replaceitem entity @p slot.hotbar 5 melon_slice 10");
}

export function displayTimer(potionStart: number, seconds: number, player: any, potionDescription: string) {
  let timeLeft = (potionStart + seconds * 20 - system.currentTick) / 20;
  if (timeLeft % 1 === 0) {
    player.onScreenDisplay.setActionBar(`Time left:\n ${potionDescription} ${timeLeft} seconds`);
  }
}