import { world } from "@minecraft/server";
import { calculate } from "./calculator";
import { fraction1 } from "./fraction";
import { ratio1 } from "./ratio";
import { test } from "./test";

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
      test();
      break;
    }
  }
});