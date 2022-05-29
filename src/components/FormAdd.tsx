import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Contact } from "../types/Contacts";
import { ContactsList } from './ContactsList'


export const FormAdd =  React.memo(() => {
  const [contactForm, setContactForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts') || '[]'));
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const openForm = () => {
    setContactForm(true);
  }

  const cancelForm = () => {
    setContactForm(false);
    setName('');
    setPhone('');
  }
  console.log(contacts);
  
  const createContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContact: Contact = {
      id: +new Date(),
      name,
      phone
    }
    setContacts([...contacts, newContact]);
    cancelForm();
  }

  const deleteContact = (id: number) => {
    const filterContacts = contacts.filter((el: Contact) => el.id !== id);
    setContacts(filterContacts);
  }

  const updateContact = (id: number, name: string, phone: string) => {
    setContacts(
      contacts.map((el: Contact) => {
        if (el.id === id) {
          return {
            ...el,
            name,
            phone
          };
        }

        return el;
      }),
    );
  };

  const filteredContact = useMemo(() => (contacts.filter((el: { name: string; }) => {
    const findName = el.name.toLowerCase().includes(name.toLowerCase());

    return findName;
  })
  ), [name, contacts]);


  return (
    <div className="container">
      {
        !contactForm 
        ?
        <>
          <button className="btn btn-secondary btn-add" onClick={openForm}>Add new contact</button>
          {
            contacts.length
            ?
            <>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search contact name"
                onChange={event => setName(event.target.value)}
              />
              <ContactsList contacts={filteredContact} deleteContact={deleteContact} updateContact={updateContact}/>
            </>
            :
            <h2>You dont have contacts yet</h2>
          }
        </>
        :
          <form onSubmit={createContact}>
            <input 
              type="text" 
              required={true} 
              placeholder="Full name" 
              className="form-control"
              onChange={e => setName(e.target.value)} 
            />
            <input 
              type="number" 
              required={true} 
              placeholder="Phone number" 
              className="form-control"
              onChange={e => setPhone(e.target.value)} 
            />
            <button type="submit" className="btn btn-secondary">Create</button>
            <button className="btn btn-secondary" onClick={cancelForm}>Cancel</button>
          </form>
      }
    </div>
  );
})