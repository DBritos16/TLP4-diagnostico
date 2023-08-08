const ctrl = {};
const Task = require('../models/task.model');

ctrl.getTask = async(req, res)=>{

    try {
        const tasks = await Task.find();

        return res.json(tasks);

    } catch (error) {
        console.log(`Ocurrio un error: ${error}`);
        return res.status(400).json('Ocurrio un error')
    }
}

ctrl.postTask = async(req, res)=>{

    const {nombre, descripcion} = req.body;


    try {
        
        const newTask = new Task({nombre, descripcion});

        await newTask.save();

        return res.json(newTask);

    } catch (error) {
        console.log(`Ocurrio un error: ${error}`);
        return res.status(400).json('Ocurrio un error')
    }
}

ctrl.putTask = async(req, res)=>{

    const id = req.params.id;
    const { estado } = req.body

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id },
            { $set: {estado: true} },
            { new: true }
        )

        return res.json(task);

    } catch (error) {
        console.log(`Ocurrio un error: ${error}`);
        return res.status(400).json('Ocurrio un error')
    }
};

ctrl.deleteTask = async(req, res)=>{

    const id = req.params.id

    try {
        await Task.findByIdAndDelete(id);

        res.json({
            msg: 'Tarea eliminada con exito'
        });
    } catch (error) {
        console.log(`Ocurrio un error: ${error}`);
        return res.status(400).json('Ocurrio un error')
    }

};

module.exports = ctrl;