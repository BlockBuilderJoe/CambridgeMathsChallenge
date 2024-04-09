export function scaleShape(shape, scaleFactor) {
    return __awaiter(this, void 0, void 0, function* () {
        const scaledShape = [];
        // Find the minimum coordinates to use as the base point of the shape
        const basePoint = shape.reduce((min, block) => ({
            x: Math.min(min.x, block.x),
            y: Math.min(min.y, block.y),
            z: Math.min(min.z, block.z),
        }), shape[0]);
        for (const block of shape) {
            // Calculate the relative position of the block within the shape
            const relativePos = {
                x: block.x - basePoint.x,
                y: block.y - basePoint.y,
                z: block.z - basePoint.z,
            };
            // Scale the relative position
            for (let i = 0; i < scaleFactor; i++) {
                for (let j = 0; j < scaleFactor; j++) {
                    for (let k = 0; k < scaleFactor; k++) {
                        // Add the scaled relative position to the base point
                        const scaledBlock = {
                            x: basePoint.x + relativePos.x * scaleFactor + i,
                            y: basePoint.y + relativePos.y * scaleFactor + j,
                            z: basePoint.z + relativePos.z * scaleFactor + k,
                        };
                        scaledShape.push(scaledBlock);
                    }
                }
            }
        }
        return scaledShape;
    });
}
//# sourceMappingURL=scaler.js.map