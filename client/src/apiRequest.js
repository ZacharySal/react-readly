const apiRequest = async (
  url = "",
  optionsObj = null,
  needResponse = false,
  response = null,
  errMsg = null
) => {
  try {
    const res = await fetch(url, optionsObj);
    if (!res.ok) throw Error("Error occured");
    if (needResponse) {
      response = await res.json();
    }
  } catch (err) {
    errMsg = err.message;
  } finally {
    return { response, errMsg };
  }
};

export default apiRequest;
