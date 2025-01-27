import List from "../../components/List/List";
import "../../css/Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <section className="home-welcome-text">
                <h1>Welcome to Your Shopping Assistant!</h1>
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
                <button>Create new list</button>
                <div className="home-lists-container">
                    <div>
                        <List />
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
