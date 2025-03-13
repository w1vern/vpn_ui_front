export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useMyUserStore();
  await callOnce("store_init", store.fetchData);

  if (store.userData !== null && to.path === "/login") {
    return navigateTo("/");
  }
  if (store.userData === null && to.path !== "/login") {
    return navigateTo("/login");
  }
});
