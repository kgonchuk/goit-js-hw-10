import { fetchCatByBreed } from "./cat-api";
import { fetchBreeds } from "./cat-api";
import { Notify } from "notiflix";
import SlimSelect from 'slim-select'


const selected = document.querySelector('.breed-select');
selected.setAttribute('id', 'slim');
console.log(selected)
const list = document.querySelector('.cat-info');
list.innerHTML += '<div class = cat-info-desc></div>';
const divCatDesc = document.querySelector('.cat-info-desc');
const loader  = document.querySelector('.loader');
const errorEl = document.querySelector('.error')



selected.addEventListener('change', onChange)
errorEl.hidden = true;

renderBreedsList()

function onChange(evt){
    evt.preventDefault();
    loader.hidden = true;
    divCatDesc.innerHTML  = "";
    const breedId = evt.currentTarget.value;
    console.log(breedId);
    fetchCatByBreed(breedId)
    .then(breed => createMarkupCatDesc (breed))
    .catch(err  => {console.log(err); Notify.failure('Oops! Something went wrong! Try reloading the page!')})
    .finally(() => loader.hidden = true);
}

    function creatMarkupOption(breeds){
    const markup = breeds.map(breed =>{ return `<option value = "${breed.reference_image_id}">${breed.name}</option>`}).join('');
        selected.insertAdjacentHTML('beforeend', markup);
    }

function createMarkupCatDesc (breed){
   const markup = `
    <img src="${breed.url} " alt="${breed.id}" width ="300">
  <h2>${breed.breeds[0].name}</h2>
<p>${breed.breeds[0].description}</p>
<p>Temperament:${breed.breeds[0].temperament}</p>`;
divCatDesc.insertAdjacentHTML('beforeend', markup );
// new SlimSelect({
//     select: '#slim',
//     settings: {
//         openPosition: 'up' // 'auto', 'up' or 'down'
//       }
//   })
}

function renderBreedsList(){
    loader.hidden = true;
    fetchBreeds()
    .then(breeds => creatMarkupOption(breeds))
    .catch(error => console.log(error))
    .finally(() => {loader.hidden = true;
    selected.hidden = false}
    )
}
  