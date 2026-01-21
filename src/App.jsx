import { useState } from 'react';
import ListSelector from './Shoppinglist/ListSelector.jsx';
import NewListForm from './Shoppinglist/NewListForm.jsx';
import Shopping from './Shoppinglist/ItemInput.jsx';
import "./Shoppinglist/Shopping.css";


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

    // Update items for a given list (used for completed checkbox)
    const updateListItems = (listId, updatedItems) => {
        setLists(lists.map(list =>
            list.id === listId ? { ...list, items: updatedItems } : list
        ));
    };

    // Export current list as JSON
    const exportCurrentList = () => {
        if (currentListId === null) return alert("No list selected");

        const list = lists.find(l => l.id === currentListId);
        if (!list) return;

        const dataStr = JSON.stringify(list, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${list.name}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    // Import a list from JSON file
    const importList = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedList = JSON.parse(event.target.result);

                    // Validate structure
                    if (!importedList.id) importedList.id = Date.now();
                    if (!importedList.name) importedList.name = "Imported List";
                    if (!Array.isArray(importedList.items)) importedList.items = [];

                    setLists([...lists, importedList]);
                    setCurrentListId(importedList.id);
                } catch (err) {
                    alert("Invalid file format");
                }
            };
            reader.readAsText(file);
        };

        input.click();
    };

    return (
        <div className="ShoppingList">
            <h1>Shopping List App</h1>

            <div className="ListSelector">
                <ListSelector
                    lists={lists}
                    currentListId={currentListId}
                    setCurrentListId={setCurrentListId}
                />
            </div>

            <div className="ListForm">
                <NewListForm createNewList={createNewList} />
            </div>

            <div className="ListActions">
                <button className="buttonExport" onClick={exportCurrentList}>Export Current List</button>
                <button className="buttonImport" onClick={importList}>Import List</button>
            </div>

            <div className="Shopping">
                <Shopping
                    currentList={lists.find(l => l.id === currentListId)}
                    addItem={addItemToList}
                    updateListItems={updateListItems}
                />
            </div>
        </div>
    );
}
