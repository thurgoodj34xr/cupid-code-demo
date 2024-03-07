import { useEffect, useState } from "react";
import Api from "../../hooks/api";
import useContext from "../../hooks/context";
import PhotoCircle from "../../componets/photo_circle/photo_circle";
import classes from "./view_users.module.css";

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

  useEffect(() => {
    console.log(users);
  }, [users]);

  return loading ? null : (
    <>
      <p className="label">Current Users: {users.length}</p>
      <div className={`${classes.main} flex col g-20 p-20  w-100 overflowy`}>
        {users.map((user, idx) => {
          return (
            <div
              key={idx}
              className="flex row between bg-white p-20 br ycenter"
            >
              <div className="flex row g-20">
                <PhotoCircle url={user.photoUrl} />
                <div className="flex col g-10 left">
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="label">Email: {user.email}</p>
                  <p className="label">Role: {user.role}</p>
                </div>
              </div>
              <p className="pointer">Delete</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ViewUsers;
