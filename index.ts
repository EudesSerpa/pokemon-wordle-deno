import { colorLetter } from "./color.ts";
import { isArceusMode } from "./args.ts";
import { writePokemonFile } from "./file.ts";

const MAX_TRIES = 6;
const POKEMON_AVALIABLES = 850;

const previousGuesses: Array<string> = [];
const randomId = Math.ceil(Math.random() * (POKEMON_AVALIABLES - 1));

const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
  .then((res) => res.json())
  .then((response) => response.name.toUpperCase());

if (isArceusMode) {
  // This is cheat!
  await writePokemonFile(pokemon);
}

let globalResults = "";

function askWord() {
  const response = prompt("The Pokemon is...");

  if (!response) {
    return { error: "You must provide a possible pokemon name" };
  }

  if (response === "-") return { exit: true };

  if (response.length !== pokemon.length) {
    return {
      error: `The Pokemon name must be ${pokemon.length} characters long`,
    };
  }
  if (previousGuesses.includes(response.toUpperCase())) {
    return { error: "You already tried this Pokemon name!" };
  }

  const onlyLetters = /^[a-zA-Z]+$/.test(response);
  if (!onlyLetters) {
    return { error: "The Pokemon name must contain ony letters" };
  }

  return { response: response.toUpperCase() };
}

function print(guess: string) {
  console.clear();

  let results = "";

  const letters: Array<string> = [...guess];

  letters.forEach((letter, index) => {
    // Letter exists in the same index
    if (letter === pokemon[index]) {
      results += colorLetter("green", letter);
    }
    // Letter exists
    else if (pokemon.includes(letter)) {
      results += colorLetter("yellow", letter);
    } else {
      results += colorLetter("gray", letter);
    }
  });

  globalResults += `${results} \r\n\r\n`;
  console.log(globalResults);
}

function start(tries: number) {
  if (tries >= MAX_TRIES) {
    console.log("💥You lost!");
    console.log(`💥The Pokemon was: ${pokemon}`);

    console.log("");

    console.log("Let's go again!🎮");
    start(0);
  }

  let guess = "";
  while (guess === "") {
    const { error, response, exit } = askWord();

    if (exit) return;

    if (error) {
      console.log(error);
      continue;
    }

    if (response) {
      guess = response;
    }
  }

  if (guess === pokemon) {
    print(guess);
    console.log("You won!⭐");
  } else {
    print(guess);
    console.log("");
    tries++;
    start(tries);
  }
}

let timesPlayed = +(localStorage.getItem("times_played") || 0);
timesPlayed++;
localStorage.setItem("times_played", timesPlayed.toString());

console.log("🎮 Let's play a game! Guess the Pokemon name");
console.log(`💡 Hint: It has ${pokemon.length} characters... Good luck!`);
console.log(`🔥 You have played ${timesPlayed} times`);
console.log("\rTo exit press: - (minus)\r\n");

start(0);
