import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import {DialogContent} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'

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
    paddingBottom: 80,
    fontSize: 38,
    fontWeight: 700
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
    color: #FABC02;
    font-size: 50px;
    font-family: 'La Belle Aurore';
    font-weight: 700;
    line-height: 60px;
    font-style: normal;
  }

  .start-btn-container {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 10%;
    padding-bottom: 15px;
    text-align: center;
    .MuiButton-root {
      color: rgba(232, 23, 23, 0.87);
    }
  }
  
  .MuiPaper-root {
    padding: 1px 8px 8px 8px;
    margin-top: 85px;
    color: rgba(28, 10, 91, 0.87);
  }
`


function StartPage(props) {
  const {handleGameStart} = props
  const [openPlayerSelectDialog, setPlayerSelectDialog] = React.useState(false)

  return (
    <Wrap id='start-page'>
      <Paper>
        <h1>In The Woods</h1>
        <span className='start-btn-container'>
        <Button onClick={() => setPlayerSelectDialog(true)} variant="contained">
          Start Game
        </Button>
      </span>
        <p>
          Hello! Thanks for checking out my game.
          <br/>
          <br/>
          <br/>
          Here’s the rules:
          <br/>
          Get a question, take a walk in the woods, and see what you see. At the end, answer the Question, Tell your Story. If you don’t like it, shuffle again. There are many choices to be made. It would be best if you do this with friends, or family, or acquaintances, or non-mortal enemies. If you’d like, your characters can travel together or apart. It's all up to you.
          <br/>
          <br/>
          This is a horror-adjacent game, so use discretion playing, some content warnings are Death, Blood, and Trypophobia. Stay safe, y’all.
          <br/>
          <br/>
          I made this as a project to take the structure of Mallarme’s Le Livre, the book to end all books, and turn it into a video game. I’m not sure if I achieved that, but I like what I did make so here we are. Feel free to reach out for more information about this process if you're interested!
        </p>
      </Paper>
      <StyledDialog
        fullWidth
        maxWidth='lg'
        open={openPlayerSelectDialog}
      >
        <StyledDialogTitle disableTypography>
          How many are you?:
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