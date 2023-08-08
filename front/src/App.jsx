import { useEffect, useRef, useState } from 'react'
import { AiFillDelete, AiFillCheckCircle } from 'react-icons/ai'


function App() {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState();
  const [form, setForm] = useState({
    nombre: '',
    descripcion: ''
  });

  const url = 'http://localhost:3000/task/'

  const getModal =()=>{
    const myModal = new bootstrap.Modal('#nose');

    setModal(myModal);
  }

  const getTask = async () => {
    const req = await fetch(url);

    const res = await req.json();

    setTasks(res);
  }

  const postTask = async()=>{

    const req = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json'
      }
    })

    if(req.ok){
      setForm({nombre: '', descripcion: ''});
      getTask();
      modal.hide();
      return alert('Tarea creado con exito');
    }
  };

  const completeTask = async (id) => {

    const req = await fetch(url + id, {
      method: 'PUT',
      body: JSON.stringify({ estado: true }),
      Headers: {
        'Content-Type': 'application/json'
      }
    })

    if (req.ok) {
      getTask()
      return alert('Tarea completada');
    }
  };

  const deleteTask = async (id) => {
    const req = await fetch(url + id, {
      method: 'DELETE'
    });

    if (req.ok) {
      getTask();
      return alert('Tarea eliminada');
    }
  }

  useEffect(() => {
    getTask();
    getModal()
  }, [])

  return (
    <>
      <div className="container">
        
          <div className='mt-3 mb-4'>
            <h1>Tareas</h1>
          </div>

          <button type="button" className="btn btn-success" onClick={()=>modal.show()}>
            +
          </button>

          <div className="modal fade" id="nose" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Crear nueva tarea</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input type="text" value={form.nombre} className="form-control" onChange={({target})=>setForm({...form, nombre: target.value})}/>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descripcion</label>
                      <input type="text" value={form.descripcion} className="form-control" onChange={({target})=>setForm({...form, descripcion: target.value})}/>
                    </div>
                  </form>
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={()=>{modal.hide(), setForm({nombre: '', descripcion: ''})}}>Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={()=>postTask()}>Crear</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Descricion</th>
                <th scope="col">Estado</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr>
                  <td>{task.nombre}</td>
                  <td>{task.descripcion}</td>
                  <td><p style={{ color: task.estado ? 'green' : 'red' }}>{task.estado ? 'completado' : 'incompleto'}</p></td>
                  <td>
                    <button className="btn btn-success" type="button" onClick={() => completeTask(task._id)}><AiFillCheckCircle size={'20px'} /></button> <button className='btn btn-danger' onClick={() => deleteTask(task._id)}><AiFillDelete size={'20px'} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
