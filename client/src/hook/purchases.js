import * as Api from "./api"
async function PurchaseHistory(userId, context, setState) {
    var resp = await Api.PostWithAuth(
      "/getPurchaseHistory",
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