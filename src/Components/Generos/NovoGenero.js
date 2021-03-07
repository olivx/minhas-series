import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovoGenero = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = event => {
        setName(event.target.value)
    }

    const save = () => {
        axios.post('/api/genres', {
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
            <h1> Novo Genero </h1>
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

export default NovoGenero