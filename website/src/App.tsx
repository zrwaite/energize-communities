import React from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CityPage } from './pages/CityPage'

const App: React.FC = () => {
	return (
		<Router basename={process.env.REACT_APP_URL}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/city/:citySlug" element={<CityPage />} />
			</Routes>
		</Router>
	)
}

export default App
