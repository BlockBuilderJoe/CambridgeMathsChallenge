import { world } from "@minecraft/server";

let overworld = world.getDimension("overworld");

export async function openGates(location: string) {
  switch (location) {
    case "spawn": {
      //clear
      overworld.runCommandAsync(`setblock 62 97 148 air`);
      overworld.runCommandAsync(`setblock 62 97 147 air`);
      overworld.runCommandAsync(`setblock 62 98 148 air`);
      overworld.runCommandAsync(`setblock 62 98 147 air`);
      // right gate facing out.
      overworld.runCommandAsync(`setblock 61 97 146 iron_bars`);
      overworld.runCommandAsync(`setblock 60 97 146 iron_bars`);
      overworld.runCommandAsync(`setblock 61 98 146 iron_bars`);
      overworld.runCommandAsync(`setblock 60 98 146 iron_bars`);
      // left gate facing out
      overworld.runCommandAsync(`setblock 61 97 149 iron_bars`);
      overworld.runCommandAsync(`setblock 60 97 149 iron_bars`);
      overworld.runCommandAsync(`setblock 61 98 149 iron_bars`);
      overworld.runCommandAsync(`setblock 60 98 149 iron_bars`);
    }
  }
}
