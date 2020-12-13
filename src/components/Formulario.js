import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';


/* STYLED COMPONENTS */
const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;
  transition: background-color .3s ease;
  &:hover {
    background-color: #326AC0;
    cursor:pointer;
  }
`;

/* Componente */
const Formulario = () => {

  // State del listado de criptomonedas
  const [listaCripto, guardarListaCripto] = useState([]);

  // Arreglo de monedas disponibles
  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dólar de Estados Unidos' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' }
  ]
  
  // Utilizar useMoneda
  const [moneda, SelectMonedas] = useMoneda(
    'Elige tu moneda',
    '',
    MONEDAS
  );

  // utilizar useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    'Elige tu Criptomoneda',
    '',
    listaCripto
  );

  // Consultar criptomonedas cuando termine de cargar el componente
  useEffect(() => {
    // Función para consultar la API
    const consultarAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);

      guardarListaCripto(resultado.data.Data);
    }
    consultarAPI();
  }, []);

  return ( 
    <form>
      <SelectMonedas />

      <SelectCripto />

      <Boton
        type="submit"
        value="Calcular"
      />
    </form>
  );
}

export default Formulario;