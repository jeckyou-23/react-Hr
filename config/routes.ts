export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: './UserList'
  },
  {
    path: '/goodslist',
    name: 'goodslist',
    component: './GoodsList'
  },
  {
    component: './404',
  },
];
