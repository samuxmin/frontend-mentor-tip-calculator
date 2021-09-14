"use strict"

const buttons = document.getElementById("buttons")
const bill = document.getElementById('bill')
const persons = document.getElementById('persons')
const customTip = document.getElementById('custom-tip')
const reset_btn = document.getElementById("reset")


buttons.addEventListener('click', (e)=> {
    toggleActiveButton(e)
})
customTip.addEventListener('change', (e) => {
    toggleActiveButton(e)
})

let activeTip = 15;

function handleError (action){
    const error = document.getElementById('error')
    switch (action) {
        case 'add':
            error.innerText = "People can't be zero";
            persons.classList.add('input-error')
            break

        case 'remove':
            error.innerText = "";
            persons.classList.remove('input-error');
            break
    
        default:
            return
    }
}

function toggleActiveButton( e ){
    let btns = document.querySelectorAll('.btn')
    if(e.target.tagName === 'BUTTON'){
        btns.forEach(el=>el.classList.remove('btn-active'));
        e.target.classList.add('btn-active');
        activeTip = parseInt(e.target.innerText);
    }else if(e.target.tagName === "INPUT"){
        btns.forEach(el=>el.classList.remove('btn-active'));
        e.target.classList.add('btn-active');
        activeTip = parseFloat(e.target.value) || 0;
    }
    calculateAmount()
}

function calculateAmount( ) {
    const tip = document.getElementById('tip')
    const totalNum = document.getElementById('total')
    if(persons.value === '0' || !persons.value){
        return handleError('add')
    }else{
        handleError('remove')
    }
    reset_btn.classList.remove('disabled')

    const price = parseFloat(bill.value) / parseInt(persons.value)
    const tipAmount = price * activeTip / 100
    const total = price + tipAmount

    tip.innerText = tipAmount.toFixed(2)
    totalNum.innerText = total.toFixed(2)
}

function handleReset () {
    reset_btn.classList.add('disabled')
    customTip.value = ""
    persons.value = 0
    bill.value = 0
    toggleActiveButton(document.querySelectorAll('.btn')[0])
}