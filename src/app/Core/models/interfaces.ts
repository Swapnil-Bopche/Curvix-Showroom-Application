export interface IProductListResponse {
  message: string,
  page: number,
  limit: number,
  totalRecords: number,
  totalPages: number,
  data: IProduct[]
}

export interface IApiResponse<T> {
  message: string,
  data: T
}

export interface ICustomer {
  _id: string
  name: string
  visitingDate: string
  address: string
  mobile: string
  email: string
  assignedEmployee: IEmployee
  selectedProduct: IProduct
  tentativeDate: string
  remark: string
}
export interface ICustomer {
  _id: string
  name: string
  visitingDate: string
  address: string
  mobile: string
  email: string
  assignedEmployee: IEmployee
  selectedProduct: IProduct
  tentativeDate: string
  remark: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IAccessories {
  _id: string
  name: string
  price: number
  __v: number
}


export interface IEmployee {
  _id: string
  name: string
  joinningDate: string
  address: string
  post: IPost

}

export interface IFollowUp {
  _id: string
  customer: ICustomer
  followup_Type: IFollowupType
  followup_Date: string
  remark: string
  createdAt: string
  __v: number
}

export interface IFollowUpPayload {
  customer: string        //only ID
  followup_Type: string  //only ID
  followup_Date: string
  remark: string
  createdAt: string

}


export interface IEmployee {
  _id: string
  name: string
  joinningDate: string
  address: string
  post: IPost
  __v: number
}

export interface IPost {
  _id: string
  name: string
  __v: number
}

export interface IProduct {
  _id: string
  name: string
  tag: ITag
  brand: IBrand
  price: number
  discount: number
  stock: number
  isDeleted: boolean
  createdAt: string
  __v: number
}

export interface ITag {
  _id: string
  name: string
  createdAt: string
  __v: number
}

export interface IBrand {
  _id: string
  name: string
  createdAt: string
  __v: number
}

export interface IFollowupType {
  _id: string
  name: string
  __v: number
}

export interface ISell {
  _id: string
  customer: ICustomer
  accessories: IAccessories[]
  totalDiscount: number
  totalAmount: number
  sellingDate: string
  __v: number
}

export interface ICustomer {
  _id: string
  name: string
  visitingDate: string
  address: string
  mobile: string
  email: string
  assignedEmployee: IEmployee
  selectedProduct: IProduct
  tentativeDate: string
  remark: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IEmployee {
  _id: string
  name: string
  joinningDate: string
  address: string
  post: IPost
  __v: number
}

export interface IPost {
  _id: string
  name: string
  __v: number
}

export interface IProduct {
  _id: string
  name: string
  tag: ITag
  brand: IBrand
  price: number
  discount: number
  stock: number
  isDeleted: boolean
  createdAt: string
  __v: number
}

export interface ITag {
  _id: string
  name: string
  createdAt: string
  __v: number
}

export interface IBrand {
  _id: string
  name: string
  createdAt: string
  __v: number
}




export interface IPost {
  _id: string
  name: string

}

export interface IProduct {
  _id: string
  name: string
  tag: ITag
  brand: IBrand
  price: number
  discount: number
  stock: number
  isDeleted: boolean
  createdAt: string

}

export interface ITag {
  _id: string
  name: string
  createdAt: string

}

export interface IBrand {
  _id: string
  name: string
  createdAt: string

}


export interface IEmployee {
  _id: string
  name: string
  joinningDate: string
  address: string
  post: IPost

}

export interface IEmployeePayload {
  name: string
  joinningDate: string
  address: string
  post: string

}

export interface IPost {
  _id: string
  name: string

}