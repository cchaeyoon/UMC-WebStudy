import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
// import HomePage from './pages/home'
import NotFound from './pages/not-found'
import MoviesPage from './pages/movies'
import RootLayout from './layout/root-layout'
import HomePage from './pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    // element: <HomePage />,
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        // index: true는 path: '/' 즉 홈 경로 의미!
        index: true,
        element: <HomePage />
      },
      {
        // 부모의 path가 '/'이니까 / 안붙여도 됨
        // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의
        path: "movies/:movieId",
        element: <MoviesPage />
      }
    ]
  },
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
