export const findUserPassword = async ({
  name,
  phoneNumber,
}: {
  name: string;
  phoneNumber: string;
}) => {
  const response = await fetch("/api/user/find-user-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, phoneNumber }),
  });

  const data = await response.json();

  console.log("findUserPassword data >> ", data);

  if (!response.ok) {
    throw new Error("Failed to find user password");
  }

  return data;
};
