import { useSelector } from "react-redux";

function Home() {
    const auth = useSelector((state) => state.auth);

console.log(auth);
    return (

        <div className="container mt-5">

            <h1>Crime Management System</h1>

            <hr/>

            <p>
                Welcome to the Crime Management System.
            </p>

        </div>

    );
}

export default Home;