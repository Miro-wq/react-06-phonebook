import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

import './App.module.css';

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   }

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

const [filter, setFilter] = useState('');

useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts]);


  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   if (contacts) {
  //     this.setState({ contacts: JSON.parse(contacts) });
  //   }
  // }
  // componentDidUpdate(prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const addContact = (name, number) => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = (id) => {
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const handleFilterChange = event => {
    setFilter( event.target.value );
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

    const filteredContacts = getFilteredContacts();

    return (
      <div>
        <ContactForm onAddContact={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      </div>
    );
  };

export default App;

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
