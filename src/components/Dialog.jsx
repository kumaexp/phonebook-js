import { useEffect, useRef, useState } from "react";

function Dialog(props) {
    const [name, setName] = useState(props.data.name ?? "");
    const [telp, setTelp] = useState(props.data.telp ?? "");
    const [tag, setTag] = useState(props.data.tag ?? "other");

    const nameInput = useRef(null);

    useEffect(() => {
        nameInput.current.focus();
    }, []);

    return (
        <div className="fixed w-96 mx-auto top-20 shadow-lg">
            <div>
                <p>Add New</p>
            </div>

            <div>
                <div>
                    <label htmlFor="nama">Nama:</label>
                    <input ref={nameInput} name="nama" value={name} onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="telp">Telp:</label>
                    <input name="telp" value={telp} onChange={e => setTelp(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="tag">Tag:</label>
                    <select name="tag" value={tag} onChange={e => setTag(e.target.value)}>
                        <option value="family">Keluarga</option>
                        <option value="relative">Teman Dekat</option>
                        <option value="other">Orang Lain</option>
                    </select>
                </div>
            </div>

            <div className="mt-8 flex justify-around">
                <button onClick={() => props.onConfirm({name, telp, tag, icon: props.data.icon, id: props.data.id})}>
                    Confirm
                </button>
                <button onClick={() => props.onCancel()}>
                    Cancel
                </button>
            </div>

        </div>
    )
}

export default Dialog;