import { fetchCatByBreed } from "./cat-api";
import { fetchBreeds } from "./cat-api";
import { Notify } from "notiflix";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selected = document.querySelector('.breed-select');
selected.setAttribute('id', 'single');
console.log(selected)
const list = document.querySelector('.cat-info');
list.innerHTML += '<div class = cat-info-desc></div>';
const divCatDesc = document.querySelector('.cat-info-desc');
const loader  = document.querySelector('.loader');
const errorEl = document.querySelector('.error')





selected.style = 'position :absolute; top : 5%; left : 40% ; width :300px';


selected.addEventListener('change', onChange)
errorEl.hidden = true;


renderBreedsList()

function onChange(evt){
    evt.preventDefault();
    divCatDesc.innerHTML  = "";
    const breedId = evt.currentTarget.value;
    console.log(breedId);
    fetchCatByBreed(breedId)
    .then(breed => createMarkupCatDesc (breed))
    .catch(err  => {console.log(err); Notify.failure('Oops! Something went wrong! Try reloading the page!')})
    .finally(() => {loader.hidden = true});
}

    function creatMarkupOption(breeds){
    const markup = breeds.map(breed =>{ return `<option value = "${breed.reference_image_id}">${breed.name}</option>`}).join('');
        selected.insertAdjacentHTML('beforeend', markup);
        new SlimSelect({
            select: '#single',
          });
    }

function createMarkupCatDesc (breed){
   const markup = `
    <img src="${breed.url} " alt="${breed.id}" width ="300" class = "img-cats">
  <h2 class = "text">${breed.breeds[0].name} </h2>
<p class = "text">${breed.breeds[0].description} </p>
<p class = "text">Temperament:${breed.breeds[0].temperament}</p>`;
divCatDesc.insertAdjacentHTML('beforeend', markup );
}

function renderBreedsList(){
    loader.hidden = false;
    fetchBreeds()
    .then(breeds => creatMarkupOption(breeds))
    .catch(error => {console.log(error); Notify.failure('Oops! Something went wrong! Try reloading the page!')})
    .finally(() => {loader.hidden = true}
    )
}
  

