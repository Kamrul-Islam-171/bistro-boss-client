import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";


const AllUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        }
    })

    const handleDelete = async (user) => {
        const { data } = await axiosSecure.delete(`/users/${user._id}`);
        console.log(data);
        refetch();
    }

    const handleAdminUser = async (user) => {
        const { data } = await axiosSecure.patch(`/users/admin/${user._id}`);
        console.log(data);
        refetch();
    }
    return (
        <div>
            <div className="flex justify-between my-10 px-10">
                <div className="text-3xl">All Users</div>
                <div className="text-3xl">Total Users - {users.length}</div>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users.map((user, idx) => <tr key={user._id}>
                                    <th>{idx + 1}</th>
                                    <td>{user?.email}</td>
                                    <td>
                                        {
                                            user?.role === 'admin' ? 'admin' : <button onClick={() => handleAdminUser(user)} className="btn bg-orange-400 btn-ghost "><FaUsers className="text-3xl text-white"></FaUsers></button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className="btn btn-primary btn-xs">delete</button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUser;