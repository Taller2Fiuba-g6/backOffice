const Snap = (snap) => {
    return (
        <div className="usuario">
            <div className="xxx">{snap.username}</div>
            <div className="xxx">{snap.dateTime}</div>
            <div className="xxx">{snap.msgText}</div>
        </div>
    );
};

export default Snap;
