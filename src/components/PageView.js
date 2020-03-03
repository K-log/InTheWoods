import React, {Component} from 'react'
import Loading from './Loading'
import {Card} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import {withStyles} from '@material-ui/styles'

const StyledCard = withStyles({
  root: {
    marginTop: 60,
    paddingTop: 60,
    paddingBottom: 30
  }
})(Card)


const StyledCardMedia = withStyles({
  img: {
    width: '80%',
    margin: '0 auto'
  }
})(CardMedia)

const StyledCardActions = withStyles({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
})(CardActions)

const LeftOptionButton = withStyles({
  root: {
    width: '45%'
  }
})(IconButton)

const RightOptionButton = withStyles({
  root: {
    width: '45%',
    transform: 'scaleX(-1)'
  }
})(IconButton)

const RestartButton = withStyles({
  root: {
  }
})(Button)




export default class PageView extends Component {
  render() {
    const {
      currentCard,
      restart,
      selectNextCard,
      option1, 
      option2,
      morePlayers
    } = this.props

    if(currentCard) {
      return (
        <StyledCard>
          <StyledCardMedia image={currentCard.path} title={currentCard.title} component='img'/>
          <StyledCardActions>
            {(!morePlayers || option1 !== null)  &&
              <LeftOptionButton onClick={() => selectNextCard(option1?.title)} value={option2?.title}>
                <img src={option1?.arrow} width={170}/>
              </LeftOptionButton>
            }
            {(!morePlayers || option1 !== null) &&
              <RightOptionButton onClick={() => selectNextCard(option2?.title)} value={option2?.title}>
                <img src={option2?.arrow} width={170}/>
              </RightOptionButton>
            }
            {morePlayers &&
              <RestartButton onClick={restart} variant="contained">
                Next Player
              </RestartButton>
            }
            {(!morePlayers && option1 === null && option2 === null) &&
            <RestartButton onClick={restart} variant="contained">
              Complete
            </RestartButton>
            }
          </StyledCardActions>
        </StyledCard>
      )
    }

    return <Loading />
  }
}