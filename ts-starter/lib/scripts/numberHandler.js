export function roundToDigits(num, digits) {
    let numStr = num.toString();
    if (numStr.length > digits) {
        if (numStr.includes(".")) {
            let [whole, decimal] = numStr.split(".");
            if (whole.length >= digits) {
                return parseFloat(whole.slice(0, digits));
            }
            else {
                let decimalDigits = digits - whole.length;
                return parseFloat(num.toFixed(decimalDigits));
            }
        }
        else {
            return parseFloat(numStr.slice(0, digits));
        }
    }
    else {
        return num;
    }
}
//# sourceMappingURL=numberHandler.js.map