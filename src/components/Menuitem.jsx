const propsModel = {
    name: "",
    telp: "",
    icon: "",
    id: 0,
    tag: "family" || "relative" || "other",
    onDelete: () => {},
    onEdit: () => {},
}

// Note ^

function MenuItem(props) {

    return (
        <div className="flex justify-between h-20 border-t-2 border-gray m-2">
            <div className="flex-grow-0">
                <img className="h-full w-auto" src={props.icon} alt="icon" />
            </div>
            <div className="flex-grow">
                <p>{props.name}</p>
                <p>{props.telp}</p>
                <p>{props.tag}</p>
            </div>
            <div className="flex-grow-0 w-20 flex justify-center align-middle">
                <button onClick={() => props.onEdit(props.id)}>
                    Edit
                </button>
            </div>
            <div className="flex-grow-0 w-20 flex justify-center align-middle">
                <button onClick={() => props.onDelete(props.id)}>
                    Del
                </button>
            </div>
        </div>
    );

}

export default MenuItem;