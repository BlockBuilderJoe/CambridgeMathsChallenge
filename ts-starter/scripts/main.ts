import {
  world,
  system,
  Player,
  BlockPermutation,
  Block,
  Entity,
  Scoreboard,
  EntityInventoryComponent,
} from "@minecraft/server";
import { windows, windowUndoHandler, windowScaleHandler, startWindowGame } from "./stainedGlassWindow";
import {
  cuisenaire,
  getBlockBehind,
  resetGrid,
  giveRods,
  resetNPC,
  directionCheck,
  startCuisenaireGame,
  moveGroundsKeeper,
} from "./cuisenaireRods";
import { cycleNumberBlock } from "./output";
import { facing } from "./playerFacing";
import { potionMaker, displayTimer, getSlots, giveIngredients, startPotionGame } from "./potionGame";
import { giveWand } from "./wand";
import "./npcscriptEventHandler"; //handles the NPC script events
import { isCoordinateWithinRange } from "./input";

let overworld = world.getDimension("overworld");
let potion: string = "";
let seconds: number = 0;
let potionStart = 0;
let potionDrank = false;
let meters = 0;
let playerCanSeeInDark = false;

//coin
world.afterEvents.entityHitEntity.subscribe(async (event) => {
  let hitEntity = event.hitEntity;
  if (hitEntity.typeId === `blockbuilders:orb`) {
    let tag = hitEntity.getTags();
    overworld.runCommandAsync(
      `particle blockbuilders:spell ${hitEntity.location.x} ${hitEntity.location.y} ${hitEntity.location.z}`
    );
    let windowNumber = parseInt(tag[1].substring(6));
    if (windowNumber >= 0) {
      windowScaleHandler(windowNumber);
    }
  }
  if (hitEntity.typeId === `blockbuilders:coin`) {
    let tag = hitEntity.getTags();
    let x_location = 0 - parseInt(tag[0].substring(4));
    overworld.runCommandAsync(`scoreboard players add Coins Depth 1`);
    overworld.runCommandAsync(`tp @e[type=blockbuilders:coin,tag=${tag}] ${x_location} 104 156 facing -11 104 156`);
  }
  if (hitEntity.typeId === `blockbuilders:cauldron`) {
    let cauldron = hitEntity.getComponent("inventory") as EntityInventoryComponent;
    overworld.runCommand(
      `particle minecraft:cauldron_explosion_emitter ${hitEntity.location.x} ${hitEntity.location.y} ${hitEntity.location.z}`
    );
    let slots = await getSlots(cauldron);
    cauldron.container?.clearAll(); //empties the cauldron
    ({ potion, seconds } = await potionMaker(slots)); //gets the potion and the seconds for the applyPotionEffect function.
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
        green: { block: "green_concrete", value: 24, message: "1/1" },
        orange: { block: "orange_concrete", value: 12, message: "1/2" },
        purple: { block: "purple_concrete", value: 8, message: "1/3" },
        lime: { block: "lime_concrete", value: 6, message: "1/4" },
        yellow: { block: "yellow_concrete", value: 4, message: "1/6" },
        red: { block: "red_concrete", value: 3, message: "1/8" },
        light_blue: { block: "light_blue_concrete", value: 2, message: "1/12" },
        pink: { block: "pink_concrete", value: 1, message: "1/24" },
      };
      if (!hasColour) {
        player.runCommandAsync(`title ${player.name} actionbar Place the rod in front of the magical connector.`);

        //gives the rod back to the player if they place it on the grass.
        const rod = rodPermutations[colour as keyof typeof rodPermutations];
        player.runCommandAsync(`give @p ${rod.block} 1 0 {"minecraft:can_place_on":{"blocks":["tallgrass"]}}`);

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

//left click after break
world.afterEvents.playerBreakBlock.subscribe(async (clickEvent) => {
  let hand_item = clickEvent.itemStackAfterBreak?.typeId; //gets the item in the players hand
  let block = clickEvent.block;
  let brokenBlock = clickEvent.brokenBlockPermutation;
  if (hand_item === "blockbuilders:mathmogicians_wand") {
    if (
      //cycles the numerators for the window game as they are the only ones that need to change.
      windows.some(
        (window) =>
          block.location.x === window.numerator.x &&
          block.location.y === window.numerator.y &&
          block.location.z === window.numerator.z
      )
    ) {
      // if it is the window numerator cycle the number.
      cycleNumberBlock(clickEvent);
    } else {
      //if it is anything else replace the block.
      block.setPermutation(brokenBlock);
    }
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
      playerCanSeeInDark = true;
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
  //checks different things about the player each tick.
  world.getAllPlayers().forEach(async (player) => {
    if (player.isOnGround) {
      let isOnGrass = overworld.getBlock(player.location)?.permutation?.matches("minecraft:short_grass");
      if (isOnGrass && player.location.z <= 104.99) {
        overworld.getBlock(player.location)?.setPermutation(BlockPermutation.resolve("minecraft:light_block"));
        await moveGroundsKeeper(player.location);
        overworld.runCommand(`dialogue open @e[tag=groundskeeper] ${player.name} groundskeeper`);
        overworld.runCommand(`playsound mob.villager.no @p`);
      }
    }
    if (player.isJumping && player.location.z <= 104.99) {
      await moveGroundsKeeper(player.location);
      player.runCommandAsync(`dialogue open @e[tag=groundskeeper] ${player.name} groundskeeper1`);
      overworld.runCommand(`playsound mob.villager.no @p`);
    }
    if (player.isInWater) {
      if (player.location.x < 0) {
        player.runCommand(`scoreboard objectives setdisplay sidebar Depth`);
        meters = 94 - Math.floor(player.location.y);
        player.runCommand(`scoreboard players set Meters Depth ${meters}`);
      }

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
        //if they currently can't see in the dark.
        overworld.runCommandAsync(`title @p actionbar You can now permanently see in the dark!`);
      } else if (player.getEffect("blindness")) {
        displayTimer(potionStart, seconds, player, "Oh no! The ratios were wrong, you can't see anything for");
      } else if (player.getEffect("levitation")) {
        displayTimer(potionStart, seconds, player, "Oh no! You're floating for");
      }
      if (player.isSneaking == true) {
        player.runCommandAsync(`dialogue open @e[tag=ratioNpc] @p ratioNpc5`);
        surface(player);
      }
      if (player.isSwimming == true) {
        player.runCommandAsync(`dialogue open @e[tag=ratioNpc] @p ratioNpc5`);
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
      player.runCommandAsync(
        "title @p actionbar §fYou mixed the potion with the §2wrong ingredients. \n§fIt has had no effect.\nMake sure you're using the correct ingredients."
      );
    } else {
      potionDrank = true;
      player.runCommandAsync("title @p actionbar You drank the potion! §2Jump in the well §fto see the effect.");
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
