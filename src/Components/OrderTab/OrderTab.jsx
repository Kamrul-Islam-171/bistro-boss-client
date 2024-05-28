import React from 'react';
import FoodCard from '../FoodCard/FoodCard';

const OrderTab = ({item}) => {
    return (
        <div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
                {
                    item.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default OrderTab;