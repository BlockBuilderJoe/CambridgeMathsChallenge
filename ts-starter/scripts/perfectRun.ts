//defines the perfect run for the Cuisneaire Rods game.
export const perfectRun = [
  { location: { z: 104 ,y: 95, x: 30}, direction: "north", rodLength: 12, blockName: "yellow_concrete", successMessage: `To optimise use a 1/2 rod`}, //1/2
  { location: { z: 92, y: 95, x: 31 }, direction: "east", rodLength: 6, blockName: "green_concrete" }, //1/4

  { location: { z: 91, y: 95, x: 44 }, direction: "east", rodLength: 8, blockName: "brown_concrete" }, //1/3
  { location: { z: 94, y: 95, x: 53 }, direction: "south", rodLength: 4, blockName: "purple_concrete" }, //1/6
  { location: { z: 99, y: 95, x: 55 }, direction: "east", rodLength: 8, blockName: "brown_concrete" }, //2/6

  { location: { z: 99, y: 95, x: 69 }, direction: "east", rodLength: 24, blockName: "blue_concrete" }, //1/1
  { location: { z: 99, y: 95, x: 93 }, direction: "east", rodLength: 24, blockName: "blue_concrete" }, //1/1
  { location: { z: 95, y: 95, x: 115 }, direction: "west", rodLength: 3, blockName: "lime_concrete" },
  { location: { z: 94, y: 95, x: 109 }, direction: "west", rodLength: 6, blockName: "green_concrete" },
  
  // If this code remains you need to fix this issue.
  // The problem is having two values on the same rod puts out the index.
  // You'll need a handler for all the values that do that.
  //{ location: { z: 94, y: 95, x: 103 }, direction: "west", rodLength: 3, blockName: "lime_concrete" },
  { location: { z: 92, y: 95, x: 99 }, direction: "north", rodLength: 2, blockName: "red_concrete" },
  { location: { z: 89, y: 95, x: 97 }, direction: "west", rodLength: 4, blockName: "purple_concrete" },
  { location: { z: 89, y: 95, x: 92 }, direction: "west", rodLength: 2, blockName: "red_concrete" },
  { location: { z: 89, y: 95, x: 87 }, direction: "west", rodLength: 8, blockName: "brown_concrete" },
];

export const validRanges = [
  { x: 30, zMin: 93, zMax: 104 },
  { xMin: 31, xMax: 36, z: 92 },
  { xMin: 44, xMax: 51, z: 91 },
  { x: 53, zMin: 94, zMax: 97 },
  { xMin: 55, xMax: 62, z: 99 },
  { xMin: 69, xMax: 116, z: 99 },
  { xMin: 113, xMax: 115, z: 95 },
  { xMin: 101, xMax: 109, z: 94 },
  { x: 99, zMin: 91, zMax: 92 },
  { xMin: 94, xMax: 97, z: 89 },
  { xMin: 91, xMax: 92, z: 89 },
  { xMin: 80, xMax: 87, z: 89 },
];

export const finalBlock = [
  { location: { z: 93, y: 95, x: 30 }},
  { location: { z: 92, y: 95, x: 36 },},
  { location: { z: 91, y: 95, x: 51 },},
  { location: { z: 97, y: 95, x: 53 },},
  { location: { z: 99, y: 95, x: 62},},
  { location: { z: 99, y: 95, x: 92 },},
  { location: { z: 99, y: 95, x: 116 },},
  { location: { z: 95, y: 95, x: 113 },},
  { location: { z: 94, y: 95, x: 101 },},
  { location: { z: 91, y: 95, x: 99 },},
  { location: { z: 89, y: 95, x: 94 },},
  { location: { z: 89, y: 95, x: 91 },},
  { location: { z: 89, y: 95, x: 80 },},
]