/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import games from "./games.js";
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
    games.forEach(game => {
        let g_card = document.createElement("div");

        g_card.innerHTML = `
                <div>
                <img src="${game.img}" class="game-img" >
                <h3> ${game.name} </h3>
                <p> ${game.description} </p>
                </div>
                `
        g_card.classList.add("game-card");
        gamesContainer.appendChild(g_card)
  });
}

addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// use reduce() to count the number of total contributions by summing the backers
let g_contributions = GAMES_JSON.reduce((p, n) => p + Number(n.backers), 0)


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p> ${g_contributions.toLocaleString("en-US")} </p>`



// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let g_raised = GAMES_JSON.reduce((p,games) => p + Number(games.pledged),0);
raisedCard.innerHTML = `<p> ${g_raised.toLocaleString("en-US")} </p>`

// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let g_num = GAMES_JSON.reduce((acc,game) => acc + 1,0);
gamesCard.innerHTML = `${g_num}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let unfunded_games = GAMES_JSON.filter((game) => game.pledged < game.goal);
    console.log(unfunded_games.reduce((acc, _) => acc + 1, 0));
    addGamesToPage(unfunded_games);

}
filterUnfundedOnly()
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let funded_games = GAMES_JSON.filter((game) => game.pledged >= game.goal);
    console.log(funded_games.reduce((acc,games) => acc + 1,0));
    addGamesToPage(funded_games);


    // use filter() to get a list of games that have met or exceeded their goal
const funded = GAMES_JSON.filter((game) => game.pledged >= game.goal);
const display_str = `A total of ${funded.reduce((acc,game) => acc + Number(game.backed),0)} has been raised for ${funded.reduce((acc,games) => acc + 1,0)}); `
  // use the function we previously created to add unfunded games to the DOM
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfunded = GAMES_JSON.filter((game) => game.pledged < game.goal)
let unfunded_num = unfunded.reduce((acc, _) => acc + 1, 0);

const display_str = `A total of $${g_raised.toLocaleString("en-US")} has been raised for ${ g_num} games. Currently ${unfunded_num} remain unfunded. We need your help to fund this amazing games !`

descriptionContainer.append(display_str)



// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

let [first_game,second_game, ...others] =  sortedGames; 
console.log(first_game)
console.log(second_game)

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element
firstGameContainer.append(first_game.name);
secondGameContainer.append(second_game.name);
// do the same for the runner up item
