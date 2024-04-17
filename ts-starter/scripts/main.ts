import { BlockPermutation, world } from "@minecraft/server";
import { calculate } from "./calculator";
import { fraction1 } from "./fraction";
import { ratio1 } from "./ratio";
import { scale, resetArea } from "./scaler";
import { cuisenaire } from "./rod";
import { cycleNumberBlock } from "./output";
import { grid } from "./grid";

//listens for the button push event.
world.afterEvents.buttonPush.subscribe(async(event) => {
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
    case "606,-60,995": {
      await grid({x: 608, y: -61, z: 995});
      break;
  }
}
});


//listens for the block place event.
world.afterEvents.playerPlaceBlock.subscribe(async(event) => {
  if (event.block.permutation?.matches("red_concrete")) {
    cuisenaire(event, "red_concrete", 2, "Placed two blocks");
  }
  else if (event.block.permutation?.matches("green_concrete")) {
    cuisenaire(event, "green_concrete", 6, "Placed six blocks");
  }
  else if (event.block.permutation?.matches("purple_concrete")) {
    cuisenaire(event, "purple_concrete", 4, "Placed four blocks");
  }
  else if (event.block.permutation?.matches("blue_concrete")) {
    cuisenaire(event, "blue_concrete", 3, "Placed three blocks");
  }
  });

world.afterEvents.playerBreakBlock.subscribe((clickEvent) => {
  let hand_item = clickEvent.itemStackAfterBreak?.typeId; //gets the item in the players hand
  if (hand_item === "minecraft:stick") {
    cycleNumberBlock(clickEvent);
  }
});
//right click
world.afterEvents.itemUse.subscribe(async (eventData) => {
  let player = eventData.source; // Get the player that waved the wand
  if (eventData.itemStack.typeId === "minecraft:stick") { //tests for the wand.
    player.sendMessage("Right click"); //sends a message to the player
  }
}
);


