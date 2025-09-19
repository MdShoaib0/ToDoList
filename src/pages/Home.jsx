import React from 'react'
import InputField from '../component/InputField'
import Footer from './Footer'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Home() {

  useGSAP( () => {
    gsap.from('#heading', {
      y: -25,
      opacity: 0,
      duration: 1,
      ease: 'power3'
    })
  })
  return (
    <div
    >
      <h1 id='heading' className='text-center text-3xl font-bold text-slate-900'>Task Manager</h1>
      <InputField />
      <Footer />
    </div>
  )
}

export default Home