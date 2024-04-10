import { Vector2, Vector3, world } from "@minecraft/server";

export function calculateFacing(blockLocation: Vector3, playerFacing: Vector2) {
    world.sendMessage("Block Location: " + blockLocation.x + ", " + blockLocation.y + ", " + blockLocation.z);
    world.sendMessage("Player Facing: " + playerFacing.x + ", " + playerFacing.y);

    
}
