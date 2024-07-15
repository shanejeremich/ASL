const { ContactModel, Pager, sortContacts, filterContacts } = require("@jworkman-fs/asl");
const express = require("express");
const router = express.Router();

let contacts = ContactModel.index();

router.get("/", (req, res) => {
  try {
    const op = req.get("X-Filter-Operator");
    const by = req.get("X-Filter-By");
    const value = req.get("X-Filter-Value");
    if (op && by && value) {
      contacts = filterContacts(contacts, by, op, value);
    }

    const sort = req.query.sort;
    const direction = req.query.direction;
    if (sort && direction) {
      contacts = sortContacts(contacts, sort, direction);
    }

    const pager = new Pager(contacts, req.query.page, req.query.limit);

    res.set("X-Page-Total", pager.total);
    res.set("X-Page-Next", pager.next());
    res.set("X-Page-Prev", pager.prev());
    res.status(200).json(pager.results());
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).send(`Error when testing the contacts endpoint: ${err.message}`);
  }
});

router.get("/v1/contacts/:id", (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ message: "Invalid ID provided. ID must be an integer." });
  }

  const contact = contacts.find(contact => contact.id === parseInt(id));
  if (!contact) {
    return res.status(404).json({ message: "Contact not found." });
  }

  res.status(200).json(contact);
});

// router.post("/v1/contacts", async (req, res) => {
//   try {
//     validateContact(req.body);
//     const newContact = createContact(req.body);
//     contacts.push(newContact);

//     const contactId = newContact.id;

//     res.location(`/v1/contacts/${contactId}`).status(303).send();
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("An unexpected error occurred.");
//   }
// });

router.put("/v1/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const updatedContactData = req.body;

  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ message: "Invalid ID provided. ID must be an integer." });
  }

  try {
    validateContact(updatedContactData);
  } catch (err) {
    if (error instanceof InvalidContactError) {
      return res.status(400).json({ message: `An error has occurred: ${err.message}` });
    }
    console.error(error);
    return res.status(500).json({ message: "An unexpected error occurred." });
  }

  const contactIndex = contacts.findIndex(contact => contact.id === parseInt(id));
  if (contactIndex === -1) {
    return res.status(404).json({ message: "Contact not found." });
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...updatedContactData };

  res.status(303).header("Location", `/v1/contacts/${id}`).send();
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({
      message: "An error has occurred: ID must be an integer",
    });
  }

  const index = contacts.findIndex(contact => contact.id === Number(id));
  if (index === -1) {
    return res.status(404).json({
      message: "An error has occurred: Contact not found",
    });
  }

  contacts.splice(index, 1);

  res.redirect(303, "/contacts");
});

module.exports = router;
