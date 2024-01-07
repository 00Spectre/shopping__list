import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getShoppingLists, createShoppingList, deleteShoppingList } from '../services/api';
import BarChart from './BarChart';

const ShoppingListsContainer = styled.div`
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ListTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ShoppingListTile = styled.div`
  border: 1px solid ${(props) => props.theme.text};
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.shoppingListName};
  }

  p {
    font-size: 14px;
    margin-bottom: 10px;
    opacity: 0.8;
  }

  button {
    background-color: ${(props) => (props.theme === 'light' ? 'black' : props.theme.error)};
    color: ${(props) => (props.theme === 'light' ? 'white' : 'black')};
    padding: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
  }
`;

const CreateButton = styled.button`
  background-color: ${(props) => (props.theme === 'dark' ? 'black' : 'white')};
  color: ${(props) => (props.theme === 'dark' ? 'white' : 'black')};
  padding: 8px 12px;
  border: 1px solid ${(props) => (props.theme === 'dark' ? 'white' : 'black')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const Modal = styled.div`
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  padding: 20px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ShoppingLists = ({ showArchived }) => {
  const { t } = useTranslation();
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const fetchedLists = await getShoppingLists();
        setLists(fetchedLists);
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
      }
    };

    fetchLists();
  }, []);

  const handleCreateList = async () => {
    if (newListName.trim() !== '') {
      try {
        const newList = await createShoppingList({ name: newListName, owner: 'Current User' });
        setLists((prevLists) => [...prevLists, newList]);
        setNewListName('');
        setShowCreateForm(false);
      } catch (error) {
        console.error('Error creating shopping list:', error);
      }
    } else {
      alert(t('validListName'));
    }
  };

  const handleCancelCreate = () => {
    setNewListName('');
    setShowCreateForm(false);
  };

  const handleDeleteConfirmation = async (listId) => {
    const isConfirmed = window.confirm(t('Confirm Delete'));
    if (isConfirmed) {
      try {
        await deleteShoppingList(listId);
        setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      } catch (error) {
        console.error('Error deleting shopping list:', error);
      }
    }
  };

  const filteredLists = showArchived ? lists : lists.filter((list) => !list.archived);

  const barChartData = filteredLists.map((list) => ({
    name: list.name,
    unsolved: list.items.filter((item) => !item.resolved).length,
    solved: list.items.filter((item) => item.resolved).length,
  }));

  return (
    <ShoppingListsContainer>
      <ListTitle>{t('shoppingLists')}</ListTitle>
      <div className="shopping-lists">
        {filteredLists.map((list) => (
          <ShoppingListTile key={list.id}>
            <Link to={`/list/${list.id}`}>
              <h3>{list.name}</h3>
            </Link>
            <p>{t('owner')}: {list.owner}</p>
            <button onClick={() => handleDeleteConfirmation(list.id)}>{t('Delete')}</button>
          </ShoppingListTile>
        ))}
      </div>
      <BarChart data={barChartData} />
      <CreateButton onClick={() => setShowCreateForm(true)}>{t('Create List')}</CreateButton>

      {showCreateForm && (
        <Modal>
          <h3>{t('Create List')}</h3>
          <input
            type="text"
            placeholder={t('Enter List Name')}
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button onClick={handleCreateList}>{t('Create')}</button>
          <button onClick={handleCancelCreate}>{t('Cancel')}</button>
        </Modal>
      )}
    </ShoppingListsContainer>
  );
};

export default ShoppingLists;
