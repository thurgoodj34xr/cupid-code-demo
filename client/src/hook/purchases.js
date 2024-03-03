import * as Api from "./api"
async function PurchaseHistory(userId, context, setState) {
    var {purchases} = await Api.PostWithAuth(
      "/getPurchaseHistory",
      { userId },
      context
    );
    setState(purchases)
  }

  export default PurchaseHistory;