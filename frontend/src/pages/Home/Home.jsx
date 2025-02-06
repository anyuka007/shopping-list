import { useNavigate } from "react-router-dom";
import List from "../../components/List/List";
import "../../css/Home.css";
import { useEffect } from "react";
import NewList from "../../components/NewList/NewList.jsx";
import { clearLocalStorage, isTokenValid } from "../../utils/checkToken.js";

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    //const userName = localStorage.getItem("username");

    useEffect(() => {
        if (!token || !isTokenValid(token)) {
            navigate("/start");
            clearLocalStorage();
        }
    }, []);
    return (
        <div className="home-container">
            <section className="home-welcome-text">
                <h1>Welcome to Your Shopping Assistant!</h1>
                {/* <h1>{`${userName}! Welcome to Your Shopping Assistant!`}</h1> */}
                <div className="home-welcome-text-description">
                    <h3>Plan your shopping with ease and convenience</h3>
                    <h3>
                        Add items to your lists, stay organized, and save time!
                    </h3>
                </div>
                <h4>
                    !O p t i o n a l! Ready to get started? Let’s create your
                    first list!/ You have n-lists
                </h4>
            </section>
            <section className="home-lists">
                <div className="home-lists-container">
                    <div>
                        <NewList />
                    </div>
                    <div>
                        <List />
                    </div>
                    <div>
                        <List />
                    </div>
                    <div>
                        <List />
                    </div>
                </div>
            </section>

            {/* <Link to={"/kontakt"}>Kontaktieren Sie uns!</Link> */}
        </div>
    );
};

export default Home;
