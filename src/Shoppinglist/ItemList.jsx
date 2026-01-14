import "./Shopping.css"
import { useState } from "react";

export default function ItemList({ items }) {
    if (!items || items.length === 0) return <p>No items yet</p>;

    return (
        <ul>
            {items.map(item => (
                <Item key={item.id} item={item} />
            ))}
        </ul>
    );
}

function Item({ item }) {
    const [checked, setChecked] = useState(false);

    return (
        <li>
            <div className="Item">
                <div className={`checkbox ${checked ? "checked" : ""}`}>
                    {item.text} {item.amount && `(${item.amount})`}
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />
                </div>
            </div>
        </li>
    );
}
