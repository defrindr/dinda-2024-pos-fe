import AdminLayout from '../layouts/AdminLayout.vue'

import DashboardList from '@views/Admin/Main/Dashboard/DashboardList.vue'

import CategoryForm from '@views/Admin/Master/Category/FormPage.vue'
import CategoryList from '@views/Admin/Master/Category/ListPage.vue'

import PelangganForm from '@views/Admin/Master/Pelanggan/FormPage.vue'
import PelangganList from '@views/Admin/Master/Pelanggan/ListPage.vue'

import SupplierForm from '@views/Admin/Master/Supplier/FormPage.vue'
import SupplierList from '@views/Admin/Master/Supplier/ListPage.vue'

import UserForm from '@views/Admin/Master/User/FormPage.vue'
import UserList from '@views/Admin/Master/User/ListPage.vue'

import SettingForm from '@views/Admin/Master/Setting/FormPage.vue'

import ProductForm from '@views/Admin/Master/Product/FormPage.vue'
import ProductList from '@views/Admin/Master/Product/ListPage.vue'

import TransactionForm from '@views/Admin/Main/Transaction/FormPage.vue'
import TransactionList from '@views/Admin/Main/Transaction/ListPage.vue'

import ReportTransaction from '@views/Admin/Main/Report/ListPage.vue'

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

const SupplierRoutes = [
  {
    path: 'master/supplier',
    component: SupplierList
  },
  {
    path: 'master/supplier/create',
    component: SupplierForm
  },
  {
    path: 'master/supplier/update/:id',
    component: SupplierForm
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
    path: 'main/report',
    component: ReportTransaction
  },
  {
    path: 'main/transaction/create',
    component: TransactionForm
  }
]

export const AdminRoutes = {
  path: '/admin',
  component: AdminLayout,
  redirect: () => {
    return { path: '/admin/home' }
  },
  children: [
    {
      path: 'home',
      component: DashboardList
    },
    {
      path: '/admin/master/setting',
      component: SettingForm
    },
    ...SupplierRoutes,
    ...ProductRoutes,
    ...PelangganRoutes,
    ...CategoryRoutes,
    ...UserRoutes,
    ...TransactionRoutes
  ]
}
