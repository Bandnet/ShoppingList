import { useState } from 'react';
import ItemList from './ItemList.jsx';
import Items from './Items.jsx'; // datalist component

export default function Shopping({ currentList, addItem, updateListItems }) {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");

    const handleAdd = () => {
        if (!text) return;
        addItem(text, amount);
        setText("");
        setAmount("");
    };

    const toggleItemCompleted = (itemId) => {
        const updatedItems = currentList.items.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        updateListItems(currentList.id, updatedItems);
    };

    if (!currentList) return <p>Please select a list</p>;

    return (
        <div className="NewList">
            <h2>Items for: {currentList.name}</h2>

            {/* Input with datalist */}
            <input
                list="foodList"
                placeholder="Item name"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Items /> {/* datalist for autocomplete */}

            <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <button className="buttonAdd"onClick={handleAdd}>Add Item</button>

            <div className="ItemList">
                <ItemList
                    items={currentList.items}
                    toggleItemCompleted={toggleItemCompleted}
                />
            </div>
        </div>
    );
}
