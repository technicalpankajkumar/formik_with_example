import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import { object, string } from 'yup'

import TextError from './TextError'

export default function FormikComponentForm() {

    const initialValues = {
        name: '',
        email: '',
        channel: '',
        comment:'',
        address:'', 
        customComp:'',
        social:{
            facebook:'',
            twitter:'',
            instagram:''
        },
        contact:[' ',' '],
        skills:['']
    }

    const onSubmit = (values,isSubmittingProp) => {
        console.log("submit form data => ", values)
        console.log("submit props",isSubmittingProp)

        isSubmittingProp.resetForm()

        // isSubmittingProp.setSubmitting(false)   //is use to submit form again to again
    }
    const validationSchema = object({
        name: string().required("Mandatory"),
        email: string().email("Email not valid ").required("Mandatory"),
        channel: string().url().required(),
        address: string().max(255).min(10).required(),
        customComp: string().min(10).required("Required"),
        comment: string().required() 
    })

    const customComp=({field,form})=>{
        // console.log("custom component ",form)
        return(
            <div>
                <input type="text" {...field} id="customcomp" className='form-control'/>
                {form.touched.customComp && form.errors.customComp ? <div>{form.errors.customComp}</div> : null}
            </div>
        )
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-sm-4 '>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    // validateOnChange={false}
                    // validateOnBlur={false} 
                    >
                    {
                        (formik)=>{
                            console.log(formik)
                            return (
                                <Form>
                                    <div>
                                        <label htmlFor='name'>Name</label>
                                        <Field type="text" id="name" name="name" className="form-control" />
                                        <div className='text-danger'>
                                            <ErrorMessage name='name' />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor='email'>Email</label>
                                        <Field type="text" id="email" name="email" className="form-control" />
                                        <div className='text-danger'>
                                            <ErrorMessage name='email' />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor='channel'>channel</label>
                                        <Field type="text" id="channel" name="channel" className="form-control" />
                                            <ErrorMessage name='channel' component={TextError} />                           
                                    </div>

                                    <div>
                                        <label htmlFor="comment">Comment</label>
                                        {/* <Field component="textarea" id="comment" name="comment" className="form-control"/> // is not correct way */}
                                        <Field as='textarea' id="comment" name="comment" className="form-control"/>
                                            <ErrorMessage name='comment'>
                                                {
                                                    (error)=> <div className='text-primary'>{error}</div>
                                                }
                                            </ErrorMessage>
                                    </div>                       

                                    <div>
                                        <label htmlFor='color'>Select Color</label>
                                        <Field as="select" name="color" className="form-control my-1">
                                            <option value="red">Red</option>
                                            <option value="green">Green</option>
                                            <option value="blue">Blue</option>
                                        </Field>
                                    </div>

                                    <div>
                                        <label htmlFor='address'>Address</label>
                                        <FastField name="address" >
                                            {
                                                ({field,form,meta})=>
                                                {
                                                    console.log("render address")
                                                return (
                                                        <div>
                                                            <input type="text" {...field} disabled={form.isSubmitting} id="address" className="form-control"/>
                                                            {meta.touched && meta.error && <div className='text-danger'>{meta.error}</div>}
                                                        </div>
                                                        )
                                                }
                                            }
                                        </FastField>
                                    </div>
                                    <div>
                                        <label htmlFor="customcomp">Custom Component</label>
                                        <Field name="customComp" component={customComp}/>
                                    </div>

                                    <div>
                                        <label htmlFor="facebook">Facebook</label>
                                        <Field type="text" id="facebook" name="social.facebook" className="form-control"/>
                                    </div>
                                    <div>
                                        <label htmlFor="twitter">Twitter</label>
                                        <Field type="text" id="twitter" name="social.twitter"  className="form-control"/>
                                    </div>
                                    <div>
                                        <label htmlFor='instagram'>Instgram</label>
                                        <Field type="text" id="instgram" name="social.instagram" className="form-control"/>
                                    </div>

                                    <div>
                                        <label htmlFor='primaryMobile'>Primary Mobile</label>
                                        <Field type="text" id="primaryMobile" name="contact[0]" className="form-control"/>
                                    </div>
                                    <div>
                                        <label htmlFor='secondaryMobile'>Secondary Mobile</label>
                                        <Field type="text" id="secondaryMobile" name="contact[1]" className="form-control"/>
                                    </div>

                                    <div>
                                        <label htmlFor='skills'>Skills</label>
                                        <FieldArray name='skills'>
                                            {
                                                (arrayFieldProps)=>{
                                                    // console.log(arrayFieldProps)

                                                    const {form,push,remove}=arrayFieldProps
                                                    const {values}=form
                                                    const {skills}=values

                                                    console.log("FieldArraySkills ",skills)

                                                    return <div>
                                                        {
                                                            skills.map((skill,index)=>{
                                                                return <div key={index}>
                                                                    <Field name={`skills[${index}]`} className="form-control" />
                                                                    {
                                                                    index > 0 && <button type='button' onClick={()=>remove('index')} className="btn btn-sm btn-danger">-</button>
                                                                    }
                                                                    <button type='button' onClick={()=>push('')} className="btn btn-sm btn-success">+</button>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                }
                                            }
                                        </FieldArray>
                                    </div>
                                    {/* <button type='submit' className="form-control bg-primary text-white fw-bold mt-2">Submit</button> */}
                                    <button type='submit' disabled={!formik.isValid || formik.isSubmitting} className={`form-control bg-${!formik.isValid ? 'danger' : 'primary'} text-white fw-bold mt-2`}>Submit</button>
                                </Form>
                            )
                        }
                    }
                </Formik>
            </div>
        </div>
    )
}