import React, { lazy } from 'react' // , useState, useEffect
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './views/Home'

const NotFound = lazy(() => import('./views/NotFound'))

// eslint-disable-next-line
declare let window: any

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
