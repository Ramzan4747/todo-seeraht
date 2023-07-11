import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Inbox from './Inbox/Inbox'
import Today from './Today'
import Upcoming from './Upcoming'
import Anytime from './Anytime'
import Someday from './Someday'
import Trash from './Trash'

export default function Index() {
  return (
    <main>
        <Routes>
            <Route path='/' element={<Inbox />} /> 
            <Route path='today' element={<Today />} /> 
            <Route path='upcoming' element={<Upcoming />} /> 
            <Route path='anytime' element={<Anytime />} /> 
            <Route path='someday' element={<Someday />} /> 
            <Route path='trash' element={<Trash />} /> 
        </Routes>
    </main>
  )
}
