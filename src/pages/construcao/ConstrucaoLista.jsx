import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Spinner, Container, Row, Col, Card  } from 'react-bootstrap'
import { Chip } from '@mui/material'
import {AiOutlineRollback} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { AiOutlinePlus } from 'react-icons/ai'
import CategoriaService from '../../services/academico/ConstrucaoService';


const ConstrucaoLista = () => {

  const [construcao, setConstrucao] = useState([])

  useEffect(() => {

    setConstrucao(CategoriaService.getAll())

  }, [])

  function apagar(id) {
    if(swal("Deletado com Sucesso!!!", "Registro apagado", "success", {dangerMode: true,})){
      CategoriaService.delete(id)
      setConstrucao(CategoriaService.getAll())
    }
  }
    
  return (
    <div>
        <div className="text-center">
          <h1>Total De Navios em Construção</h1>
        </div>
    {construcao.length === 0 && <h1><Spinner animation="border" variant="success" />Carregando... </h1>}

    <Container>
    <   div className="text-center">
          <Link className='btn btn-success mb-2 butao' to={'/construcao/create'}><AiOutlinePlus /> Inserir</Link>
        </div>
      <Row>
        {
          construcao.map((item, i)=> (
            <Col key={i} md={4} className='ml-4 g-2 '  >
              <Card className='mb-2 cards letra' border="danger">
                <Card.Body>
                  <Card.Title><strong>{item.nome}</strong></Card.Title>
                </Card.Body>
                <Card.Body >
                 <Card.Text><strong>Classe do Navio: </strong>{item.classe}</Card.Text>
                 <Card.Text><strong>Data de entrega: </strong> {item.data}</Card.Text>  
                </Card.Body>
              </Card>
              <div className='mb-3 iconess'>
                <Link to={'/comandantes/' + i}>
                    <Chip
                      label="Editar"
                      color="info"
                    />
                </Link>{' '}
                            
              <Chip
                  color="error"
                  label="Deletar"
                  onClick={() => apagar(i)}
                  />
               </div>
            </Col>
          ))
        }
      </Row>
      <div className='text-center mb-3'>
            <Link to={-1} className='btn btn-danger'><AiOutlineRollback/> Voltar</Link>
        </div>
    </Container>
  </div>
    );
};

export default ConstrucaoLista