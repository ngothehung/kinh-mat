import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IProduct } from '../../interfaces/Product';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';
interface IProps {
  onAdd: (product: IProduct) => void;
}

const AddProductPage = (props: IProps) => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const onFinish = (values: any) => {
    props.onAdd(values);
    setIsSuccess(true);
    message.success('Product added successfully!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {isSuccess && (
        <div style={{ margin: '1rem 0' }}>
          <Alert message="Product added successfully!" type="success" showIcon />
        </div>
      )}

     

        <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: 900, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image' }]}

                >

                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product categoryId"
                    name="categoryId"
                    rules={[{ required: true, message: 'Please input your categoryId' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" style={{ backgroundColor: 'blue' }} htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
    </div>
  );
};

export default AddProductPage;
