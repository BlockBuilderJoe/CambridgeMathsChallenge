export function facing(blockLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        const xDiff = Math.abs(blockLocation.x);
        const zDiff = Math.abs(blockLocation.z);
        if (xDiff > zDiff) {
            return blockLocation.x > 0 ? "east" : "west";
        }
        else {
            return blockLocation.z > 0 ? "south" : "north";
        }
    });
}
//# sourceMappingURL=playerFacing.js.map