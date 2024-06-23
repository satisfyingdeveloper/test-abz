const routes = [
  {
    path: '/',
    redirect: '/users',
  },
  {
    path: '/users',
    component: () => import('../pages/MyUsers.vue'),
  },
  {
    path: '/form',
    component: () => import('../pages/CreateUserForm.vue'),
  },
]

export default routes
