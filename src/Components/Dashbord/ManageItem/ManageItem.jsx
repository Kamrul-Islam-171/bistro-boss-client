import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../SectionHeading/SectionHeading";
import axios from "axios";
import useMenu from "../../../Hooks/useMenu";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";


const ManageItem = () => {

    // const [menu] = useMenu();
    // console.log(menu)
    const { user, loading } = useContext(AuthContext);
    // console.log(user)

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['MenuItems', ],
       
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/menu');
            console.log(data)
            return data
        }
    })
    // console.log(data)
    return (
        <div>
            <SectionHeading heading={'Hurry Up'} subHeading={'Manage Item'}></SectionHeading>

            <div className="px-5">
                <div className="overflow-x-auto">
                    <table className="table ">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>image</th>
                                <th>Recipe</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                data?.map((item, idx) => <tr key={item._id}>
                                    <th>
                                        <label>
                                           {idx + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            {/* <div>
                                                <div className="font-bold">Hart Hagerty</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div> */}
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                        <br />
                                        {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                    </td>
                                    <td>${item.price}</td>
                                    <th>
                                        <Link to={`/dashbord/update/${item._id}`}><button className="btn btn-primary">Update</button></Link>
                                    </th>
                                    <th>
                                        <button className="btn btn-primary">Delete</button>
                                    </th>
                                </tr>)
                            }


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;