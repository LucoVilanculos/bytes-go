import api from "./axios-instance";

/*
export async function createUser({
  data,
}: {
  data: { name: string; email: string; password: string };
}) {
  try {
    const response = await api.get(`${host}/users/`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}*/

export async function createUser({
  data,
}: {
  data: { name: string; email: string; password: string };
}) {
  try {
    const response = await api.post("http://localhost:3000/register", data);
   
    return response;
  } catch (error: any) {
    //console.log(error);
    return error;
  }
}