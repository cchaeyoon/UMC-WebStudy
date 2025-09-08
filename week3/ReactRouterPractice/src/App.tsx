import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home'
import NotFound from './pages/not-found'
import MoviesPage from './pages/movies'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/movies',
    element: <MoviesPage />
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
