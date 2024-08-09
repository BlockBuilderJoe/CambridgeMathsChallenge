//defines variables for the cuisneaire rod game.
//Rods that are placed in the replay.
export const perfectRun = [
    //Gap 1 = 1/2 td | Optimum rod = 1/2 rod
    {
        number: 0,
        location: { z: 104, y: 95, x: 30 },
        direction: "north",
        rodLength: 12,
        blockName: "orange_concrete",
        successMessage: `Instead use a 1/2 rod as that is half of 24.`,
    },
    //Gap 2 = 1/2 td or 12 blocks | Optimum rod = 1/2 rod
    {
        number: 1,
        location: { z: 92, y: 95, x: 31 },
        direction: "east",
        rodLength: 12,
        blockName: "orange_concrete",
        successMessage: `Instead use a 1/2 rod as that is half of 24.`,
    },
    //Gap 3 = 1/6 td or 4 blocks | Optimum rod = 1/6 rod
    {
        number: 2,
        location: { z: 91, y: 95, x: 44 },
        direction: "east",
        rodLength: 4,
        blockName: "yellow_concrete",
        successMessage: `Instead use a 1/6 rod which equals 4 blocks.`,
    },
    //Gap 4 = 3/4 td or 18 blocks | Optimum rod = 1/2,1/4 rod
    {
        number: 3,
        location: { z: 86, y: 95, x: 48 },
        direction: "east",
        rodLength: 12,
        blockName: "orange_concrete",
        successMessage: `Instead use a 1/2 rod which = 2/4`,
    },
    {
        number: 3,
        location: { z: 86, y: 95, x: 60 },
        direction: "east",
        rodLength: 6,
        blockName: "lime_concrete",
        successMessage: `a 1/4 rod which = 3/4.`,
    },
    //Gap 5 = 3/8 td or 9 blocks | Optimum rod = 1/4,1/8 rod
    {
        number: 4,
        location: { z: 89, y: 95, x: 66 },
        direction: "south",
        rodLength: 6,
        blockName: "lime_concrete",
        successMessage: `Instead use a 1/4 rod which = 2/8.`,
    },
    {
        number: 4,
        location: { z: 95, y: 95, x: 66 },
        direction: "south",
        rodLength: 3,
        blockName: "red_concrete",
        successMessage: `a 1/8 rod which = 3/8`,
    },
    //Gap 6 = 1 2/3 td or 40 blocks | Optimum rod = 1, 1/3, 1/3 rod
    {
        number: 5,
        location: { z: 100, y: 95, x: 69 },
        direction: "east",
        rodLength: 24,
        blockName: "green_concrete",
        successMessage: `Instead use 1 tweed`,
    },
    {
        number: 5,
        location: { z: 100, y: 95, x: 93 },
        direction: "east",
        rodLength: 8,
        blockName: "purple_concrete",
        successMessage: `a 1/3 rod`,
    },
    {
        number: 5,
        location: { z: 100, y: 95, x: 101 },
        direction: "east",
        rodLength: 8,
        blockName: "purple_concrete",
        successMessage: `a 1/3 rod to make 1 2/3`,
    },
    //Gap 7 = 3/2 td or 36 blocks | Optimum rod = 1, 1/2 rod
    {
        number: 6,
        location: { z: 93, y: 95, x: 108 },
        direction: "west",
        rodLength: 24,
        blockName: "green_concrete",
        successMessage: `Instead use 1 tweed`,
    },
    {
        number: 6,
        location: { z: 93, y: 95, x: 84 },
        direction: "west",
        rodLength: 12,
        blockName: "orange_concrete",
        successMessage: `a 1/2 rod to make 3/2`,
    },
    //Gap 8 = 7/12 td or 14 blocks | Optimum rod = 1/3,1/4 rod
    {
        number: 7,
        location: { z: 85, y: 95, x: 73 },
        direction: "east",
        rodLength: 8,
        blockName: "purple_concrete",
        successMessage: `1/3`,
    },
    {
        number: 7,
        location: { z: 85, y: 95, x: 81 },
        direction: "east",
        rodLength: 6,
        blockName: "lime_concrete",
        successMessage: `1/4`,
    },
    //Gap 9 = 5/24 td or 5 blocks | Optimum rod = 1/6,1/24 rod
    {
        number: 8,
        location: { z: 85, y: 95, x: 91 },
        direction: "east",
        rodLength: 4,
        blockName: "yellow_concrete",
        successMessage: `1/6`,
    },
    {
        number: 8,
        location: { z: 85, y: 95, x: 95 },
        direction: "east",
        rodLength: 1,
        blockName: "pink_concrete",
        successMessage: `1/24`,
    },
];
// The gap where the rod is placed. Change x and z depending on direction.
export const validRanges = [
    { x: 30, zMin: 93, zMax: 104 }, //1/2 gap 1
    { xMin: 31, xMax: 42, z: 92 }, //1/2 gap 2
    { xMin: 44, xMax: 47, z: 91 }, //1/6 gap 3
    { z: 86, xMin: 48, xMax: 65 }, //3/4 gap 4
    { zMin: 89, zMax: 97, x: 66 }, //3/8 gap 5
    { xMin: 69, xMax: 108, z: 100 }, //1 2/3 gap 6
    { xMin: 73, xMax: 108, z: 93 }, //3/2 gap 7
    { xMin: 73, xMax: 86, z: 85 }, //7/12 gap 8
    { xMin: 91, xMax: 95, z: 85 }, //5/24 gap 9
];
//The first block that is placed. If two rods are required write 2 with the same number.
export const finalBlock = [
    {
        location: { z: 93, y: 95, x: 30 },
        blockName: "orange_concrete",
        startLocation: { z: 104, y: 95, x: 30 },
        startBlockName: "orange_concrete",
        number: 0,
    }, //1/2 gap 1
    {
        location: { z: 92, y: 95, x: 42 },
        blockName: "orange_concrete",
        startLocation: { z: 92, y: 95, x: 31 },
        startBlockName: "orange_concrete",
        number: 1,
    }, //1/2 gap 2
    {
        location: { z: 91, y: 95, x: 47 },
        blockName: "yellow_concrete",
        startLocation: { z: 91, y: 95, x: 44 },
        startBlockName: "yellow_concrete",
        number: 2,
    }, //1/6 gap 3
    {
        location: { z: 86, y: 95, x: 65 },
        blockName: "orange_concrete",
        startLocation: { z: 86, y: 95, x: 48 },
        startBlockName: "lime_concrete",
        number: 3,
    }, //3/4 gap 4
    {
        location: { z: 86, y: 95, x: 65 },
        blockName: "lime_concrete",
        startLocation: { z: 86, y: 95, x: 48 },
        startBlockName: "orange_concrete",
        number: 3,
    }, //3/4 gap 4
    {
        location: { z: 97, y: 95, x: 66 },
        blockName: "lime_concrete",
        startLocation: { z: 97, y: 95, x: 66 },
        startBlockName: "red_concrete",
        number: 4,
    }, //3/8 gap 5
    {
        location: { z: 97, y: 95, x: 66 },
        blockName: "red_concrete",
        startLocation: { z: 97, y: 95, x: 66 },
        startBlockName: "lime_concrete",
        number: 4,
    }, //3/8 gap 5
    {
        location: { z: 100, y: 95, x: 108 },
        blockName: "purple_concrete",
        startLocation: { z: 100, y: 95, x: 69 },
        startBlockName: "green_concrete",
        number: 5,
    }, //1 2/3 gap 6
    {
        location: { z: 100, y: 95, x: 108 },
        blockName: "green_concrete",
        startLocation: { z: 100, y: 95, x: 69 },
        startBlockName: "purple_concrete",
        number: 5,
    }, //1 2/3 gap 6
    {
        location: { z: 100, y: 95, x: 108 },
        blockName: "purple_concrete",
        startLocation: { z: 100, y: 95, x: 69 },
        startBlockName: "purple_concrete",
        number: 5,
    }, //1 2/3 gap 6
    {
        location: { z: 93, y: 95, x: 73 },
        blockName: "orange_concrete",
        startLocation: { z: 93, y: 95, x: 108 },
        startBlockName: "green_concrete",
        number: 6,
    }, //3/2 gap 7
    {
        location: { z: 93, y: 95, x: 73 },
        blockName: "green_concrete",
        startLocation: { z: 93, y: 95, x: 108 },
        startBlockName: "orange_concrete",
        number: 6,
    }, //3/2 gap 7
    {
        location: { z: 85, y: 95, x: 86 },
        blockName: "purple_concrete",
        startLocation: { z: 85, y: 95, x: 73 },
        startBlockName: "lime_concrete",
        number: 7,
    }, //7/12 gap 8
    {
        location: { z: 85, y: 95, x: 86 },
        blockName: "lime_concrete",
        startLocation: { z: 85, y: 95, x: 73 },
        startBlockName: "purple_concrete",
        number: 7,
    }, //7/12 gap 8
    {
        location: { z: 85, y: 95, x: 95 },
        blockName: "pink_concrete",
        startLocation: { z: 85, y: 95, x: 91 },
        startBlockName: "yellow_concrete",
        number: 8,
    }, //5/24 gap 9
    {
        location: { z: 85, y: 95, x: 95 },
        blockName: "yellow_concrete",
        startLocation: { z: 85, y: 95, x: 91 },
        startBlockName: "pink_concrete",
        number: 8,
    }, //5/24 gap 9
];
export const replaySettings = [
    {
        // 1/2 gap 1
        // Message to display at the beginning of the replay
        beginningMessage: `To make 1/2 you placed: `,
        // Command to teleport the player to the starting position of the last platform they were on and set their facing direction
        tpStart: `tp @p 31 96 107 facing 31 96 100`,
        // Command to clear the rods they just placed by replacing blocks with short_grass
        clearBlock: `fill 30 95 104 30 95 93 short_grass replace`,
        // Command to replenish the grass under the rods they just placed, same coordinates as above with y axis 94.
        replenishGrass: `fill 30 94 104 30 94 93 grass_block replace`,
        //Direction along which the rods are placed ('x' or 'z'). (The one that stays the same.)
        cartesianDirection: "x",
        // Specific value of the x or z that is the same on all the coordinates.
        cartesionValue: 30,
    },
    {
        // 1/2 gap 2
        beginningMessage: `To make 1/2 you placed: `,
        tpStart: `tp @p 30 96 92 facing 38 96 92`,
        clearBlock: `fill 31 95 92 42 95 92 short_grass replace`,
        replenishGrass: `fill 31 94 92 42 94 92 grass_block replace`,
        cartesianDirection: "z",
        cartesionValue: 92,
    },
    {
        // 1/6 gap 3
        beginningMessage: `To make 1/6 you placed: `,
        tpStart: `tp @p 43 96 91 facing 53 96 91`,
        clearBlock: `fill 44 95 91 47 95 91 short_grass replace`,
        replenishGrass: `fill 44 94 91 47 94 91 grass_block replace`,
        cartesianDirection: "z",
        cartesionValue: 91,
    },
    {
        // 3/4 gap 4
        beginningMessage: `To make 3/4 you placed: `,
        tpStart: `tp @p 47 96 86 facing 67 96 86`,
        clearBlock: `fill 48 95 86 65 95 86 short_grass replace`,
        replenishGrass: `fill 48 94 86 65 94 86 grass_block replace`,
        cartesianDirection: "z",
        cartesionValue: 86,
    },
    {
        // 3/8 gap 5
        beginningMessage: `To make 3/8 you placed: `,
        tpStart: `tp @p 66 96 87 facing 66 96 87`,
        clearBlock: `fill 66 95 89 66 95 97 short_grass replace`,
        replenishGrass: `fill 66 94 89 66 94 97 grass_block replace`,
        cartesianDirection: "x",
        cartesionValue: 66,
    },
    {
        // 1 2/3 gap 6
        beginningMessage: `To make 1 2/3 you placed: `,
        tpStart: `tp @p 67 96 100 facing 108 96 100`,
        clearBlock: `fill 69 95 100 108 95 100 short_grass replace`,
        replenishGrass: `fill 69 94 100 108 94 100 grass_block replace`,
        cartesianDirection: "z",
        cartesionValue: 100,
    },
    {
        // 3/2 gap 7
        beginningMessage: `To make 3/2 you placed: `,
        tpStart: `tp @p 110 96 93 facing 72 96 93`,
        clearBlock: `fill 108 95 93 73 95 93 short_grass replace`,
        replenishGrass: `fill 108 94 93 73 94 93 grass_block replace`,
        cartesianDirection: "z",
        cartesionValue: 93,
    },
    {
        // 7/12 gap 8
        beginningMessage: `To make 7/12 you placed: `,
        tpStart: `tp @p 71 96 85 facing 86 96 85`,
        clearBlock: `fill 73 95 85 86 95 85 short_grass replace`,
        replenishGrass: `fill 73 94 85 86 94 85 grass_block replace`,
        cartesianDirection: "z",
        cartesionValue: 85,
    },
    // To do
    {
        // 5/24 gap 9
        beginningMessage: `To make 5/24 you placed: `,
        tpStart: `tp @p 89 96 85 facing 95 96 85`,
        clearBlock: `fill 91 95 85 95 95 85 short_grass replace`,
        replenishGrass: `fill 91 94 85 95 94 85 grass_block replace`,
        cartesianDirection: "z",
        cartesionValue: 85,
    },
];
// NPC locations for the NPCs to spawn at.
export const npcLocation = [
    { x: 30, y: 96, z: 90 }, // 1/2 gap 1
    { x: 43, y: 96, z: 92 }, // 1/2 gap 2
    { x: 49, y: 96, z: 92 }, // 1/6 gap 3
    { x: 67, y: 96, z: 87 }, // 3/4 gap 4
    { x: 66, y: 96, z: 100 }, // 3/8 gap 5
    { x: 110, y: 96, z: 101 }, // 1 2/3 gap 6
    { x: 71, y: 96, z: 93 }, // 3/2 gap 7
    { x: 88, y: 96, z: 86 }, // 7/12 gap 8
    { x: 98, y: 96, z: 85 }, // 5/24 gap 9f
];
//# sourceMappingURL=perfectRun.js.map