import AdminLayout from '../layouts/AdminLayout.vue'

import DashboardList from '@/views/Admin/Main/Dashboard/DashboardList.vue'

import CategoryForm from '@/views/Admin/Master/Category/CategoryForm.vue'
import CategoryList from '@/views/Admin/Master/Category/CategoryList.vue'

import PelangganForm from '@/views/Admin/Master/Pelanggan/Form.vue'
import PelangganList from '@/views/Admin/Master/Pelanggan/List.vue'

import UserForm from '@/views/Admin/Master/User/UserForm.vue'
import UserList from '@/views/Admin/Master/User/UserList.vue'

const CategoryRoutes = [
  {
    path: 'master/category',
    component: CategoryList
  },
  {
    path: 'master/category/create',
    component: CategoryForm
  },
  {
    path: 'master/category/update/:id',
    component: CategoryForm
  }
]

const PelangganRoutes = [
  {
    path: 'master/pelanggan',
    component: PelangganList
  },
  {
    path: 'master/pelanggan/create',
    component: PelangganForm
  },
  {
    path: 'master/pelanggan/update/:id',
    component: PelangganForm
  }
]

const UserRoutes = [
  {
    path: 'master/user',
    component: UserList
  },
  {
    path: 'master/user/create',
    component: UserForm
  },
  {
    path: 'master/user/update/:id',
    component: UserForm
  }
]

export const AdminRoutes = {
  path: '/admin',
  component: AdminLayout,
  redirect: (to: any) => {
    return { path: '/admin/home' }
  },
  children: [
    {
      path: 'home',
      component: DashboardList
    },
    ...PelangganRoutes,
    ...CategoryRoutes,
    ...UserRoutes
  ]
}
