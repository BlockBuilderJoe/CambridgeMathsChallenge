import { PlayerPlaceBlockAfterEventSignal, WorldAfterEvents, world, BlockPermutation } from "@minecraft/server";
import { calculate } from "./calculator";
import { fraction1 } from "./fraction";
import { ratio1 } from "./ratio";
import { scale } from "./scaler";
import { calculateFacing } from "./cuisenaire";

const overworld = world.getDimension("overworld");

world.afterEvents.buttonPush.subscribe(async(event) => {
  //tests for the location of the button and runs the correct function.
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
  }
});

function cuisenaire(event: any, blockName: string, rodLength: number) {
  for (let i = 0; i < rodLength; i++) {
          event.block.north(i)?.setPermutation(BlockPermutation.resolve(blockName));
      }
  } 
//INCOMPLETE I NEED TO WORK ON THIS TO MAKE THE CASE STATEMENT AS SIMPLE AS POSSIBLE!

world.afterEvents.playerPlaceBlock.subscribe(async(event) => {
  world.sendMessage(`Block placed at ${event.block.location.x},${event.block.location.y},${event.block.location.z}`)
  switch (`${event.block.location.x},${event.block.location.y},${event.block.location.z}`) {
    case "-1,-61,89" || "-1,-61,83": { 
      if (event.block.permutation?.matches("red_concrete")) {
        world.sendMessage("Congratulations! You placed a 1/2 rod!");
        cuisenaire(event, "red_concrete", 6);
      }
      else {
        world.sendMessage("Not quite! It needs to be a 1/2 rod");
        event.block.setPermutation(BlockPermutation.resolve("lava"));   
      }
      break;
    }

  }
}

);



