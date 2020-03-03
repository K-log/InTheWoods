import React from 'react'
import Game from './components/Game'
import {CssBaseline} from '@material-ui/core'
import Container from '@material-ui/core/Container'

function App() {
  return (
    <>
      <CssBaseline/>
      <Container maxWidth="sm">
        <Game/>
      </Container>
    </>
  )
}

export default App;
