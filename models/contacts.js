const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

const writeContacts = async (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
};

const readContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const listContacts = async () => {
  return readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  return contacts.find((item) => item.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const newContacts = contacts.filter((item) => item.id !== contactId);
  await writeContacts(newContacts);
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await readContacts();

  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await readContacts();

  const contact = contacts.find((item) => item.id === contactId);
  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  await writeContacts(contacts);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
