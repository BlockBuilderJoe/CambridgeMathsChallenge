import { world } from "@minecraft/server";
import { playerJoin } from "./player";

//Welcomes the player and defines the player object
const player = await playerJoin(); 

//Gets the name of the block at the given coordinates.
function getBlock(x, y, z) {
    let block = world.getDimension("overworld").getBlock({ x: x, y: y, z: z });
    return block;
}

//Checks if the block at the given coordinates is air and sends a message to the player.
if (getBlock(100, 100, 100).name === "minecraft:air") {
    player.sendMessage(`The block is ${block.name}`);
}



