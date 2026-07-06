import { useSelector } from "react-redux";

export default function Dashboard() {

    const auth = useSelector((state) => state.auth);

    console.log(auth);

    return (
        <div className="container mt-5">

            <h2>Dashboard</h2>

            <h4>Welcome {auth.firstName}</h4>

            <p>Role : {auth.role}</p>

        </div>
    );

}