import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditarGenero = ({match}) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = event => {
        setName(event.target.value)
    }

    useEffect(()=> {
        axios.get(`/api/genres/${match.params.id}`)
        .then(resp => {
            setName(resp.data.name)
        })

    },[match.params.id])

    const save = () => {
        axios.put(`/api/genres/${match.params.id}`, {
            name
        }).then(resp => {
            setSuccess(true)
        })
    }

    if(success){
        return <Redirect to='/generos' />
    }

    return(
        <div className='container'>
            <h1> Update Genero </h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Email address</label>
                    <input type='text' value={name} onChange={onChange} 
                        className='form-control' id='name'  placeholder='Enter email' />
                </div>

                <button type='button' className='btn btn-primary' onClick={save}>Salvar</button>
            </form>
        </div>
    )
}

export default EditarGenero