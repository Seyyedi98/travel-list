import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    // setItems((items) => items.push(item));  // We cannot do it. Because mutating states are not allowed in react.
    setItems((items) => [...items, item]); // Then we need to create new array and add new item to it.
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  /*         --------- // moved to App() -----------
  const [items, setItems] = useState([]);  

  function handleAddItems(item) {
    // setItems((items) => items.push(item));  // We cannot do it. Because mutating states are not allowed in react.
    setItems((items) => [...items, item]); // Then we need to create new array and add new item to it.
  }
*/

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newItem);

    onAddItems(newItem); // lifting

    setQuantity(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          // console.log(e.target.value);
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        text="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

// onDeleteItem Cannot inherit directly from App to Item, It must first inherit from app to PackingList, and then to Item
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

// Create an Array with value 0 to 20:
// Array.from({ length: 20 }, (_, i) => i + 1);

// onSubmit | onCLick ===> for form and buttons

// ----------------------------------
// Controlled elements:
// 1. Create a state   |  const [description, setDescription] = useState("");

// 2. Use that state as a value of input field. |  In a input field set (( value={}  onChange={(e) => setDescription(e.target.value)}))

// 3. Update state variable using onChange  | onChange={(e) => setDescription(e.target.value)
// (e.target.value) is always a string

// -----------------------------------

// lifting states

// State moved to first parent component. So we can use state in siblings.
// First move the spate to parent. Then create a function to handle setState and along the state, move it to parent too.
// Now pass function and state value to childs as a prop.

// -----------------------------------

// Updating state:

/*
items.map(
  (item) => item.id === id ? { ...item, packed: !item.packed } : item
  );
*/
