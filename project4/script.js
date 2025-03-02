
function binaryToDecimal(bin) {
    return parseInt(bin, 2) << 32 >> 32;
}

function decimalToBinary(dec, bits) {
    let bin = (dec < 0 ? (dec + (1 << bits)) : dec).toString(2);
    return bin.padStart(bits, '0').slice(-bits);
}

function performBoothsMultiplication() {
    let M = document.getElementById("multiplicand").value;
    let Q = document.getElementById("multiplier").value;
    let stepsDiv = document.getElementById("steps");
    let resultSpan = document.getElementById("result");
    stepsDiv.innerHTML = "";

    if (!M.match(/^[01]+$/) || !Q.match(/^[01]+$/)) {
        alert("Please enter valid binary numbers!");
        return;
    }

    let n = Math.max(M.length, Q.length) + 1;
    let A = "0".repeat(n);
    let Q1 = "0";
    let count = n;
    let M_neg = decimalToBinary(-binaryToDecimal(M), n);
    M = decimalToBinary(binaryToDecimal(M), n);
    Q = decimalToBinary(binaryToDecimal(Q), n);

    stepsDiv.innerHTML += `Initial Values:\nA = ${A}, Q = ${Q}, Q-1 = ${Q1}, M = ${M}, -M = ${M_neg}\n\n`;

    while (count > 0) {
        let lastTwoBits = Q[Q.length - 1] + Q1;

        if (lastTwoBits === "10") {
            A = decimalToBinary(binaryToDecimal(A) + binaryToDecimal(M_neg), n);
            stepsDiv.innerHTML += `Subtract M: A = ${A}\n`;
        } else if (lastTwoBits === "01") {
            A = decimalToBinary(binaryToDecimal(A) + binaryToDecimal(M), n);
            stepsDiv.innerHTML += `Add M: A = ${A}\n`;
        }

        let combined = A + Q + Q1;
        combined = combined[0] + combined.slice(0, combined.length - 1);
        A = combined.slice(0, n);
        Q = combined.slice(n, -1);
        Q1 = combined[combined.length - 1];

        stepsDiv.innerHTML += `Shift Right: A = ${A}, Q = ${Q}, Q-1 = ${Q1}\n`;
        count--;
    }

    let finalResult = A + Q;
    let decimalResult = binaryToDecimal(finalResult);
    resultSpan.innerHTML = `${finalResult} (Decimal: ${decimalResult})`;
}