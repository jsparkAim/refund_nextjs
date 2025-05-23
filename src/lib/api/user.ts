export const checkUser = async ({
  phoneNumber,
  password,
}: {
  phoneNumber: string;
  password: string;
}) => {
  const response = await fetch("/api/user/check-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to check user");
  }

  return data;
};
