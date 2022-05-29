import React, { useState } from "react";
import { Contact } from '../types/Contacts'

type Props = {
  contacts: Contact[],
  deleteContact: (id: number) => void,
  updateContact: (id: number, name: string, phone: string) => void
}

export const ContactsList: React.FC<Props> = ({ contacts, deleteContact, updateContact }) => {
  const [newId, setNewId] = useState(0);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newChanges, setNewChanges] = useState(false);

  const clearForm = () => {
    setNewName('');
    setNewPhone('');
    setNewChanges(false);
  }
  
  const handleChange = (id: number, name: string, phone: string) => {
    setNewId(id);
    setNewName(name);
    setNewPhone(phone);
    setNewChanges(true);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, id: number, name: string, phone: string) => {
    event.preventDefault();
    updateContact(id, name, phone);
    clearForm();
  }

  return (
    <>
      <ul>
        {
          contacts.map(el => (
            <li key={el.id}>
              <h5>Name: {el.name}</h5>
              <p>Phone: {el.phone}</p>
              <button className="btn btn-secondary" onClick={() => handleChange(el.id, el.name, el.phone)}>Update</button>
              <button className="btn btn-secondary" onClick={() => deleteContact(el.id)}>Delete</button>
            </li>
          ))
        }
      </ul>
      {
      newChanges && (
        <form className="formers" onSubmit={(e) => handleSubmit(e, newId, newName, newPhone)}>
          <input
            type="text"
            value={newName}
            placeholder='Change name'
            className="form-control form-control-input"
            onChange={(e) => setNewName(e.target.value)}
            required={true}
          />
          <input
            type="number"
            value={newPhone}
            placeholder='Change phone'
            className="form-control"
            onChange={(e) => setNewPhone(e.target.value)}
            required={true}
          />
          <div>
            <button
              type='submit'
              className="btn btn-secondary"
            >
              Update contact
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => clearForm()}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  )
}