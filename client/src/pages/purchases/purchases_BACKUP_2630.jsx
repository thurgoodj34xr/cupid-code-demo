import { useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../../componets/button/button";
import Input from "../../componets/inputs/input";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import ResponseMessage from "../../componets/responseMessage/responseMessage";
import Api from "../../hook/api";
import PurchaseHistory from "../../hook/purchases";
import classes from "./purchases.module.css";
<<<<<<< HEAD
import * as Api from "../../hook/api";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../componets/app_context";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";

=======
import useContext from "../../hook/context";
>>>>>>> b96712d5db016317a7a5eb76aa9685bc705694f5
function Purchases() {
  const context = useContext();
  const user = context.getUser();
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    total: "",
    jobCost: "",
    details: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    var total = parseFloat(formData.total);
    var jobCost = parseFloat(formData.jobCost);
    var details = formData.details;
    var cupidId = 1;

    const response = await Api.PostWithAuth(
      "/purchases/record",
      { cupidId, total, jobCost, details },
      context
    );
    if (!response.error) {
      // Update user profile with the new balance
      user.profile.balance = response.newBalance;
      context.updateUser(user);
      setErrorMessage(null);
      setSuccessMessage(response.message);
      setPurchaseHistory((prevHistory) => [...prevHistory, response.purchase]);
    } else {
      setSuccessMessage(null);
      setErrorMessage(response.error);
    }
  };

  useEffect(() => {
    PurchaseHistory(user.Id, context, setPurchaseHistory);
  }, []);
<<<<<<< HEAD
  return <div className={classes.purchase_form}>
  <h1>Purchase Form</h1>
  <div>
    <p className="label">Current balance: {userBalance}</p>
  </div>
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
    
      <Input placeholder = "Total" type="number" name="total" value={formData.total} onChange={handleFormChange} />
    <br />
      <Input placeholder= "Job Cost" type="number" name="jobCost" value={formData.jobCost} onChange={handleFormChange} />
    <br />

      <Input placeholder = "Details" type="text" name="details" value={formData.details} onChange={handleFormChange} />
    <br />
    <Button type = "submit" text={"Create Purchase"}></Button>
  </form>
  <ul>
    {purchaseHistory.map((purchase) => (
      <li key={purchase.id}>
        <strong>Total:</strong> {purchase.total} | <strong>Details:</strong> {purchase.details}
      </li>
    ))}
  </ul>
</div>;
=======

  let navigate = useNavigate();
  return (
    <section className={classes.main}>
      {errorMessage && <ResponseMessage type="error" message={errorMessage} />}
      {successMessage && (
        <ResponseMessage type="success" message={successMessage} />
      )}
      <div className="row">
        <p className="label left">Create Demo Purchase</p>
        <p className="label left">${user.profile.balance}</p>
      </div>
      <form className={classes.formData} onSubmit={handleFormSubmit}>
        <Input
          placeholder="Total"
          inputType="number"
          state={formData.total}
          setState={(v) => {
            setFormData((old) => ({ ...old, total: v }));
          }}
        />
        <Input
          placeholder="Job Cost"
          inputType="number"
          state={formData.jobCost}
          setState={(v) => {
            setFormData((old) => ({ ...old, jobCost: v }));
          }}
        />
        <Input
          placeholder="Details"
          inputType="text"
          state={formData.details}
          setState={(v) => {
            setFormData((old) => ({ ...old, details: v }));
          }}
        />
        <Button text="Submit Purchase" />
      </form>
      <p className="label left">Recent Purchases</p>
      <div className={classes.purchases}>
        {purchaseHistory.map((purchase, idx) => (
          <PurchaseTile
            key={idx}
            title={purchase.details}
            amount={purchase.total}
            icon={<FaMoneyBill size="2rem" />}
          />
        ))}
      </div>
      <div className="flex row between">
        <p className="label">Need more CupidCash?</p>
        <p className="link pointer" onClick={() => navigate("/CupidCash")}>
          Buy now!
        </p>
      </div>
    </section>
  );
>>>>>>> b96712d5db016317a7a5eb76aa9685bc705694f5
}


export default Purchases;

