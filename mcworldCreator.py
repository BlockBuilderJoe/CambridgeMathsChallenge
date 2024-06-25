import zipfile
import os

#### Stuff you need to change #########################
templateMcworld = 'mathmogicianWorld.mcworld'
resourcePack = 'cambridgeRP'
behaviourPack = 'cambridgeBP'
worldFile = 'mathmogicianWorld'
######################################################

def createMcworld(mcworld, mathmogicianWorld, resourcePack, behaviorPack):
    with zipfile.ZipFile(mcworld, 'w') as zipf:
        # Write the contents of mathmogicianWorld to the root of the mcworld
        for root, dirs, files in os.walk(mathmogicianWorld):
            for file in files:
                if file != 'world_resource_pack_history.json' and file != 'world_behavior_pack_history.json':
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, mathmogicianWorld)
                    zipf.write(file_path, arcname)

        # Write the resource pack files to the mcworld
        for root, dirs, files in os.walk(resourcePack):
            for file in files:
                file_path = os.path.join(root, file)
                zipf.write(file_path, os.path.join('resource_packs', file_path))

        # Write the behavior pack files to the mcworld
        for root, dirs, files in os.walk(behaviorPack):
            for file in files:
                file_path = os.path.join(root, file)
                zipf.write(file_path, os.path.join('behavior_packs', file_path))

createMcworld(templateMcworld, worldFile, resourcePack, behaviourPack)
