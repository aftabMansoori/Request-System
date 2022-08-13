const successHanlder = async (response) => response.data;

const errorHandler = async () => {
  // this.$toast()
};

export { successHanlder, errorHandler };
