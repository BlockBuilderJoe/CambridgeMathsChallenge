import { world } from "@minecraft/server";
import { getInput } from "./input";
import { outputTotal, clearAnswer } from "./output";
import { roundToDigits } from "./numberHandler";

//calculates the fraction of a number
export async function fraction1(){
    let outputRight = {x: -22, y: -59, z: 93};
    let outputLeft= {x: -26, y: -59, z: 93};
    await clearAnswer(outputRight, outputLeft);
    let numerator = getInput([{x: -28, y: -57, z: 93}]);
    let denominator = getInput([{x: -28, y: -59, z: 93}]);
    let input = getInput([{x: -26, y: -57, z: 93}, {x: -25, y: -57, z: 93}, {x: -24, y: -57, z: 93}]);
    world.sendMessage("The fraction is:");
    world.sendMessage(numerator + "/" + denominator + " of " + input);
    let fraction = calculateFraction(numerator, denominator);
    let result = fraction * input;
    world.sendMessage("The Output is:");
    let roundedFraction = roundToDigits(result, 4);
    if (result === roundedFraction) {
        world.sendMessage('' + roundedFraction);
    }
    else {
        world.sendMessage('' + result + " which has been rounded to " + roundedFraction);
    }
    outputTotal(roundedFraction, outputRight);
}

function calculateFraction(numerator: number, denominator: number): number {
    if (denominator === 0) {
        world.sendMessage("The denominator cannot be 0. Please input a different number.")
    }
    return numerator / denominator;
}