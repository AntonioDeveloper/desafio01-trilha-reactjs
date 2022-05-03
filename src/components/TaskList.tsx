import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newId, setId] = useState(0);

  //const [isComplete, setIsComplete] = useState(false);

  const taskInput = document.querySelector("input[type=text]");
  const titleTask: string = taskInput?.getAttribute("value")! //Type 'string | undefined' is not assignable to type 'string'.;


  const taskId = Math.ceil(Math.random() * 1000);

  const taskObj: Task = {
    id: taskId,
    title: newTaskTitle,
    isComplete: false
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (titleTask === undefined) {
      alert("Digite o nome da tarefa")
    } else {
      setNewTaskTitle(titleTask);

      setId(taskId);

      tasks.push(taskObj);
      setTasks(tasks);
      setNewTaskTitle("");
    }
    console.log(tasks)
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // for (let i of tasks) {
    //   //console.log(i.id, id)
    //   if (i.id === id) {
    //     if (i.isComplete === taskObj.isComplete) {
    //       //setIsComplete(!isComplete);
    //       i.isComplete = !taskObj.isComplete;
    //       //console.log(i);
    //       console.log(tasks);
    //       setTasks(tasks);
    //       //i.isComplete = isComplete;
    //     } else {
    //       // setIsComplete(isComplete);
    //       // i.isComplete = isComplete;
    //       i.isComplete = taskObj.isComplete;
    //       console.log(i.isComplete);
    //       console.log(tasks)
    //     }
    //     //console.log(i)
    //   }
    // }


    //console.log(tasks)

    // CRIAÇÃO DE UM NOVO ARRAY PARA RENOVAR O ESTADO DAS TASKS
    const newTasks = tasks.map(task => task.id === id ? {
      ...task, isComplete: !task.isComplete
    } : task);

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //console.log(tasks)
    const filteredTasks = tasks.filter((task) => {
      if (task.id !== id) {
        return task

      }
    })

    console.log(filteredTasks)
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={task.isComplete}
                    onChange={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}