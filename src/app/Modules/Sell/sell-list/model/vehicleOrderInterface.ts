export interface IVehicleOrder {
  _id?: string
  customerId: ICustomerId
  productId: IProductId
  employeeId: IEmployeeId
  accessories: string[]
  discount: number
  additionalDiscount: number
  totalPayable: number
  isDeleted?: boolean
  __v?: number
}

export interface ICustomerId {
  _id: string
  name: string
  visitingDate: string
  address: string
  mobile: string
  email: string
  assignedEmployee: string
  selectedProduct: string
  tentativeDate: string
  remark: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IProductId {
  _id: string
  name: string
  tag: string
  brand: string
  price: number
  discount: number
  stock: number
  isDeleted: boolean
  createdAt: string
  __v: number
}

export interface IEmployeeId {
  _id: string
  name: string
  joinningDate: string
  address: string
  post: string
  __v: number
}
