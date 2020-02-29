import React, {Component} from 'react'
import {cardsConfig} from './cardsConfig'
import Loading from './Loading'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-flow: wrap column;
  justify-content: center;
  max-height: 100%;
  max-width: 100%;
  
  * {
    align-self: center;
  }
  
  h1 {
    width: 100%;
    text-align: center;
  }
  
  button {
    width: 120px;
    height: 40px;
    
  }
  
  .fadein {
    animation: fadein 2s;
  }
  
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Container holding the image and the text */
  .card-image-container {
    position: relative;
    color: white;
    margin-bottom: 10%;
    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 50%;
    }
  }
  
  /* Bottom left text */
  .bottom-left {
    position: absolute;
    bottom: 8px;
    left: 16px;
  }
  
  /* Top left text */
  .top-left {
    position: absolute;
    top: 10%;
    left: 26%;
  }
  
  /* Top right text */
  .top-right {
    position: absolute;
    top: 10%;
    right: 26%;
  }
  
  /* Bottom right text */
  .bottom-right {
    position: absolute;
    bottom: 8px;
    right: 16px;
  }
  
  /* Centered text */
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export default class PageView extends Component {
  state = {
    cards: null,
    currentIndex: 0
  }

  componentDidMount() {
    let shuffledCards = this.shuffle(cardsConfig)

    this.setState({cards: shuffledCards})
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

  nextCard = () => {
    const {currentIndex, cards} = this.state

    if(currentIndex < cards.length - 1) {
      this.setState({currentIndex: currentIndex + 1})
    }
  }

  render() {
    const {
      cards,
      currentIndex
    } = this.state

    console.log(cards)


    if(cards) {
      const currentCard = cards[currentIndex]
      return (
        <Wrap id='page-wrap'>
          <h1>{currentCard.title}</h1>
          <div className='card-image-container'>
            <img src={currentCard.path} alt={currentCard.title}/>
            {currentCard.text.map((t, idx) => (
              <div className={`overlay ${t.location}`} key={idx}>{t?.value}</div>
            ))}
          </div>
          <button onClick={this.nextCard}>
            Next Card
          </button>
        </Wrap>
      )
    }

    return <Loading />
  }
}