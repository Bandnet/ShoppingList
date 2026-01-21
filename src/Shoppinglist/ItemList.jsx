import Item from "./Item.jsx";

export default function ItemList({ items, toggleItemCompleted }) {
    if (!items || items.length === 0) return <p>No items yet</p>;

    return (
        <ul>
            {items.map(item => (
                <Item
                    key={item.id}
                    item={item}
                    toggleItemCompleted={toggleItemCompleted}
                />
            ))}
        </ul>
    );
}
