import React from 'react';
import { useParams } from 'react-router-dom';


const ProductDetailPage = (props) => {
    const { id } = useParams(); // Lấy id sản phẩm từ URL
    const { products } = props; // Danh sách sản phẩm

    // Kiểm tra nếu danh sách sản phẩm rỗng hoặc không tồn tại
    if (!products || products.length === 0) {
        return <div>Đang tải sản phẩm...</div>;
    }

    // Tìm sản phẩm trong danh sách sản phẩm dựa trên id
    const product = products.find((item) => item.id === parseInt(id));

    if (!product) {
        return <div>Sản phẩm không tồn tại</div>;
    }

    return (
        <div className='product-container'>
            <div className='wrapper'>
                <img src={product.image} alt="" />
            </div>
            <div className='info-wrapper'>
                <h1>{product.name}</h1>
                <p className='price'>Giá: {product.price}</p>
                <p>{product.description}</p>
                <div className='info-color'>color

                </div>
                <div className=''>
                    <button className='w-full leading-5 bg-[#f3f3f3] p-2 mt-10 text-[12px] hover:bg-[#c5c5c5]'>ADD TO CART</button>
                    <button className='w-full leading-5 bg-[#f3f3f3] p-2 mt-3 text-[12px] hover:bg-[#c5c5c5]'>TÌM CỬA HÀNG GẦN NHẤT</button>
                </div>

                {/* ... */}
            </div>
        </div>
    );
};

export default ProductDetailPage;
