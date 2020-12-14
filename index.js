const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let persons = [
  {
    name: "Timos",
    number: "1111111111",
    id: 5,
  },
  {
    name: "Martyn",
    number: "1231",
    id: 6,
  },
  {
    name: "Dave",
    number: "1234124",
    id: 7,
  },
];

app.get("/api/persons/", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  person = persons.filter((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  const info = `
<p>
Phonebook has info for ${persons.length} people.
<p><br>
  <p>
    ${new Date().toString()}
</p>
`;
  console.log(persons);
  response.send(info);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (
    persons.find((person) => {
      return person.name === request.body.name;
    })
  ) {
    return response.status(400).json({
      error: "person already exists",
    });
  }
  const person = {
    name: request.body.name,
    number: request.body.number,
    id: Math.floor(Math.random() * 10000) + 1,
  };
  persons = persons.concat(person);

  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
