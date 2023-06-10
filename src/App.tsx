import React, { useState } from 'react';
import { HiArchiveBoxXMark } from 'react-icons/hi2';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { RiCheckboxCircleLine } from 'react-icons/ri';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const initialTasks: Task[] = [];

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [showUncompleted, setShowUncompleted] = useState<boolean>(false);

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  };
  const handleTaskDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleNewTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const handleTaskClick = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const uncompletedTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const handleShowCompletedClick = () => {
    setShowCompleted(true);
    setShowUncompleted(false);
  };

  const handleShowUncompletedClick = () => {
    setShowUncompleted(true);
    setShowCompleted(false);
  };

  const handleShowAllClick = () => {
    setShowCompleted(false);
    setShowUncompleted(false);
  };

  return (
    <div className="app-container">
      <h1>ToDo</h1>
      <form onSubmit={handleNewTaskSubmit}>
        <input
          className="task_inp"
          type="text"
          value={newTaskText}
          onChange={handleNewTaskChange}
          placeholder="Добавьте задачу"
        />
        <button className="add" type="submit">
          Добавить задачу
        </button>
      </form>
      {showCompleted && (
        <>
          <h2>Выполненные задачи</h2>
          <ul>
            {completedTasks.map((task) => (
              <li className="task-li" key={task.id}>
                <del>{task.text}</del>
                <RiCheckboxCircleLine
                  className="completed"
                  onClick={() => handleTaskClick(task.id)}
                />
                <HiArchiveBoxXMark
                  className="delete"
                  onClick={() => handleTaskDelete(task.id)}
                ></HiArchiveBoxXMark>
              </li>
            ))}
          </ul>
        </>
      )}
      {showUncompleted && (
        <>
          <h2>Невыполненные задачи</h2>
          <ul>
            {uncompletedTasks.map((task) => (
              <li className="task-li" key={task.id}>
                {task.text}
                <RiCheckboxBlankCircleLine
                  className="uncompleted"
                  onClick={() => handleTaskClick(task.id)}
                />
              </li>
            ))}
          </ul>
        </>
      )}
      {!showCompleted && !showUncompleted && (
        <>
          <h2>Все задачи</h2>
          <ul>
            {tasks.map((task) => (
              <li className="task-li" key={task.id}>
                {task.completed ? (
                  <del>
                    {task.text}
                    <RiCheckboxCircleLine
                      onClick={() => handleTaskClick(task.id)}
                      className="completed"
                    ></RiCheckboxCircleLine>
                  </del>
                ) : (
                  <li>
                    {task.text}
                    <RiCheckboxBlankCircleLine
                      onClick={() => handleTaskClick(task.id)}
                      className="uncompleted"
                    ></RiCheckboxBlankCircleLine>
                  </li>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      <button className="button_filter" onClick={handleShowCompletedClick}>
        {' '}
        выполненные
      </button>
      <button className="button_filter" onClick={handleShowUncompletedClick}>
        невыполненные
      </button>
      <button className="button_filter" onClick={handleShowAllClick}>
        {' '}
        все{' '}
      </button>
    </div>
  );
};

export default App;
