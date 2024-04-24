export function facing(blockLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        const xDiff = Math.abs(blockLocation.x);
        const zDiff = Math.abs(blockLocation.z);
        let direction;
        if (xDiff > zDiff) {
            direction = blockLocation.x > 0 ? "east" : "west";
        }
        else {
            direction = blockLocation.z > 0 ? "south" : "north";
        }
        const oppositeDirections = {
            "east": "west",
            "west": "east",
            "south": "north",
            "north": "south"
        };
        let oppositeDirection = oppositeDirections[direction];
        return { direction, oppositeDirection };
    });
}
//# sourceMappingURL=playerFacing.js.map