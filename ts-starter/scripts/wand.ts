import { world } from "@minecraft/server";

let overworld = world.getDimension("overworld");

export async function giveWand() {
  overworld.runCommandAsync(
    `give @p[hasitem={item=stick,quantity=0}] minecraft:stick 1 0 {"item_lock": { "mode": "lock_in_slot" }, "minecraft:can_destroy":{"blocks":["minecraft:hopper", "blockbuilders:number_0","blockbuilders:number_1","blockbuilders:number_2","blockbuilders:number_3","blockbuilders:number_4","blockbuilders:number_5","blockbuilders:number_6","blockbuilders:number_7","blockbuilders:number_8","blockbuilders:number_9","blockbuilders:symbol_subtract"]}}`
  );
}
