"use strict"

const buttons = document.getElementById("buttons")
const bill = document.getElementById('bill')
const persons = document.getElementById('persons')
const custom_tip = document.getElementById('custom-tip')
const reset_btn = document.getElementById("reset")
const inputs = document.querySelectorAll(".field")

inputs.forEach(element=>{
    element.addEventListener("change",()=>{
        calculateAmount()
    })
})
buttons.addEventListener('click', (e)=> {
    toggleActiveButton(e)
})
custom_tip.addEventListener('change', (e) => {
    toggleActiveButton(e)
})


let active_tip = 15;

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
        active_tip = parseInt(e.target.innerText);
    }else if(e.target.tagName === "INPUT"){
        btns.forEach(el=>el.classList.remove('btn-active'));
        e.target.classList.add('btn-active');
        active_tip = parseFloat(e.target.value) || 0;
    }
    calculateAmount()
}

function calculateAmount( ) {
    const tip = document.getElementById('tip')
    const total_num = document.getElementById('total')
    if(persons.value === '0' || !persons.value){
        return handleError('add')
    }else{
        handleError('remove')
    }
    reset_btn.classList.remove('disabled')

    const price = parseFloat(bill.value) / parseInt(persons.value)
    const tip_amount = price * active_tip / 100
    const total = price + tip_amount

    tip.innerText = tip_amount.toFixed(2)
    total_num.innerText = total.toFixed(2)
}

function handleReset () {
    reset_btn.classList.add('disabled')
    custom_tip.value = ""
    persons.value = 0
    bill.value = 0
    handleError('remove')
    toggleActiveButton(document.querySelectorAll('.btn')[0])
}