import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Auth/AuthLayout.vue";

// Auth pages
import Login from "@/pages/Auth/Login.vue";
import Register from "@/pages/Auth/Register.vue";
import Lock from "@/pages/Auth/Lock.vue";
import Pricing from "@/pages/Auth/Pricing.vue";

// Admin-------------
import AdminLeftDock from '@/pages/Admin/LeftDock.vue'
import AdminUsers from "@/pages/Admin/users";
import AdminFields from "@/pages/Admin/fields";
import AdminGroups from "@/pages/Admin/groups";
import AdminTags from "@/pages/Admin/tags";

// User------------------------
// import Dashboard from '@/pages/User/dash'
import Tasks from '@/pages/User/tasks'
import Leads from '@/pages/User/leads'

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    // {
    //   path: "/pricing",
    //   name: "Pricing",
    //   component: Pricing
    // },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/lock",
      name: "Lock",
      component: Lock
    }
  ]
};
let adminPages = {
  path: "/admin",
  component: DashboardLayout,
  redirect: '/admin/dock',
  name: "AdminPages",
  children: [
    {
      path: 'dock',
      component: AdminLeftDock,
      redirect: '/admin/dock/users',
      name: 'AdminLeftDock',
      children: [
        {
          path: 'users',
          component: AdminUsers,
          name: 'AdminUsers'
        },
        {
          path: 'fields',
          component: AdminFields,
          name: 'AdminFields'
        },
        {
          path: 'groups',
          component: AdminGroups,
          name: 'AdminGroups'
        },
        {
          path: 'tags',
          component: AdminTags,
          name: 'AdminTags'
        },
      ]
    },
  ]
};
let userPages = {
  path: "/user",
  component: DashboardLayout,
  redirect: "/user/leads",
  name: "UserPages",
  children: [
    {
      path: 'leads',
      component: Leads,
      name: 'leads'
    },
    {
      path: 'tasks',
      component: Tasks,
      name: 'Tasks'
    },
  ]
}
///////////////////////////////////////////////////////////////////////////////////

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  authPages,
  adminPages,
  userPages,
  // {
  //    pth: '/',
  //    component:Page404, 
  //    name: 'Page404' 
  // }
];

export default routes;
