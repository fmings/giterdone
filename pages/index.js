// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import TaskCard from '../components/TaskCard';
// import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH

function Home() {
  // const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH

  // const user = { displayName: 'Dr. T' }; // TODO: COMMENT OUT FOR AUTH
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <div>Home Page Title</div>
      <TaskCard />
    </div>
  );
}

export default Home;
