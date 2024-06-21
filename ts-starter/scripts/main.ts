import { world, system, Player, BlockPermutation, Block, Entity, Scoreboard } from "@minecraft/server";
import { windowUndoHandler, windowScaleHandler, startWindowGame } from "./stainedGlassWindow";
import {
  cuisenaire,
  getBlockBehind,
  resetGrid,
  giveRods,
  resetNPC,
  directionCheck,
  startCuisenaireGame,
} from "./cuisenaireRods";
import { cycleNumberBlock } from "./output";
import { facing } from "./playerFacing";
import { potionMaker, displayTimer, getSlots, giveIngredients, startPotionGame } from "./potionGame";
import { giveWand } from "./wand";
import "./npcscriptEventHandler"; //handles the NPC script events

let overworld = world.getDimension("overworld");
let potion: string = "";
let seconds: number = 0;
let potionStart = 0;
let potionDrank = false;
let meters = 0;
let playerCanSeeInDark = false;

//listens for the button push event.
world.afterEvents.buttonPush.subscribe(async (event) => {
  switch (`${event.block.location.x},${event.block.location.y},${event.block.location.z}`) {
    case "29,97,106": {
      await startCuisenaireGame();
      break;
    }
    case "66,97,224": {
      await startWindowGame();
      break;
    }
    case "1,97,151": {
      await startPotionGame();
      break;
    }
  }
});

//coin
world.afterEvents.entityHitEntity.subscribe(async (event) => {
  let hitEntity = event.hitEntity;
  if (hitEntity.typeId === `blockbuilders:coin`) {
    let tag = hitEntity.getTags();
    let y_location = parseInt(tag[0].substring(4)) + 95;
    overworld.runCommandAsync(
      `tp @e[type=blockbuilders:coin,tag=${tag}] -1 ${y_location} 157 facing 1 ${y_location} 157`
    );
  }
});

//listens for the block place event.
world.afterEvents.playerPlaceBlock.subscribe(async (event) => {
  let block = event.block;
  let player = event.player;
  let colour = block.permutation?.getState("color");
  if (colour) {
    //is it a rod block?
    if (block.location.y === 95) {
      //is it placed on the grid?
      let viewDirection = event.player.getViewDirection();
      let { direction, oppositeDirection } = await facing(viewDirection);
      let correctDirection = await directionCheck(block.location.x, block.location.z, direction);
      let hasColour = await getBlockBehind(event, oppositeDirection);
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
      const rod = rodPermutations[colour as keyof typeof rodPermutations];
      if (rod) {
        cuisenaire(block, rod.block, rod.value, rod.message, direction);
      }
    }
  }
});

world.beforeEvents.playerBreakBlock.subscribe(async (event) => {
  let block = event.block;
  if (block.permutation?.matches("hopper")) {
    event.cancel;
    overworld.runCommandAsync(`kill @e[type=item]`);
    let slots = await getSlots(event);
    ({ potion, seconds } = await potionMaker(slots));
  }
});

//left click after break
world.afterEvents.playerBreakBlock.subscribe(async (clickEvent) => {
  let hand_item = clickEvent.itemStackAfterBreak?.typeId; //gets the item in the players hand
  let block = clickEvent.block;
  let brokenBlock = clickEvent.brokenBlockPermutation;
  if (hand_item === "blockbuilders:mathmogicians_wand") {
    if (brokenBlock.matches("blockbuilders:symbol_subtract") && block.location.z === 225) {
      // if it is the window vinculum run the undo function.
      await windowUndoHandler(block.location);
      block.setPermutation(BlockPermutation.resolve("blockbuilders:symbol_subtract"));
    } else if (
      (block.location.x === 71 && block.location.y === 98 && block.location.z === 225) ||
      (block.location.x === 82 && block.location.y === 98 && block.location.z === 225)
    ) {
      // if it is the window numerator cycle the number.
      cycleNumberBlock(clickEvent);
    } else {
      //if it is anything else replace the block.
      block.setPermutation(brokenBlock);
    }
  }
});

//right click
world.beforeEvents.itemUseOn.subscribe(async (event) => {
  let block = event.block;
  if (block.permutation?.matches("blockbuilders:symbol_subtract")) {
    await windowScaleHandler(block.location);
  }
});

//well
function applyPotionEffect(player: any, potion: string, seconds: number) {
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
    if (player.isInWater) {
      player.runCommand(`scoreboard objectives setdisplay sidebar Depth`);
      meters = 94 - Math.floor(player.location.y);
      player.runCommand(`scoreboard players set Meters Depth ${meters}`);

      if (potionDrank) {
        //applies the potion effect once
        applyPotionEffect(player, potion, seconds);
        potionDrank = false;
      }

      if (player.getEffect("water_breathing")) {
        if (playerCanSeeInDark) {
          overworld.runCommandAsync(`effect @p night_vision ${seconds} 1 true`);
        }
        displayTimer(potionStart, seconds, player, "Breathing underwater");
      } else if (player.getEffect("night_vision")) {
        if (!playerCanSeeInDark) {
          //if they currently can't see in the dark.
          playerCanSeeInDark = true;
          overworld.runCommandAsync(`title @p actionbar You can now permanently see in the dark!`);
        }
      } else if (player.getEffect("blindness")) {
        displayTimer(potionStart, seconds, player, "Oh no! The ratios were wrong, you can't see anything for");
      } else if (player.getEffect("levitation")) {
        displayTimer(potionStart, seconds, player, "Oh no! You're floating for");
      }
      if (player.isSneaking == true) {
        surface(player);
      }
      if (player.isSwimming == true) {
        surface(player);
      }
    }
  });
  system.run(mainTick);
}
async function surface(player: any) {
  player.runCommandAsync(`scoreboard objectives setdisplay sidebar`);
  player.teleport({ x: -3, y: 96, z: 144 });
  player.runCommandAsync(`scoreboard objectives setdisplay sidebar`);
  player.addEffect("instant_health", 5);
  player.removeEffect("blindness");
  player.removeEffect("night_vision");
  player.removeEffect("water_breathing");
  player.removeEffect("levitation");
}

//listens for the potion to be fully drunk.
world.afterEvents.itemCompleteUse.subscribe(async (event) => {
  let player = event.source;
  if (event.itemStack?.typeId === "minecraft:potion") {
    if (potion === "poison") {
      player.sendMessage(
        "§fYou mixed the potion with the §2wrong ingredients. \n§fIt has had no effect.\nMake sure you're using the correct ingredients."
      );
    } else {
      potionDrank = true;
      player.sendMessage("§fYou drank the potion. \n§2Jump in the well §fto see the effect.");
    }
    event.source.runCommand("clear @p minecraft:glass_bottle");
  }
});

//listens for the entity health changed event so they don't drown.
world.afterEvents.entityHealthChanged.subscribe(async (event) => {
  if (event.entity.typeId === "minecraft:player") {
    let player: Player = event.entity as Player;

    if (player.isInWater == true) {
      if (event.newValue === 18) {
        //this is the moment they start to take damage in the water.
        await surface(player);
        player.runCommandAsync("scoreboard objectives setdisplay sidebar");
        if (meters > 0) {
          player.sendMessage(`§fYou made it to a depth of: §2${meters}m \n§fOnly ${20 - meters}m to the bottom. `);
        }
      }
    }
  }
});

system.run(mainTick);
