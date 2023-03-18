import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
export default function NewYoutubeForm(){

    const initialValues={
        name:'Pankaj',
        email:'',
        channel:''
    }
    const onSubmit= values =>{
        console.log("form data : ",values)
    }
    const validationSchema=Yup.object({
        name: Yup.string().required("mandatory"),
        email: Yup.string().email("Invalid email type ").required("mandatory"),
        channel : Yup.string().required("mandatory")
    })

    const formik=useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    // console.log("form data : ", formik.values)
    // console.log("form errors", formik.errors)
    // console.log('Visited field : ',formik.touched)

    return (
        <div className='row justify-content-center'>
            <div className='col-sm-4'>
                <h2 className='text-center'>Youtube From</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input 
                    type='text' 
                    id="name" 
                    name='name' 
                    {... formik.getFieldProps('name')}
                    className="form-control"/> 
                    {formik.touched.name && formik.errors.name ? <span className='text-danger'>{formik.errors.name}</span>:null}
                    <br/>

                    <label htmlFor='email'>Email ID</label>
                    <input 
                    type='text' 
                    id="email" 
                    name='email' 
                    {... formik.getFieldProps('email')}
                    className="form-control"/>
                    {formik.touched.email && formik.errors.email ? <span className='text-danger'>{formik.errors.email}</span>:null}
                    <br/>
                    
                    <label htmlFor='channel'>Channel</label>
                    <input  
                    type='text' 
                    id="channel" 
                    name='channel' 
                    {... formik.getFieldProps('channel')}
                    className="form-control"/>
                    {formik.touched.channel && formik.errors.channel ? <span className='text-danger'>{formik.errors.channel}</span>:null}
                    <br/>
                    
                    <input type="submit" value="Submit" className='btn btn-sm btn-success mt-2'/>
                </form>
            </div>
        </div>
    )
}