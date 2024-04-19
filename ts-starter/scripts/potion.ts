import { BlockPermutation, BlockInventoryComponent, ItemStack, world} from "@minecraft/server";
import { getBlockValue } from "./input";


async function getSlots(event: any) {
    let hopper: BlockInventoryComponent | undefined = event.block.getComponent("inventory");
    let slots = [];
    for (let i = 0; i <= 4; i++) {
        let item = hopper?.container?.getItem(i);
        world.sendMessage(`Slot ${i} has ${item?.amount} ${item?.typeId}`);
        slots.push({
            slotNumber: i,
            amount: item?.amount,
            typeId: item?.typeId
        });
    };
    return slots;
};

async function barChart(slots: any) {
    for (let slot of slots) {
        switch (slot.typeId) {
            case 'minecraft:apple': {
                await setGlass(slot, 'red_stained_glass');
                await setItemFrame(0, slot.slotNumber);
                break;
            }
            case 'minecraft:carrot': {
                await setGlass(slot, 'orange_stained_glass');
                await setItemFrame(1, slot.slotNumber);
                break;
            }
            case 'minecraft:potato': {
                await setGlass(slot, 'yellow_stained_glass');
                await setItemFrame(2, slot.slotNumber);
                break;
            }
            case 'minecraft:beetroot': {
                await setGlass(slot, 'purple_stained_glass');
                await setItemFrame(3, slot.slotNumber);
                break;
            }
            case 'minecraft:melon': {
                await setGlass(slot, 'green_stained_glass');
                await setItemFrame(4, slot.slotNumber);
                break;
            }
    };
}
};
async function setGlass(slot: any, blockName: string) {
    let {block} = getBlockValue({x: -52, y: -59, z: 126});
    block?.north(slot.slotNumber)?.setPermutation(BlockPermutation.resolve(blockName));
    for (let i = 0; i < slot.amount; i++) {
        block?.above(i)?.north(slot.slotNumber)?.setPermutation(BlockPermutation.resolve(blockName));
    }
}
async function setItemFrame(offset_z: number, slotNumber: number) {
    let cloneFrom = 126 - offset_z;
    let cloneTo = 126 - slotNumber;
    world.getDimension("overworld").runCommandAsync(`clone -40 -60 ${cloneFrom} -40 -60 ${cloneFrom} -50 -60 ${cloneTo} replace`);
};

export async function potion(event: any) {
    await resetArea();
    let slots = await getSlots(event);
    await barChart(slots);
};

async function resetArea(){
    await world.getDimension("overworld").runCommandAsync("fill -52 -60 126 -52 -51 122 black_stained_glass replace");
}