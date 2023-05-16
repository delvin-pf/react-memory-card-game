import { create } from 'zustand'
import { getRandomIcons } from '../services/getRandomIcons'
import { persist } from 'zustand/middleware'

export interface CardProp {
  id: string
  icon: string
  isFlipped: boolean
  color: string
  class: string
}

interface CardData {
  cards: Array<CardProp>
  fetchCardsData: (qt: number) => void
  startOrReset: (couples: number) => void
  setCardsData: (newCards:Array<CardProp>) => void
}

export const useCardsData = create<CardData>()(persist((set, get) => {
  return {
    cards: [],
    fetchCardsData: (qt) => {
      const icons = getRandomIcons({ qt })
      const cards = []
      for (let i = 0; i < icons.length * 2; i++) {
        let index
        if (i > icons.length - 1) {
          index = i - icons.length
        } else {
          index = i
        }
        const icon = icons[index]
        cards.push({ id: `${i}-${index}`, icon, isFlipped: true, color: 'transparent', class: '' })
      }
      cards.sort(() => Math.random() - 0.5)
      set({ cards })
      setTimeout(() => {
        const unflippedCards = get().cards.map(card => ({ ...card, isFlipped: false }))
        set({ cards: unflippedCards })
      }, 1000)
    },
    startOrReset: (couples) => {
      if (get().cards.length === 0) {
        get().fetchCardsData(couples)
        return
      }
      set({ cards: [] })
    },
    setCardsData: (newCards) => {
      set({ cards: newCards })
    }

  }
}, {
  name: 'cards'
}))
