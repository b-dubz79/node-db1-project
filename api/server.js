const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());




server.get('/accounts', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    }).catch(err => {
        console.log("Error!!")
        res.status(404).json({ err: err.message})
    })

})

server.post('/accounts', (req, res) => {
    db('accounts')
    .insert(req.body, 'id')
    .then(account => {
        res.status(200).json(account)
    }).catch(err => {
        console.log("Error!!");
        res.status(404).json({err: err.message})
    })
})

server.patch('/accounts/:id', (req, res) => {
   const { id } = req.params;
    db('accounts')
    .where({ id })
    .update(req.body)
    .then(count => {
        if(count){
            res.status(201).json({ message: "update successful"})
        } {
            res.status(404).json({ message: "error finding that id"})
        }
    })
})

server.delete('/accounts/:id', (req, res) => {
    db('accounts')
    .del()
    .where({id: req.params.id})
    .then(count => {
        if(count){
            res.status(200).json({ message: "successfully deleted account"})
        } else {
            res.status(404).json({ message: "couldn't find that account"})
        }
    })
})




module.exports = server;

