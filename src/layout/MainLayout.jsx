import React from 'react';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Home />
        </div>
    );
};

export default MainLayout;
