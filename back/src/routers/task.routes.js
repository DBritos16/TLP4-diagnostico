const { getTask, postTask, putTask, deleteTask } = require('../controllers/task.controller');

const router = require('express').Router();

router.get('/task', getTask);

router.post('/task', postTask);

router.put('/task/:id', putTask);

router.delete('/task/:id', deleteTask);

module.exports = router;