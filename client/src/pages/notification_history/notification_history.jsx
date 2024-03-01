import classes from "./notification_history.module.css";
import { useEffect, useState, useContext } from "react";
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    var total = parseFloat(formData.title)
    var jobCost = parseFloat(formData.message)
    var details = formData.read
    var cupidId = 1
    const userId = user.id;

    const response = await Api.PostWithAuth(
      "/recordPurchase",
      { userId, cupidId, total, jobCost, details },
      context
    );
    if (!response.error) {
      // Update user profile with the new balance
      user.profile.balance = response.newBalance;
      context.updateUser(user);
      setErrorMessage(null);
      setSuccessMessage(response.message);
      setNotificationHistory((prevHistory) => [...prevHistory, response.purchase]);
    } else {
      setSuccessMessage(null);
      setErrorMessage(response.error);
    }
  }

  async function getPurchaseHistory() {
    const userId = user.id;
    var response = await Api.PostWithAuth(
      "/getPurchaseHistory",
      { userId },
      context
    );
    setNotificationHistory(response.purchases)
  }
  useEffect(() => {
    getPurchaseHistory();

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
      {notificationHistory.map((purchase) => (
        <li key={purchase.id}>
          <strong>Total:</strong> {purchase.total} | <strong>Details:</strong> {purchase.details}
        </li>
      ))}
    </ul>
  </section>;
}
export default NotificationHistory;
