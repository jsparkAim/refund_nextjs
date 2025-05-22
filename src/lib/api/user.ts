export const checkUser = async ({
  phone,
  name,
}: {
  phone: string;
  name: string;
}) => {
  const response = await fetch("/api/user/check-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, name }),
  });

  const data = await response.json();
  console.log("response.json >> ", data);

  if (!response.ok) {
    throw new Error("Failed to check user");
  }

  return data;
};
