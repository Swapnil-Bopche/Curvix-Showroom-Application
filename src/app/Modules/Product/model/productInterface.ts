export interface IProduct {
  date?: Date
  _id: string
  name: string
  tag: ITag
  brand: IBrand
  price: number
  discount: number
  stock?: number
}

export interface IProductPayload {
  date?: Date
  name: string
  tag: string
  brand: string
  price: number
  discount: number
  stock?: number
}

export interface ITag {
  _id: string
  name: string


}

export interface IBrand {
  _id: string
  name: string

}

// deleteProduct(product: IProduct) {

//   const confirmed = confirm(
//     `Delete ${product.name}?`
//   );

//   if (!confirmed) return;

//   this.productService
//     .deleteProductById(product._id)
//     .subscribe({
    
//       next: () => {

//         this.messageService.add({
//           severity: 'success',
//           summary: 'Deleted',
//           detail: 'Product removed successfully'
//         });

//         // refresh table
//         this.productServer();
//       },

//       error: (err) => {
//         console.error(err);

//         this.messageService.add({
//           severity: 'error',
//           summary: 'Error',
//           detail: 'Delete failed'
//         });
//       }

//     });
// }