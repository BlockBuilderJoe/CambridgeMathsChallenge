import { world, GameMode } from "@minecraft/server";
//sets the default game rules
const setDefaultGameRules = () => {
    //stops all mob events
    world.getDimension("overworld").runCommandAsync(`mobevent events_enabled false`);
    world.gameRules.commandBlockOutput = false;
    world.gameRules.commandBlocksEnabled = false;
    world.gameRules.doDayLightCycle = false;
    world.gameRules.doEntityDrops = false;
    world.gameRules.doFireTick = false;
    world.gameRules.doImmediateRespawn = true;
    world.gameRules.doInsomnia = false;
    world.gameRules.doLimitedCrafting = false;
    world.gameRules.doMobLoot = false;
    world.gameRules.doMobSpawning = false;
    world.gameRules.doTileDrops = false;
    world.gameRules.doWeatherCycle = false;
    world.gameRules.drowningDamage = true; //changed this for well game.
    world.gameRules.fallDamage = false;
    world.gameRules.fireDamage = false;
    world.gameRules.freezeDamage = false;
    world.gameRules.functionCommandLimit = 100;
    world.gameRules.keepInventory = true;
    world.gameRules.maxCommandChainLength = 65536;
    world.gameRules.mobGriefing = false;
    world.gameRules.naturalRegeneration = false;
    world.gameRules.playersSleepingPercentage = 0;
    world.gameRules.projectilesCanBreakBlocks = false;
    world.gameRules.pvp = false;
    world.gameRules.randomTickSpeed = 3;
    world.gameRules.recipesUnlock = false;
    world.gameRules.respawnBlocksExplode = false;
    world.gameRules.sendCommandFeedback = false;
    world.gameRules.showBorderEffect = false;
    world.gameRules.showCoordinates = false;
    world.gameRules.showDeathMessages = false;
    world.gameRules.showRecipeMessages = false;
    //showDaysPlayed missing.
    world.gameRules.showTags = false;
    world.gameRules.spawnRadius = 0;
    world.gameRules.tntExplodes = false;
    world.gameRules.tntExplosionDropDecay = false;
};
//sets them back to adventure mode if they change to anything else.
world.afterEvents.playerGameModeChange.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.toGameMode !== GameMode.adventure) {
        event.player.setGameMode(GameMode.adventure);
    }
}));
//if the player changes the gamerule set them back to defaults for the game.
world.afterEvents.gameRuleChange.subscribe((event) => __awaiter(void 0, void 0, void 0, function* () {
    setDefaultGameRules();
}));
//runs on start
setDefaultGameRules();
//# sourceMappingURL=worldLock.js.map