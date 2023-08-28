const api_key = "1dad04f15bae77465017a319";
const url = "https://v6.exchangerate-api.com/v6/" + api_key;

const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amount = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.querySelector(".result");
const call_all = document.querySelector("#call_all");
let all_currency = document.querySelector(".all-currency");
const search_currency = document.getElementById("search_currency");
const specific = document.querySelector(".specific_currency");
let search_value = document.querySelector("#search_value");

fetch(url +"/codes")
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes;
        let options;
        for (let item of items) {
            options += `<option value="${item[0]}">${item[1]}</option>`
        }
        list_one.innerHTML = options;
        list_two.innerHTML = options;
    })




calculate.addEventListener("click",() => {

    const doviz1 = currency_one.value;
    const doviz2 = currency_two.value;
    const miktar = amount.value;

    fetch(url + "/latest/" + doviz1)
        .then(res => res.json())
        .then(data => {
            let x = data.conversion_rates[doviz2] * miktar;
            result.innerHTML = `
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size: 30px;">
                        ${miktar} ${doviz1} = ${x} ${doviz2}
                    </div>
                </div>
            `;
            call_all.classList.remove("hidden");
            search_currency.style.opacity = 1;
        })

})


call_all.addEventListener("click",() => {
    const doviz1 = currency_one.value;
    const miktar = amount.value;

    fetch(url + "/latest/" + doviz1)         
        .then(res => res.json())
        .then(data => {
            let a = data.conversion_rates
            for (const iterator of Object.keys(a)) {
                colors = ["primary","success","warning","info"]
                var item = colors[Math.floor(Math.random()*colors.length)];
                console.log(item)
                all_currency.innerHTML += `
                    <ul class="list-group mt-2">
                        <li class="list-group-item bg-${item} d-flex justify-content-between">${iterator} : ${data.conversion_rates[iterator] * miktar}</li>
                    </ul>
                `
            }
        })
})

let curList = [];
function currencyList() {
    fetch(url +"/codes")
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes;
        for (let item of items) {
            curList.push(item[0])
        }
    })

    console.log(curList)
}

function filterCurrency() {
    let input = search_value.value;
    for (let param of curList) {
        if (input === param) {
            console.log(param)
            showResult(input)
        }
        else {
            setTimeout(() => {
                specific.innerHTML = " ";
            }, 3000);
            specific.innerHTML = `
                <div class = "alert alert-danger">
                    <p> Aradığınız para birimi (${input}) bulunamadı </p>
                </div>
            `;
        }
    }
}


function showResult(input) {
    const doviz1 = currency_one.value;
    const miktar = amount.value;

    fetch(url + "/latest/" + doviz1)
        .then(res => res.json())
        .then(data => {
            let x = data.conversion_rates[input] * miktar;
            specific.innerHTML = `
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size: 30px;">
                        ${miktar} ${doviz1} = ${x} ${input}
                    </div>
                </div>
            `;
        })
}
search_currency.addEventListener("keypress", (e)=> {
    if (e.key === 'Enter') {
        filterCurrency();
    }
})

currencyList()