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
            case "scale1": {
                //clear
                overworld.runCommandAsync(`setblock 65 96 180 air`);
                overworld.runCommandAsync(`setblock 65 96 181 air`);
                overworld.runCommandAsync(`setblock 65 96 182 air`);
                overworld.runCommandAsync(`setblock 65 96 183 air`);
                overworld.runCommandAsync(`setblock 65 97 180 air`);
                overworld.runCommandAsync(`setblock 65 97 181 air`);
                overworld.runCommandAsync(`setblock 65 97 182 air`);
                overworld.runCommandAsync(`setblock 65 97 183 air`);
                //right gate facing out
                overworld.runCommandAsync(`setblock 66 96 184 iron_bars`);
                overworld.runCommandAsync(`setblock 67 96 184 iron_bars`);
                overworld.runCommandAsync(`setblock 66 97 184 iron_bars`);
                overworld.runCommandAsync(`setblock 67 97 184 iron_bars`);
                //left gate facing out
                overworld.runCommandAsync(`setblock 66 96 179 iron_bars`);
                overworld.runCommandAsync(`setblock 67 96 179 iron_bars`);
                overworld.runCommandAsync(`setblock 66 97 179 iron_bars`);
                overworld.runCommandAsync(`setblock 67 97 179 iron_bars`);
                break;
            }
            case "scale2": {
                //clear
                overworld.runCommandAsync(`setblock 4 96 186 air`);
                overworld.runCommandAsync(`setblock 5 96 186 air`);
                overworld.runCommandAsync(`setblock 6 96 186 air`);
                overworld.runCommandAsync(`setblock 7 96 186 air`);
                overworld.runCommandAsync(`setblock 4 97 186 air`);
                overworld.runCommandAsync(`setblock 5 97 186 air`);
                overworld.runCommandAsync(`setblock 6 97 186 air`);
                overworld.runCommandAsync(`setblock 7 97 186 air`);
                //right gate facing out
                overworld.runCommandAsync(`setblock 3 96 187 iron_bars`);
                overworld.runCommandAsync(`setblock 3 96 188 iron_bars`);
                overworld.runCommandAsync(`setblock 3 97 187 iron_bars`);
                overworld.runCommandAsync(`setblock 3 97 188 iron_bars`);
                //left gate facing out
                overworld.runCommandAsync(`setblock 8 96 187 iron_bars`);
                overworld.runCommandAsync(`setblock 8 96 188 iron_bars`);
                overworld.runCommandAsync(`setblock 8 97 187 iron_bars`);
                overworld.runCommandAsync(`setblock 8 97 188 iron_bars`);
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
            case "scale1": {
                //set gates
                overworld.runCommandAsync(`setblock 65 96 180 iron_bars`);
                overworld.runCommandAsync(`setblock 65 96 181 iron_bars`);
                overworld.runCommandAsync(`setblock 65 96 182 iron_bars`);
                overworld.runCommandAsync(`setblock 65 96 183 iron_bars`);
                overworld.runCommandAsync(`setblock 65 97 180 iron_bars`);
                overworld.runCommandAsync(`setblock 65 97 181 iron_bars`);
                overworld.runCommandAsync(`setblock 65 97 182 iron_bars`);
                overworld.runCommandAsync(`setblock 65 97 183 iron_bars`);
                //clear right gate facing out
                overworld.runCommandAsync(`setblock 66 96 184 air`);
                overworld.runCommandAsync(`setblock 67 96 184 air`);
                overworld.runCommandAsync(`setblock 66 97 184 air`);
                overworld.runCommandAsync(`setblock 67 97 184 air`);
                //clear left gate facing out
                overworld.runCommandAsync(`setblock 66 96 179 air`);
                overworld.runCommandAsync(`setblock 67 96 179 air`);
                overworld.runCommandAsync(`setblock 66 97 179 air`);
                overworld.runCommandAsync(`setblock 67 97 179 air`);
                break;
            }
            case "scale2": {
                //set gates
                overworld.runCommandAsync(`setblock 4 96 186 iron_bars`);
                overworld.runCommandAsync(`setblock 5 96 186 iron_bars`);
                overworld.runCommandAsync(`setblock 6 96 186 iron_bars`);
                overworld.runCommandAsync(`setblock 7 96 186 iron_bars`);
                overworld.runCommandAsync(`setblock 4 97 186 iron_bars`);
                overworld.runCommandAsync(`setblock 5 97 186 iron_bars`);
                overworld.runCommandAsync(`setblock 6 97 186 iron_bars`);
                overworld.runCommandAsync(`setblock 7 97 186 iron_bars`);
                //right gate facing out
                overworld.runCommandAsync(`setblock 3 96 187 air`);
                overworld.runCommandAsync(`setblock 3 96 188 air`);
                overworld.runCommandAsync(`setblock 3 97 187 air`);
                overworld.runCommandAsync(`setblock 3 97 188 air`);
                //left gate facing out
                overworld.runCommandAsync(`setblock 8 96 187 air`);
                overworld.runCommandAsync(`setblock 8 96 188 air`);
                overworld.runCommandAsync(`setblock 8 97 187 air`);
                overworld.runCommandAsync(`setblock 8 97 188 air`);
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