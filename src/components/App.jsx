import React from "react";
import { ContactForm } from '../components/ContactForm/ContactForm';
import { ContactList } from '../components/ContactList/ContactList';
import { Filter } from '../components/Filter/Filter';
import { nanoid } from 'nanoid'
import Notiflix from 'notiflix';
import { Container, Title, ContactsTitle } from "./Арр.styled";

export class Phonebook  extends React.Component { 
  state = {
      contacts: [
          {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
          {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
          {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
          {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
      ],
      filter: '',
}

  
  dataHandleSubmit = data => {
    if (this.isDuplicate(data)) {

        if (this.isDuplicateName(data) && this.isDuplicateNumber(data)) {
            return Notiflix.Notify.failure(`Sorry but contact ${data.name} with number ${data.number} is added to your phonebook `)
        }

        if (this.isDuplicateName(data)) {
            return Notiflix.Notify.failure(`Sorry, but you has already added ${data.name} to your Phonebook, give a different name to this contact`);
        }

        if (this.isDuplicateNumber(data)) {
            return Notiflix.Notify.failure(`Sorry, but you has already added such ${data.number} to your Phonebook`);
        }

    }

      const newContact = {
          id: nanoid(),
          name: data.name,
          number: data.number
      }

      this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts]
      }))
  }

  changeFilter = e => {
      
      this.setState({ filter: e.currentTarget.value })
      
  }

  deleteContacts = idDeleteContacts => {
      this.setState(prevState => ({
          contacts: prevState.contacts.filter(item =>item.id !== idDeleteContacts )

      }))
  }
  
  isDuplicate = ({ name, number }) => {
      const {contacts} = this.state;
      const rezult = contacts.find(item => item.name.toLowerCase() === name.toLowerCase() && item.number.replace(/[^0-9]+/g, '') === number.replace(/[^0-9]+/g, ''))
      return rezult;
  }
  isDuplicateName = ({ name}) => {
    const { contacts } = this.state;
    const rezultCheckName = contacts.find(item => item.name.toLowerCase() === name.toLowerCase());
    
  return rezultCheckName;       

}

isDuplicateNumber = ({number}) => {
    const { contacts } = this.state;
    const rezultCheckNumber = contacts.find(item => item.number.replace(/[^0-9]+/g, '') === number.replace(/[^0-9]+/g, ''));

  return rezultCheckNumber;       

}





componentDidMount() {
    
    const contactsLocalStorage = JSON.parse(localStorage.getItem('contacts'));

    if (!contactsLocalStorage) {
        console.log(!contactsLocalStorage);
        return
     }
    this.setState({contacts: contactsLocalStorage})

}

componentDidUpdate(prevProps, prevState) {


    if (this.state.contacts !== prevState.contacts) {

        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        
    }

}

  render() {
      const normalizeFilter = this.state.filter.toLowerCase();
      const contactsFilter = this.state.contacts.filter(item => item.name.toLowerCase().includes(normalizeFilter))
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >

          <Container>
              <Title>Phonebook</Title>
              <ContactForm dataSubmit={this.dataHandleSubmit}></ContactForm>
              <ContactsTitle>Contacts</ContactsTitle>
              <Filter value={this.state.filter} onChange={this.changeFilter}></Filter>
              <ContactList
                  datacontacts={contactsFilter}
                  deleteContacts={this.deleteContacts}
              ></ContactList>
          </Container>
            </div>
    );

  }

}