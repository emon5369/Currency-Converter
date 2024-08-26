// const url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';

const baseURL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

const input= document.querySelector('.amount input')
const dropdowns= document.querySelectorAll('.dropdown select');
const btn = document.querySelector("button");
const fromCurr= document.querySelector(".from select")
const toCurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

// const getCurrecncy= async ()=>{
//     console.log('getting data...');
//     let response= await fetch(url);
//     console.log(response);
//     let data= await response.json();
//     console.log(data['usd']);
// }



for(let select of dropdowns){
    for(key in countryList){
        let newOption=  document.createElement('option');
        newOption.innerText= key;
        newOption.value= key;
        select.append(newOption);
        if(select.name==='from' && key==='USD'){
            newOption.selected= "selected";
        } else if(select.name==='to' && key==='BDT'){
            newOption.selected= "selected";
        }
    }
    select.addEventListener('change',(evt)=> {
        updateFlag(evt.target);
    })
}
const updateFlag= (e)=> {
    let currCode= e.value;
    // console.log(currCode);
    let countryCode= countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= e.parentElement.querySelector("img");    //or, document.querySelector("img")
    img.src= newSrc;
}

btn.addEventListener ('click', (evt)=> {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate= async ()=> {
    let amount= document.querySelector(".amount input");
    let amtVal= amount.value;
    amount.addEventListener("click", ()=>{
        amount.value="";
    })
    
    console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
    const URL= `${baseURL}/${fromCurr.value.toLowerCase()}.json`
    let response= await fetch(URL);
    console.log(response);
    let data= await response.json();
    let rate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount= amtVal * rate;
    
    msg.innerText= `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    if(amtVal==="" || amtVal < "0"){
        amtVal= 0;
        amount.value= 0;
        msg.innerText= "Invalid input!"
    }
}

window.addEventListener('load', updateExchangeRate); //put event listeners and functions serially
