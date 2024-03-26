#Duplicates the in the mcworld file to a new file called combined.mcworld and removes the history files
import os
import zipfile
import json

#Define the variables
mcworld = 'Cambridge.mcworld'
bp = "cambridgeBP"
rp = "cambridgeRP"
combined_mcworld = 'Cambridge_Combined.mcworld'
files_to_delete = ['world_behavior_pack_history.json', 'world_resource_pack_history.json']

#delete any .DS_Store files in the bp and rp folders
os.system(f'find {bp} -name ".DS_Store" -delete')
os.system(f'find {rp} -name ".DS_Store" -delete')
#Remove the combined.mcworld file if it exists
os.system(f'rm -rf {combined_mcworld}')
#open the bp manifest file and extract the uuid from it
with open(bp + '/manifest.json', 'r') as file:
    data = json.load(file)
    bp_uuid = data['header']['uuid']

#open the rp manifest file and extract the uuid from it
with open(rp + '/manifest.json', 'r') as file:
    data = json.load(file)
    rp_uuid = data['header']['uuid']
    
#Open the zip file in read mode
with zipfile.ZipFile(mcworld, 'r') as zipf:
    #Remove world_resourcepacks.json file from the zip file
    zipf.extract('world_resource_packs.json','temp')  # Extract the file temporarily
    zipf.extract('world_behavior_packs.json',"temp")  # Extract the file temporarily

    with open("temp/world_resource_packs.json", 'r') as file:
        data = json.load(file)

        # Update the pack_id value
        data[0]['pack_id'] = rp_uuid
        # Write the modified data back to the JSON file
        with open('temp/world_resource_packs.json', 'w') as file:
            json.dump(data, file, indent=4)
    
    with open("temp/world_behavior_packs.json", 'r') as file:
        data = json.load(file)

        # Update the pack_id value
        data[0]['pack_id'] = bp_uuid
        # Write the modified data back to the JSON file
        with open('temp/world_behavior_packs.json', 'w') as file:
            json.dump(data, file, indent=4)

    #Open the temp zip file in write mode
    with zipfile.ZipFile(combined_mcworld, 'w') as temp_zipf:

        #Iterate over the items in the zip file
        for item in zipf.infolist():
            #Check if the file is not in the files_to_delete list
            if item.filename not in files_to_delete:
                #Read the file from the zip file
                data = zipf.read(item.filename)
                #Write the file to the temp zip file
                temp_zipf.writestr(item, data)
            #Write the modified file back to the zip file
        temp_zipf.write('temp/world_resource_packs.json', 'world_resource_packs.json')  # Add the modified file back to the zip file
        temp_zipf.write('temp/world_behavior_packs.json', 'world_behavior_packs.json')  # Add the modified file back to the zip file

        # Add in the resource packs.
        for root, dirs, files in os.walk(rp):
            for file in files:
                # Get the full path of the file
                file_path = os.path.join(root, file)
                #write the file to the mcworld in a folder called resource_packs
            
                temp_zipf.write(file_path, os.path.join('resource_packs', file_path))

        # Add in the behavior packs.
        for root, dirs, files in os.walk(bp):
            for file in files:
                # Get the full path of the file
                file_path = os.path.join(root, file)
                #write the file to the mcworld in a folder called resource_packs
        
                temp_zipf.write(file_path, os.path.join('behavior_packs', file_path))

#Remove the temp folder
os.system('rm -rf temp')

