import { world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function openGate(location) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (location) {
            case "spawn": {
                //clear
                overworld.runCommandAsync(`setblock 62 97 148 air`);
                overworld.runCommandAsync(`setblock 62 97 147 air`);
                overworld.runCommandAsync(`setblock 62 98 148 air`);
                overworld.runCommandAsync(`setblock 62 98 147 air`);
                // right gate facing out.
                overworld.runCommandAsync(`setblock 61 97 146 iron_bars`);
                overworld.runCommandAsync(`setblock 60 97 146 iron_bars`);
                overworld.runCommandAsync(`setblock 61 98 146 iron_bars`);
                overworld.runCommandAsync(`setblock 60 98 146 iron_bars`);
                // left gate facing out
                overworld.runCommandAsync(`setblock 61 97 149 iron_bars`);
                overworld.runCommandAsync(`setblock 60 97 149 iron_bars`);
                overworld.runCommandAsync(`setblock 61 98 149 iron_bars`);
                overworld.runCommandAsync(`setblock 60 98 149 iron_bars`);
            }
            case "scale": {
                //clear
                overworld.runCommandAsync(`setblock 56 96 158 air`);
                overworld.runCommandAsync(`setblock 57 96 158 air`);
                overworld.runCommandAsync(`setblock 56 97 158 air`);
                overworld.runCommandAsync(`setblock 57 97 158 air`);
                // right gate facing out.
                overworld.runCommandAsync(`setblock 58 96 159 iron_bars`);
                overworld.runCommandAsync(`setblock 58 96 160 iron_bars`);
                overworld.runCommandAsync(`setblock 58 97 159 iron_bars`);
                overworld.runCommandAsync(`setblock 58 97 160 iron_bars`);
                // left gate facing out
                overworld.runCommandAsync(`setblock 55 96 159 iron_bars`);
                overworld.runCommandAsync(`setblock 55 96 160 iron_bars`);
                overworld.runCommandAsync(`setblock 55 97 159 iron_bars`);
                overworld.runCommandAsync(`setblock 55 97 160 iron_bars`);
            }
            case "ratio": {
            }
            case "scale": {
            }
        }
    });
}
export function closeGate(location) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (location) {
            case "spawn": {
                // set gates
                overworld.runCommandAsync(`setblock 62 97 148 iron_bars`);
                overworld.runCommandAsync(`setblock 62 97 147 iron_bars`);
                overworld.runCommandAsync(`setblock 62 98 148 iron_bars`);
                overworld.runCommandAsync(`setblock 62 98 147 iron_bars`);
                // clear right gate facing out
                overworld.runCommandAsync(`setblock 61 97 146 air`);
                overworld.runCommandAsync(`setblock 60 97 146 air`);
                overworld.runCommandAsync(`setblock 61 98 146 air`);
                overworld.runCommandAsync(`setblock 60 98 146 air`);
                // clear left gate facing out
                overworld.runCommandAsync(`setblock 61 97 149 air`);
                overworld.runCommandAsync(`setblock 60 97 149 air`);
                overworld.runCommandAsync(`setblock 61 98 149 air`);
                overworld.runCommandAsync(`setblock 60 98 149 air`);
            }
            case "scale": {
                // set gates
                overworld.runCommandAsync(`setblock 56 96 158 iron_bars`);
                overworld.runCommandAsync(`setblock 57 96 158 iron_bars`);
                overworld.runCommandAsync(`setblock 56 97 158 iron_bars`);
                overworld.runCommandAsync(`setblock 57 97 158 iron_bars`);
                // clear right gate facing out
                overworld.runCommandAsync(`setblock 58 96 159 air`);
                overworld.runCommandAsync(`setblock 58 96 160 air`);
                overworld.runCommandAsync(`setblock 58 97 159 air`);
                overworld.runCommandAsync(`setblock 58 97 160 air`);
                // clear left gate facing out
                overworld.runCommandAsync(`setblock 55 96 159 air`);
                overworld.runCommandAsync(`setblock 55 96 160 air`);
                overworld.runCommandAsync(`setblock 55 97 159 air`);
                overworld.runCommandAsync(`setblock 55 97 160 air`);
            }
        }
    });
}
//# sourceMappingURL=gate.js.map