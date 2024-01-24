import AdminLayout from '../layouts/AdminLayout.vue'

import DashboardList from '@/views/Admin/Main/Dashboard/DashboardList.vue'

import StorageForm from '@/views/Admin/Master/Storage/StorageForm.vue'
import StorageList from '@/views/Admin/Master/Storage/StorageList.vue'

import CategoryForm from '@/views/Admin/Master/Category/CategoryForm.vue'
import CategoryList from '@/views/Admin/Master/Category/CategoryList.vue'

import MemberForm from '@/views/Admin/Master/Member/MemberForm.vue'
import MemberList from '@/views/Admin/Master/Member/MemberList.vue'

import ProductForm from '@/views/Admin/Master/Product/ProductForm.vue'
import ProductList from '@/views/Admin/Master/Product/ProductList.vue'

import UserForm from '@/views/Admin/Master/User/UserForm.vue'
import UserList from '@/views/Admin/Master/User/UserList.vue'

import TransactionForm from '@/views/Admin/main/transaction/TransactionForm.vue'
import TransactionList from '@/views/Admin/main/transaction/TransactionList.vue'

const StorageRoutes = [
  {
    path: 'master/storage',
    component: StorageList
  },
  {
    path: 'master/storage/create',
    component: StorageForm
  },
  {
    path: 'master/storage/update/:id',
    component: StorageForm
  }
]

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

const MemberRoutes = [
  {
    path: 'master/member',
    component: MemberList
  },
  {
    path: 'master/member/create',
    component: MemberForm
  },
  {
    path: 'master/member/update/:id',
    component: MemberForm
  }
]

const ProductRoutes = [
  {
    path: 'master/product',
    component: ProductList
  },
  {
    path: 'master/product/create',
    component: ProductForm
  },
  {
    path: 'master/product/update/:id',
    component: ProductForm
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

const TransactionRoutes = [
  {
    path: 'main/transaction',
    component: TransactionList
  },
  {
    path: 'main/transaction/create',
    component: TransactionForm
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
    ...StorageRoutes,
    ...CategoryRoutes,
    ...MemberRoutes,
    ...ProductRoutes,
    ...UserRoutes,
    ...TransactionRoutes
  ]
}
