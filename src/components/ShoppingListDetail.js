import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'; 
import './style.css';

const ShoppingListDetail = ({
  list,
  onEditListName,
  onAddRemoveMember,
  onLeaveList,
  onAddRemoveItem,
  onSetItemResolved,
}) => {
  const { listId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [newListName, setNewListName] = useState(list ? list.name : ''); 
  const [showAddRemoveItemPopup, setShowAddRemoveItemPopup] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    setNewListName(list ? list.name : ''); 
  }, [list]);

  const handleEditListName = () => {
    setIsEditing(true);
  };

  const handleSaveListName = () => {
    onEditListName(newListName);
    setIsEditing(false);
  };

  const handleAddRemoveItemClick = () => {
    setShowAddRemoveItemPopup(true);
  };

  const handleAddItem = () => {
    if (newItemName.trim() !== '') {
      onAddRemoveItem(newItemName, 'add');
      setNewItemName('');
    }
  };

  const handleRemoveItem = (itemId) => {
    onAddRemoveItem(itemId, 'remove');
  };

  if (!list) {
    return <p>List not found</p>;
  }

  const unsolvedItemCount = list.items.filter((item) => !item.resolved).length;
  const solvedItemCount = list.items.length - unsolvedItemCount;

  const pieChartData = [
    { name: 'Unsolved Items', value: unsolvedItemCount },
    { name: 'Solved Items', value: solvedItemCount },
  ];

  return (
    <div>
      <h2>
        {isEditing ? (
          <input type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
        ) : (
          list.name
        )}
      </h2>
      {isEditing ? (
        <button onClick={handleSaveListName}>Save List Name</button>
      ) : (
        <button onClick={handleEditListName}>Edit List Name</button>
      )}

      <button onClick={handleAddRemoveItemClick}>Add/Remove Item</button>

      {showAddRemoveItemPopup && (
        <div className="modal">
          <h3>Add/Remove Item</h3>
          <input
            type="text"
            placeholder="Enter Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button onClick={handleAddItem}>Add Item</button>
          <button onClick={() => setShowAddRemoveItemPopup(false)}>Cancel</button>
          <ul>
            {list.items.map((item) => (
              <li key={item.id}>
                {item.name} <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Pie Chart */}
      <div>
        <h3>Item Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F'][index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3>Items</h3>
        <ul>
          {list.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
      <Link to="/shopping-lists">Back to Shopping Lists</Link>
    </div>
  );
};

export default ShoppingListDetail;
