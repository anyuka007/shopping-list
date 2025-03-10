import AppProvider from "./context/AppProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home/Home";
///import Kontakt from "./pages/Kontakt/Kontakt";
import Start from "./pages/Start/Start";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import "./css/App.css";

function App() {
    return (
        <>
            <AppProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SharedLayout />}>
                            <Route index element={<Home />} />
                            {/* Weitere Routen hier zwischen */}
                            <Route path="start" element={<Start />} />
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<SignUp />} />
                            {/* Weitere Routen hier zwischen */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AppProvider>
        </>
    );
}

export default App;
