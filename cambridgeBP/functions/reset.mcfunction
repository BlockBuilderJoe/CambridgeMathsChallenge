#hide characters
tp @e[tag=fractionNpc] 57 88 148
tp @e[tag=scaleNpc] 57 88 148
tp @e[tag=ratioNpc] 57 88 148
tp @e[tag=spawnNpc] 63 97 146 facing 69 97 147
dialogue change @e[tag=spawnNpc] spawnNpc
dialogue change @e[tag=scaleNpc] scaleNpc0 
dialogue change @e[tag=ratioNpc] ratioNpc0
dialogue change @e[tag=fractionNpc] fractionNpc0

#clean up the player
tp @p 69 97 147 facing 41 97 147
scoreboard objectives setdisplay sidebar
clear @p

#Gates
scriptevent gate:close spawn
scriptevent gate:close scale
scriptevent gate:close fraction
scriptevent gate:close ratio