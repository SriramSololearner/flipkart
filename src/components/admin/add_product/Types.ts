export interface IState {
    addProduct: {
        productId: number,
        productName: string,
        desc: string,
        price: number,
        weight: string,
        quantity: number,
        date: string,
        category: string,
        categoryId: number,
        productImage: string[],
    },
    url: string
}