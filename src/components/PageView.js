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
      border: 40px solid white;
    }
  }
  
  .controls {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
  }
  
  .restart-btn {
    display: block;
    margin-top: 10px;
  }

  .option1-btn {}

  .option2-btn {
    transform: scaleX(-1);
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
      currentCard,
      restart,
      selectNextCard,
      option1, 
      option2
    } = this.props

    if(currentCard) {
      return (
        <Wrap id='page-wrap'>
          <div className='card-image-container fadein'>
            <img src={currentCard.path} alt={currentCard.title}/>
            <div className='controls'>
              <div className='option1-btn' onClick={() => selectNextCard(option1?.title)} value={option2?.title}>
                <img src={option1?.arrow} alt='option2' width={170}/>
              </div>
              <div className='option2-btn' onClick={() => selectNextCard(option2?.title)} value={option2?.title}>
                <img src={option2?.arrow} alt='option2' width={170}/>
              </div>
            </div>
            <button className='restart-btn' onClick={restart}>
              Restart
            </button>
          </div>
        </Wrap>
      )
    }

    return <Loading />
  }
}