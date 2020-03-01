import React, {Component} from 'react'
import {cardsConfig} from './cardsConfig'
import StartPage from './StartPage'
import PageView from './PageView'
import styled from 'styled-components'

const GameContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  padding: 1% 15% 5% 15%;
  
  h1 {
    width: 100%;
    text-align: center;
  }
  
  p {     
    font-family: 'La Belle Aurore';
    text-align: center;
    color: black;
    margin: 0;
  }
`

class Game extends Component {

  state = {
    gameInProgress: false,
    cards: null,
    currentIndex: 0
  }

  startGame = () => {
    let shuffledCards = this.shuffle(cardsConfig)

    this.setState({cards: shuffledCards, gameInProgress: true})
  }

  nextCard = () => {
    const {currentIndex, cards} = this.state

    if(currentIndex < cards.length - 1) {
      this.setState({currentIndex: currentIndex + 1})
    }
  }

  lastCard = () => {
    const {currentIndex} = this.state

    if(currentIndex > 0) {
      this.setState({currentIndex: currentIndex - 1})
    }
  }

  restart = () => {
    this.setState({cards: null, gameInProgress: false, currentIndex: 0})
  }

  shuffle = array => {
    // Shuffle the given array using a Fisher-Yates shuffle
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    let counter = array.length

    // While we still have items in the array
    while(counter > 0) {
      // Pick a random index between the start of the array
      // and the current counter position
      let index = Math.floor(Math.random() * counter)

      // Decrease counter by 1
      counter--

      // Swap the items in the array located at the counter and index positions
      let temp = array[counter]
      array[counter] = array[index]
      array[index] = temp
    }

    // Return the shuffled array
    return array
  }

  render() {
    const {
      gameInProgress,
      cards,
      currentIndex
    } = this.state

    console.log(cards)

    if(!gameInProgress) {
      return (
        <GameContainer>
          <StartPage handleGameStart={this.startGame}/>
        </GameContainer>
      )
    }

    return (
      <GameContainer>
        <PageView cards={cards} currentIndex={currentIndex} restart={this.restart}/>
      </GameContainer>
    )
  }
}

export default Game