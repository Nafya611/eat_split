
















import React, { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState(initialFriends);
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [showSplit, setShowSplit] = useState(false);
  const [getinfoSelected, setgetInfoSelected] = useState({});
  const [bill, setBill] = useState(0);
  const [expense, setExpense] = useState(0);
  const [fExpense, setfExpense] = useState(0);
  const [payer, setPayer] = useState(null);

  const toggleShowSplitBill = (friend) => {
    setShowSplit(!showSplit);
    setgetInfoSelected(friend);
  };

  const getBill = (e) => {
    setBill(e.target.value);
  };
  const getExpense = (e) => {
    setExpense(e.target.value);
  };
  const getFExpense = (e) => {
    setfExpense(e.target.value);
  };

  const toggleShowAddFriend = () => {
    setIsAdd(!isAdd);
  };

  const onSelectionPayer = (e) => {
    setPayer(e.target.value);
  };
  const addFriend = () => {
    const newFriend = {
      id: Date.now(), // Generate a unique ID for the new friend
      name: name,
      image: source,
      balance: 0, // Set initial balance as 0
    };

    setData((prevData) => [...prevData, newFriend]);
    setName("");
    setSource("");
  };

  const close = () => {
    setName("");
    setSource("");
    setIsAdd(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          data={data}
          onAdd={toggleShowAddFriend}
          onShowSplit={toggleShowSplitBill}
          bill={bill}
          expense={expense}
          fExpense={fExpense}
          payer={payer}
        />
        {isAdd && (
          <AddFriend
            onAdd={addFriend}
            onNameChange={(e) => setName(e.target.value)}
            onSourceChange={(e) => setSource(e.target.value)}
            source={source}
            name={name}
            onClose={close}
          />
        )}
      </div>
      <SplitBill
        onShowSplit={toggleShowSplitBill}
        showSplit={showSplit}
        getinfoSelected={getinfoSelected}
        onSelection={onSelectionPayer}
        getBill={getBill}
        getExpense={getExpense}
        getFExpense={getFExpense}
      />
    </div>
  );
}

function FriendsList({
  data,
  onAdd,
  onShowSplit,
  bill,
  expense,
  fExpense,
  payer,
  getinfoSelected,
}) {
  return (
    <div>
      <ul>
        {data.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            onShowSplit={onShowSplit}
            bill={bill}
            expense={expense}
            fExpense={fExpense}
            payer={payer}
            getinfoSelected={getinfoSelected}
          />
        ))}
      </ul>
      <button className="button" onClick={onAdd}>
        Add Friend
      </button>
    </div>
  );
}

function Friend({
  friend,
  onShowSplit,
  bill,
  expense,
  fExpense,
  payer,
  getinfoSelected,
}) {
  const { name, image } = friend;
  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {/* <p>
        {payer === "you"
          ? `${getinfoSelected.name} owes you ${fExpense}`
          : `you owe ${getinfoSelected.name} ${expense}`}
      </p> */}

      <p></p>
      <button className="button" onClick={() => onShowSplit(friend)}>
        Select
      </button>
    </li>
  );
}

function AddFriend({
  onAdd,
  onNameChange,
  onSourceChange,
  name,
  source,
  onClose,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-add-friend">
        <label>Friend Name</label>
        <input type="text" value={name} onChange={onNameChange} />
        <label>Image URL</label>
        <input type="text" value={source} onChange={onSourceChange} />
        <button className="button" type="submit">
          Add
        </button>
      </form>
      <button className="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

function SplitBill({
  onShowSplit,
  showSplit,
  getinfoSelected,
  onSelection,
  getBill,
  getExpense,
  getFExpense,
}) {
  const handleSplitBill = (e) => {
    e.preventDefault();
    // Perform the bill splitting logic here
    // You can access the values using the getBill, getExpense, getFExpense functions
    // and the selected payer using the onSelection function
    // Implement the logic based on your requirements
    // Example:
    console.log("Bill value:", getBill);
    console.log("Your expense:", getExpense);
    console.log(
      getinfoSelected && getinfoSelected.name + "'s expense:",
      getFExpense
    );
    console.log("Payer:", onSelection);
  };

  if (showSplit && getinfoSelected) {
    return (
      <div>
        <form className="form-split-bill" onSubmit={handleSplitBill}>
          <h2>Split a bill with {getinfoSelected.name}</h2>
          <label>Bill value</label>
          <input type="text" onChange={getBill} />
          <label>Your expense</label>
          <input type="text" onChange={getExpense} />
          <label>{getinfoSelected.name}'s expense</label>
          <input type="text" onChange={getFExpense} />
          <label>Who is paying the bill?</label>
          <select onChange={onSelection}>
            <option value="you">You</option>
            <option>{getinfoSelected.name}</option>
          </select>
          <button className="button" type="submit">
            Split bill
          </button>
        </form>
      </div>
    );
  }

  return null;
}
