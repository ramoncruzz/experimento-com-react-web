import React, {useState, useEffect} from 'react';
import 'materialize-css';
import "./App.css"
import { TextInput} from 'react-materialize';
import calcula from './regras';
import Barra from './components/Barra';

const formatNumber = (number) =>Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(number);

function App() {
  const [salario, setSalario] = useState(0);
  const [ dados , setDados] = useState({
    baseINSS: 0,
    descontoINSS: 0,
    baseIRPF: 0,
    descontoIRPF:0,
    liquido: 0,
});
  useEffect(()=>{
   setDados(calcula(salario));
  },[salario]);
  return (
    <div id="main" >
     <span id="titulo">React Salário</span>
      <div id="painel">
        <TextInput id="ip-salario-bruto" label="Salário Bruto" type="number" onChange={(event)=>setSalario( parseFloat(String(event.target.value)))}  />
        <div id="base-calculos">
          <TextInput class disabled label="Base INSS" defaultValue="R$ 1.000,00" value={formatNumber(salario)} />
          <br/>
          <TextInput disabled label="Desconto INSS" value={`${formatNumber(dados.descontoINSS)} (${dados.percentINSS}%)`} />
          <br/>
          <TextInput disabled label="Base IRPF" value={formatNumber(dados.baseIRPF)} />
          <br/>
          <TextInput disabled label="Desconto IRPF"  value={`${formatNumber(dados.descontoIRPF)} (${dados.percentIRPF}%)`} />
          <br/>
          <TextInput disabled label="Salario líquido" value={`${formatNumber(dados.liquido)} (${dados.percentSalarioLiquido}%)`} />
          <br/>
        </div>
        <Barra percentualINSS={dados.percentINSS} percentualIRPF={dados.percentIRPF}/>
      </div>

    </div>
  );
}

export default App;
