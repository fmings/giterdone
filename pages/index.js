// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import TaskCard from '../components/TaskCard';
import { getUserTasks } from '../api/taskData';
import { useAuth } from '../utils/context/authContext';
import AddTaskForm from '../components/forms/AddTaskForm';
// import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH

function Home() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH

  // const user = { displayName: 'Dr. T' }; // TODO: COMMENT OUT FOR AUTH

  const [userTasks, setUserTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const getAllUserTasks = () => {
    getUserTasks(user.uid).then((tasks) => {
      const sortedTasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setUserTasks(sortedTasks);
    });
  };

  useEffect(() => {
    getAllUserTasks();
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
    getAllUserTasks();
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center page-container"
    >
      <div>
        <img alt="giterdone logo" width="400" src="/giterdone-logo.png" />
      </div>
      <div className="task-parent-container d-flex flex-column align-items-center">
        <div className="task-container">
          {userTasks.map((userTask) => (
            <TaskCard userTaskObj={userTask} key={userTask.firebaseKey} onUpdate={getAllUserTasks} />
          ))}
          <Button className="icon-btn" onClick={handleAddTask}><img className="icon" alt="add task" src="https://cdn-icons-png.flaticon.com/128/992/992651.png" /></Button>
          { isModalOpen && <AddTaskForm onClose={handleClose} /> }
        </div>
      </div>

    </div>
  );
}

export default Home;
