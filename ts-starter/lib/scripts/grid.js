import { world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function square(location) {
    return __awaiter(this, void 0, void 0, function* () {
        overworld.runCommandAsync("fill " + location.x + " " + location.y + " " + location.z + " " + (location.x + 11) + " " + location.y + " " + (location.z + 11) + " " + "sandstone");
        overworld.runCommandAsync("fill " + (location.x + 1) + " " + location.y + " " + (location.z + 1) + " " + (location.x + 10) + " " + location.y + " " + (location.z + 10) + " " + "grass replace");
        overworld.runCommandAsync("fill " + (location.x + 1) + " " + (location.y + 1) + " " + (location.z + 1) + " " + (location.x + 10) + " " + (location.y + 1) + " " + (location.z + 10) + " " + "tallgrass replace");
        overworld.runCommandAsync("fill " + (location.x + 1) + " " + (location.y + 2) + " " + (location.z + 1) + " " + (location.x + 10) + " " + (location.y + 2) + " " + (location.z + 10) + " " + "air replace");
    });
}
export function grid(location) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let offset_x = location.x + i * 11;
                let offset_z = location.z + j * 11;
                const squareLocation = ({ x: offset_x, y: location.y, z: offset_z });
                yield square(squareLocation);
            }
        }
    });
}
//# sourceMappingURL=grid.js.map