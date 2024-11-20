import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CityPage } from './pages/CityPage'

const App: React.FC = () => {
	return (
		<Router basename={process.env.PUBLIC_PATH}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/city/:citySlug" element={<CityPage />} />
			</Routes>
		</Router>
	)
}

export default App
