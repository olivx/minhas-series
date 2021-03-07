import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'

const Generos = () => {
    const [data, setData] = useState([])
    useEffect(()=> {
        axios.get('/api/genres')
            .then(res => {
                setData(res.data.data)
            })
    },[])

    const deleteGenero = id => {
        axios.delete(`/api/genres/${id}`)
            .then(resp => {
            const filtro = data.filter(item => item.id !== id)
            setData(filtro)
            })
    }

    const rows = records => {
        return(
            <tr key={records.id}>
                <th scope="row">{records.id}</th>
                <td>{records.name}</td>
                <td>
                    <Link className="btn btn-warning" to={`/genero/${records.id}`}> Editar  </Link>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={()=> deleteGenero(records.id)}> 
                        Deletar  
                    </button>
                </td>
            </tr>
        )
    }

    if(data.length === 0){
        return(
            <div className="container">
                <h1> Generos </h1>
                <div className="alert alert-warning" role="alert">
                    Nenhum registro foi encontrado
                </div>
            </div>
        )
    }

    return(
        <div className="container">
            <h1> Generos </h1>
            <Link className="btn btn-primary mb-2" to='/genero/novo'> Novo Genero </Link>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(rows)}
                </tbody>
            </table>
        </div>
    )
}
export default Generos