export function scaleShape(shape, scaleFactor) {
    return __awaiter(this, void 0, void 0, function* () {
        const scaledShape = [];
        for (const block of shape) {
            for (let i = 0; i < scaleFactor; i++) {
                for (let j = 0; j < scaleFactor; j++) {
                    for (let k = 0; k < scaleFactor; k++) {
                        const scaledBlock = { x: block.x + i, y: block.y + j, z: block.z + k };
                        scaledShape.push(scaledBlock);
                    }
                }
            }
        }
        return scaledShape;
    });
}
//# sourceMappingURL=scaler.js.map