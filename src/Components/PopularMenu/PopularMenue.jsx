import { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import MenuDesing from "../MenuDesign/MenuDesing";
import useMenu from "../../Hooks/useMenu";


const PopularMenue = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    // const [menu, setMenu] = useState([]);
    // useEffect(() => {
    //     fetch('/PopularMenue.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popular = data.filter(item => item.category === 'popular');
    //         setMenu(popular)
    //     })
    // }, [])
    return (
        <div>
            <div>
                <SectionHeading heading={'---Check it out---'} subHeading={'FROM OUR MENU'}></SectionHeading>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 gap-10">
                {
                    popular.map(item => <MenuDesing key={item._id} item={item}></MenuDesing>)
                }
            </div>
            <button className="btn btn-outline  border-0 border-b-4">SHOW MORE</button>

        </div>
    );
};

export default PopularMenue;