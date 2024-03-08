import Api from "./api"
async function PurchaseHistory(userId, context, setState) {
  var resp = await Api.PostWithAuth(
    "/purchases/history",
    { userId },
    context
  );
  if (resp.error) {
    context.sendNotification(`Error: ${resp.error}`)
  } else {
    setState(resp.purchases)
  }
}

export default PurchaseHistory;