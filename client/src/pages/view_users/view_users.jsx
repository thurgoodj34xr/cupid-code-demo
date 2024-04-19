// ViewUsers.jsx
import React, { useEffect, useState } from "react";
import Api from "../../hooks/api";
import useContext from "../../hooks/context";
import UserCard from "../../componets/userCard/user_card";
import Accordion from "../../componets/accordion/Accordion";
import TerminateCupid from "../../hooks/terminateCupid";

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

  const handleTerminateUser = async (currentUser) => {
    try {
      // Call the TerminateCupid function
      await TerminateCupid(currentUser.cupid.id, context);
      // Remove the terminated user from the list
      setUsers(prevUsers => prevUsers.filter(user => user.id !== currentUser.id));
    } catch (error) {
      // Handle errors
      console.error('Error terminating cupid:', error);
    }
  };

  // Filter users based on their roles
  const standardUsers = users.filter(user => user.role === 'STANDARD');
  const cupidUsers = users.filter(user => user.role === 'CUPID' && user.cupid.fired === false);
  const adminUsers = users.filter(user => user.role === 'ADMIN');
  const standardUsersCount = standardUsers.length;
  const cupidUsersCount = cupidUsers.length;
  const adminUsersCount = adminUsers.length;

  return loading ? null : (
    <>
      <div className="w-full">
        <Accordion items={[
          {
            title: 'Standard Users',
            content: (
              <>
                <p className="bg-white pb-8">Total Count: {standardUsersCount}</p>
                {standardUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    actionPhrase={"Remove"}
                    onActionClick={() => handleTerminateUser()}
                  />
                ))}
              </>
            )
          },
          {
            title: 'Cupids',
            content: (
              <>
                <p className="bg-white">Total Count: {cupidUsersCount}</p>
                {cupidUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    actionPhrase={"Terminate"}
                    onActionClick={() => handleTerminateUser(user)}
                  />
                ))}
              </>
            )
          },
          {
            title: 'Admins',
            content: (
              <>
                <p className="bg-white">Total Count: {adminUsersCount}</p>
                {adminUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    actionPhrase={"Plus 1"}
                    onActionClick={() => handleTerminateUser()}
                  />
                ))}
              </>
            )
          }
        ]} />
      </div>
    </>
  );
}
export default ViewUsers;
