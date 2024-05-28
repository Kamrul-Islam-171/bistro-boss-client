import SectionHeading from "../SectionHeading/SectionHeading";

import img from '../../../public/assets/home/featured.jpg';
import './featured.css'

const Featured = () => {
    return (
        <div className="featured-item text-white  bg-fixed mt-10 mb-10">
            <div className="bg-black bg-opacity-40 py-20">
                <SectionHeading heading={'---Check it out---'} subHeading={'FROM OUR MENU'}></SectionHeading>
                <div className="grid grid-cols-2 gap-16 items-center px-36 ">
                    <div><img src={img} alt="" /></div>
                    <div className="space-y-2">
                        <h3>March 20, 2023</h3>
                        <h2>WHERE CAN I GET SOME?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <button className="btn btn-outline text-white border-0 border-b-4">READ MORE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;