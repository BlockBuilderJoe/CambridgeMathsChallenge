import { world } from "@minecraft/server";

export async function rodNpcDialogue(event: string) {
  switch (event) {
    case "rod:npc1_correct": {
      world.sendMessage("You are correct! You may proceed to the next NPC.");
      break;
    }
    case "rod:npc1_incorrect": {
      world.sendMessage("You are incorrect! Please try again.");
    }
  }
}
