import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const SharedLayout = () => {
    return (
        <div className="whole-page">
            {/* nav/header */}
            <Header />
            <main className="main-container">
                <Outlet />
            </main>
            {/* footer */}
            <Footer />
        </div>
    );
};

export default SharedLayout;
