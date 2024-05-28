import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useForm } from "react-hook-form"
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const imbb_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`
import useAxiosSecure from './../../Hooks/useAxiosSecure';

const AddItems = () => {

   const axiosPublic = useAxiosPublic();
   const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async(data) => {
        console.log(data);

        const imgFile = {image : data.image[0]};

        const res = await axiosPublic.post(imbb_url, imgFile, {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        })

        if(res.data.success) {
            const menuItem = {
                name : data.name,
                category : data.category,
                price : parseFloat(data.price),
                recipe : data.recipe,
                image: res.data.data.display_url
            }
            // console.log(menuItem);

            const itemMenu = await axiosSecure.post('/menu', menuItem);
            reset();
            console.log(itemMenu.data);
        }

        console.log(res.data);
    }



    return (
        <div>
            <SectionHeading heading={'Whats new!'} subHeading={'ADD AN ITEM'}></SectionHeading>
            <div className='p-10'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input {...register("name")} type="text"
                            placeholder="Recipe Name"
                            className="input input-bordered w-full" />

                    </label>

                    <div className='flex gap-6'>
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select {...register("category")}
                                className="select select-bordered w-full">
                                <option disabled selected>Select A Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                            </select>

                        </label>

                        {/* price */}

                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input {...register("price")} type="number"
                                placeholder="Recipe Price"
                                className="input input-bordered w-full" />

                        </label>

                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>

                        </div>
                        <textarea {...register("recipe")} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </label>

                    <div className='my-6'>
                        <input {...register("image")} type="file" className="file-input w-full max-w-xs" />
                    </div>



                    <button className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;