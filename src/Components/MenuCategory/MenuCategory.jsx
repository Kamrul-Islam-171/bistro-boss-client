import React from 'react';
import MenuDesing from '../MenuDesign/MenuDesing';
import Cover from '../Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ item, title, img }) => {
    return (
        <div>
            {
                title && <Cover img={img} title={title} para={'Would you like to try a dish?'}></Cover>
            }
            <div className="grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 gap-10">
                {
                    item.map(item => <MenuDesing key={item._id} item={item}></MenuDesing>)
                }
            </div>
            <Link to={`/order/${title}`}><button className="btn btn-outline  border-0 border-b-4">Order Now</button></Link>
        </div>
    );
};

export default MenuCategory;