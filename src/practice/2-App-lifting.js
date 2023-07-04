import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ handleAddItems }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    const newItem = { description, quantity, packed: false, id: Date.now() };

    handleAddItems(newItem);

    setQuantity(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em> 💼 You have X items on your list, and you already packed X (X%)</em>
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
