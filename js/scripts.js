// ==================================
// function on click of doFizzBuzzBtn
// ==================================
$("#doFizzBuzzBtn").on("click", function () {
    // Acquire the user data
    let fNum = parseInt($("#fizzNumInput").val());
    let bNum = parseInt($("#buzzNumInput").val());

    if (!ValidateUserInput(fNum, bNum)) {
        return;
    }

    // Perform the FizzBuzz algorithm
    let fizzMod = 0;
    let buzzMod = 0;
    let output = new Array();

    for (let loop = 1; loop <= 100; loop++) {
        fizzMod = loop % fNum;
        buzzMod = loop % bNum;

        if (fizzMod == 0 && buzzMod == 0) {
            output.push("<span class='fizzbuzz'>FizzBuzz</span>");
        }
        else if (fizzMod == 0) {
            output.push("<span class='fizz'>Fizz</span>")
        }
        else if (buzzMod == 0) {
            output.push("<span class='buzz'>Buzz</span>")
        }
        else {
            output.push(loop);
        }
    }

    // Output the result to the user
    let outStr = "";
    if (document.getElementById("useTable").checked) {
        displayInTable(output);

    } else {
        displayInTextBox(output);
    }
});

function ValidateUserInput(fNum, bNum) {
    let result = true; // assume valid data, but then test to be sure

    if (!fNum || !bNum) {
        let outStr = "You must enter two numbers in the fields above."
        let outArea = document.getElementById('outputArea');
        let template = document.querySelector('#textBoxTemplate');

        // this line gives me a clone of the p element in the template.
        let pClone = template.content.cloneNode(true);

        // pElement is what I'll add to the HTML outArea.
        let pElement = pClone.querySelector("p");

        pElement.classList.add("font-weight-bold", "text-danger", "border", "p-3");
        pElement.innerHTML = outStr;

        // make sure the outArea doesn't have anything in it from a previous execution.
        outArea.innerHTML = "";
        outArea.classList.remove("table-responsive"); // just in case
        outArea.appendChild(pElement);
        result = false;
    }

    return result;
}

// ===========================
// function displayInTextBox()
// ===========================
function displayInTextBox(outputArray) {
    let outArea = document.getElementById('outputArea');
    let template = document.querySelector('#textBoxTemplate');
    let outStr = outputArray.join(' ');

    // this line gives me a clone of the p element in the template.
    let pClone = template.content.cloneNode(true);

    // pElement is what I'll add to the HTML outArea.
    let pElement = pClone.querySelector("p");

    pElement.classList.add("border", "p-3");
    pElement.innerHTML = outStr;

    // make sure the outArea doesn't have anything in it from a previous execution.
    outArea.innerHTML = "";
    outArea.classList.remove("table-responsive"); // just in case
    outArea.appendChild(pElement);
}

// ===========================
// function displayInTable()
// ===========================
function displayInTable(fbArray) {
    let outArea = document.getElementById('outputArea');
    let template = document.querySelector('#tableTemplate');

    // clone the table template and grab some of its elements to work with
    let tableClone = template.content.cloneNode(true);
    let tableElement = tableClone.querySelector("table");
    let trClone = tableElement.querySelector("tr").cloneNode(true);
    let tdClone = tableElement.querySelector("td").cloneNode(true);
    let tbodyElement = tableElement.querySelector("tbody");

    // initialize things before we enter the loops        
    // add some classes to the table
    tableElement.classList.add("table", "table-striped", "table-bordered");
    tbodyElement.innerHTML = "";
    trClone.innerHTML = "";

    // now loop through the fbArray and insert table content
    for (col = 0; col < 10; col++) {
        let trElement = trClone.cloneNode(true);

        for (row = 0; row < 10; row++) {
            let tdElement = tdClone.cloneNode(true);
            tdElement.innerHTML = fbArray[col * 10 + row];
            tdElement.classList.add("align-middle");
            trElement.appendChild(tdElement);
        }
        tbodyElement.appendChild(trElement);
    }

    // make sure the outArea doesn't have anything in it from a previous execution.
    outArea.innerHTML = "";
    outArea.classList.add("table-responsive");
    outArea.appendChild(tableElement);

}