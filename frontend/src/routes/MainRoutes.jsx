import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import DetailPage from "../pages/DetailPage";
import NotFoundPage from "../pages/NotFoundPage";

function MainRoutes() {
    return <Routes>
        <Route path="/"  element={<HomePage/>} /> 
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/note/:id" element={<DetailPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
    </Routes>
}

export default MainRoutes; 