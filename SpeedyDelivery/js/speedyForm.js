let prices = {
   'size': {
       'Small': { 'cost' : 10, 'weight' : 'Less Than 1 Pound'},
       'Medium': { 'cost' :15, 'weight' : '1-3 Pounds'},
       'Large': { 'cost' :20, 'weight' : '3-5 Pounds'},
       'Extra Large' : { 'cost' :25, 'weight' : '> 5 Pounds'}
   },
    'delivery' : {
        'First Class' : {  'cost' : 10},
        'Overnight' : {  'cost' : 7},
        '3 Day' : {  'cost' : 5}
    },
    'zone' : {
        'Zone A' : 10,
        'Zone B' : 12,
        'Zone C' : 15,
        'Zone D' : 20
    },
    'options' : {
         'Bell': {'cost' : 1, 'name' : 'Ring Bell'},
         'Signed': {'cost' : 5, 'name' : 'Signed Delivery'}
    }
}

function createQuote() {
    let delSpeed = document.querySelector('input[type=radio][name=deliver]:checked').value;
    let packSize= document.querySelector('#packSize').value;
    let dest= document.querySelector('#dest').value;
    let options = document.myForm.options;
    let optStr = multOptions(options);
    let optTotal = getOptionTotal(options);
    let oStr = checkSelected(packSize,dest);
    if ( oStr == '') {
        oStr = buildTable(delSpeed, packSize, dest, optStr, optTotal);
        oStr = "<br><h2>Price Quote</h2></br>" + oStr;
    }
    let res = document.getElementById('results');
    res.innerHTML =  oStr;

}

function checkSelected (packSize, dest){
    let oStr='';
    if (prices.size[packSize] == undefined) {
        oStr = "Error: Package Size is not selected.<br>";
    }
    if (prices.zone[dest] == undefined) {
        oStr += "Error: Destination is not selected.";
    }
    return oStr;
}

function multOptions(options) {
    let cma = "";
    let csv = "";
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            csv += cma + options[i].value;
            cma = ', ';
        }
    }
    return csv;
}

function getOptionTotal(options) {
    let total = 0;
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            let v = options[i].value;
            total += prices.options[v].cost;
        }
    }
    return total;
}

function buildTable(delSpeed, packSize, dest, optStr, optTotal){
    let total = 0;
    const SALES_TAX = 0.07;

    let USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let oStr = '<table>';
    oStr += '<tr><th> Item </th><th> Selected </th><th> Cost </th></tr>';
    let delCost = prices.delivery[delSpeed].cost;
    oStr += `<tr><th> Delivery </th><th> ${delSpeed} </th><th> ${USD.format(delCost)} </th></tr>`;
    let packCost = prices.size[packSize].cost;
    oStr += `<tr><th> Size </th><th> ${packSize} </th><th> ${USD.format(packCost)} </th>`;
    let destCost = prices.zone[dest];
    oStr += `<tr><th> Destination </th><th> ${dest} </th><th> ${USD.format(destCost)} </th>`;
    oStr += `<tr><th> Options </th><th> ${optStr} </th><th> ${USD.format(optTotal)} </th>`;

    let subtotal = delCost + packCost + destCost + optTotal;
    let tax = subtotal*SALES_TAX;
    oStr += `<tr><th> Tax </th><th>  </th><th> ${USD.format(tax)} </th>`;

    total += subtotal + tax;
    oStr += `<tr><th> Total </th><th>  </th><th> ${USD.format(total)} </th>`;
    oStr += `</table> <br>`
    return oStr;
}

function updatePage() {
    updateSpeed();

    updateSize();

    updateDestination();

    updateOptions();
}

function updateSpeed(){
    let speedOpt = document.getElementById("delSpeed");
    let oStr = ""
    let speedKeys = Object.keys(prices.delivery);
    let first = true;
    for( let i=0; i <speedKeys.length; i++ ){
        let checked="";
        if ( first ) {
            checked='checked';
            first=false;
        }
        oStr += `${speedKeys[i]}: <input type="radio" name="deliver" value="${speedKeys[i]}" ${checked} > `;
    }
    speedOpt.innerHTML = oStr;
}

function updateSize(){
    let sizeOpt = document.getElementById("packSize");
    let oStr = ""
    let sizeKeys = Object.keys(prices.size);
    for( let i=0; i <sizeKeys.length; i++ ){
        oStr += `<option value="${sizeKeys[i]}" > ${prices.size[sizeKeys[i]].weight} </option>`;
    }
    sizeOpt.innerHTML = oStr;
}

function updateDestination(){
    let destOpt = document.getElementById("dest");
    let oStr = ""
    let destKeys = Object.keys(prices.zone);
    for( let i=0; i <destKeys.length; i++ ){
        oStr += `<option value="${destKeys[i]}" > ${destKeys[i]} </option>`;
    }
    destOpt.innerHTML = oStr;
}

function updateOptions(){
    let selOpt = document.getElementById("options");
    let oStr = ""
    let optKeys = Object.keys(prices.options)
    for( let i=0; i <optKeys.length; i++ ){
        oStr += `${prices.options[optKeys[i]].name}: <input type="checkbox" name="options" value="${optKeys[i]}">`;
    }
    selOpt.innerHTML = oStr;
}