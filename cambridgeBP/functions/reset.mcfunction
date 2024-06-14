#hide characters
tp @e[tag=fractionNpc] 68 92 150
tp @e[tag=scaleNpc] 68 92 150
tp @e[tag=ratioNpc] 68 92 150
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