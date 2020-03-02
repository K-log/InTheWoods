import React, {Component} from 'react'
import styled from 'styled-components'


const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  .start-btn-container {
    display: inline;
    vertical-align: middle;
    text-align: center;
    
    button {
      height: 60px;
      width: 120px;
    }
  }
`


class StartPage extends Component {
  render() {
    const {
      handleGameStart
    } = this.props
    return (
      <Wrap id='start-page'>
        <h1>In The Woods</h1>
        <span className='start-btn-container'>
          <button onClick={handleGameStart}>
            Start Game
          </button>
        </span>
      </Wrap>
    )
  }
}

export default StartPage