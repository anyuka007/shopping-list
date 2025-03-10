import { useNavigate } from "react-router-dom";
import List from "../../components/List/List";
import "../../css/Home.css";
import { useEffect, useState } from "react";
import NewList from "../../components/NewList/NewList.jsx";
import { clearLocalStorage, isTokenValid } from "../../utils/checkToken.js";
import { fetchUsersLists } from "../../utils/fetchLists.js";

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
        if (token) {
            (async () => {
                const lists = await fetchUsersLists();
                setUserLists(lists);
            })();
        }
    }, [token]);

    return (
        <div className="home-container">
            <section className="home-welcome-text">
                <h1>Welcome to Your Shopping Assistant</h1>
                <h4>Add items to your lists, stay organized and save time!</h4>
                <p>
                    {!userLists.length
                        ? `Ready to get started? Let’s create your
                    first list!`
                        : `You have ${userLists.length} lists`}
                </p>
            </section>
            <section className="home-lists">
                <div className="home-lists-container">
                    <div>
                        <NewList setUserLists={setUserLists} />
                    </div>
                    {userLists.map((list, index) => (
                        <List
                            key={index}
                            list={list}
                            setUserLists={setUserLists}
                            userLists={userLists}
                        />
                    ))}
                </div>
            </section>

            {/* <Link to={"/kontakt"}>Kontaktieren Sie uns!</Link> */}
        </div>
    );
};

export default Home;
