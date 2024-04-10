import { world } from "@minecraft/server";
export function calculateFacing(blockLocation, playerFacing) {
    world.sendMessage("Block Location: " + blockLocation.x + ", " + blockLocation.y + ", " + blockLocation.z);
    world.sendMessage("Player Facing: " + playerFacing.x + ", " + playerFacing.y);
}
//# sourceMappingURL=cuisenaire.js.map