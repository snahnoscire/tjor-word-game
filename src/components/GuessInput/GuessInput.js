import React from "react";

function GuessInput({ gameStatus, handleSubmitGuess }) {
  const [tentativeGuess, setTenatativeGuess] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    handleSubmitGuess(tentativeGuess);
    setTenatativeGuess('');
  }

  return <form onSubmit={handleSubmit} className="guess-input-wrapper">
    <label htmlFor="guess-input">Enter guess:</label>
    <input required
      disabled={gameStatus !== 'running'}
      minLength={5}
      maxLength={5}
      pattern="[a-zA-Z]{5}"
      title="5 letter word"
      value={tentativeGuess}
      onChange={(event) => {
        const nextTentativeGuess = event.target.value.toUpperCase();
        setTenatativeGuess(nextTentativeGuess);
      }}
      id="guess-input"
      type="text" />
  </form>;
}

export default GuessInput;
