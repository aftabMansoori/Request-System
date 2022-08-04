function dateFilter(isoDateString) {
  if (!isoDateString) return;

  let formattedDate;

  try {
    const options = {
      //   weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const d = new Date(isoDateString);
    formattedDate = d.toLocaleDateString(undefined, options);
  } catch (error) {
    console.log(error.message);
  }

  return formattedDate;
}

export default dateFilter;
