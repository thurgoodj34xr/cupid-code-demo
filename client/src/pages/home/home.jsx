import { NotificationType } from "@prisma/client";
import { useContext, useEffect } from "react";
import { FaMoneyBill } from "react-icons/fa";
import AppContext from "../../componets/app_context";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import HandleDeleteNotification from "../../hooks/deleteNotification";
import { useNavigate } from "react-router-dom";
import useInit from "../../hooks/useInit";
import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";
import classes from "./home.module.css";
import { useState } from 'react';
import Api from "../../hooks/api";
import PhotoCircle from "../../componets/photo_circle/photo_circle";

function Home() {
  const { data: notificationHistory, setData } = usePost("/notifications/all", {
    notficationType: NotificationType.DAILY,
  });
  const { data: purchaseHistory } = usePost("/purchases/history");
  const context = useContext(AppContext);
  const user = context.getUser();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalCupidWages, setTotalCupidWages] = useState(0);
  const getUsers = async () => {
    const resp = await Api.GetWithAuth("admin/users", context);
    setUsers(resp);
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (purchaseHistory) {
      // Finds the total purchases
      const total = purchaseHistory.reduce((acc, purchase) => acc + purchase.profit, 0);
      setTotalIncome(total);

      // Finds the total Cupid wages
      const totalWages = purchaseHistory.reduce((total, purchase) => {
        if (purchase.cupidId !== null && purchase.cupidPayout !== null){
          return total + purchase.cupidPayout;
        }
        return total;
      }, 0);
      setTotalCupidWages(totalWages)
    }
  }, [purchaseHistory]);





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
    {/* App Stats Container */}
    <div className={classes.budget}>
      <h3 className="text-lg font-semibold mb-2">App Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        {/* Tile 1: Users */}
        <div className="bg-white p-2 rounded shadow-md border border-gray-100">
          <p className="text-sm font-medium">Total Users</p>
          <p className="text-xl font-bold">{standardUsersCount}</p>
        </div>

        {/* Tile 2: Revenue */}
        <div className="bg-white p-2 rounded shadow-md border border-gray-100">
          <p className="text-sm font-medium">Total Cupids</p>
          <p className="text-xl font-bold">{cupidUsersCount}</p>
        </div>

                {/* Tile 2: Revenue */}
                <div className="bg-white p-2 rounded shadow-md border border-gray-100">
          <p className="text-sm font-medium">Total Admins</p>
          <p className="text-xl font-bold">{adminUsersCount}</p>
        </div>
                {/* Tile 2: Revenue */}
                <div className="bg-white p-2 rounded shadow-md border border-gray-100">
          <p className="text-sm font-medium">Total Income</p>
          <p className="text-xl font-bold">${totalIncome}</p>
        </div>
                {/* Tile 2: Revenue */}
                <div className="bg-white p-2 rounded shadow-md border border-gray-100">
          <p className="text-sm font-medium">Total Cupid Wages</p>
          <p className="text-xl font-bold">${totalCupidWages}</p>
        </div>
                {/* Tile 2: Revenue */}
                <div className="bg-white p-2 rounded shadow-md border border-gray-100">
          <p className="text-sm font-medium">AI User Stats</p>
          <p className="text-xl font-bold">N/A</p>
        </div>
      </div>
    </div>
    <section className={classes.container}>
  <div className={classes.adminContainers} onClick={() => navigate("/Logs")}>
    
  <div className="grid grid-cols-6">
  <div className="col-span-3">     
      <h3 className="text-lg font-semibold mb-2 pb-0">Logs</h3>
    <p className="text-sm text-gray-500 pt-0">View connected users and site logs.</p>
    </div>
    <div className="col-span-2"></div>

    <div className="flex items-center justify-between">
        <div></div> {/* This is an empty div to take up space */}
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  className="w-5 h-5 text-gray-400" // Adjust color and size as needed
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M12 2l9 9-9 9"></path>
</svg>
  </div>
  </div>
  </div>
</section>
<section className={classes.container} onClick={() => navigate("/ViewUsers")}>
  <div className={classes.adminContainers}>
  <div className="grid grid-cols-6">
    <div className="col-span-3">    
      <h3 className="text-lg font-semibold mb-2 pb-0">View Users</h3>
    <p className="text-sm text-gray-500 pt-0">View standard users, cupids, and admins.</p>
    </div>
    <div className="col-span-2"></div>

    <div className="flex items-center justify-between">
        <div></div> {/* This is an empty div to take up space */}
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  className="w-5 h-5 text-gray-400" // Adjust color and size as needed
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M12 2l9 9-9 9"></path>
</svg>
    </div>
  </div>
  </div>
</section>

</section>
)}


      
      {/* CUPID Home Page */}
      {user.cupid && (
        <>
          <section className={classes.container} >
            {/* Container for Budget */}
            < section className={classes.budget}>
              <h2>Good Morning,</h2>
              <p className="label">Summary of your earnings and rating</p>
              <hr />
              <section className={classes.balance}>
                <section>
                  <p>Total</p>
                  {user.cupid && <p>${user.cupid.total}</p>}
                </section>
                <section>
                  <p>Today</p>
                  {user.cupid && <p>{user.cupid.today}</p>}
                </section>
                <section>
                  <p>Rating</p>
                  {user.cupid && <p>{user.cupid.rating}</p>}
                </section>
              </section>
            </section >

            {/* Container for Current Jobs */}
            <p className="label">Current Job</p>
            <section className={classes.budget}>

            </section>

            {/*Container for Last Job */}
            < p className="label">Last Job</p>
            <section className={classes.budget}>
              <section>
                <p>Time</p>
                {user.cupid && <p>{user.cupid.lastjob}</p>}
              </section>
              <section>
                <p>Time</p>
                {user.cupid && <p>{user.cupid.lastjob}</p>}
              </section>
              <section>
                <p>Payout</p>
                {user.cupid && <p>${user.cupid.rating}</p>}
              </section>
              <section>
                <p>Review</p>
                {user.cupid && <p>{user.cupid.rating}</p>}
              </section>
              <section>
                <p>Location</p>
              </section>
            </section>
            {/*Container for Available Jobs */}
            < p className="label">Available Jobs</p>
            <section className={classes.budget}>
            </section>
          </section >
        </>
      )}
      {/*End of Cupid Home Page*/}

    </>
  );
}

export default Home;
