import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import {DialogContent} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import DialogTitle from '@material-ui/core/DialogTitle'

const StyledDialog = withStyles({
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
})(Dialog)

const StyledDialogTitle = withStyles({
  root: {
    display:  'inline-flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    color: 'white',
    paddingBottom: 80
  }
})(DialogTitle)

const StyledDialogContent = withStyles({
  root: {
    display: 'inline-flex',
    justifyContent: 'space-evenly',
    background: 'transparent'
  }
})(DialogContent)

const Wrap = styled.div`
  h1 {
    width: 100%;
    margin: 0;
    padding-top: 5%;
    text-align: center;
    color: gold;
  }

  .start-btn-container {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 25%;
    text-align: center;
  }
`


function StartPage(props) {
  const {handleGameStart} = props
  const [openPlayerSelectDialog, setPlayerSelectDialog] = React.useState(false)

  return (
    <Wrap id='start-page'>
      <h1>In The Woods</h1>
      <span className='start-btn-container'>
        <Button onClick={() => setPlayerSelectDialog(true)} variant="contained">
          Start Game
        </Button>
      </span>
      <StyledDialog
        fullWidth
        maxWidth='lg'
        open={openPlayerSelectDialog}
      >
        <StyledDialogTitle>
          Select the number of players:
        </StyledDialogTitle>
        <StyledDialogContent>
          <Button onClick={() => handleGameStart(0)} variant='contained'>
            One
          </Button>
          <Button onClick={() => handleGameStart(1)} variant='contained'>
            Two
          </Button>
          <Button onClick={() => handleGameStart(2)} variant='contained'>
            Three
          </Button>
          <Button onClick={() => handleGameStart(3)} variant='contained'>
            Four
          </Button>
        </StyledDialogContent>
      </StyledDialog>
    </Wrap>
  )
}

export default StartPage