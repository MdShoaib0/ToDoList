import React from 'react'
import InputField from '../component/InputField'
import Footer from './Footer'
import { motion } from 'framer-motion'

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7}}
    >
      <h1 className='text-center text-3xl font-bold text-slate-900'>Task Manager</h1>
      <InputField />
      <Footer />
    </motion.div>
  )
}

export default Home