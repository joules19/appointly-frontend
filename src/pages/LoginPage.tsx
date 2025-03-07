import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const { Title } = Typography;

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState<'login' | 'register'>('login'); // Track mode (login or register)

    // Handle login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                username,
                password,
            });

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', response.data.role);

            window.location.reload();
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    // Handle registration
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/users/register', {
                username,
                password,
            });

            // Show success toast
            toast.success(
                <div>
                    Registration successful! Please log in.
                </div>,
                { position: "top-right", autoClose: 5000, closeButton: true, hideProgressBar: false }
            );
            setMode('login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
                <div className="mb-4">
                    <span style={{ color: '#282828', fontSize: '34px', fontWeight: "500" }}>Appointly<span className=''></span></span>
                    <span className="rounded-circle bg-primary d-inline-block" style={{ width: '10px', height: '10px' }}></span>
                </div>

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

                        <Button type="primary" htmlType="submit" className="w-100">
                            {mode === 'login' ? 'Login' : 'Register'}
                        </Button>

                        <div className="mt-3 text-center">
                            <span
                                style={{ cursor: 'pointer', color: '#1890ff' }}
                                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            >
                                {mode === 'login' ? 'Create an account' : 'Already have an account? Login'}
                            </span>
                        </div>
                    </form>
                </Card>
            </div>

            {/* ToastContainer should be included at the root level to render toasts */}
            <ToastContainer />
        </>
    );
};

export default LoginPage;
