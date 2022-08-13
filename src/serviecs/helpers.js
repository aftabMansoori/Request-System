const successHelper = async (response) => response.data;

const errorHelper = async (err) => {
  console.log(err.response.data.message);
};

export { successHelper, errorHelper };
