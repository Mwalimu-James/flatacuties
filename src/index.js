// Base URL for API
let charactersUrl = "http://localhost:3000/characters";

//getting all character names
function getAllCharacters() {
    fetch(charactersUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            for (let i = 0; i < data.length; i++) {
                let character = data[i];
                showCharacterName(character);
            }
        });
}

//displaying character names in the bar
function showCharacterName(character) {
    let charBar = document.getElementById("character-bar");
    let newSpan = document.createElement("span");
    newSpan.textContent = character.name;
    charBar.appendChild(newSpan);
    newSpan.dataset.id = character.id;
    newSpan.addEventListener("click", function() {
        getCharacterDetails(character.id);
    });
}

// getting character details by id
function getCharacterDetails(id) {
    fetch(charactersUrl + "/" + id)
        .then(function(res) {
            return res.json();
        })
        .then(function(character) {
            updateCharacterDetails(character);
        });
}

//updating character details in the DOM
function updateCharacterDetails(character) {
    document.getElementById("name").innerText = character.name;
    document.getElementById("image").src = character.image;
    document.getElementById("vote-count").innerText = character.votes;
}

//handling vote submission
let voteForm = document.getElementById("votes-form");
voteForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let voteInput = document.getElementById("votes").value;
    let currentVotes = document.getElementById("vote-count").innerText;
    let newVoteCount = parseInt(voteInput) + parseInt(currentVotes);
    document.getElementById("vote-count").innerText = newVoteCount;
    voteForm.reset(); 
});

//resetting
let resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", function() {
    document.getElementById("vote-count").innerText = 0;
});

//finnally DOM
document.addEventListener("DOMContentLoaded", function() {
    getAllCharacters(); 
});
