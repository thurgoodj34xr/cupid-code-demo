import * as Api from "./api"
async function PurchaseHistory(userId, context) {
    var {purchases} = await Api.PostWithAuth(
      "/getPurchaseHistory",
      { userId },
      context
    );
    return purchases;
  }

  export default PurchaseHistory;