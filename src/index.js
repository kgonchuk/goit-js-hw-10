import { fetchCatByBreed } from "./cat-api";

import (fetchCatByBreed)

const selected = document.querySelector('.breed-select');
const list = document.querySelector('.cat-info')
selected.addEventListener('change', onChange)


function onChange(evt){
    evt.preventDefault();
    const breedId = evt.currentTargeet.value;
    console.log(breedId)
}
    // .then((data) => (list.innerHTML = createMarkup(data)))
   


function createMarkup (arr){
    return arr.map(({id, name, description, temperament}) => `<ul>
    <li>
    <img src="
    " alt="${id}">
  <h2>${name}</h2>
<p>${description}</p>
<p>${temperament}</p></li></ul>`).join('')
}