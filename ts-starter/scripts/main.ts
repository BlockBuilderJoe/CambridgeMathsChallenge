import { world } from "@minecraft/server";
import { calculate } from "./calculator";
import { fraction1 } from "./fraction";
import { ratio1 } from "./ratio";
import { scale } from "./scaler";
import { cuisenaire } from "./rod";

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
    case "5,-60,117": {
      scale();
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
      cuisenaire(event, "red_concrete", 6, "Correct! You made a 1/2 rod!", "Not quite! It needs to be a 1/2 rod");
      break;
    }
    case "-1,-61,83": { 
      cuisenaire(event, "red_concrete", 6, "Well done you made a whole from two halves.", "Not quite! It needs to be a 1/2 rod");
      break;
    }
    case "1,-61,89": {
      cuisenaire(event, "pink_concrete", 4, "Correct! You made a 1/3 rod!", "Not quite! It needs to be a 1/3 rod");
      break;
    }
    case "1,-61,85": {
      cuisenaire(event, "pink_concrete", 4, "Well done you 2/3 out of two 1/3.", "Not quite! It needs to be a 1/3 rod");
      break;
    }
    case "1,-61,81": {
      cuisenaire(event, "pink_concrete", 4, "Well done you made it whole.", "Not quite! It needs to be a 1/3 rod");
      break;
    }
    case "3,-61,89": {
      cuisenaire(event, "red_concrete", 6, "Correct you are halfway there!", "Not quite! It needs to be a 1/2 rod");
      break;
    }
    case "3,-61,83": {
      cuisenaire(event, "pink_concrete", 4, "A third plus a half you are now at 10 blocks", "Not quite! It needs to be a 1/3 rod");
      break;
    }
    case "3,-61,79": {
      cuisenaire(event, "blue_concrete", 2, "Well done you made a whole.", "Not quite! It needs to be a 1/6 rod");
      break;
    }
}}
  );



