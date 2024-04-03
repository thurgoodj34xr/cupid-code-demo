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
