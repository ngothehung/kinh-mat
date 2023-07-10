import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../interfaces/Product';


const ProductPage = (props) => {
    // ...

    return (
        <div className="max-w-5xl mx-auto">
            <div className='grid md:grid-cols-3 gap-16 '>
                {props.products.map((item: IProduct) => {
                    return (
                        <div>
                            <Link to={`/products/${item.id}`}>
                                <div className="py-4" key={item.id}>
                                    <Link to={`/products/${item.id}`}>
                                        <img src={item.image} alt="" className="max-w-auto" />
                                    </Link>

                                    <div className="justify-between flex py-2">
                                        <div className="text-red-500 font-medium">{item.name}</div>
                                        <div className="">color</div>
                                    </div>
                                    <div className="">
                                        <div className="">{item.price}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ProductPage;
