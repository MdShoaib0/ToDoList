import React from 'react'
import NamazCard from '../component/NamazCard'

function ManageNamaz() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      <NamazCard name="Fajr" />
      <NamazCard name="Dhuhr" />
      <NamazCard name="Ashar" />
      <NamazCard name="Magrib" />
      <NamazCard name="Isha" />
    </div>
  )
}

export default ManageNamaz