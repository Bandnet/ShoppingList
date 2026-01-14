import { useState } from 'react';
import ListSelector from './Shoppinglist/ListSelector.jsx';
import NewListForm from './Shoppinglist/NewListForm.jsx';
import Shopping from './Shoppinglist/ItemInput.jsx';

export default function App() {
    const [lists, setLists] = useState([]);
    const [currentListId, setCurrentListId] = useState(null);

    // Create a new list
    const createNewList = (name) => {
        const newList = {
            id: Date.now(),
            name: name || "New List",
            items: []
        };
        setLists([...lists, newList]);
        setCurrentListId(newList.id);
    };

    // Add an item to the active list
    const addItemToList = (text, amount) => {
        if (!text || currentListId === null) return;

        const newItem = {
            id: Date.now(),
            text,
            amount,
            completed: false
        };

        setLists(lists.map(list => {
            if (list.id === currentListId) {
                return { ...list, items: [...list.items, newItem] };
            }
            return list;
        }));
    };

    return (
        <div className="ShoppingList">
            <h1>Shopping List App</h1>
            <div className="ListSelector">
                {/* Select which list is active */}
                <ListSelector
                    lists={lists}
                    currentListId={currentListId}
                    setCurrentListId={setCurrentListId}
                />
            </div>
            <div className="ListForm">
                {/* Form to create a new list */}
                <NewListForm createNewList={createNewList} />
            </div>
            <div className="Shopping">
                {/* Form to add items to the active list */}
                <Shopping
                    currentList={lists.find(l => l.id === currentListId)}
                    addItem={addItemToList}
                />
            </div>
        </div>
    );
}
