import { BlockPermutation, BlockInventoryComponent, system, world, EntityInventoryComponent } from "@minecraft/server";
import { getBlockValue } from "./input";
import { giveWand } from "./wand";

let overworld = world.getDimension("overworld");

export async function resetPotionGame() {
  await overworld.runCommandAsync("tp @e[tag=coin0] -6 90 155");
  await overworld.runCommandAsync("tp @e[tag=coin2] -5 86 154");
  await overworld.runCommandAsync("tp @e[tag=coin4] -6 82 155");
  await overworld.runCommandAsync("tp @e[tag=coin6] -5 78 154");
  await overworld.runCommandAsync("tp @e[tag=coin8] -6 75 155");
  await overworld.runCommandAsync("tp @e[tag=coin10] -5 75 154");
  await overworld.runCommandAsync("fill -7 97 139 -3 97 139 minecraft:air");
  await overworld.runCommandAsync("fill -3 126 138 -7 126 138 minecraft:black_concrete");
  await resetArea();
}
export async function startPotionGame() {
  await overworld.runCommandAsync(`clear @p`);
  await overworld.runCommandAsync("fill -3 126 138 -7 126 138 minecraft:air");
  await giveWand();
  await giveIngredients();
}

export async function getSlots(hopper: EntityInventoryComponent) {
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
  world.sendMessage(`Ingredients: ${JSON.stringify(ingredients)}`);
  //remaps ingredients from Minecraft name to in game name.
  let carrot: number = ingredients.carrot;
  let glowDust: number = ingredients.apple;
  let kelp: number = ingredients.potato;
  let pufferFish: number = ingredients.beetroot;
  let mermaidTears: number = ingredients.melon;
  let milk: number = ingredients.milk_bucket;
  let cocoaBeans: number = ingredients.cocoa_beans;
  const hasIngredients = carrot + glowDust + kelp + pufferFish + mermaidTears + milk + cocoaBeans > 0;
  const isChocolateMilk = cocoaBeans * 1 === milk * 2 && carrot + glowDust + kelp + pufferFish + mermaidTears === 0;
  const isNotChocolateMilk = cocoaBeans * 1 !== milk * 2 && carrot + glowDust + kelp + pufferFish + mermaidTears === 0;
  if (isChocolateMilk) {
    overworld.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc3`);
    overworld.runCommandAsync(`dialogue open @e[tag=ratioNpc] @p ratioNpc6`);
  } else if (isNotChocolateMilk) {
    overworld.runCommandAsync(`dialogue open @e[tag=ratioNpc] @p ratioNpc7`);
  }
  //calculates the ratio of ingredients. Testing for correct ratio and wrong ratio.
  const isCorrectNightVisionPotion =
    carrot * 5 === glowDust * 3 && kelp + pufferFish + mermaidTears === 0 && hasIngredients;
  const isCorrectWaterBreathingPotion =
    kelp * 40 === pufferFish * 24 && kelp * 40 === mermaidTears * 15 && carrot + glowDust === 0 && hasIngredients;
  const isWrongNightVisionPotion =
    carrot * 5 !== glowDust * 3 && kelp + pufferFish + mermaidTears === 0 && hasIngredients;
  const isWrongWaterBreathingPotion =
    (kelp * 40 !== pufferFish * 24 || kelp * 40 !== mermaidTears * 15) && carrot + glowDust === 0 && hasIngredients;

  //maps the correct outcomes of the potion game to the correct potion and seconds.
  if (hasIngredients) {
    if (isCorrectNightVisionPotion) {
      return { potion: "night_vision", seconds: 5 };
    } else if (isCorrectWaterBreathingPotion) {
      return { potion: "water_breathing", seconds: mermaidTears * 2 };
    } else if (isWrongNightVisionPotion) {
      return { potion: "blindness", seconds: 4 };
    } else if (isWrongWaterBreathingPotion) {
      return { potion: "levitation", seconds: 4 };
    } else {
      return { potion: "empty", seconds: 0 };
    }
  } else {
    return { potion: "none", seconds: 0 };
  }
}

async function barChart(slots: any) {
  let ingredients = {
    apple: 0,
    carrot: 0,
    potato: 0,
    beetroot: 0,
    melon: 0,
    milk_bucket: 0,
    cocoa_beans: 0,
  };
  for (let slot of slots) {
    switch (slot.typeId) {
      case "minecraft:milk_bucket": {
        ingredients.milk_bucket = (ingredients.milk_bucket || 0) + slot.amount;
        break;
      }
      case "minecraft:cocoa_beans": {
        ingredients.cocoa_beans = (ingredients.cocoa_beans || 0) + slot.amount;
        break;
      }
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
  let { block } = getBlockValue({ x: -7, y: 97, z: 138 });
  block?.east(slot.slotNumber)?.setPermutation(BlockPermutation.resolve(blockName));
  let height = 0;
  if (slot.amount > 20) {
    height = 20;
  } else {
    height = slot.amount;
  }
  for (let i = 0; i < height; i++) {
    block?.above(i)?.east(slot.slotNumber)?.setPermutation(BlockPermutation.resolve(blockName));
  }
}
async function setItemFrame(offset_z: number, slotNumber: number) {
  let cloneFrom = -7 + offset_z;
  let cloneTo = -7 + slotNumber;
  world
    .getDimension("overworld")
    .runCommandAsync(`clone ${cloneFrom} 121 139 ${cloneFrom} 121 139 ${cloneTo} 97 139 replace`);
}

export async function potionMaker(slots: any) {
  await resetArea();
  let ingredients = await barChart(slots);
  let { potion, seconds } = await calculateRatio(ingredients);
  if (potion !== "empty" && potion !== "none") {
    await givePotion();
  }
  return { potion, seconds };
}

async function resetArea() {
  await world.getDimension("overworld").runCommandAsync("fill -7 96 138 -3 116 138 black_stained_glass replace");
}

export async function giveIngredients() {
  overworld.runCommand("replaceitem entity @p slot.hotbar 1 apple 20");
  overworld.runCommand("replaceitem entity @p slot.hotbar 2 carrot 20");
  overworld.runCommand("replaceitem entity @p slot.hotbar 3 beetroot 20");
  overworld.runCommand("replaceitem entity @p slot.hotbar 4 potato 20");
  overworld.runCommand("replaceitem entity @p slot.hotbar 5 melon_slice 20");
}

export function displayTimer(potionStart: number, seconds: number, player: any, potionDescription: string) {
  let timeLeft = (potionStart + seconds * 20 - system.currentTick) / 20;
  if (timeLeft % 1 === 0) {
    player.onScreenDisplay.setActionBar(`Time left:\n ${potionDescription} ${timeLeft} seconds`);
  }
}
