const Menu = ({ setPage }) => {
    return (
        <header className="header">
            <div className="logo">SnapMsg</div>
            <ul className="menu">
                <li
                    className="menu_item"
                    onClick={() => {
                        setPage("snaps");
                    }}
                >
                    Snaps
                </li>
                <li
                    className="menu_item"
                    onClick={() => {
                        setPage("users");
                    }}
                >
                    Usuarios
                </li>
                <li
                    className="menu_item"
                    onClick={() => {
                        setPage("usersmetrics");
                    }}
                >
                    UserMetrics
                </li>
            </ul>
        </header>
    );
};

export default Menu;
