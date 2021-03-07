import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'


const Series = () => {
    const [data, setdata] = useState([])

    useEffect(()=> {
        axios.get('/api/series')
            .then(resp => {
                setdata(resp.data.data)
            })
    },[])

    const deleteSeries = id => {
        axios.delete(`/api/series/${id}`)
            .then(resp => { 
                const filtro = data.filter(item => item.id !== id)
                setdata(filtro)
            })
    }


    const rows = records => {
        return(
            <tr key={records.id}>
                <th scope="row">{records.id}</th>
                <td>{records.name}</td>
                <td>{records.genre}</td>
                <td>{records.status}</td>
                <td className="text-center">
                    <Link className="btn btn-warning" to={`/series/${records.id}`}> Info  </Link>
                </td>
                <td className="text-center">
                    <button className="btn btn-danger" onClick={()=> deleteSeries(records.id)}> 
                        Deletar  
                    </button>
                </td>
            </tr>
        )
    }

    if(data.length === 0){
        return(
            <div className="container">
                <h1> Series </h1>
                <div className="alert alert-warning" role="alert">
                    Nenhum registro foi encontrado
                </div>
            </div>
        )
    }

    return(
        <div className="container">
            <h1> Series </h1>
            <Link className="btn btn-primary mb-2" to='/series/novo'> Novo Genero </Link>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Genero</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center">INfo</th>
                    <th scope="col" className="text-center">Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(rows)}
                </tbody>
            </table>
        </div>
    )
}

export default Series

