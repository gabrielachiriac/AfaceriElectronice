import { getApiUrl } from "../utils/envUtils";

export const createPayment = async (orderId, total, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({orderId, total}),
  };

  const result = await fetch(`${getApiUrl()}/payments/create`, options);
  const response = await result.json();
  return response;
};
