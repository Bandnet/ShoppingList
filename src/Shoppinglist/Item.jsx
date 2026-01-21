
export default function Item({ item, toggleItemCompleted }) {
        return (
            <li>
                    <div className="Item">
                            <div className={`checkbox ${item.completed ? "checked" : ""}`}>
                                    {item.text} {item.amount && `(${item.amount})`}
                            </div>
                            <div>
                                    <input
                                        type="checkbox"
                                        checked={item.completed}
                                        onChange={() => toggleItemCompleted(item.id)}
                                    />
                            </div>
                    </div>
            </li>
        );
}
