import React from 'react';

const MenuDesing = ({item}) => {
    const {_id, name, recipe, image, category, price} = item;
    return (
        <div>
            <div className='flex gap-2 mb-12'>
                <img style={{borderRadius:'0 200px 200px 200px'}} className='w-[120px]' src={image} alt="" />
                <div className=''>
                    <h1>{name}------------</h1>
                    <p>{recipe}</p>
                </div>
                <p className='text-yellow-400'>$ {price}</p>
            </div>
        </div>
    );
};

export default MenuDesing;

