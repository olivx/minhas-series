import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import {Badge} from 'reactstrap'

const InfoSerie = ({match}) => {

    const [success, setSuccess] = useState(false)
    const [genres, setGenres] = useState([])
    const [mode, setMode] = useState('INFO')
    const [form, setForm] =  useState({
        name: ''
    })
    const [state, setState] = useState({
        name: "",
        status: "",
    })


    useEffect(() => {
        axios.get(`/api/series/${match.params.id}`)
            .then(resp => {
                setForm(resp.data)
                setState(resp.data)
            })
    },[match.params.id])

    useEffect(() => {
        axios.get('/api/genres')
        .then(resp => { 
            setGenres(resp.data.data)
        })
    },[state])


    const masterHeader = {
        'height': '50vh',
        'minHeight': '500px',
        'backgroundImage': `url('${state.background}')`,
        'backgroundSize': 'cover',
        'backgroundPosition': 'center',
        'backgroundRepeat': 'no-repeat'
    }

    const onChange = field => event => {
        setForm({
            ...form, 
            [field]: event.target.value
        })
    }
    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios.put(`/api/series/${match.params.id}`, {
            ...form
        }).then(resp => {
            console.log(resp.data)
            setSuccess(true)
        })
    }

    if(success){
        return <Redirect to='/series' />
    }

    return(
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0,0,0,0.7'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img src={state.poster} className='img-fluid img-thumbnail' alt={state.name}/>
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'> {state.name} </h1>
                                <div className='lead text-white'>
                                    <Badge color={state.status === 'PARA_ASSISTIR' ?  'warning':  'success'}> {state.status} </Badge>
                                    <br />
                                    Genero: {state.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <button onClick={() => setMode('EDIT')} className='btn btn-primary'> Editar </button>
            {
                mode === 'EDIT' &&
            <div className="container">
            <h1> Edite Series</h1>
            <button onClick={() => setMode('INFO')}  className='btn btn-primary'> Cancelar Edição </button>
            <form>
                <div className='form-group'>
                    <div className="mt-5 mb-4">
                        <label htmlFor='name'>Nome</label>
                        <input type='text' value={form.name} name="name" onChange={onChange('name')} 
                            className='form-control' id='name'  placeholder='Nome da Serie' />
                    </div> 

                    <div className="mb-4">
                        <label htmlFor='name'>Comments</label>
                        <input type='text' value={form.comments} name="comments" onChange={onChange('comments')} 
                            className='form-control' id='comments'  placeholder='Status da Series' />
                   </div>

                    <div className="mb-4">
                        <div className='form-check'>
                            <input className='form-check-input' checked={form.status === 'ASSISTIDO'}  type='radio' name='status' id='assistido' value='ASSISTIDO' onChange={seleciona('ASSISTIDO')}  />
                            <label className='form-check-label' htmlFor='assistido'>
                                Assistido
                            </label>
                        </div>

                        <div className='form-check'>
                            <input className='form-check-input' checked={form.status === 'PARA_ASSISTIR'} type='radio' name='status' id='pararAssistir' value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')} />
                            <label className='form-check-label' htmlFor='pararAssistir'>
                                Parar asssitir
                            </label>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor='genre'>Genero</label>
                        <select defaultValue={form.genre_id} id='genre' name='genre' className='form-control' onChange={onChange('genre_id')}>
                            {
                                genres.map(genre =>
                                     <option key={genre.id} value={genre.id}>{genre.name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>

                <div className="mt-5">
                    <button type='button' className='btn btn-primary' onClick={save}>Salvar</button>
                </div>
            </form>
        </div>
        }
                
    </div> 
    )
}

export default InfoSerie