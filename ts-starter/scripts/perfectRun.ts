//defines the perfect run for the Cuisneaire Rods game.
export const perfectRun = [
  { location: { z: 104 ,y: 95, x: 30}, direction: "north", rodLength: 12, blockName: "yellow_concrete", successMessage: `Instead use a 1/2 rod as that is half of 24.`}, //1/2
  { location: { z: 92, y: 95, x: 31 }, direction: "east", rodLength: 6, blockName: "green_concrete", successMessage: `For 1/4 of 24 use a 6 rod.` }, //1/4
  { location: { z: 91, y: 95, x: 44 }, direction: "east", rodLength: 8, blockName: "brown_concrete", successMessage: `Use an 8 rod to make up a 1/3.` }, //1/3
  { location: { z: 94, y: 95, x: 53 }, direction: "south", rodLength: 4, blockName: "purple_concrete", successMessage: `Four is a sixth of 24.` }, //1/6
  { location: { z: 99, y: 95, x: 55 }, direction: "east", rodLength: 8, blockName: "brown_concrete", successMessage: `The most efficient way is to simplify 2/6 to 1/3.` }, //2/6
  //{ location: { z: 99, y: 95, x: 69 }, direction: "east", rodLength: 24, blockName: "blue_concrete", successMessage: `The largest rod you have is a whole, so place two of them.` }, //1/1
  { location: { z: 99, y: 95, x: 93 }, direction: "east", rodLength: 24, blockName: "blue_concrete", successMessage: `The largest rod you have is a whole, so place two of them.` }, //1/1
  { location: { z: 95, y: 95, x: 115 }, direction: "west", rodLength: 3, blockName: "lime_concrete", successMessage: `Three is 1/8 of 24. ` }, //1/3
  { location: { z: 94, y: 95, x: 109 }, direction: "west", rodLength: 6, blockName: "green_concrete", successMessage: `Simplify 2/8 to 1/4 to get the most efficient way across` }, //1/6
  { location: { z: 92, y: 95, x: 99 }, direction: "north", rodLength: 2, blockName: "red_concrete", successMessage: `Two is 1/2 of 24.` }, //1/2
  { location: { z: 89, y: 95, x: 97 }, direction: "west", rodLength: 4, blockName: "purple_concrete", successMessage: `Simplify 2/12 to get the most optimum route` }, //1/4
  { location: { z: 89, y: 95, x: 92 }, direction: "west", rodLength: 2, blockName: "red_concrete", successMessage: `Two is 1/2 of 24.` }, //1/2
  { location: { z: 89, y: 95, x: 87 }, direction: "west", rodLength: 8, blockName: "brown_concrete", successMessage: `Error this message shouldn't be able to be seen. It means the rod amounts are incorrect.` }, //1/3
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
  { location: { z: 93, y: 95, x: 30 }, blockName: "yellow_concrete" },
  { location: { z: 92, y: 95, x: 36 }, blockName: "green_concrete" },
  { location: { z: 91, y: 95, x: 51 }, blockName: "brown_concrete" },
  { location: { z: 97, y: 95, x: 53 }, blockName: "purple_concrete" },
  { location: { z: 99, y: 95, x: 62}, blockName: "brown_concrete" },
  { location: { z: 99, y: 95, x: 92 }, blockName: "blue_concrete" },
  { location: { z: 99, y: 95, x: 116 }, blockName: "blue_concrete" },
  { location: { z: 95, y: 95, x: 113 }, blockName: "lime_concrete" },

  { location: { z: 94, y: 95, x: 104 }, blockName: "green_concrete" },
  { location: { z: 91, y: 95, x: 99 }, blockName: "red_concrete" },
  { location: { z: 89, y: 95, x: 94 }, blockName: "purple_concrete" },
  { location: { z: 89, y: 95, x: 91 }, blockName: "red_concrete" },
  { location: { z: 89, y: 95, x: 80 }, blockName: "brown_concrete" },
]

export const replaySettings = [
  {
    // Message to display at the beginning of the replay
    beginningMessage: `To make 1/2 you placed: `,

    // Command to teleport the player to the starting position of the last platform they were on and set their facing direction
    tpStart: `tp @p 31 96 107 facing 31 96 100`,

    // Command to clear the rods they just placed by replacing blocks with tallgrass
    clearBlock: `fill 30 95 104 30 95 93 tallgrass replace`,

    // Command to replenish the grass under the rods they just placed, same coordinates as above with y axis 94.
    replenishGrass: `fill 30 94 104 30 94 93 grass_block replace`,

    // Direction along which the rods are placed ('x' or 'z'). This will be the value that is always the same. 
    cartesianDirection: 'x',

    // Specific value of the x or z that is the same on all the coordinates.
    cartesionValue: 30
  },
  { beginningMessage: `To make 1/4 you placed: `, tpStart: `tp @p 30 96 92 facing 38 96 92`, clearBlock: `fill 31 95 92 36 95 92 tallgrass replace`, replenishGrass: `fill 31 94 92 36 94 92 grass_block replace`, cartesianDirection: 'z', cartesionValue: 92},
  { beginningMessage: `To make 1/3 you placed: `, tpStart: `tp @p 41 96 91 facing 53 96 91`, clearBlock: `fill 51 95 91 44 95 91 tallgrass replace`, replenishGrass: `fill 51 94 91 44 94 91 grass_block replace`, cartesianDirection: 'z', cartesionValue: 91},
  
  { beginningMessage: `To make 1/6 you placed: `, tpStart: `tp @p 53 96 92 facing 53 96 98`, clearBlock: `fill 53 95 94 53 95 97 tallgrass replace`, replenishGrass: `fill 53 94 94 53 94 97 grass_block replace`, cartesianDirection: 'x', cartesionValue: 53},
  
  { beginningMessage: `To make 2/6 you placed: `, tpStart: `tp @p 54 96 99 facing 63 96 99`, clearBlock: `fill 55 95 99 62 95 99 tallgrass replace`, replenishGrass: `fill 55 94 99 62 94 99 grass_block replace`, cartesianDirection: 'z', cartesionValue: 99},
  

  { beginningMessage: `To make 2/1 you placed: `, tpStart: `tp @p 67 96 99 facing 117 96 99`, clearBlock: `fill 69 95 99 116 95 99 tallgrass replace`, replenishGrass: `fill 69 94 99 116 94 99 grass_block replace`, cartesianDirection: 'z', cartesionValue: 99},
  { beginningMessage: `To make 1/8 you placed: `, tpStart: `tp @p 117 96 95 facing 112 96 95`, clearBlock: `fill 115 95 95 113 95 95 tallgrass replace`, replenishGrass: `fill 115 94 95 113 94 95 grass_block replace`, cartesianDirection: 'z', cartesionValue: 95},
  { beginningMessage: `To make 2/8 you placed: `, tpStart: `tp @p 111 96 94 facing 103 96 94`, clearBlock: `fill 109 95 94 104 95 94 tallgrass replace`, replenishGrass: `fill 109 94 94 104 94 94 grass_block replace`, cartesianDirection: 'z', cartesionValue: 94},
  { beginningMessage: `To make 1/12 you placed: `, tpStart: `tp @p 99 96 94 facing 99 96 90`, clearBlock: `fill 99 95 92 99 95 91 tallgrass replace`, replenishGrass: `fill 99 94 92 99 94 91 grass_block replace`, cartesianDirection: 'x', cartesionValue: 99},
  { beginningMessage: `To make 2/12 you placed: `, tpStart: `tp @p 99 96 89 facing 93 96 89`, clearBlock: `fill 97 95 89 94 95 89 tallgrass replace`, replenishGrass: `fill 97 94 89 94 94 89 grass_block replace`, cartesianDirection: 'z', cartesionValue: 89},
  { beginningMessage: `To make 1/12 you placed: `, tpStart: `tp @p 93 96 88 facing 90 96 89`, clearBlock: `fill 92 95 89 91 95 89 tallgrass replace`, replenishGrass: `fill 92 94 89 91 94 89 grass_block replace`, cartesianDirection: 'z', cartesionValue: 89},
  { beginningMessage: `To make 1/3 you placed: `, tpStart: `tp @p 89 96 89 facing 79 96 89`, clearBlock: `fill 87 95 89 80 95 89 tallgrass replace`, replenishGrass: `fill 87 94 89 80 94 89 grass_block replace`, cartesianDirection: 'z', cartesionValue: 89},
]

