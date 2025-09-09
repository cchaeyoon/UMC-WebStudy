import { Outlet } from "react-router-dom"
import Navbar from "../component/navbar";

const RootLayout = () => {
    return ( // RootLayout 의 자식 라우트들이 <Outlet /> 위치에 렌더링 됨
        <>
          <Navbar />
          <Outlet />
        </>
    );
};

export default RootLayout;