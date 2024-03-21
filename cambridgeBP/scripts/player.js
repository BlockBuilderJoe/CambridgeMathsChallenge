import * as MC from "@minecraft/server";
const world = MC.world;
world.afterEvents.playerJoin;
export async function playerJoin() {
    return new Promise((resolve) => {
        world.afterEvents.playerSpawn.subscribe((eventData) => {
            let { player, initialSpawn } = eventData;
            if (initialSpawn) {
                player.sendMessage(`§3Welcome back ${player.name}! \nReady for some more Maths?`);
            }
            if (!initialSpawn) {
                player.sendMessage(`§3Welcome ${player.name}! \nReady for some Maths?`);
            }
            resolve(player);
        });
    });
}