// implement your API here
const express = require('express');

const Users = require('./data/db.js')

const server = express();

server.get('/', (req, res) => {
    res.send('Hello world!! This is the home page.');
});

server.get(`/api/users`, (req, res) => {
    // Returns an array of all the user objects contained in the database.
    Users.find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: 'The user information could not be retrieved.'
            });
        });
});

server.post(`/api/users`, (req, res) => {
    // Creates a user using the information sent inside the `request body`.

    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: "There was an error while saving the user to the database."
            })
        })
})

server.get(`/api/users/:id`, (req, res) => {
    // Returns the user object with the specified `id`. 
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json( {
                    message: "User with that id does not exist."
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: "Error retrieving user from the server."
            })
        })
})

server.put(`/api/users/:id`, (req, res) => {
    // Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |

    res.status(200).json(hobbits)
})

server.delete(`/api/users/:id`, (req, res) => {
    // Removes the user with the specified `id` and returns the deleted user. 

    res.status(200).json(hobbits)
})


server.listen(8000, () => console.log("Server listening on port 8000"));