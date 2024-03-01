import classes from "./purchases.module.css";
import * as Api from "../../hook/api";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../componets/app_context";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import { FaMoneyBill } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";

function Purchases() {
  const context = useContext(AppContext);
  const user = context.getUser();
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [userBalance, setUserBalance] = useState(user.profile.balance);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    total: "",
    jobCost: "",
    details: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    var total = parseFloat(formData.total);
    var jobCost = parseFloat(formData.jobCost);
    var details = formData.details;
    var cupidId = 1;
    const userId = user.id;

    const response = await Api.PostWithAuth(
      "/recordPurchase",
      { userId, cupidId, total, jobCost, details },
      context
    );
    console.log(response);
    if (!response.error) {
      // Update user profile with the new balance
      user.profile.balance = response.newBalance;
      context.updateUser(user);
      setUserBalance(response.newBalance);
      setErrorMessage(null);
      setSuccessMessage(response.message);
      setPurchaseHistory((prevHistory) => [...prevHistory, response.purchase]);
    } else {
      setSuccessMessage(null);
      setErrorMessage(response.error);
    }
  };

  async function getPurchaseHistory() {
    const userId = user.id;
    var response = await Api.PostWithAuth(
      "/getPurchaseHistory",
      { userId },
      context
    );
    setPurchaseHistory(response.purchases);
  }
  useEffect(() => {
    getPurchaseHistory();
    return () => {};
  }, []);

  return (
    <section className={classes.main}>
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
      <p className="label left">Create Demo Purchase</p>
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
    </section>
  );
}

export default Purchases;
