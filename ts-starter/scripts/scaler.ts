import { world  } from "@minecraft/server";



export async function scaleShape(shape: any , scaleFactor: any) {
    const scaledShape = [];
    for (const block of shape) {
      for (let i = 0; i < scaleFactor; i++) {
        for (let j = 0; j < scaleFactor; j++) {
          for (let k = 0; k < scaleFactor; k++) {
            const scaledBlock = {x: block.x + i, y: block.y + j, z: block.z + k};
            scaledShape.push(scaledBlock);
          }
        }
      }
    }
    return scaledShape;
}