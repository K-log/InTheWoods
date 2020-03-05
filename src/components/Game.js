import React, {Component} from 'react'
import {cardsConfig, questionsConfig} from './cardsConfig'
import StartPage from './StartPage'
import PageView from './PageView'
import ResultsView from './ResultsView'
import Container from '@material-ui/core/Container'

const TOTAL_LEVELS = 5

class Game extends Component {

  state = {
    gameInProgress: false,
    cards: null,
    currentCard: null,
    storyPaths: {
      0: [],
      1: [],
      2: [],
      3: []
    },
    totalPlayers: 0,
    currentPlayer: 0,
    questionCard: null,
    gameCompleted: false,
  }

  startGame = totalPlayers => {
    // When starting a new game, shuffle all three levels and store them in the game state
    const questions = this.shuffle(questionsConfig)

    let cards = []
    for(let lvls = TOTAL_LEVELS; lvls > 0; lvls--) {
      cards = [
        ...this.shuffle(cardsConfig.filter((value, index) => cards.indexOf(value) !== index)),
        ...cards
      ]
    }

    this.setState({
      cards: cards,
      currentCard: questions[0],
      questionCard: questions[0],
      gameInProgress: true,
      storyPaths: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      currentPlayer: 0,
      totalPlayers
    })
  }

  restart = () => {
    const {
      currentPlayer,
      totalPlayers,
    } = this.state

    if(currentPlayer >= totalPlayers) {
      this.setState(state => ({
        cards: null,
        gameInProgress: false,
        storyPaths: {
          0: [],
          1: [],
          2: [],
          3: []
        },
      }))
    }

    let cards = []
    for(let lvls = TOTAL_LEVELS; lvls > 0; lvls--) {
      cards = [
        ...this.shuffle(cardsConfig.filter((value, index) => cards.indexOf(value) !== index)),
        ...cards
      ]
    }

    // Reset the game for the next player
    this.setState(state =>({
      currentCard: state.questionCard,
      currentPlayer: state.currentPlayer + 1,
      storyPaths: {
        ...state.storyPaths,
        [state.currentPlayer]: [
          ...state.storyPaths?.[state.currentPlayer],
          state.currentCard
        ]
      },
      cards
    }))
  }

  showResults = () => {
    this.setState(state => ({
      cards: null,
      currentCard: null,
      gameCompleted: true,
      storyPaths: {
        ...state.storyPaths,
        [state.currentPlayer]: [
          ...state.storyPaths?.[state.currentPlayer],
          state.currentCard
        ]
      }
    }))
  }

  selectNextCard = nextCardTitle => {
    const {cards, currentCard} = this.state

    this.updateStoryPath(currentCard)

    const nextCard = cards.find(card => card.title === nextCardTitle)
    const updatedCards = cards.filter(c => c.title !== nextCard.title)

    this.setState({
      cards: updatedCards,
      currentCard: nextCard
    })
  }

  getNewOption = (currentOption) => {
    const {cards} = this.state

    if(currentOption) {
      // Filter out the current options from the selection
      const filteredNextCards = cards.filter(option => option.title !== currentOption.title)

      return filteredNextCards[0]
    }

    return cards[0]
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

  updateStoryPath = newCard => {
    const {currentPlayer} = this.state

    this.setState(state => ({
      storyPaths: {
        ...state.storyPaths,
        [currentPlayer]: [
          ...state.storyPaths?.[currentPlayer],
          newCard
        ]
      }
    }))
  }

  render() {
    const {
      gameInProgress,
      currentCard,
      totalPlayers,
      currentPlayer,
      storyPaths,
      gameCompleted
    } = this.state

    if(!gameInProgress) {
      return (<Container maxWidth="sm"><StartPage handleGameStart={this.startGame}/></Container>)
    }

    if(gameCompleted) {
      return (<ResultsView storyPaths={storyPaths} totalPlayers={totalPlayers}/>)
    }

    const morePlayers = currentPlayer < totalPlayers && storyPaths[currentPlayer].length > TOTAL_LEVELS - 1
    let option1 = null
    let option2 = null
    if(storyPaths[currentPlayer].length < TOTAL_LEVELS) {
      console.log('new options')
      option1 = this.getNewOption(null)
      option2 = this.getNewOption(option1)
    }

    console.log('state: ', this.state)

    return (
      <Container maxWidth="sm">
        <PageView
          currentCard={currentCard}
          restart={this.restart}
          option1={option1}
          option2={option2}
          selectNextCard={this.selectNextCard}
          morePlayers={morePlayers}
          updateStoryPath={this.updateStoryPath}
          showResults={this.showResults}
        />
      </Container>
    )
  }
}

export default Game