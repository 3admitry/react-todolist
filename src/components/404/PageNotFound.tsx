import React from 'react';
import {NavLink} from 'react-router-dom';
import {Button} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

export const PageNotFound = () => {
    return (
        <div>
            <h1>404: PAGE NOT FOUND</h1>
            <Button variant="outlined" startIcon={<ArrowBack />}>
                <NavLink style={{textDecoration:'none',color:'inherit'}} to={'/'}>Return to main page</NavLink>
            </Button>
        </div>
    );
};
