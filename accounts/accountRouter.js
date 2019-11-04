const express = require('express');
const knex = require('../data/dbConfig.js')
const router = express.Router();

// TODO: GET all accounts
router.get('/', (req, res)=> {
     knex.select('*')
     .from('accounts')
     .then(response => {
          res.status(200).json(response)
     })
     .catch(error => {
          res.status(500).json({error: 'Failed to get accounts from database'})
     })
})


// TODO: GET account by ID
router.get('/:id', (req, res)=> {
     knex.select('*')
     .from('accounts')
     .where('id', '=', req.params.id)
     .then(response => {
          res.status(200).json(response)
     })
     .catch(error => {
          res.status(500).json({error: 'Failed to get account from database'})
     })
})


// TODO: POST new account + authenticate data sent by client
     // requires name + budget 
router.post('/', validatePost, (req, res) => {
     knex.insert(req.body, 'id')
     .into('accounts')
     .then(response => {
          res.status(200).json(response)
     })
     .catch(error => {
          res.status(500).json({error: 'Failed post new account'})
     })
})


// TODO: DELETE account
router.delete('/:id', (req, res) => {
     knex('accounts')
     .where({id:req.params.id})
     .del()
     .then(response => {
          res.status(200).json(response)
     })
     .catch(error => {
          res.status(500).json({error: 'Failed to delete account'})
     })
})


// TODO: UPDATE account + validate data
router.put('/:id', validatePost, (req, res) => {
     const changes = req.body

     knex('accounts')
     .where({id: req.params.id })
     .update(changes)
     .then(response => {
          res.status(200).json(response)
     })
     .catch(error => {
          res.status(500).json({error: 'Failed to update account'})
     })
})



// TODO Middleware authentication
function validatePost(req, res, next){
     if(req.body){
          if(req.body.name && req.body.budget){
               next()
          }
          else{ res.status(404).json({error: "Error: Missing name or budget input"})}
     } else{
          res.status(500).json({error: "Invalid account entry"})
     }
}

module.exports = router;