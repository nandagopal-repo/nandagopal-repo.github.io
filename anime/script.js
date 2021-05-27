const selected = document.querySelector('#category');
const image = document.querySelector('#img')
const show = document.querySelector('#btn');
const errorMsg = document.querySelector('#error');

let type = selected.value;
let link = `https://api.waifu.pics/sfw/waifu`;

selected.addEventListener('change',()=>{
    type = selected.value;
    link = `https://api.waifu.pics/sfw/${type}`;   
})

show.addEventListener('click',displayImage);

function displayImage(){
    
    fetch(link,
        {
            responseType:'application/json'
        }
    )
    .then((response)=> response.json())
    .then((response)=> {
        image.style.display = "block";
        image.src = `${response.url}`;
    })
    .catch((error)=> {
        errorMsg.textContent = error;
    });
}