const display = document.querySelector('#display')
const butContainer = document.querySelector('#but_container')
const equal = document.querySelector("#equal")
const clearAll = document.querySelector('#clear_all')
const del = document.querySelector('#delete')
let st = ""

function calc(a, op, b){
    a = parseInt(a)
    b = parseInt(b)

    switch(op){
        case '+':
            return a + b
        case '-':
            return a - b
        case '*':
            return a * b
        case '/':
            return a / b
        case '%':
            return a %b
        default:
            return 0
    }
}

function calculate(st){
    console.log(st);
    let arr = st.split(' ')
    let ans = 0

    for(let i = 0; i < arr.length-2; i += 2){
        ans = calc(arr[i], arr[i+1], arr[i+2])
        arr[i+2] = ans
    }
    return ans
}


butContainer.addEventListener("click", (e) => {
    let val = e.target.innerText
    if (val != "=" && val != 'AC' && val != 'D'){
        display.innerText += val
        if(val == '+' || val == '-' || val == '*' || val == '/' || val == '%'){
            st += ' '
            st += val
            st+= ' '   
        }else{
            st += val
        }
    }
});

equal.addEventListener('click', (e) => {
    if(display.innerText == "" || display.innerText == 0) return 
    display.innerText = calculate(st)
    console.log(display.innerText);
})

clearAll.addEventListener('click', ()=>{
    st = ""
    display.innerText = ""
})

del.addEventListener('click', () => {
    st = st.slice(0, st.length-1)
    display.innerText = display.innerText.slice(0, display.innerText.length-1)
})