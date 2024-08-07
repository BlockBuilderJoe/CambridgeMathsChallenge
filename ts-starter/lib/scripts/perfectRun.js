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
        successMessage: `Use a 4 rod to make up a 1/6.`,
    },
    //Gap 4 = 3/4 td or 18 blocks | Optimum rod = 1/2,1/4 rod
    {
        number: 3,
        location: { z: 48, y: 95, x: 86 },
        direction: "east",
        rodLength: 12,
        blockName: "orange_concrete",
        successMessage: `1/2 = 1/4 + 1/4.`,
    },
    {
        number: 3,
        location: { z: 86, y: 95, x: 60 },
        direction: "east",
        rodLength: 4,
        blockName: "lime_concrete",
        successMessage: `+ a 1/4 rod = 3/4.`,
    },
    //Gap 5 = 3/8 td or 9 blocks | Optimum rod = 1/4,1/8 rod
    {
        number: 4,
        location: { z: 89, y: 95, x: 66 },
        direction: "north",
        rodLength: 6,
        blockName: "lime_concrete",
        successMessage: `1/4 = 1/8 + 1/8.`,
    },
    {
        number: 4,
        location: { z: 96, y: 95, x: 66 },
        direction: "north",
        rodLength: 3,
        blockName: "red_concrete",
        successMessage: `plus one more 1/8 rod = 3/8`,
    },
    //toDo
    //Gap 6 = 1 2/3 td or 40 blocks | Optimum rod = 1, 1/3, 1/3 rod
    {
        location: { z: 94, y: 95, x: 109 },
        direction: "west",
        rodLength: 6,
        blockName: "green_concrete",
        successMessage: `Simplify 2/8 to 1/4 to get the most efficient way across`,
    },
    {
        location: { z: 92, y: 95, x: 99 },
        direction: "north",
        rodLength: 2,
        blockName: "red_concrete",
        successMessage: `Two is 1/2 of 24.`,
    },
    //Gap 7 = 3/2 td or 36 blocks | Optimum rod = 1, 1/2 rod
    {
        location: { z: 89, y: 95, x: 97 },
        direction: "west",
        rodLength: 4,
        blockName: "purple_concrete",
        successMessage: `Simplify 2/12 to get the most optimum route`,
    }, //1/4
    {
        location: { z: 89, y: 95, x: 92 },
        direction: "west",
        rodLength: 2,
        blockName: "red_concrete",
        successMessage: `Two is 1/2 of 24.`,
    },
    //Gap 8 = 7/12 td or 14 blocks | Optimum rod = 1/4,1/3 rod
    {
        location: { z: 89, y: 95, x: 87 },
        direction: "west",
        rodLength: 8,
        blockName: "brown_concrete",
        successMessage: `Error this message shouldn't be able to be seen. It means the rod amounts are incorrect.`,
    },
    {
        location: { z: 89, y: 95, x: 87 },
        direction: "west",
        rodLength: 8,
        blockName: "brown_concrete",
        successMessage: `Error this message shouldn't be able to be seen. It means the rod amounts are incorrect.`,
    },
    //Gap 9 = 5/24 td or 5 blocks | Optimum rod = 1/6,1/24 rod
    {
        location: { z: 89, y: 95, x: 87 },
        direction: "west",
        rodLength: 12,
        blockName: "brown_concrete",
        successMessage: `Error this message shouldn't be able to be seen. It means the rod amounts are incorrect.`,
    },
    {
        location: { z: 89, y: 95, x: 87 },
        direction: "west",
        rodLength: 12,
        blockName: "brown_concrete",
        successMessage: `Error this message shouldn't be able to be seen. It means the rod amounts are incorrect.`,
    },
];
// The gap where the rod is placed. Change x and z depending on direction.
export const validRanges = [
    { x: 30, zMin: 93, zMax: 104 }, //1/2 gap 1
    { xMin: 31, xMax: 42, z: 92 }, //1/2 gap 2
    { xMin: 44, xMax: 47, z: 91 }, //1/6 gap 3
    { z: 86, xMin: 48, xMax: 65 }, //3/4 gap 4
    { zMin: 89, zMax: 97, x: 66 }, //3/8 gap 5
    //Todo
    { xMin: 69, xMax: 116, z: 99 },
    { xMin: 113, xMax: 115, z: 95 },
    { xMin: 101, xMax: 109, z: 94 },
    { x: 99, zMin: 91, zMax: 92 },
];
//The final block that is placed. If two rods are required write 2 with the same number.
export const finalBlock = [
    { location: { z: 93, y: 95, x: 30 }, blockName: "orange_concrete", number: 0 }, //1/2 gap 1
    { location: { z: 92, y: 95, x: 42 }, blockName: "orange_concrete", number: 1 }, //1/2 gap 2
    { location: { z: 91, y: 95, x: 47 }, blockName: "yellow_concrete", number: 2 }, //1/6 gap 3
    { location: { z: 86, y: 95, x: 65 }, blockName: "orange_concrete", number: 3 }, //3/4 gap 4
    { location: { z: 86, y: 95, x: 65 }, blockName: "lime_concrete", number: 3 }, //3/4 gap 4
    { location: { z: 97, y: 95, x: 66 }, blockName: "lime_concrete", number: 4 }, //3/8 gap 5
    { location: { z: 97, y: 95, x: 66 }, blockName: "red_concrete", number: 4 }, //3/8 gap 5
    //toDo
    { location: { z: 97, y: 95, x: 66 }, blockName: "green_concrete", number: 5 }, //1 2/3 gap 6
    { location: { z: 99, y: 95, x: 69 }, blockName: "green_concrete", number: 5 }, //1 2/3 gap 6
    { location: { z: 99, y: 95, x: 69 }, blockName: "green_concrete", number: 6 }, //3/2 gap 7
    { location: { z: 99, y: 95, x: 69 }, blockName: "purple_concrete", number: 6 }, //3/2 gap 7
    { location: { z: 89, y: 95, x: 87 }, blockName: "brown_concrete", number: 7 }, //7/12 gap 8
    { location: { z: 89, y: 95, x: 87 }, blockName: "brown_concrete", number: 7 }, //7/12 gap 8
    { location: { z: 89, y: 95, x: 87 }, blockName: "brown_concrete", number: 8 }, //5/24 gap 9
    { location: { z: 89, y: 95, x: 87 }, blockName: "brown_concrete", number: 8 }, //5/24 gap 9
];
export const replaySettings = [
    {
        // 1/2 gap 1
        // Message to display at the beginning of the replay
        beginningMessage: `To make 1/2 you placed: `,
        // Command to teleport the player to the starting position of the last platform they were on and set their facing direction
        tpStart: `tp @p 31 96 107 facing 31 96 100`,
        // Command to clear the rods they just placed by replacing blocks with tallgrass
        clearBlock: `fill 30 95 104 30 95 93 tallgrass replace`,
        // Command to replenish the grass under the rods they just placed, same coordinates as above with y axis 94.
        replenishGrass: `fill 30 94 104 30 94 93 grass_block replace`,
        // Direction along which the rods are placed ('x' or 'z'). This will be the value that is always the same.
        cartesianDirection: "z",
        // Specific value of the x or z that is the same on all the coordinates.
        cartesionValue: 30,
    },
    {
        // 1/2 gap 2
        beginningMessage: `To make 1/2 you placed: `,
        tpStart: `tp @p 30 96 92 facing 38 96 92`,
        clearBlock: `fill 31 95 92 42 95 92 tallgrass replace`,
        replenishGrass: `fill 31 94 92 42 94 92 grass_block replace`,
        cartesianDirection: "x",
        cartesionValue: 92,
    },
    {
        // 1/6 gap 3
        beginningMessage: `To make 1/6 you placed: `,
        tpStart: `tp @p 43 96 91 facing 53 96 91`,
        clearBlock: `fill 48 95 86 65 95 86 tallgrass replace`,
        replenishGrass: `fill 48 94 86 65 94 86 grass_block replace`,
        cartesianDirection: "x",
        cartesionValue: 91,
    },
    {
        // 3/4 gap 4
        beginningMessage: `To make 3/4 you placed: `,
        tpStart: `tp @p 47 96 86 facing 67 96 86`,
        clearBlock: `fill 53 95 94 53 95 97 tallgrass replace`,
        replenishGrass: `fill 53 94 94 53 94 97 grass_block replace`,
        cartesianDirection: "x",
        cartesionValue: 86,
    },
    {
        // 3/8 gap 5
        beginningMessage: `To make 3/8 you placed: `,
        tpStart: `tp @p 66 96 87 facing 66 96 87`,
        clearBlock: `fill 66 95 89 66 95 97 tallgrass replace`,
        replenishGrass: `fill 66 94 89 66 94 97 grass_block replace`,
        cartesianDirection: "x",
        cartesionValue: 66,
    },
    // To do.
    {
        // 1 2/3 gap 6
        beginningMessage: `To make 2/1 you placed: `,
        tpStart: `tp @p 67 96 99 facing 117 96 99`,
        clearBlock: `fill 69 95 99 116 95 99 tallgrass replace`,
        replenishGrass: `fill 69 94 99 116 94 99 grass_block replace`,
        cartesianDirection: "z",
        cartesionValue: 99,
    },
    {
        // 3/2 gap 7
        beginningMessage: `To make 1/8 you placed: `,
        tpStart: `tp @p 117 96 95 facing 112 96 95`,
        clearBlock: `fill 115 95 95 113 95 95 tallgrass replace`,
        replenishGrass: `fill 115 94 95 113 94 95 grass_block replace`,
        cartesianDirection: "z",
        cartesionValue: 95,
    },
    {
        // 7/12 gap 8
        beginningMessage: `To make 2/8 you placed: `,
        tpStart: `tp @p 111 96 94 facing 103 96 94`,
        clearBlock: `fill 109 95 94 104 95 94 tallgrass replace`,
        replenishGrass: `fill 109 94 94 104 94 94 grass_block replace`,
        cartesianDirection: "z",
        cartesionValue: 94,
    },
    {
        // 5/24 gap 9
        beginningMessage: `To make 1/12 you placed: `,
        tpStart: `tp @p 99 96 94 facing 99 96 90`,
        clearBlock: `fill 99 95 92 99 95 91 tallgrass replace`,
        replenishGrass: `fill 99 94 92 99 94 91 grass_block replace`,
        cartesianDirection: "x",
        cartesionValue: 99,
    },
];
// NPC locations for the NPCs to spawn at.
export const npcLocation = [
    { x: 30, y: 96, z: 90 }, // 1/2 gap 1
    { x: 43, y: 96, z: 92 }, // 1/2 gap 2
    { x: 49, y: 96, z: 92 }, // 1/6 gap 3
    { x: 67, y: 96, z: 87 }, // 3/4 gap 4
    { x: 66, y: 96, z: 100 }, // 3/8 gap 5
    // To do.
];
//# sourceMappingURL=perfectRun.js.map