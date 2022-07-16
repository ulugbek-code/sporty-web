<template>
  <div id="not-found-box">
    <h2>Ой, эта страница пропала.</h2>
    <h1>404</h1>
    <router-link to="/">на главную страницу</router-link>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
#not-found-box {
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
}
h2 {
  color: #016bd4;
}
h1 {
  font-size: 14rem;
  color: #016bd4;
}
a {
  text-decoration: none;
  color: #016bd4;
  transition: 0.2s ease;
}
a:hover {
  color: rgba(1, 106, 212, 0.8);
}
</style>
