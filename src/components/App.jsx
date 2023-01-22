import { Component } from 'react';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import css from './app.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  formSubmitHandler = contact => {
    if (
      this.state.contacts.filter(
        person => person.name.toLowerCase() === contact.name.toLowerCase()
      ).length > 0
    ) {
      return alert(`${contact.name} is already in contacts`);
    }
    this.setState({ contacts: [...this.state.contacts, contact] });
  };

  filter = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filteredContacts;
  };

  deleteContact = event => {
    const id = event.currentTarget.id;
    const updateList = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({
      contacts: updateList,
    });
  };

  render() {
    const filtered = this.filter();
    return (
      <div
        style={{
          height: '100vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={css.title}>Contacts</h2>
        <Filter filter={this.state.filter} handleChange={this.handleChange} />
        <ContactList list={filtered} deleteContact={this.deleteContact} />
      </div>
    );
  }
}
