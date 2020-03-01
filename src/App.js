import React from 'react'
import Game from './components/Game'
import styled from 'styled-components'

const AppContainer = styled.div`
  height: 100vh;
`

function App() {
  return(
    <AppContainer id='app'>
      <Game />
    </AppContainer>
  )
}

export default App;
