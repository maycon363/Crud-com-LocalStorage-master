import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {  Spinner, Container, Col, Row, Card } from 'react-bootstrap'
import ManutencaoService from '../../services/academico/ManutencaoService'
import { Chip } from '@mui/material'
import { Link } from 'react-router-dom'
import {AiOutlineRollback} from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import swal from 'sweetalert';


const ManutencaoLista = () => {

  const [manutencao, seManutencao] = useState([])

  useEffect(() => {

    seManutencao(ManutencaoService.getAll())

  }, [])

  function apagar(id) {
    if(swal("Deletado com Sucesso!!!", "Registro apagado", "success", {dangerMode: true,
    })){
      ManutencaoService.delete(id)
      seManutencao(ManutencaoService.getAll())
    }
  }
    
  return (
    <div>
        <div className="text-center">
          <h1>Total De Navios em Manutenção</h1>
        </div>
    {manutencao.length === 0 && <h1><Spinner animation="border" variant="success" />Carregando... </h1>}

    <Container>
      <div className="text-center">
        <Link className='btn btn-success butao' to={'/construcao/create'}><AiOutlinePlus /> Inserir</Link>
      </div>
      <Row>
          {
            manutencao.map((item, i)=> (
              <Col key={i} md={4} className='ml-4 g-2 letra '  >
                <Card className='mb-2 cards' border="danger">
                  <Card.Body>
                    <Card.Title><strong>{item.nome}</strong></Card.Title>
                  </Card.Body>
                  <Card.Body>
                  <Card.Text><strong>Classe do Navio: </strong>{item.classe}</Card.Text>
                  <Card.Text><strong>Data de entrega: </strong> {item.data}</Card.Text>
                  <Card.Text><strong>Situação do Navio: </strong>  
                      {item.situacao ===  "A" && <Spinner animation="border" variant="success" />}
                      {item.situacao ===  "I" && <Spinner animation="border" variant="danger" />}
                      {item.situacao ===  "N" && <Spinner animation="border" variant="warning" />}
                      </Card.Text>   
                  </Card.Body>
                </Card>
                  <div className='mb-3 iconess'>
                  <Link to={'/comandantes/' + i}>
                    <Chip
                      label="Editar"
                      color="info"
                    />
                  </Link>
                  
                  {' '}
                    
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
      <div className='text-center'>
        <Link to={-1} className='btn btn-danger'><AiOutlineRollback/> Voltar</Link>
      </div>
    </Container>
  </div>
    );
};

export default ManutencaoLista