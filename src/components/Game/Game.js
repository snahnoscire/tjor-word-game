import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import Keyboard from '../Keyboard';
import WonBanner from '../WonBanner';
import LostBanner from '../LostBanner';


import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

function Game() {
  // sample(WORDS) picks a random word
  const [answer, setAnswer] = React.useState(sample(WORDS))
  // To make debugging easier, we'll log the solution in the console.
  console.info({ answer });

  // running | won | lost
  const [gameStatus, setGameStatus] = React.useState('running')
  const [guesses, setGuesses] = React.useState([]);

  const validatedGuesses = guesses.map((guess) => checkGuess(guess,answer));

  function handleSubmitGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess];
    setGuesses(nextGuesses);

    if (tentativeGuess === answer) {
      // won
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      // lost
      setGameStatus('lost');
    }
  }

  function handleRestart() {
    const nextAnswer = sample(WORDS);
    setAnswer(nextAnswer);
    setGameStatus('running');
    setGuesses([]);
  }

  return <>
    <GuessResults validatedGuesses={validatedGuesses}/>
    <Keyboard validatedGuesses={validatedGuesses}/>
    <GuessInput gameStatus={gameStatus} handleSubmitGuess={handleSubmitGuess} />
    { gameStatus === 'won' && <WonBanner numOfGuesses={guesses.length} handleRestart={handleRestart}/>}
    { gameStatus === 'lost' && <LostBanner answer={answer} handleRestart={handleRestart}/>}
  </>;
}

export default Game;
