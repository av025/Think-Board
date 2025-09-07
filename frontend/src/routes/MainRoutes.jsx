import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import DetailPage from "../pages/DetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layout/Layout";

function MainRoutes() {
    return <MainLayout>

     <Routes>
        <Route path="/"  element={<HomePage/>} /> 
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/note/:id" element={<DetailPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </MainLayout>
}

export default MainRoutes; 