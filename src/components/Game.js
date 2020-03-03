import React, {Component} from 'react'
import {cardsConfig} from './cardsConfig'
import StartPage from './StartPage'
import PageView from './PageView'
import styled from 'styled-components'


class Game extends Component {

  state = {
    gameInProgress: false,
    cards: null,
    currentLvl: 0,
    nextOption0: null,
    nextOption1: null,
    currentCard: null,
    storyPaths: {
      0: [],
      1: [],
      2: [],
      3: []
    },
    totalPlayers: 0,
    currentPlayer: 0
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {currentLvl, currentCard} = this.state
    if(prevState.current !== currentCard && currentCard !== null && prevState.currentLvl !== currentLvl) {
      this.updateStoryPath()
    }
  }

  startGame = totalPlayers => {
    // When starting a new game, shuffle all three levels and store them in the game state
    let lvl0 = this.shuffle(cardsConfig[0])
    let lvl1 = this.shuffle(cardsConfig[1])
    let lvl2 = this.shuffle(cardsConfig[2])

    this.setState({
      cards: [lvl0, lvl1, lvl2],
      gameInProgress: true,
      currentLvl: 0,
      storyPaths: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      totalPlayers
    })
  }

  restart = () => {
    const {
      currentPlayer,
      totalPlayers
    } = this.state

    if(currentPlayer >= totalPlayers) {
      this.setState({cards: null, gameInProgress: false, currentLvl: 0, gameCompleted: true})
    }

    // Reset the game for the next player
    this.setState({currentLvl: 0, currentPlayer: currentPlayer + 1})
  }

  selectNextCard = nextCardTitle => {
    const {cards, currentLvl} = this.state

    const nextLvl = currentLvl + 1
    const nextCard = cards[nextLvl].find(card => card.title === nextCardTitle)
    //console.log(nextCardTitle, nextCard)

    this.setState({
      currentCard: nextCard,
      currentLvl: nextLvl
    })
  }

  getNewOption = (currentLvl, currentOption) => {
    const {cards} = this.state

    //console.log(currentLvl)
    let nextCards = cards[currentLvl]

    if(currentOption) {
      // Filter out the current options from the selection
      const filteredNextCards = nextCards.filter(option => option.title !== currentOption.title)

      // Select a random card from the list
      return filteredNextCards[Math.floor(Math.random() * filteredNextCards.length)]
    }

    // Select a random card from the list
    return nextCards[Math.floor(Math.random() * nextCards.length)]
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

  updateStoryPath = () => {
    const {currentCard, currentPlayer} = this.state

    this.setState(state => ({
      storyPaths: {
        ...state.storyPaths,
        [currentPlayer]: [
          ...state.storyPaths?.[currentPlayer],
          currentCard
        ]
      }
    }))
  }

  render() {
    const {
      gameInProgress,
      cards,
      currentLvl,
      currentCard,
      storyPaths,
      totalPlayers,
      currentPlayer
    } = this.state

    if(!gameInProgress) {
      return (<StartPage handleGameStart={this.startGame}/>)
    }

    const morePlayers = currentPlayer < totalPlayers && currentLvl === cards.length - 1
    const card = currentCard ?? this.getNewOption(currentLvl, null)
    let option1 = null
    let option2 = null
    if(currentLvl < cards.length - 1) {
      option1 = this.getNewOption(currentLvl + 1, null)
      option2 = this.getNewOption(currentLvl + 1, option1)
    }

    return (
      <PageView
        currentCard={card}
        restart={this.restart}
        option1={option1}
        option2={option2}
        selectNextCard={this.selectNextCard}
        morePlayers={morePlayers}
      />
    )
  }
}

export default Game