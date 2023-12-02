function calculateLoan(){
    let fName = document.getElementById("firstName").value;
    let income = document.getElementById("income").value;
    let debt = document.getElementById("otherDebt").value;
    let t=0;
    let msg = checkInput(fName, income, debt);

    if(msg==""){
        console.log(parseInt(income));
        console.log(parseInt(debt));
        t = (income-debt)*2;
        if (t>=100000){
            msg = `<div><img id="img" src="imgs/HermanHappy.PNG" alt="HappyHerman">
            Nice! Herman says you can borrow up to ${USDollar.format(t)} you can afford a NICE house. <br>
            ${fName}, you have income:${USDollar.format(income)} and debt:${USDollar.format(debt)}</div>`;
        }else if (t>0 && t<100000){
            msg = `<div><img id="img" src="imgs/HermanSortOfHappy.PNG" alt="SortOfHappyHerman">
            Hmmm! Herman says you cannot afford much: up to ${USDollar.format(t)}. <br>
            ${fName}, you have income:${USDollar.format(income)} and debt:${USDollar.format(debt)}</div>`;
        }else{
            msg = `<div><img id="img" src="imgs/HermanMad.PNG" alt="MadHerman">
            Hmmm! Herman says ... are you kidding me? You don't have any money: ${USDollar.format(t)}. <br>
            ${fName}, you have income:${USDollar.format(income)} and debt:${USDollar.format(debt)}</div>`;
        }

    }
    document.getElementById("results").innerHTML = msg;
}

function checkInput(fName,income,debt){
    let msg="";
    console.log(parseInt(income));
    console.log(parseInt(debt));
    if (fName == ""){
        msg += "<span>First Name is not provided<br/></span>";
    }
    if (isNaN(parseInt(income))){
        msg += "<span>Income is not a number<br/></span>";
    }
    if (isNaN(parseInt(debt))){
        msg += "<span>Debt is not a number</span>";
    }
    return msg;
}
let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});