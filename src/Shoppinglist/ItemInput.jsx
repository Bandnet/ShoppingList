import { useState } from 'react';
import ItemList from './ItemList.jsx';
import Items from "./Item.jsx"

export default function Shopping({ currentList, addItem }) {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");

    const handleAdd = () => {
        if (!text) return;
        addItem(text, amount);
        setText("");
        setAmount("");
    };

    if (!currentList) return <p>Please select a list</p>;

    return (
        <div className="NewList">
            <div className="NewList">
                <div>
                    <h2>Items for: {currentList.name}</h2>
                </div>
                <input
                    list="foodList"
                    placeholder="Item name"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Items></Items>
                <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <div className="NewList">
                    <button onClick={handleAdd}>Add Item</button>
                </div>
            </div>
            <div className="ItemList">
                {/* Show the list using the new component */}
                <ItemList items={currentList.items}/>
            </div>
        </div>
    );
}
