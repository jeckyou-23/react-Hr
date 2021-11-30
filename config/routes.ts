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
    path: '/',
    name: 'home',
    icon:'SmileTwoTone',
    component: './Index'
  },
  {
    path: '/userlist',
    name: 'userlist',
    icon: 'TeamOutlined',
    component: './UserList'
  },
  {
    path: '/goodslist',
    name: 'goodslist',
    icon: 'ShoppingOutlined',
    component: './GoodsList'
  },
  {
    path: '/carousel',
    name: 'carousel',
    icon: 'PictureOutlined',
    component: './Carousel'
  },
  {
    component: './404',
  },
];
