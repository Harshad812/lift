import axios from "axios";

export const getLastTraversal = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:5000/lasttraversal",
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addTraversal = async (payload) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/lifttraversal",
      data: payload,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllTraversals = async (id) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:5000/lifttraversals/${id}`,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
