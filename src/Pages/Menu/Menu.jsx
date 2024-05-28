import { Helmet } from "react-helmet-async";
import Cover from "../../Components/Cover/Cover";

import coverImg from '../../../public/assets/menu/banner3.jpg';
import PopularMenue from "../../Components/PopularMenu/PopularMenue";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import useMenu from "../../Hooks/useMenu";
import MenuCategory from "../../Components/MenuCategory/MenuCategory";
import dessrtImg from '../../../public/assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../public/assets/menu/pizza-bg.jpg'
import saladImg from '../../../public/assets/menu/salad-bg.jpg'
import soupImg from '../../../public/assets/menu/soup-bg.jpg'

const Menu = () => {
    const [menu] = useMenu();
    const todayOffer = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            {/* <img src={coverImg} alt="" /> */}
            <Cover img={coverImg} title={'OUR MENU'} para={'Would you like to try a dish?'}></Cover>

            <SectionHeading heading={"---Don't miss---"} subHeading={"TODAY'S OFFER"}></SectionHeading>
            <MenuCategory item={todayOffer}></MenuCategory>
            <MenuCategory item={dessert} title='dessert' img={dessrtImg}></MenuCategory>
            <MenuCategory item={pizza} title='pizza' img={pizzaImg}></MenuCategory>
            <MenuCategory item={salad} title='salad' img={saladImg}></MenuCategory>
            <MenuCategory item={soup} title='soup' img={soupImg}></MenuCategory>

        </div>
    );
};

export default Menu;