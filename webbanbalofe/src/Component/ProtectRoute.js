import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ element: Component, isAdmin, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user?.role;

    if (isAdmin && role !== 1) {
        // Nếu trang yêu cầu quyền admin và người dùng không phải admin, điều hướng về trang chủ
        return <Navigate to="/" />;
    }

    return <Component {...rest} />;
};

export default ProtectRoute;
