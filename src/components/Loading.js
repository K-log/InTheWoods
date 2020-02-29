import React, {Component} from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  
  .loader {
    align-self: center;
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export default class Loading extends Component {
  render() {
    return (
      <Wrap>
        <div className='loader'/>
      </Wrap>
    )
  }
}
