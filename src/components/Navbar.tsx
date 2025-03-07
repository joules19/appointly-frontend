import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <Header className="navbar-custom">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                        <Link to="/" className="navbar-brand text-white fs-4 fw-bold">
                            <span style={{ color: '#ffffff' }}>Appointly<span className=''></span></span>
                            <span className="rounded-circle bg-primary d-inline-block" style={{ width: '10px', height: '10px' }}></span>
                        </Link>
                    </div>

                    <div className="d-flex align-items-center">
                        <Button
                            onClick={handleLogout}
                            className="bg-danger text-white"
                            icon={<LogoutOutlined />}
                            type="primary"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </Header>
    );
};

export default Navbar;
