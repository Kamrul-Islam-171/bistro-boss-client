import React, { useState } from 'react';
import Cover from '../Cover/Cover';
import img from '../../../public/assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../Hooks/useMenu';
import FoodCard from '../FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';

const Order = () => {
    const [menu] = useMenu();
    const {category} = useParams();
    const categories = ['salad','pizza', 'soup', 'dessert'];
    const currentIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(currentIndex);
    // console.log(tabIndex)
    // const todayOffer = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    return (
        <div>
            <Cover img={img} title={'OUR SHOP'} para={'Would you like to try a dish?'}></Cover>

            <Tabs  defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUPS</Tab>
                    <Tab>DESSERTS</Tab>
                   
                </TabList>

                <TabPanel>
                    <OrderTab item={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab item={dessert}></OrderTab>
                </TabPanel>
               
            </Tabs>
        </div>
    );
};

export default Order;