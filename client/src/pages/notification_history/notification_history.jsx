import classes from "./notification_history.module.css";
import { useEffect, useState, useContext } from "react";
import * as Api from "../../hook/api";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";

function NotificationHistory() {
  const context = useContext(AppContext);
  const user = context.getUser();
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    read: false,
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For checkboxes, use the 'checked' value
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };
  // TODO: These functions should be moved into their own files elsewhere, @jathurgood needs to chat with thelms to figure out how that would work and what it would look like
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    var title = formData.title
    var message = formData.message
    const userId = user.id;

    const response = await Api.PostWithAuth(
      "/recordNotification",
      { userId, title, message },
      context
    );
    if (!response.error) {
      // Update user profile with the new balance
      setErrorMessage(null);
      setSuccessMessage(response.message);
      setNotificationHistory((prevHistory) => [...prevHistory, response.notification]);
      setFormData({
        title: '',
        message: '',
        read: false,
      });
    } else {
      setSuccessMessage(null);
      setErrorMessage(response.error);
    }
  }

  const updateReadStatus = async (notificationId, newReadStatus) => {
    // Send API request to update the "read" status on the server
    try {
      const response = await Api.PostWithAuth("/changeReadState", {
        notificationId,
        newReadStatus,
      }, context);

      // Handle the response as needed (e.g., show a success message)
      if (!response.error) {
        // Update the state for this specific notification
        setNotificationHistory((prevHistory) =>
          prevHistory.map((notification) =>
            notification.id === notificationId
              ? { ...notification, read: newReadStatus }
              : notification
          )
        );
      } else {
        console.error("Error updating read status:", response.error);
      }
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  };

  async function getNotificationHistory() {
    const userId = user.id;
    var response = await Api.PostWithAuth(
      "/getNotificationHistory",
      { userId },
      context
    );
    setNotificationHistory(response.notifications)
  }
  useEffect(() => {
    getNotificationHistory();

    return () => {
    };
  }, []);
  return <section>
    <h1>Notification Form</h1>
    {errorMessage && (
      <div style={{ color: "red", marginTop: "10px" }}>
        Error: {errorMessage}
      </div>
    )}
    {successMessage && (
      <div style={{ color: "green", marginTop: "10px" }}>
        {successMessage}
      </div>
    )}
    <form onSubmit={handleFormSubmit}>
      <br />
      <label>
        Title:
        <input type="string" name="title" value={formData.title} onChange={handleFormChange} />
      </label>
      <br />
      <label>
        Message:
        <input type="string" name="message" value={formData.message} onChange={handleFormChange} />
      </label>
      <br />
      <label>
        Read:
        <input type="checkbox" name="read" checked={formData.read} onChange={handleFormChange} />
      </label>
      <br />
      <button type="submit">Create Notification</button>
    </form>
    <ul>
      {notificationHistory.map((notification) => (
        <li key={notification.id}>
          <strong>Total:</strong> {notification.title} |{" "}
          <strong>Details:</strong> {notification.message} |{" "}
          <strong>Read:</strong> {String(notification.read)} |{" "}
          <button onClick={() => updateReadStatus(notification.id, !notification.read)}>
            Toggle Read Status
          </button>
        </li>
      ))}
    </ul>
  </section>;
}
export default NotificationHistory;