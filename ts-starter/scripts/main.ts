import {
  BlockPermutation,
  BlockInventoryComponent,
  ItemStack,
  world,
  system,
  BlockComponent,
  Player,
  PlayerSpawnAfterEventSignal,
} from "@minecraft/server";
import { calculate } from "./calculator";
import { fraction1 } from "./fraction";
import { ratio1 } from "./ratio";
import { scale, resetArea } from "./scaler";
import { cuisenaire } from "./rod";
import { cycleNumberBlock } from "./output";
import { grid } from "./grid";
import { facing } from "./playerFacing";
import { potionMaker } from "./potion";

let potion: string = "";
let seconds: number = 0;
let currentPlayer = null;

function mainTick() {
  if (system.currentTick % 10 === 0) {
    //runs every second
    world.getAllPlayers().forEach((player) => {
      if (player.isInWater == true) {
        let score = 58 - Math.floor(player.location.y);
        player.runCommand(`scoreboard players set Meters Depth ${score}`);
      }
    });
  }
  system.run(mainTick);
}

system.run(mainTick);

world.afterEvents.playerSpawn.subscribe((eventData) => {
  currentPlayer = eventData.player;
  let initialSpawn = eventData.initialSpawn;
  if (initialSpawn) {
    currentPlayer.sendMessage(`§3Welcome back ${currentPlayer.name}!`);
    currentPlayer.runCommandAsync(
      `give @p[hasitem={item=stick,quantity=0}] stick 1 0 {"item_lock": { "mode": "lock_in_slot" }}`
    );
  }
  if (!initialSpawn) {
    currentPlayer.sendMessage(`<BlockBuilderAI> §3Welcome ${currentPlayer.name}!`);
    currentPlayer.runCommandAsync(
      `give @a[hasitem={item=stick,quantity=0}] stick 1 0 {"item_lock": { "mode": "lock_in_slot" }}`
    );
  }
});

//listens for the button push event.
world.afterEvents.buttonPush.subscribe(async (event) => {
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
      await resetArea();
      break;
    }
    case "-3,-60,90": {
      world.getDimension("overworld").runCommand("function lava");
      break;
    }
    case "608,-59,1007": {
      await grid({ x: 608, y: -61, z: 995 });
      break;
    }
  }
});

//listens for the potion to be fully drunk.
world.afterEvents.itemCompleteUse.subscribe(async (event) => {
  if (event.itemStack?.typeId === "minecraft:potion") {
    let player = event.source;
    let tick = seconds * 20; //converts seconds to ticks
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
        event.source.addEffect("poison", tick);
        break;
      }
      case "levitation": {
        event.source.addEffect("levitation", tick);
        break;
      }
    }
    world.sendMessage("The potion is: " + potion + " and the seconds are: " + seconds);
    event.source.runCommand("clear @p minecraft:glass_bottle");
  }
});

//listens for the entity health changed event so they don't drown.
world.afterEvents.entityHealthChanged.subscribe((event) => {
  if (event.entity.typeId === "minecraft:player") {
    let player = event.entity;
    if (player.isInWater == true) {
      player.addEffect("instant_health", 5);
      player.teleport({ x: -50, y: 60, z: 132 });
    }
  }
});

//listens for the block place event.
world.afterEvents.playerPlaceBlock.subscribe(async (event) => {
  let viewDirection = event.player.getViewDirection();
  let direction = await facing(viewDirection);
  if (event.block.permutation?.matches("red_concrete")) {
    cuisenaire(event, "red_concrete", 2, "Placed two blocks", direction);
  } else if (event.block.permutation?.matches("green_concrete")) {
    cuisenaire(event, "green_concrete", 6, "Placed six blocks", direction);
  } else if (event.block.permutation?.matches("purple_concrete")) {
    cuisenaire(event, "purple_concrete", 4, "Placed four blocks", direction);
  } else if (event.block.permutation?.matches("blue_concrete")) {
    cuisenaire(event, "blue_concrete", 3, "Placed three blocks", direction);
  }
});

world.afterEvents.playerBreakBlock.subscribe((clickEvent) => {
  let hand_item = clickEvent.itemStackAfterBreak?.typeId; //gets the item in the players hand
  if (hand_item === "minecraft:stick") {
    cycleNumberBlock(clickEvent);
  }
});

world.beforeEvents.itemUseOn.subscribe(async (event) => {
  if (event.itemStack?.typeId === "minecraft:stick") {
    let block = event.block;
    if (block.permutation?.matches("hopper")) {
      event.cancel = true;
      ({ potion, seconds } = await potionMaker(event));
    }
  }
});
