import Home from "../pages/Home.tsx"
import Instrumentos from "../pages/Instrumentos.tsx"
import { Route, Routes } from "react-router-dom"

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instrumentos" element={<Instrumentos />} />
        </Routes>
    )
}

export default AppRoutes