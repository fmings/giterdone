import React, { useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';
import { useAuth } from '../../utils/context/authContext';
import { createTask, updateTask } from '../../api/taskData';

const initialState = {
  firebaseKey: '',
  uid: '',
  owner: '',
  task: '',
  dueDate: '',
  complete: false,
};

export default function AddTaskForm({ onClose }) {
  const [formInput, setFormInput] = useState(initialState);
  const [dueDate, setDueDate] = useState(new Date());
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    const payload = {
      ...formInput, uid: user.uid, owner: user.displayName, dueDate,
    };
    console.warn('payload', payload);
    createTask(payload).then(({ name: firebaseKey }) => {
      const patchPayload = { firebaseKey };
      updateTask(patchPayload).then(() => {
        onClose();
        router.push('/');
      });
    });
  };

  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show>
        <Modal.Body>
          <p><strong>Add a Task</strong></p>
          <FloatingLabel controlId="floatingTags">
            <Form.Group className="mb-3">
              <div className="formFields">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter Task"
                  name="task"
                  value={formInput.task}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formFields">
                <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
              </div>
            </Form.Group>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button className="submit-btn" onClick={handleClose}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

AddTaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
