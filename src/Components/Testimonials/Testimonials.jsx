import { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'



// import required modules
import { Pagination, Navigation } from 'swiper/modules';


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('/reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [])
    return (
        <div className="my-28">
            <SectionHeading heading={'---What Our Clients Say---'} subHeading={'TESTIMONIALS'}></SectionHeading>
            <div className="px-40">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper" loop={true}>

                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className="px-24 flex flex-col items-center space-y-4">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p>{review.details}</p>
                                <p className="text-3xl text-orange-400">{review.name}</p>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;