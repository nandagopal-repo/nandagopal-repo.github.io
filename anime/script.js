const selected = document.querySelector('#category');
const image = document.querySelector('#img')
const show = document.querySelector('#btn');
const errorMsg = document.querySelector('#error');
const loader = document.querySelector('#loader');

let type = selected.value;
let link = `https://api.waifu.pics/sfw/waifu`;

selected.addEventListener('change',()=>{
    type = selected.value;
    link = `https://api.waifu.pics/sfw/${type}`;   
})

show.addEventListener('click',displayImage);


async function displayImage(){
    loader.style.display = "block";
    loader.style.animation = "1s rotation linear infinite";
    await fetch(link,{
                mode: 'cors',
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
    loader.style.display = "none";
    loader.style.animation = "1s rotation linear";
}