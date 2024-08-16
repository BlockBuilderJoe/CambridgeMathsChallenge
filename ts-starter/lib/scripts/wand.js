import { world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function giveWand() {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommandAsync(`give @p[hasitem={item=blockbuilders:mathmogicians_wand,quantity=0}] blockbuilders:mathmogicians_wand 1 0 {"item_lock": { "mode": "lock_in_slot" }, "minecraft:can_destroy":{"blocks":["minecraft:hopper", "blockbuilders:number_0","blockbuilders:number_1","blockbuilders:number_2","blockbuilders:number_3","blockbuilders:number_4","blockbuilders:number_5","blockbuilders:number_6","blockbuilders:number_7","blockbuilders:number_8","blockbuilders:number_9","blockbuilders:number_10","blockbuilders:number_11","blockbuilders:number_12"]}}`);
    });
}
//# sourceMappingURL=wand.js.map