import React from 'react'
import FormikComponentForm from './components/FormikComponentForm'
import NewYoutubeForm from './components/NewYoutubeForm'
import YoutubeForm from './components/YoutubeForm'

export default function App(){
    return(
        <React.Fragment>
            <div className='container-fluid pt-4'>
                {/* <YoutubeForm/> */}
                {/* <NewYoutubeForm/> */}
                <FormikComponentForm/>
            </div>
        </React.Fragment>
    )
}