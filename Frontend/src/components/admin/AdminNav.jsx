import { Link } from "react-router-dom";

function AdminNav() {
    return ( 
        <div className="border-b-2 border-l-2 text-xl border-gray-300">
            <Link to={"/adminFood"}>
                <div className="adm-nav-btn">Edit Menu</div>
            </Link>
            <Link to="/admin">
                <div className="adm-nav-btn border-t-2 border-gray-300">Orders</div>
            </Link>
            <Link to="/CustomColours">
                <div className="adm-nav-btn border-t-2 border-gray-300">Colour</div>
            </Link>
        </div>
     );
}

export default AdminNav;