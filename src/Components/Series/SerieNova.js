import axios from 'axios'
import React, { useState} from 'react'
import { Redirect } from 'react-router-dom'

const SerieNova = () => {

    const [success, setSuccess] = useState(false)
    const [state, setState] = useState({
        name: "",
        status: "",
        genre: ""
    })

    const onChange = event => {
        var value = event.target.value
        if(event.target.name === 'status'){
            value = value.toUpperCase()
        }        
        setState({
            ...state, 
            [event.target.name]: value
        })
    }

    const save = () => {
        console.log({...state})
        axios.post('/api/series', {...state})
            .then(resp => {
                setSuccess(true)
            })
    }

    if(success){
        return <Redirect to='/series' />
    }

    return (
        <div className="container">
            <h1> Nova Series</h1>
             <form>
                <div className='form-group'>
                    <div className="mt-5 mb-4">
                        <label htmlFor='name'>Nome</label>
                        <input type='text' value={state.name} name="name" onChange={onChange} 
                            className='form-control' id='name'  placeholder='Nome da Serie' />
                    </div> 
                </div>

                <div className="mt-5">
                    <button type='button' className='btn btn-primary' onClick={save}>Salvar</button>
                </div>
            </form>
        </div>
    )
}
export default SerieNova