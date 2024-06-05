############################################### Imports dependencies ##########################################################################################################################################
import pandas as pd
import json


sceneJson = '/home/joe/.var/app/io.mrarm.mcpelauncher/data/mcpelauncher/games/com.mojang/development_behavior_packs/cambridge/dialogue/scene.json'
#import openpyxl

#get the location of the scriptss
import os
script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in

rel_path = "npc.xlsx"
abs_file_path = os.path.join(script_dir, rel_path)

##############################################  Inputs ###################################################################################################Minecraft_version = 1.17
Minecraft_version = str(1.17)
############################################## Prepares CSV File for future processing ##################################################################################################
npc_template = pd.read_excel(abs_file_path)  # Reads the Excel chart 
npc_template = pd.DataFrame(npc_template)  #Make a dataframe
#npc_template = npc_template.apply(lambda x: pd.Series(x.dropna().values)) # Drops NA
npc_template = npc_template.fillna('') # Fills NaN with empty strings 
################ Splits the commands columns by ", " and makes them into a python list  #########################################################
on_open_commands = npc_template.iloc[:,4].str.split(', ')
on_close_commands = npc_template.iloc[:,5].str.split(', ')
commands_1 = npc_template.iloc[:,7].str.split(', ')
commands_2 = npc_template.iloc[:,9].str.split(', ')
commands_3 = npc_template.iloc[:,11].str.split(', ')
commands_4 = npc_template.iloc[:,13].str.split(', ')
commands_5 = npc_template.iloc[:,15].str.split(', ')
commands_6 = npc_template.iloc[:,17].str.split(', ')
############################################## Count and for loop prep ##########################################################################################################################################
row_count = 0  # Creates the row count for reference
scene_amount = len(npc_template)
############################################## Prepares the lists for appending later on ##########################################################################################################################################
scene = [] #Prepares a list for the scene.json file.
translated_lines = [] #Prepares a list for the en_US.lang file.
buttons = [] #Prepares a list for the buttons to be added later on.
text = [] #Prepares a list for the readme file.
npcreload = [] #Prepares a list for the npc reload function.
############################################## Runs through the rows formatting a json file ##########################################################################################################################################

for index, row in npc_template.iterrows(): #Runs through the rows in the excel file
    scene_dict = {} #Prepares a dictionary for the scene.json file.

    if npc_template.iloc[:,0][row_count]: #Checks if the scene tag is empty
        scene_dict["scene_tag"] = f"{npc_template.iloc[:,0][row_count]}"

    if npc_template.iloc[:,2][row_count]: #Checks if the npc name is empty
        translated_lines.append(npc_template.iloc[:,2][row_count] + "=")
        scene_dict["npc_name"] = {"rawtext": [{"translate": npc_template.iloc[:,2][row_count]}]}

    if npc_template.iloc[:,3][row_count]: #Checks if the npc text is empty
        translated_lines.append(npc_template.iloc[:,3][row_count] + "=")
        scene_dict["text"] = {"rawtext": [{"translate": npc_template.iloc[:,3][row_count]}]}

    if npc_template.iloc[:,4][row_count]: #Checks if the on open commands are empty
        scene_dict["on_open_commands"] = on_open_commands[row_count]

    if npc_template.iloc[:,5][row_count]: #Checks if the on close commands are empty
        scene_dict["on_close_commands"] = on_close_commands[row_count]
    commands = [commands_3, commands_4, commands_5, commands_6]
    # Add buttons to the scene_dict
    scene_dict["buttons"] = []
    for i in range(6, 18, 2): # If you want more buttons change this in future. 
        if npc_template.iloc[:,i][row_count]: 
            translated_lines.append(npc_template.iloc[:,i][row_count] + "=")
            commands = npc_template.iloc[:,i+1][row_count].split(', ')
            button = {
                "name": {"rawtext": [{"translate": npc_template.iloc[:,i][row_count]}]},
                "commands": commands
            }
            scene_dict["buttons"].append(button)

   
    
    scene.append(scene_dict) # Append the scene dictionary to the scene list
    #Writes the readme file for each row in the excel file.
    string = f"######################################################## \n INSTRUCTIONS FOR: \n NAME = {npc_template.iloc[:,2][row_count]} \n TAG = {npc_template.iloc[:,1][row_count]} \n \n 1. Stand in front of the NPC and copy this command: \n \n/tag @e[type=npc, r=2] add {npc_template.iloc[:,1][row_count]} \n\n 2. Then paste this command: \n\n/dialogue change @e[tag={npc_template.iloc[:,1][row_count]}] {npc_template.iloc[:,0][row_count]} \n \n ######################################################## \n "    
    text.append(string)
    #Writes the reloadNPC.mcfunction file for each row in the excel file.
    NPC_reload = f"dialogue change @e[tag={npc_template.iloc[:,1][row_count]}] {npc_template.iloc[:,0][row_count]}"
    npcreload.append(NPC_reload)
    row_count = row_count + 1 # Increases the row count by 1
    if row_count == scene_amount: # Tests to see if its the final row
        break
    
######################################### Final formatting #############################################################################################################################################

scene = {"format_version": Minecraft_version, "minecraft:npc_dialogue":{"scenes": scene}}

with open(sceneJson, 'w', encoding='utf-8') as f:
    json.dump(scene, f, ensure_ascii=False, indent=4)

with open(f"{os.path.dirname(__file__)}/README.txt", "w") as f:
    f.write("\n".join(text))

with open(f"{os.path.dirname(__file__)}/reloadNPC.mcfunction", "w") as f:
    f.write("\n".join(npcreload))
    
# Write the translated lines for the language file.
with open(f"{os.path.dirname(__file__)}/translated_lines.txt", "w") as f:
    f.write("\n".join(translated_lines))

    




