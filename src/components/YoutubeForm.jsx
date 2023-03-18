import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
export default function YoutubeForm(){

    const validate= values =>{
        //values.name values.email values.channel
        //errors.name errors.email errors.channel
        //errors.name:"This field is required"
        //errors.email:"this field is mindatory"

        let errors={}

        if(!values.name){
            errors.name="This field is Required !!"
        }
        
        if(!values.email){
            errors.email="This field is Required !!"
        }
        else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)){
            errors.email="Invailid email format"
        }

        if(!values.channel){
            errors.channel="This field is mindatory !!"
        }

        return errors;
    }

    const validationSchema=Yup.object({
        name: Yup.string().required("mandatory"),
        email: Yup.string().email("Invalid email type ").required("mandatory"),
        channel : Yup.string().required("mandatory")
    })

    const formik=useFormik({
        initialValues:{
            name:'Pankaj',
            email:'',
            channel:''
        },
        onSubmit: values =>{
            console.log("form data : ",values)
        },
        // validate,
        validationSchema
    })

    // console.log("form data : ", formik.values)
    // console.log("form errors", formik.errors)
    console.log('Visited field : ',formik.touched)

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
                    value={formik.values.name} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    className="form-control"/> 
                    {formik.touched.name && formik.errors.name ? <span className='text-danger'>{formik.errors.name}</span>:null}
                    <br/>

                    <label htmlFor='email'>Email ID</label>
                    <input 
                    type='text' 
                    id="email" 
                    name='email' 
                    value={formik.values.email} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    className="form-control"/>
                    {formik.touched.email && formik.errors.email ? <span className='text-danger'>{formik.errors.email}</span>:null}
                    <br/>
                    
                    <label htmlFor='channel'>Channel</label>
                    <input  
                    type='text' 
                    id="channel" 
                    name='channel' 
                    value={formik.values.channel} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    className="form-control"/>
                    {formik.touched.channel && formik.errors.channel ? <span className='text-danger'>{formik.errors.channel}</span>:null}
                    <br/>
                    
                    <input type="submit" value="Submit" className='btn btn-sm btn-success mt-2'/>
                </form>
            </div>
        </div>
    )
}