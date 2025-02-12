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
        const getLists = async () => {
            const lists = await fetchUsersLists();
            setUserLists(lists);
            //console.log("lists", lists);
        };
        if (token) {
            getLists();
        }
    }, [token]);

    return (
        <div className="home-container">
            <section className="home-welcome-text">
                <h1>Welcome to Your Shopping Assistant!</h1>
                {/* <h1>{`${userName}! Welcome to Your Shopping Assistant!`}</h1> */}
                {/* <div className="home-welcome-text-description">
                    <h3>Plan your shopping with ease and convenience</h3>
                    <h3>
                        Add items to your lists, stay organized, and save time!
                    </h3>
                </div> */}
                <div className="home-welcome-text-description">
                    <h3>
                        Add items to your lists, stay organized, and save time!
                    </h3>
                </div>
                <h4>
                    {!userLists.length
                        ? `Ready to get started? Let’s create your
                    first list!`
                        : `You have ${userLists.length} lists`}
                </h4>
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
