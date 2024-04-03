import { NotificationType } from "@prisma/client";
import { useContext, useEffect } from "react";
import { FaMoneyBill } from "react-icons/fa";
import AppContext from "../../componets/app_context";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import HandleDeleteNotification from "../../hooks/deleteNotification";
import useInit from "../../hooks/useInit";
import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";
import classes from "./home.module.css";
import { useState } from 'react';
import Api from "../../hooks/api";

function Home() {
  const { data: notificationHistory, setData } = usePost("/notifications/all", {
    notficationType: NotificationType.DAILY,
  });
  const { data: purchaseHistory } = usePost("/purchases/history");
  const context = useContext(AppContext);
  const user = context.getUser();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const resp = await Api.GetWithAuth("admin/users", context);
    setUsers(resp);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);


  const handleDeleteNotification = async (notificationId) => {
    const response = await HandleDeleteNotification(notificationId, context);
    if (!response.error) {
      // Filter out the notification with the specified ID
      const removeItem = notificationHistory.filter((n, idx) => {
        return n.id !== notificationId;
      });
      setData(removeItem);
    }
  };
  const standardUsersCount = users.filter(user => user.role === 'STANDARD').length;
  const cupidUsersCount = users.filter(user => user.role === 'CUPID').length;
  const adminUsersCount = users.filter(user => user.role === 'ADMIN').length;



  return (

    <>
      {/*USER Home Page*/}
      {user.profile && (
        <section className={classes.container} >
          {/* Container for Budget */}
          < section className={classes.budget} >
            <h2>Good Morning,</h2>
            <p className="label">Summary of your budget</p>
            <hr />
            <section className={classes.balance}>
              <section>
                <p>Balance</p>
                {user.profile && <p>${user.profile.balance}</p>}
              </section>
              <section>
                <p>Daily budget</p>
                {user.profile && <p>${user.profile.dailyBudget}</p>}
              </section>
            </section>
          </section >

          {/* Container for Daily Notifications */}
          < p className="label" > Daily Notifications</p >
          <section className={classes.dailyNotifications}>
            {!notificationHistory || notificationHistory.length == 0 ? (
              <p className="label center">You currently have 0 notifications</p>
            ) : (
              notificationHistory.map((notification) => (
                <DailyNotification
                  key={notification.id} // Use unique identifier as the key
                  notificationId={notification.id}
                  title={notification.title}
                  body={notification.message}
                  time={notification.timeStamp}
                  onDelete={() => handleDeleteNotification(notification.id)}
                />
              ))
            )}
          </section>
          <div className="flex row between">
            <p className="label">Recent Purchases</p>
            <p className="pointer" onClick={() => navigate("/Purchases")}>
              View All
            </p>
          </div>
          <section className={`flex col g-20 ${classes.purchases} scrollbar-hide`}>
            {purchaseHistory &&
              purchaseHistory.map((purchase, idx) => (
                <PurchaseTile
                  key={idx}
                  title={purchase.details}
                  amount={purchase.total}
                  icon={<FaMoneyBill size="2rem" />}
                />
              ))}
          </section>
        </section >
      )}
            {/* Admin Home Page */}
            {user.role === "ADMIN" && (
              <section className={classes.container}>
                <section className={classes.budget}>
                <h2>Good Morning,</h2>
      <p className="label">App Stats</p>
  <section className="grid grid-cols-3 gap-4 place-items-center"> {/* Grid container with 3 columns and gap between tiles */}
    <div className="bg-gray-200 p-4 rounded shadow-md w-32 h-16"> {/* Tile 1 */}

      {/* Add admin-specific content here */}
    </div>
    <div className="bg-gray-200 p-4 rounded shadow-md w-32 h-16"> {/* Tile 2 */}
      {<p>Hello</p>}
    </div>
    <div className="bg-gray-200 p-4 rounded shadow-md w-32 h-16"> {/* Tile 3 */}
      {/* Add your content here */}
    </div>
    <div className="bg-gray-200 p-4 rounded shadow-md w-32 h-16"> {/* Tile 4 */}
      {/* Add your content here */}
    </div>
    <div className="bg-gray-200 p-4 rounded shadow-md"> {/* Tile 5 */}
      {/* Add your content here */}
    </div>
    <div className="bg-gray-200 p-4 rounded shadow-md"> {/* Tile 6 */}
      {/* Add your content here */}
    </div>
    <div className="bg-gray-200 p-4 rounded shadow-md"> {/* Tile 7 */}
      {/* Add your content here */}
    </div>
    <div className="bg-gray-200 p-4 rounded shadow-md"> {/* Tile 8 */}
      {/* Add your content here */}
    </div>
    <div className="bg-gray-200 p-4 rounded shadow-md"> {/* Tile 9 */}
      {/* Add your content here */}
    </div>
  </section>
  </section>
  </section>
)}

      
      {/* CUPID Home Page */}



    </>
  );
}

export default Home;
