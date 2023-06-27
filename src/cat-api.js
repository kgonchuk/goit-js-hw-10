const breedsArr = 'https://api.thecatapi.com/v1/breeds'
const breedById = 'https://api.thecatapi.com/v1/images'
const API_Key = 'live_CD4h9ytUrQxkSajov6EOYXvOlELCBxcuEG8Iz4XMbgsbYBBuqS5GU09SgGkqSn1T';



function fetchBreeds(){
return fetch(`${breedsArr}?key=${API_Key}`)
.then(resp => {
    if(!resp.ok){
        throw new Error(resp.statusText)
    }
    return resp.json();

}

    );
};  

function fetchCatByBreed(breedId){
    return fetch(`${breedById}/${breedId}?api_key=${API_Key}`).then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText)
        }
        return resp.json();
    })
}

export {fetchBreeds, fetchCatByBreed}