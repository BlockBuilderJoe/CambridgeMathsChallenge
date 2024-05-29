import { world } from "@minecraft/server";
export function replay(index, perfectRun, rodsPlaced) {
    return __awaiter(this, void 0, void 0, function* () {
        world.sendMessage(`Replaying version ${index}`);
        world.sendMessage(`Perfect Run ${JSON.stringify(perfectRun)}`);
        world.sendMessage(`Rods Placed ${JSON.stringify(rodsPlaced)}`);
    });
}
/*
export async function replayRods(rodsPlaced: any[], player: any, perfectRun: any[]){
    await resetGrid({ x: -50, y: 94, z: 33 }); //clears the grid.
    let matchingRods = rodsPlaced.filter((rod, index) => JSON.stringify(rod) === JSON.stringify(perfectRun[index]));
    if (matchingRods) {
      player.runCommandAsync("tp 38 96 -76") //moves the player out of sight.
      for (let i = 0; i < matchingRods.length; i++) {
          ((index) => {
            system.runTimeout(async() => {
                let x = matchingRods[index].location.x;
                await setCameraView(x, player);
                let block = overworld.getBlock(matchingRods[index].location);
                placeRods(block, matchingRods[index].blockName, matchingRods[index].rodLength, matchingRods[index].direction);
                if (i === matchingRods.length -1) { //resets the camera 2 seconds after last rod placed.
                  world.sendMessage(`tp ${player.name} ${matchingRods[index].location.x} ${matchingRods[index].location.y + 1} ${matchingRods[index].location.z}`)
                  let tpCommand = `tp ${player.name} ${matchingRods[index].location.x} ${matchingRods[index].location.y + 1} ${matchingRods[index].location.z}`;
                  endReplay(player, tpCommand);
              }
              }, 40 * index);
              return;
              }
          )(i);
        }
      }
  }
  */
//# sourceMappingURL=rodReplay.js.map