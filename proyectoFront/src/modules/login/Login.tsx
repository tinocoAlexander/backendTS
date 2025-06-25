import { Form, Input, Button, Checkbox, Card } from 'antd';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [form] = Form.useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handlerSubmit = async (values: any) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Error en la autenticación');
            }

            const data = await response.json();
            login(data.accessToken);
            navigate('/')
            form.resetFields();
        } catch (error) {
            console.error(error);
        }
    };

    const onFinish = handlerSubmit;

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
                    name="username"
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
                    <Button type="primary" htmlType="submit" block onClick={handlerSubmit}>
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
