import { Card } from './Card'
import { Typography, Container, Button, Grid, Select, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useCardsData, CardProp } from '../states/useCardsData'
import { SelectChangeEvent } from '@mui/material/Select'
import confetti from 'canvas-confetti'
import { useTheme } from '@mui/material/styles'

const levels = [
  { text: 'Easy', couplesNumber: 4, width: '700px' },
  { text: 'Medium', couplesNumber: 8, width: '800px' },
  { text: 'Hard', couplesNumber: 12, width: '1000px' }
]

export function Page ({ toogleTheme }: {toogleTheme: () => void}) {
  const [cardsData, setCardsData, startOrReset] = useCardsData(data => [data.cards, data.setCardsData, data.startOrReset])
  const [selectedCards, setSelectedCards] = useState<Array<CardProp>>([])
  const [level, setLevel] = useState(levels[0])

  function handleClickCard (clickedCard: CardProp) {
    if (clickedCard.isFlipped) return
    // virar
    const updatedCards = cardsData.map((card) => {
      return card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    })
    setCardsData(updatedCards)
    // comparar
    setSelectedCards([...selectedCards, clickedCard])
    if (selectedCards.length === 1) {
      if (selectedCards[0].icon === clickedCard.icon) {
        const updatedCards = cardsData.map((card) => {
          if (card.id === selectedCards[0].id || card.id === clickedCard.id) {
            return { ...card, isFlipped: true }
          }
          return card
        })

        setCardsData(updatedCards)

        setSelectedCards([])

        const win = updatedCards.every(card => card.isFlipped)
        if (win) {
          confetti({ particleCount: 100, spread: 60, scalar: 0.5, angle: 45, origin: { x: 0.2 } })
          confetti({ particleCount: 100, spread: 60, scalar: 0.5, angle: 135, origin: { x: 0.8 } })
        }
      } else {
        setTimeout(() => {
          const updatedCards = cardsData.map((card) => {
            if (card.id === selectedCards[0].id || card.id === clickedCard.id) {
              return { ...card, isFlipped: false, class: 'error' }
            }
            return card
          })
          setCardsData(updatedCards)
          setSelectedCards([])
        }, 500)
      }
    }
  }

  function handleOptionSelect (e: SelectChangeEvent) {
    const selectedLevel = e.target.value
    const newLevel = levels.find(level => level.text === selectedLevel)
    setLevel(newLevel || level)
  }

  const grids = cardsData.map((card) => {
    return <Card key={card.id} card={card} handleClickCard={handleClickCard} />
  })

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', placeItems: 'center' }}>
      <Button onClick={toogleTheme} variant='contained'>Theme</Button>
      <Typography variant='h2' color='primary'>
        Memory Game
      </Typography>
      {cardsData.length === 0 &&
        <Select value={level.text} onChange={handleOptionSelect} size='small'>
          {levels.map((value) => {
            return (
              <MenuItem key={value.text} value={value.text}>
                {value.text}
              </MenuItem>
            )
          })}
        </Select>}
      <Button
        onClick={() => startOrReset(level.couplesNumber)}
        color={cardsData.length !== 0 ? 'error' : 'primary'}
        style={{ marginTop: '10px' }}
      >
        {cardsData.length !== 0 ? 'Reset' : 'Empezar'}
      </Button>
      {cardsData.length > 0 &&
        <Grid
          container
          justifyContent='center'
          spacing={2}
          alignItems='center'
          sx={{ display: 'flex', flexWrap: 'wrap', m: 0, maxWidth: level.width }}
        >
          {[...grids]}
        </Grid>}

    </Container>
  )
}
