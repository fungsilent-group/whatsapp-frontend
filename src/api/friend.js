import axiosBackend from "#root/utils/axios";

export const addFriend = async ({ username }) => {
  try {
    return await axiosBackend.post("/friend/add", {
      username,
    });
  } catch (err) {
    console.log(err);
  }
};

export const chatlist = async () => {
  try {
    const res = await axiosBackend.get("/friend/list");
    if (res.ok) {
      console.log(res.data);
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const searchUser = async (username) => {
  console.log(username);
  return await axiosBackend.get(`/friend/search/${username}`);
};
