import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { IProduct } from './interfaces/Product'
import { getAllProduct, addProduct, deleteProduct, updateProduct } from './api/product'
import ProductPage from './pages/Product'
import AdminLayout from './pages/Layout/AdminLayout'
import AddProductPage from './pages/Admin/AddProductPage'
import ProductManagementPage from './pages/Admin/ProductManamentPage'
import UpdateProductPage from './pages/Admin/UpdateProduct'
import WebsiteLayout from './pages/Layout/WebsibteLayout'
import ProductDetailPage from './components/ProductDetailPage'
import Signin from './pages/signin'
import Signup from './pages/signup'
import HomePage from './pages/HomePage'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data))
  }, [])
  const onHandleAdd = (product: IProduct) => {
    addProduct(product).then(() => getAllProduct().then(({ data }) => setProducts(data)))
  }
  const onHandleRemove = (id: number) => {
    deleteProduct(id).then(() => setProducts(products.filter((item: IProduct) => item.id !== id)))
  }
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() => getAllProduct().then(({ data }) => setProducts(data)))
  }
  return (
    <div className='App'>

      <Routes>

        <Route path='/' element={<WebsiteLayout />}>
        <Route path='' element={<HomePage />} />
          <Route path='products' element={<ProductPage products={products} />} />
          <Route path='productdetail' element={<ProductDetailPage products={products} />} />
          <Route path="products/:id" element={<ProductDetailPage products={products} />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
        
          <Route path='products' element={<ProductManagementPage products={products} onRemove={onHandleRemove} />} />
          <Route path='products/add' element={<AddProductPage onAdd={onHandleAdd} />} />

          <Route path='products/:id/update' element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} />} />
        </Route>
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />

      </Routes>
    </div>
  )
}

export default App
