import React from 'react';
import { Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteSingleTask, updateTask } from '../api/taskData';

export default function TaskCard({ userTaskObj, onUpdate }) {
  const toggleCompletedTask = () => {
    if (userTaskObj.complete) {
      updateTask({ ...userTaskObj, complete: false }).then(() => onUpdate());
    } else {
      updateTask({ ...userTaskObj, complete: true }).then(() => onUpdate());
    }
  };

  const deleteTask = () => {
    if (window.confirm(`Are you sure you want to delete this task? Task: ${userTaskObj.task}`)) {
      deleteSingleTask(userTaskObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <div className="task-list-container">
        <Table>
          <tbody>
            <tr>
              <td>{userTaskObj.complete ? (
                <Button onClick={toggleCompletedTask}><img alt="checked button" src="https://cdn-icons-png.flaticon.com/128/711/711239.png" /></Button>
              ) : <Button onClick={toggleCompletedTask}><img alt="checked button" src="https://cdn-icons-png.flaticon.com/128/1442/1442912.png" /></Button>}
              </td>
              <td>{userTaskObj.task}</td>
              <td>
                {new Date(userTaskObj.dueDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </td>
              <td><Button onClick={deleteTask}><img alt="delete icon" src="https://cdn-icons-png.flaticon.com/128/484/484662.png" /></Button></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  userTaskObj: PropTypes.shape({
    dueDate: PropTypes.string,
    task: PropTypes.string,
    complete: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
