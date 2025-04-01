export async function requestOTP(email, role) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/send_verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: "sms",
          email: email,
          ...(role !== "user" ? { role: role } : {}),
        }),
      }
    );
    const data = await response.json();
    if(data.phoneNumber) {
      return { phone_number: data.phoneNumber };
    } else {
      return { message: data.message };
    }
   
  } catch (error) {
    console.log(error);
    // setError(
    //   "Error sending verification text message: ",
    //   JSON.stringify(error),
    // );
  }
}

export async function verifyOTP(phoneNumber, code, email, role) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phonenumber: formatNumber(phoneNumber),
          code: code,
          email: email,
          ...(role !== undefined ? (role !== "user" ? { role } : {}) : {}),
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // setError("Error verifying code: ", JSON.stringify(error));
  }
}


function formatNumber(number) {
  return number.toString().replace(/(\d)(\*+)/, "$1-$2");
}