import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import img1 from '../../../public/assets/home/slide1.jpg'
import img2 from '../../../public/assets/home/slide2.jpg'
import img3 from '../../../public/assets/home/slide3.jpg'
import img4 from '../../../public/assets/home/slide4.jpg'
import img5 from '../../../public/assets/home/slide5.jpg'


// import required modules
import { Pagination } from 'swiper/modules';
import SectionHeading from '../SectionHeading/SectionHeading';

const Category = () => {
    return (
        <div>
            <SectionHeading heading={'---From 11:00am to 10:00pm---'} subHeading={'ORDER ONLINE'}></SectionHeading>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={img1} alt="" />
                    <h3 className='text-3xl text-center -translate-y-12 text-white'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} alt="" />
                    <h3 className='text-3xl text-center -translate-y-12 text-white'>Pizza</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} alt="" />
                    <h3 className='text-3xl text-center -translate-y-12 text-white'>Soup</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} alt="" />
                    <h3 className='text-3xl text-center -translate-y-12 text-white'>Cake</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img5} alt="" />
                    <h3 className='text-3xl text-center -translate-y-12 text-white'>Salads</h3>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Category;