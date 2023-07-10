import instance from "./instance";
import { IProduct } from "../interfaces/Product";


const getAllProduct = () => {
    return instance.get('/products');
}
const getOneProduct = (id: number) => {
    return instance.get('/products/' + id);
}
const addProduct = (product: IProduct) => {
    return instance.post('/products', product);
}
const updateProduct = (product: IProduct) => {
    console.log(product);
    
    return instance.patch('/products/' + product.id, product);
}
const deleteProduct = (id: number) => {
    return instance.delete('/products/' + id);
}

export { getAllProduct, getOneProduct, addProduct, updateProduct, deleteProduct }