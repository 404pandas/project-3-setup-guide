import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import MonsterForm from "../components/MonsterForm";
import MonsterList from "../components/MonsterList";

import { QUERY_USER, QUERY_ME, QUERY_MONSTERS } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const { loading: loadingMonsters, data: monsterData } =
    useQuery(QUERY_MONSTERS);

  const user = data?.me || data?.user || {};
  const monsters = monsterData?.monsters || [];

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/me' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loadingMonsters) {
    return <div>Loading Monsters...</div>;
  }

  if (!user) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (monsters.length === 0) {
    return <h4>No monsters to display</h4>;
  }

  return (
    <div>
      <div className='flex-row justify-center mb-3'>
        <h2 className='col-12 col-md-10 bg-dark text-light p-3 mb-5'>
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        <div className='col-12 col-md-10 mb-5'>
          <MonsterList monsters={monsters} title='Witcher Monsters' />
        </div>
        <div
          className='col-12 col-md-10 mb-3 p-3'
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <MonsterForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
