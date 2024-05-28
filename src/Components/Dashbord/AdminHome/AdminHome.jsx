import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../Provider/AuthProvider';

const AdminHome = () => {

    const axiosPublic = useAxiosPublic();
    const {user, loading} = useContext(AuthContext)
    

    const {data, isPending} = useQuery({
        queryKey:['admin-stats'],
        // enabled: !loading && !!user?.email,
        queryFn: async() => {
            const {data} = await axiosPublic('/admin-stats');
            return data; 
        }
    })
    if(isPending) {
        return <p>Loading....</p>
    }
    console.log('data=', data)
    return (
        <div>
            This is admin Home
            <p>{data.users}</p>
        </div>
    );
};

export default AdminHome;