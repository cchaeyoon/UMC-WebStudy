import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex gap-3">
        <Link 
            to={'/'} 
            className="bg-blue-50"
        >
            홈페이지로 이동!
        </Link>
        <Link 
            to='/movies'
            className=""
        >
            영화 목록 페이지로 이동!
        </Link>
    </nav>
  )
}

export default Navbar;