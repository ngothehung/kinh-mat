import { Space, Table, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../interfaces/Product';
import { Link } from 'react-router-dom';

interface DataType {
    key?: string | number;
    _id?: number;
    name?: string;
    price?: number;
}   
interface IProps {
    products: IProduct[];
    onRemove: (id: number) => void;

}

const ProductManagementPage = (props: IProps) => {
    const removeProduct = (id: number) => {
        props.onRemove(id);
        console.log(id);
    };

    const confirmRemoveProduct = (id: number, name: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            content: `Deleting "${name}" will remove it from the list.`,
            okType: 'danger',
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: () => removeProduct(id),
        });
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Product Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt="Product Image" style={{ maxWidth: '150px' }} />,
        },
        {
            title: 'Product description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button
                        danger
                        onClick={() => confirmRemoveProduct(record.id, record.name)}
                    >
                        Remove
                    </Button>
                    <Button type="primary" style={{ backgroundColor: 'blue' }}>
                        <Link to={`/admin/products/${record.id}/update`}>Update</Link>
                    </Button>
                </Space>
            ),
        },
    ];

    const data: DataType[] = props.products.map((item: IProduct) => {
        return {
            key: item.id,
            ...item,
        };
    });


    return (
        <div>
            
            <Button type="primary" htmlType="submit">
                <Link to={'/admin/products/add'}>Add New Product</Link>
            </Button>
            <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default ProductManagementPage;
