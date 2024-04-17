import { BlockPermutation, world } from "@minecraft/server";
import { calculate } from "./calculator";
import { fraction1 } from "./fraction";
import { ratio1 } from "./ratio";
import { scale, resetArea } from "./scaler";
import { cuisenaire } from "./rod";
import { cycleNumberBlock } from "./output";

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
      world.getDimension("overworld").runCommand("function lava")
    }
  }
});

//listens for the block place event.
world.afterEvents.playerPlaceBlock.subscribe(async(event) => {
  switch (`${event.block.location.x},${event.block.location.y},${event.block.location.z}`) {
    case "-1,-61,89": { 
      cuisenaire(event, "green_concrete", 6, "Correct! 6 is half of 12", "That is not half of 12!");
      break;
    }
    case "-1,-61,83": { 
      cuisenaire(event, "green_concrete", 6, "Well done you made a 12 from two 6 rods.", "That is not half of 12!");
      break;
    }
    case "1,-61,89": {
      cuisenaire(event, "brown_concrete", 8, "Correct! 8 is two thirds of 12.", "Not quite, what is two thirds of 12?");
      break;
    }
    case "1,-61,81": {
      cuisenaire(event, "purple_concrete", 4, "Well done you made 12 by adding 8 to 4.", "Nope, what is one third of 12?");
      break;
    }
    case "3,-61,89": {
      cuisenaire(event, "green_concrete", 6, "Correct you are halfway there!", "Not quite! What is half of 12?");
      break;
    }
    case "3,-61,83": {
      cuisenaire(event, "purple_concrete", 4, "Almost there only two to go!", "Not quite! What is one third of 12?");
      break;
    }
    case "3,-61,79": {
      cuisenaire(event, "red_concrete", 2, "Well done you made 12 by adding 6 + 4 + 2.", "Not quite! It needs to be 1/6 of 12.");
      break;
    }
}}
  );



world.afterEvents.playerBreakBlock.subscribe((clickEvent) => {
  let hand_item = clickEvent.itemStackAfterBreak?.typeId; //gets the item in the players hand
  if (hand_item === "minecraft:stick") {
    cycleNumberBlock(clickEvent);
  }
});
//right click
world.afterEvents.itemUse.subscribe((eventData) => {
  let player = eventData.source; // Get the player that waved the wand
  if (eventData.itemStack.typeId == "minecraft:stick") { //tests for the wand.
    player.sendMessage("Right click"); //sends a message to the player
  }
}
);


