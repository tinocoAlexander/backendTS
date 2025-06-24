import { Form, Input, Button, Checkbox, Card } from 'antd';

function LoginForm() {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Login values:', values);
    };

    return (
        <Card
            title="Iniciar Sesión"
            style={{ background: '#fff', margin: '32px auto', maxWidth: 400 }}
            bodyStyle={{ padding: 32 }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Correo electrónico"
                    name="email"
                    rules={[
                        { required: true, message: 'Por favor ingresa tu correo electrónico' },
                        { type: 'email', message: 'El correo no es válido' }
                    ]}
                >
                    <Input placeholder="Correo electrónico" />
                </Form.Item>

                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                >
                    <Input.Password placeholder="Contraseña" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Recordarme</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Ingresar
                    </Button>
                </Form.Item>

                <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
                    <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default LoginForm;
