const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");




// TODO: задокументировать каждую функцию
async function listContacts() {
    try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
    }

    catch(error) {
      error.message = "Не удалось считать файл"
      throw error;
    }
  }
  
  async function getContactById(contactId) {
    try {
      const result = await listContacts();

       const find = result.find(({id}) => id === contactId);
       return find;
      }
  
      catch(error) {
        error.message = "Не удалось считать файл"
        throw error;
      }
  }

  
  async function removeContact(contactId) {
    try {
      const contacts = await listContacts();
      const index = contacts.findIndex(el => el.id === contactId);

      if (index !== -1) {
        contacts.splice(index, 1);
      }

      const result = await getContactById(contactId);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return result;      
    }

    catch(err) {
      err.message = 'Не удалось удалить контакт';
      throw err;
    }
  }
  
  async function addContact(name, email, phone) {
    try {
      const contacts = await listContacts();
      const lastId = contacts[contacts.length - 1];
      
      const newContact = {
        id: lastId.id + 1,
        name,
        email,
        phone
      }
      contacts.push(newContact);

      const data = JSON.stringify(contacts);
      fs.writeFile(contactsPath, data);

      return newContact;
    }
    catch(err) {
      throw err;
    }
  }


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};