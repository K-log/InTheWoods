import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  text-align: center;

  span {
    font-style: italic;
    font-weight: 100;
    letter-spacing: 1.78px;
    line-height: 0px;
    font-size: 12px;
  }

`

const StyledGrid = styled(Grid)`
  img {
    padding: 4px;
  }
`

class ResultsView extends Component {
    render() {
    const {
      storyPaths,
      totalPlayers
    } = this.props


    return (
      <Wrap>
        <Grid
          container
          direction="row"
          alignContent="space-around"
        >
          <Grid item sm={12}>
            <h2>Your Choices:</h2>
            <span>Please reload the page to play again.</span>
          </Grid>
          {Object.entries(storyPaths).map(([key, value]) => {
            if(value.length > 0) {
              return (
                <StyledGrid sm={12} md={6} lg={3} key={key} container direction="column" spacing={3}>
                  <Grid item>
                    <h4>Player {parseInt(key, 10) + 1}</h4>
                  </Grid>
                  <Grid item>
                    {value.map(v => <img src={v.path} alt={v.title} height={256} width={256} key={v.title}/>)}
                  </Grid>
                </StyledGrid>
              )
            }})
          }
        </Grid>
      </Wrap>
    )
  }
}

export default ResultsView