import { NotificationType } from "@prisma/client";
import { FaTicketAlt } from "react-icons/fa";
import Button from "../../componets/button/button";
import CupidTile from "../../componets/cupid_tile/cupid_tile";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import useContext from "../../hooks/context";
import HandleDeleteNotification from "../../hooks/deleteNotification";
import usePost from "../../hooks/usePost";
import classes from "./ai_assistance.module.css";
import useInit from "../../hooks/useInit";
import { useApi } from "../../hooks/useApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function AiAssistance() {
  const queryClient = useQueryClient();
  const api = useApi();
  const { user, setUser, navigate } = useInit();
  const context = useContext();
  const { data: notificationHistory, setData } = usePost("/notifications/all", {
    notficationType: NotificationType.AIGEN,
  });

  const { data: myCupid } = useQuery({
    queryFn: async () => {
      const resp = await api.get(`/cupids/me/${user.profile.id}`);
      if (resp.error) {
        return null;
      } else {
        return resp;
      }
    },
    queryKey: ["myCupid"],
  });

  const { mutateAsync: fireCupid } = useMutation({
    mutationFn: async (cupidId) => await api.post("/cupids/fire", { cupidId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myCupid"]);
    },
  });

  const { mutateAsync: render } = useMutation({
    mutationFn: () => { },
    onSuccess: () => {
      queryClient.invalidateQueries(["myCupid"]);
    },
  });

  useEffect(() => {
    render();
  }, []);

  const handleDeleteNotification = async (notificationId) => {
    const response = await HandleDeleteNotification(notificationId, context);
    if (!response.error) {
      // Filter out the notification with the specified ID
      const updatedNotificationHistory = notificationHistory.filter(
        (notification) => notification.id !== notificationId
      );
      setData(updatedNotificationHistory);
    }
  };

  const purchases = () => {
    navigate("/Purchases");
    1;
  };
  1;

  return (
    <section className={classes.main}>
      <div className={classes.row}>
        <p className="label">Current Cupid</p>
        <p className="pointer" onClick={() => navigate("/SelectCupid")}>
          Select
        </p>
      </div>
      {myCupid && (
        <CupidTile cupid={myCupid} onClick={() => fireCupid(myCupid.id)} user={user} />
      )}
      <p className="label">Notifications</p>
      <div className="flex flex-col gap-5 max-h-96 overflow-y-auto">
        {!notificationHistory
          ? null
          : notificationHistory.map((notification) => (
            <DailyNotification
              key={notification.id} // Use unique identifier as the key
              notificationId={notification.id}
              title={notification.title}
              body={notification.message}
              time={notification.timeStamp}
              onDelete={handleDeleteNotification}
            />
          ))}
      </div>
      <div className={classes.row}>
        <p className="label">Recent Purchases</p>
        <p className="pointer" onClick={purchases}>
          View All
        </p>
      </div>
      <PurchaseTile
        title="Movie Tickets"
        amount="25"
        icon={<FaTicketAlt size="4rem" />}
        time="5m"
      />
      <Button text="Import Transcript" />
      <Button text="Start Listening" />
    </section>
  );
}

export default AiAssistance;
