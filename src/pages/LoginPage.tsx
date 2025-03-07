import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Card, Typography, Modal } from 'antd';
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // Track button loading state

    useEffect(() => {
        setIsModalVisible(true);
    }, []);

    // Handle login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('https://appointly-backend-ntox.onrender.com/auth/login', {
                username,
                password,
            });

            toast.success('Login successful!', {
                position: "top-right",
                autoClose: 5000,
                closeButton: true,
                hideProgressBar: false
            });

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', response.data.role);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle registration
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post('https://appointly-backend-ntox.onrender.com/users/register', {
                username,
                password,
            });

            toast.success('Registration successful! Please log in.', {
                position: "top-right",
                autoClose: 5000,
                closeButton: true,
                hideProgressBar: false
            });

            setMode('login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Reset URL Modal */}
            <Modal
                title={<span><ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} /> Notice</span>}
                open={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                centered
            >
                <Text>⚠️ Please reset the address in the URL bar before proceeding or remove the login after the slash. The provider used for this hosting has allowed limited configurations so there are some inappropriate behaviours.</Text>
            </Modal>

            <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
                {/* App Name */}
                <div className="mb-4">
                    <span style={{ color: '#282828', fontSize: '34px', fontWeight: "500" }}>Appointly</span>
                    <span className="rounded-circle bg-primary d-inline-block" style={{ width: '10px', height: '10px' }}></span>
                </div>

                {/* Login/Register Form */}
                <Card
                    title={<Title level={3} className="text-center">{mode === 'login' ? 'Login' : 'Register'}</Title>}
                    className="p-4 shadow-lg"
                    style={{ width: '400px', borderRadius: '10px' }}
                >
                    {error && <p className="text-danger text-center">{error}</p>}

                    <form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
                        <div className="mb-3">
                            <Input
                                prefix={<UserOutlined />}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="mb-3"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="mb-3"
                                required
                            />
                        </div>

                        <Button type="primary" htmlType="submit" className="w-100" loading={isLoading}>
                            {mode === 'login' ? 'Login' : 'Register'}
                        </Button>

                        <div className="mt-3 text-center">
                            <span
                                style={{ cursor: 'pointer', color: '#1890ff' }}
                                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            >
                                {mode === 'login' ? 'Register account to book an appointment' : 'Already have an account? Login'}
                            </span>
                        </div>
                    </form>
                </Card>

                {/* Demo Credentials */}
                <Card className="mt-4 p-3 shadow-sm" style={{ width: '400px', borderRadius: '10px' }}>
                    <Title level={4} className="text-center">🔑 Demo Credentials</Title>

                    <div className="mb-2">
                        <Text strong>👨‍💼 Admin</Text>
                        <Card size="small" className="mt-1">
                            <Text><UserOutlined /> <strong>Username:</strong> admin</Text><br />
                            <Text><LockOutlined /> <strong>Password:</strong> admin123</Text>
                        </Card>
                    </div>

                    <div className="mt-3">
                        <Text strong>👤 Regular User</Text>
                        <Card size="small" className="mt-1">
                            <Text><UserOutlined /> <strong>Username:</strong> jonny</Text><br />
                            <Text><LockOutlined /> <strong>Password:</strong> password123</Text>
                        </Card>
                    </div>
                </Card>
            </div>

            {/* Toast Container for Notifications */}
            <ToastContainer />
        </>
    );
};

export default LoginPage;
