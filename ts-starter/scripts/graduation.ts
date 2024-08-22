import { system, world, WorldAfterEvents, CommandResult } from "@minecraft/server";
import { startFlythrough } from "./flythroughs";

let overworld = world.getDimension("overworld");

export async function startGraduation(level: string) {
  if (level == "junior") {
    overworld.runCommandAsync(`dialogue change @e[tag=spawnNpc] spawnNpc2`);
  } else if (level == "senior") {
    overworld.runCommandAsync(`dialogue change @e[tag=spawnNpc] spawnNpc3`);
  }

  overworld.runCommandAsync(`tp @e[tag=spawnNpc] -103.02 96.06 142.69 facing -104 96 134`);

  overworld.runCommandAsync(`tp @e[tag=fractionNpc] -107.49 96.00 138.56 facing -101.49 96.00 138.56`);
  overworld.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc9`);

  overworld.runCommandAsync(`tp @e[tag=ratioNpc] -107.39 96.00 140.05 facing -101.39 96.00 140.05`);
  overworld.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc11`);

  overworld.runCommandAsync(`tp @e[tag=scaleNpc] -107.31 96.00 141.96 facing -101.31 96.00 141.96`);
  overworld.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc16`);

  startFlythrough("graduation");
}
