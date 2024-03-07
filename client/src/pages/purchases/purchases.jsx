import { useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../../componets/button/button";
import Input from "../../componets/inputs/input";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import ResponseMessage from "../../componets/responseMessage/responseMessage";
import PurchaseHistory from "../../hooks/purchases";
import classes from "./purchases.module.css";
import useContext from "../../hooks/context";
import Api from "../../hooks/api";
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
}

export default Purchases;
