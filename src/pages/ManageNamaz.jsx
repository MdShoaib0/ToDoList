import React from 'react'
import NamazCard from '../component/NamazCard'

function ManageNamaz() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
    <NamazCard name = "Fazar"/>
    <NamazCard name = "Duhar"/>
    <NamazCard name = "Ashar"/>
    <NamazCard name = "Magrib"/>
    <NamazCard name = "Esha"/>
    </div>
  )
}

export default ManageNamaz