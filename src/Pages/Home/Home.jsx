import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Category from '../../Components/Catogory/Category';
import PopularMenue from '../../Components/PopularMenu/PopularMenue';
import Featured from '../../Components/Featured/Featured';
import Testimonials from '../../Components/Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';
import Paginate from '../../Components/Paginate/Paginate';


const Home = () => {
    
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Slider></Slider>

            <Category></Category>

            <PopularMenue></PopularMenue>
            <Featured></Featured>
            <Testimonials></Testimonials>
            {/* <Paginate itemsPerPage={4}></Paginate> */}
        </div>

    );
};

export default Home;