import { world } from "@minecraft/server";
let overworld = world.getDimension("overworld");
export function openGate(location) {
    return __awaiter(this, void 0, void 0, function* () {
        world.sendMessage(`Opening gate ${location}`);
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
                break;
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
                break;
            }
            case "ratio": {
                //clear
                overworld.runCommandAsync(`setblock 45 96 148 air`);
                overworld.runCommandAsync(`setblock 45 96 147 air`);
                overworld.runCommandAsync(`setblock 45 97 148 air`);
                overworld.runCommandAsync(`setblock 45 97 147 air`);
                // right gate facing out.
                overworld.runCommandAsync(`setblock 44 96 149 iron_bars`);
                overworld.runCommandAsync(`setblock 43 96 149 iron_bars`);
                overworld.runCommandAsync(`setblock 44 97 149 iron_bars`);
                overworld.runCommandAsync(`setblock 43 97 149 iron_bars`);
                // left gate facing out
                overworld.runCommandAsync(`setblock 44 96 146 iron_bars`);
                overworld.runCommandAsync(`setblock 43 96 146 iron_bars`);
                overworld.runCommandAsync(`setblock 44 97 146 iron_bars`);
                overworld.runCommandAsync(`setblock 43 97 146 iron_bars`);
                break;
            }
            case "fraction": {
                //clear
                overworld.runCommandAsync(`setblock 56 96 137 air`);
                overworld.runCommandAsync(`setblock 57 96 137 air`);
                overworld.runCommandAsync(`setblock 56 97 137 air`);
                overworld.runCommandAsync(`setblock 57 97 137 air`);
                // right gate facing out.
                overworld.runCommandAsync(`setblock 55 96 136 iron_bars`);
                overworld.runCommandAsync(`setblock 55 96 135 iron_bars`);
                overworld.runCommandAsync(`setblock 55 97 136 iron_bars`);
                overworld.runCommandAsync(`setblock 55 97 135 iron_bars`);
                // left gate facing out
                overworld.runCommandAsync(`setblock 58 96 136 iron_bars`);
                overworld.runCommandAsync(`setblock 58 96 135 iron_bars`);
                overworld.runCommandAsync(`setblock 58 97 136 iron_bars`);
                overworld.runCommandAsync(`setblock 58 97 135 iron_bars`);
                break;
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
                break;
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
                break;
            }
            case "ratio": {
                // set gates
                overworld.runCommandAsync(`setblock 45 96 148 iron_bars`);
                overworld.runCommandAsync(`setblock 45 96 147 iron_bars`);
                overworld.runCommandAsync(`setblock 45 97 148 iron_bars`);
                overworld.runCommandAsync(`setblock 45 97 147 iron_bars`);
                // clear right gate facing out
                overworld.runCommandAsync(`setblock 44 96 149 air`);
                overworld.runCommandAsync(`setblock 43 96 149 air`);
                overworld.runCommandAsync(`setblock 44 97 149 air`);
                overworld.runCommandAsync(`setblock 43 97 149 air`);
                // clear left gate facing out
                overworld.runCommandAsync(`setblock 44 96 146 air`);
                overworld.runCommandAsync(`setblock 43 96 146 air`);
                overworld.runCommandAsync(`setblock 44 97 146 air`);
                overworld.runCommandAsync(`setblock 43 97 146 air`);
                break;
            }
            case "fraction": {
                // set gates
                overworld.runCommandAsync(`setblock 56 96 137 iron_bars`);
                overworld.runCommandAsync(`setblock 57 96 137 iron_bars`);
                overworld.runCommandAsync(`setblock 56 97 137 iron_bars`);
                overworld.runCommandAsync(`setblock 57 97 137 iron_bars`);
                // clear right gate facing out
                overworld.runCommandAsync(`setblock 55 96 136 air`);
                overworld.runCommandAsync(`setblock 55 96 135 air`);
                overworld.runCommandAsync(`setblock 55 97 136 air`);
                overworld.runCommandAsync(`setblock 55 97 135 air`);
                // clear left gate facing out
                overworld.runCommandAsync(`setblock 58 96 136 air`);
                overworld.runCommandAsync(`setblock 58 96 135 air`);
                overworld.runCommandAsync(`setblock 58 97 136 air`);
                overworld.runCommandAsync(`setblock 58 97 135 air`);
                break;
            }
        }
    });
}
//# sourceMappingURL=gate.js.map