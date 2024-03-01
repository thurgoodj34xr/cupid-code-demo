import classes from "./purchases.module.css";
import * as Api from "../../hook/api";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../componets/app_context";

function Purchases() {
  const context = useContext(AppContext);
  const user = context.getUser();
  const [userBalance, setUserBalance] = useState(user.profile.balance);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    total: '',
    jobCost: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var total = parseFloat(formData.total)
    var jobCost = parseFloat(formData.jobCost)
    var details = formData.details
    var cupidId = 1
    const userId = user.id;

    const response = await Api.PostWithAuth(
      "/recordPurchase",
      { userId, cupidId, total, jobCost, details },
      context
    );
    if (!response.error) {
      console.log(response)
      // Update user profile with the new balance
      user.profile.balance = response.newBalance;
      context.updateUser(user);
      setUserBalance(response.newBalance)
      setErrorMessage(null); // Clear any previous error messages
    } else {
      setErrorMessage(response.error);
    }
  }
  return <section>
    <h1>Purchase Form</h1>
    <div>
      <p className="label">Current balance: {userBalance}</p>
    </div>
    {errorMessage && (
      <div style={{ color: "red", marginTop: "10px" }}>
        Error: {errorMessage}
      </div>
    )}
    <form onSubmit={handleSubmit}>
      <br />
      <label>
        Total:
        <input type="number" name="total" value={formData.total} onChange={handleChange} />
      </label>
      <br />
      <label>
        Job Cost:
        <input type="number" name="jobCost" value={formData.jobCost} onChange={handleChange} />
      </label>
      <br />
      <label>
        Details:
        <input type="text" name="details" value={formData.details} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Create Purchase</button>
    </form>
  </section>;
}

export default Purchases;
