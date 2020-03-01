import React, {Component} from 'react'
import Loading from './Loading'
import styled from 'styled-components'

const Wrap = styled.div`
  button {
    width: 120px;
    height: 40px;
    margin: 0 auto;
  }
  
  .fadein {
    animation: fadein 2s;
  }
  
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .card-image-container {
    padding-bottom: 2%;
    img {
      display: block;
      margin: 0 auto 10px auto;
      width: 50%;
      border: 16px solid black;
    }
  }
  
  .controls {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .restart-btn {
    display: block;
    margin-top: 10px;
  }
  
  
  @media only screen and (max-width: 950px) {
    padding: 2% 6% 0 2%;
    
    .card-image-container {
      img {
        width: 75%;
      }
    }
    
    .controls {
      padding: 0 10px 15% 10px;
    }
  } 
`

export default class PageView extends Component {
  render() {
    const {
      cards,
      currentIndex,
      restart
    } = this.props

    if(cards) {
      const currentCard = cards[currentIndex]
      return (
        <Wrap id='page-wrap'>
          <div className='card-image-container fadein'>
            <img src={currentCard.path} alt={currentCard.title}/>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className='controls'>
            <button onClick={this.lastCard}>
              option 1
            </button>
            <button onClick={this.nextCard}>
              option 2
            </button>
          </div>
          <button className='restart-btn' onClick={restart}>
            Restart
          </button>
        </Wrap>
      )
    }

    return <Loading />
  }
}