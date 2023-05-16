import iconsList from '../constants'

export function getRandomIcons ({ qt }: {qt: number}) {
  const selectedItems = []
  const copyIconList = [...iconsList]

  for (let i = 0; i < qt; i++) {
    const randomIndex = Math.floor(Math.random() * copyIconList.length)
    const selectedItem = copyIconList.splice(randomIndex, 1)[0]
    selectedItems.push(selectedItem)
  }
  return selectedItems
}
