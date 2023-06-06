export const postData = async (path, body) => {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("access_token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`http://localhost:8080/${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }

  return response;
};

export const getData = async (path) => {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("access_token") || null;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`http://localhost:8080/${path}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }
  return response;
};

export const deleteData = async (path) => {
  const headers = { "Content-Type": "application/json" };

  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`http://localhost:8080/${path}`, {
    method: "DELETE",
    headers,
  })
    .then((res) => res.json())
    .catch(() => ({
      success: false,
      code: "NETWORK_ERROR",
      message: "Network error",
    }));

  if (!response.success) {
    if (!response.code) {
      response.code = "SOMETHING_WRONG";
    }
    if (!response.message) {
      response.message = response.code;
    }
  }

  return response;
};