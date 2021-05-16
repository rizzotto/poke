import React from 'react'
import Sheet from 'react-modal-sheet'

function PokemonInfo({ isOpen, onClose, data }) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container style={{ backgroundColor: data.color[0].color }}>
        <Sheet.Header />
        <Sheet.Content>{data.name}</Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  )
}

export default PokemonInfo
