import "@/plugins";

// Register Global components, filters or any self created local modues here

import Vue from "vue";

import dateFilter from "@/filter/date";

const toCapitalised = (word) => {
  if (!word) return;

  try {
    const capitlisedWord = word[0].toUpperCase() + word.slice(1);

    return capitlisedWord;
  } catch (err) {
    console.log(err.message);
  }
};

Vue.filter("date", dateFilter);
Vue.filter("toCapitalised", toCapitalised);
