import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserTasks = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/task.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// API/PROMISE TO CREATE A NEW TASK
const createTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/task.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// API/PROMISE TO DELETE A SINGLE TASK
const deleteSingleTask = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/task/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// API/PROMISE TO UPDATE A SINGLE TASK
const updateTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/task/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getUserTasks,
  createTask,
  updateTask,
  deleteSingleTask,
};
