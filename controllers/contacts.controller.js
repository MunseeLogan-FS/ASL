import asl from "@jworkman-fs/asl";

const { ContactModel, Pager, sortContacts, filterContacts } = asl;

function getAllContacts(req, res) {
  // console.log(ContactModel.index());
  try {
    let contacts = ContactModel.index();

    // Filtering
    const filterBy = req.get("X-Filter-By");
    const filterOp = req.get("X-Filter-Operator");
    const filterVal = req.get("X-Filter-Value");

    if (filterBy && filterOp && filterVal) {
      try {
        contacts = filterContacts(filterBy, filterOp, filterVal, contacts);
      } catch (e) {
        console.error("Filtering error:", e);
        return res.status(400).json({ message: e.message });
      }
    }

    // Sorting
    const sortField = req.query.sort || "id";
    const sortDir = req.query.direction || "asc";

    const validSortFields = ["id", "fname", "lname", "email", "birthday"];
    const validSortDirs = ["asc", "desc"];

    if (!validSortFields.includes(sortField)) {
      return res
        .status(400)
        .json({ message: `Invalid sort field: ${sortField}` });
    }

    if (!validSortDirs.includes(sortDir)) {
      return res
        .status(400)
        .json({ message: `Invalid sort direction: ${sortDir}` });
    }

    contacts = sortContacts(contacts, sortField, sortDir);

    res.set("X-Results-Total", contacts.length.toString());

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(
      parseInt(req.query.limit || req.query.size) || 10,
      20
    );

    const pager = new Pager(contacts, page, limit);

    if (page > pager.total) {
      return res.status(416).json({
        message: `Requested page ${page} exceeds available pages (${pager.total()})`,
      });
    }

    // Set pagination headers
    res.set("X-Page-Total", pager.total);
    res.set("X-Page-Next", pager.next());
    res.set("X-Page-Prev", pager.prev());

    res.json(pager.results());
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
}

const getContactById = (req, res) => {
  try {
    const contactId = parseInt(req.params.id);

    if (isNaN(contactId)) {
      return res
        .status(400)
        .json({ message: "Contact ID must be a valid number" });
    }

    try {
      const contact = ContactModel.show(contactId);
      res.status(200).json(contact);
    } catch (e) {
      if (e.name === "ContactNotFoundError") {
        return res.status(404).json({ message: e.message });
      }
      throw e;
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
};

const createContact = (req, res) => {
  try {
    const newContact = req.body;
    const created = ContactModel.create(newContact);

    res.status(303).set("Location", `/v1/contacts/${created.id}`).end();
  } catch (e) {
    switch (e.name) {
      case "InvalidContactFieldError":
      case "BlankContactFieldError":
      case "DuplicateContactResourceError":
      case "InvalidContactSchemaError":
        return res.status(400).json({ message: e.message });
      default:
        console.error(e);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: e });
    }
  }
};

const updateContact = (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    if (isNaN(contactId)) {
      return res
        .status(400)
        .json({ message: "Contact ID must be a valid integer" });
    }

    const updatedData = req.body;
    ContactModel.update(contactId, updatedData);

    res.status(303).set("Location", `/v1/contacts/${contactId}`).end();
  } catch (e) {
    if (e.name === "ContactNotFoundError") {
      return res.status(404).json({ message: e.message });
    }

    switch (e.name) {
      case "InvalidContactFieldError":
      case "BlankContactFieldError":
      case "DuplicateContactResourceError":
      case "InvalidContactSchemaError":
        return res.status(400).json({ message: e.message });
      default:
        console.error(e);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: e });
    }
  }
};

const deleteContact = (req, res) => {
  try {
    const contactId = parseInt(req.params.id);

    if (isNaN(contactId)) {
      return res
        .status(400)
        .json({ message: "Contact ID must be a valid integer" });
    }

    ContactModel.delete(contactId);

    res.status(303).set("Location", "/v1/contacts").end();
  } catch (e) {
    if (e.name === "ContactNotFoundError") {
      return res.status(404).json({ message: e.message });
    }

    console.error(e);
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
};

export {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
