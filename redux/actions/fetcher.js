async function fetcher(url, method = "GET", data = null) {
  let res;

  if (data && method !== "GET") {
    res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } else {
    res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return res;
}

export default fetcher;
