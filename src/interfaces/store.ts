export interface IMeta {
  currentPage: number
  total: number
  perPage: number
  path: number
  totalPage: number
}

export interface IAuth {
  id: number
  name: string
  username: string
  email: string
  email_verified_at: string
  role: string
  created_at: string
  updated_at: string
}

export interface IUser {
  id: number
  code: string
  username: string
  name: string
  email: string
  phone: string
  photo: string
  role: string
}

export interface IMasterSupplier {
  id: number
  code: string
  name: string
  phone: string
  address: string
  status: string
}

export interface IMasterSetting {
  id: number
  nama_aplikasi: string
  alamat: string
  no_telp: string
  website: string
  logo: any
}

export interface IMasterPelanggan {
  id: number
  code: string
  name: string
  phone: string
  address: string
  gender: string
  dob: Date
  status: string
}

export interface IMasterCategory {
  id: number
  name: string
}

export interface IMasterProduct {
  id: number
  category_id: number
  code: string
  name: string
  stock_pack: number
  satuan_pack: string
  per_pack: number
  harga_pack: number
  harga_ecer: number
  jumlah_ecer: number
  satuan_ecer: string
  harga_beli: number
  description: string
  date: string
  photo: string
  created_at: string
  updated_at: string
  deleted_at: null
  _harga_pack: string
  _harga_ecer: string
  _harga_beli: string
  category: IMasterCategory
}

export interface ITransactionDetail {
  id: number
  product_id: number
  price: number
  satuan: string
  quantity: number
  total_price: number
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  product?: IMasterProduct
}

export interface ITransaction {
  id: number
  kasir_id: number
  customer_id: number
  invoice: string
  date: string
  total_price: number
  total_pay: number
  total_return: number
  created_at: Date
  updated_at: Date
  deleted_at: null | Date
  _date: string
  items?: ITransactionDetail[]
  kasir?: IUser
  pelanggan?: IMasterPelanggan
}
