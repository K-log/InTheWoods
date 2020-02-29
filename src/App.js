import React from 'react'
import PageView from './components/PageView'
import styled from 'styled-components'

const AppContainer = styled.div`
  height: 100vh;
  width: 100%;
`

function App() {
  return(
    <AppContainer id='app'>
      <PageView />
    </AppContainer>
  )
}

export default App;
