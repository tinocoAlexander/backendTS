import { Form, Input, Select, Button, Card } from 'antd';

const { Option } = Select;

function UserForm() {
    const [form] = Form.useForm();

    // Simulación de roles, normalmente los traerías de la API
    const roles = [
        { _id: '1', name: 'Admin' },
        { _id: '2', name: 'User' }
    ];

    const onFinish = (values: any) => {
        console.log('Form values:', values);
    };

    return (
        <Card
            title="User Profile"
            style={{ background: '#fff', margin: '32px auto', maxWidth: 800 }}
            bodyStyle={{ padding: 32 }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontWeight: 600 }}>Profile</h2>
                    <p style={{ color: '#888' }}>
                        This information will be displayed publicly so be careful what you share.
                    </p>
                    <Form.Item
                        label="Name"
                        name="nombre"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input the phone!' }]}
                    >
                        <Input placeholder="Phone" />
                    </Form.Item>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontWeight: 600 }}>Account Information</h2>
                    <p style={{ color: '#888' }}>
                        Use a permanent address where you can receive mail.
                    </p>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input the email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input the password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        label="Roles"
                        name="roles"
                        rules={[{ required: true, message: 'Please select at least one role!' }]}
                    >
                        <Select mode="multiple" placeholder="Select roles">
                            {roles.map(role => (
                                <Option key={role._id} value={role._id}>{role.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                    <Button type="default" htmlType="button">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </div>
            </Form>
        </Card>
    );
}

export default UserForm;