<template>
  <section>
    <div class="header">
      <h1 class="text-primary mb-none">Dashboard</h1>
      <small class="text-secondary">View your activity and stats here</small>
    </div>

    <div>
      <div class="stats">
        <article>
          <h5 class="text-secondary">Number of Leaves Requested</h5>
          <p>27</p>
        </article>
        <article>
          <h5 class="text-secondary">Number of Videos Requested</h5>
          <p>32</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AdminDashboard",
};
</script>

<style scoped>
section {
  padding: 1em 3em;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  margin-top: 3em;
}

.stats > article {
  width: 250px;
  height: 80px;
  margin-inline-end: 2em;
  padding: 1em 2em;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.stats > article:nth-child(1) p {
  color: rgb(245, 108, 108);
  font-size: 3em;
  font-weight: 600;
}
.stats > article:nth-child(2) p {
  color: rgb(230, 162, 60);
  font-weight: 600;
  font-size: 3em;
}

@media (max-width: 768px) {
  section {
    padding: 1em;
    overflow: auto;
  }
  .header {
    text-align: center;
    margin-bottom: 2em;
  }

  .stats > article {
    width: 100%;
    margin: 1em 0.5em;
  }
}
</style>
