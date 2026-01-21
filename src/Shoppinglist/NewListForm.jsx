import { useState } from 'react';

export default function NewListForm({ createNewList }) {
    const [name, setName] = useState("");

    const handleCreate = () => {
        if (!name) return;
        createNewList(name);
        setName(""); // clear input
    };

    return (
        <div className="NewList">
            <div className="NewList">
                <h2>Create New List</h2>
                <input
                    type="text"
                    placeholder="List name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="NewList">
                <button className="buttonCreate" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}
