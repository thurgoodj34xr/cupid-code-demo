import { useEffect, useState } from "react";
import Api from "../../hooks/api";
import useContext from "../../hooks/context";
import PhotoCircle from "../../componets/photo_circle/photo_circle";
import classes from "./view_users.module.css";
import Accordion from "../../componets/accordion/Accordion";

function ViewUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const context = useContext();

  const getUsers = async () => {
    const resp = await Api.GetWithAuth("admin/users", context);
    setUsers(resp);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Filter users based on their roles
  const standardUsers = users.filter(user => user.role === 'STANDARD');
  const cupidUsers = users.filter(user => user.role === 'CUPID');
  const adminUsers = users.filter(user => user.role === 'ADMIN');

  return loading ? null : (
    <>
      <div className="w-full">
        <Accordion items={[
          { title: 'Standard Users', content: standardUsers.map(user => <UserCard key={user.id} user={user}  />) },
          { title: 'Cupids', content: cupidUsers.map(user => <UserCard key={user.id} user={user} />) },
          { title: 'Admins', content: adminUsers.map(user => <UserCard key={user.id} user={user} />) }
        ]} />
      </div>
      {/* <p className="label">Current Users: {users.length}</p> */}
    </>
  );
}

// Component to render each user card
const UserCard = ({ user }) => (
  <div className={`flex row between bg-white p-20 br ycenter ${classes.userCard}`}>
    <div className="flex row g-20">
      <PhotoCircle url={user.photoUrl} />
      <div className="flex col g-10 left">
        <p>
          {user.firstName} {user.lastName}
        </p>
        <p className="label">Email: {user.email}</p>
      </div>
    </div>
    <p className="pointer">Delete</p>
  </div>
);

export default ViewUsers;

