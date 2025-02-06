import { useNavigate } from "react-router-dom";
import List from "../../components/List/List";
import "../../css/Home.css";
import { useEffect, useState } from "react";
import NewList from "../../components/NewList/NewList.jsx";
import { clearLocalStorage, isTokenValid } from "../../utils/checkToken.js";

const Home = () => {
    const [userLists, setUserLists] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    //const userName = localStorage.getItem("username");

    useEffect(() => {
        if (!token || !isTokenValid(token)) {
            navigate("/start");
            clearLocalStorage();
        }
    }, []);

    useEffect(() => {
        fetchUsersLists();
    }, []);

    const fetchUsersLists = async () => {
        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await fetch(
                `http://localhost:5000/shoppinglist/`,
                requestOptions
            );

            if (!response.ok) {
                throw new Error(`Error fetching lists: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("users lists: ", data);
            setUserLists(data);
        } catch (error) {
            console.error("Error fetching users lists:", error);
        }
    };

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
                    first list!/ {`You have ${userLists.length} lists`}
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
