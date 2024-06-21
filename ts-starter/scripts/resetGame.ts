import { system, world } from "@minecraft/server";
import { resetCuisenaireGame } from "./cuisenaireRods";
import { resetPotionGame } from "./potionGame";
import { resetWindowGame } from "./stainedGlassWindow";
import { closeGate } from "./gate";

let overworld = world.getDimension("overworld");

export async function resetGame() {
  //Reset the game areas
  await overworld.runCommandAsync(`tp @p 30 96 106`);
  await resetCuisenaireGame();
  await overworld.runCommandAsync(`tp @p -10 97 143`);
  await resetPotionGame();
  await overworld.runCommandAsync(`tp @p 71 96 221`);
  await resetWindowGame();
  //Reset the NPCs
  await overworld.runCommandAsync(`tp @e[tag=fractionNpc] 57 88 148`);
  await overworld.runCommandAsync(`tp @e[tag=scaleNpc] 57 88 148`);
  await overworld.runCommandAsync(`tp @e[tag=ratioNpc] 57 88 148`);
  await overworld.runCommandAsync(`tp @e[tag=spawnNpc] 63 97 146 facing 69 97 147`);
  await overworld.runCommandAsync(`dialogue change @e[tag=spawnNpc] spawnNpc`);
  await overworld.runCommandAsync(`dialogue change @e[tag=scaleNpc] scaleNpc0`);
  await overworld.runCommandAsync(`dialogue change @e[tag=ratioNpc] ratioNpc0`);
  await overworld.runCommandAsync(`dialogue change @e[tag=fractionNpc] fractionNpc0`);
  //Close the gates
  await closeGate("spawn");
  await closeGate("scale");
  await closeGate("ratio");
  await closeGate("fraction");
  //Clean up the player
  await overworld.runCommandAsync(`gamemode adventure @p`);
  await overworld.runCommandAsync(`gamerule showcoordinates false`);
  await overworld.runCommandAsync(`scoreboard objectives setdisplay sidebar`);
  await overworld.runCommandAsync(`scoreboard players set Coins Depth 0`);
  await overworld.runCommandAsync(`clear @p`);
  await overworld.runCommandAsync(`effect @p clear`);
  await overworld.runCommandAsync(`tp @p 69 97 147 facing 41 97 147`);
}
