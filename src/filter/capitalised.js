const toCapitalised = (word) => {
  if (!word) return;

  try {
    const capitlisedWord = word[0].toUpperCase() + word.slice(1);

    return capitlisedWord;
  } catch (err) {
    console.log(err.message);
  }
};

export default toCapitalised;
