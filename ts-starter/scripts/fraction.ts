import { world } from "@minecraft/server";
import { getInput } from "./input";
import { outputTotal, clearAnswer } from "./output";
import { roundToDigits } from "./numberHandler";

export async function fraction1(){
    await clearAnswer({x: -26, y: -59, z: 93}, {x: -21, y: -59, z: 93});
    world.sendMessage("Hello, World!");
}