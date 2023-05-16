import styled from '@emotion/styled'
import { Grid, Icon } from '@mui/material'
import { CardProp } from '../states/useCardsData'

const StyledCard = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  transform-style: preserve-3d;
  cursor: pointer;
  margin: 0;
  border: 1px solid gray;
  border-radius: 10px;  
  transition: transform 0.5s;
  &.active {
    transform: rotateY(180deg);
  }
`

const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  border-radius: inherit;
`

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
`

export const Card = ({ card, handleClickCard }: {card: CardProp, handleClickCard: (card: CardProp) => void}) => {
  function handleClick () {
    handleClickCard(card)
  }

  return (
    <Grid item sx={{ m: 0 }}>
      <StyledCard onClick={handleClick} className={card.isFlipped ? 'active' : ''}>
        <Front>
          <Icon fontSize='large' color='secondary'>question_mark</Icon>
        </Front>
        <Back style={{ backgroundColor: card.color }}>
          <Icon fontSize='large' color='primary'>{card.icon}</Icon>
        </Back>
      </StyledCard>
    </Grid>
  )
}
