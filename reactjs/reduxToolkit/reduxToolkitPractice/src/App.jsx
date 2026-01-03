import { Link } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';

export default function App() {
    return (
        <>
            {/* <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
                <Link to="/users">Users</Link>
                <Link to="/data">Data</Link>
                <Link to="/todos">Todos</Link>
            </nav> */}
            {/* or */}
            <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
                <ul style={{ listStyle: "none", display: "flex", gap: "10px" }}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/user">User</Link></li>
                    <li><Link to="/data">Data</Link></li>
                    <li><Link to="/counter">Counter</Link></li>
                    <li><Link to="/dynamic-counter">Dynamic Counter</Link></li>
                    <li><Link to="/todos">Todos</Link></li>
                </ul>
            </nav>

            <AppRoutes />
        </>
    );
}
