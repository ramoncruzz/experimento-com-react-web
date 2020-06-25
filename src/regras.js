
const _faixasINSS =[
    {
        numero: 1,
        minimo: 0,
        maximo: 1045,
        aliquota: 0.075,
        vlrAliquota: 78.38
    },
    {
        numero: 2,
        minimo: 1045,
        maximo: 2089.60,
        aliquota: 0.09,
        vlrAliquota: 94.01
    },
    {
        numero: 3,
        minimo: 2089.60,
        maximo: 3134.40,
        aliquota: 0.12,
        vlrAliquota: 125.37 
    },
    {
        numero: 4,
        minimo: 3134.40,
        maximo: 6101.06,
        aliquota: 0.14,
        vlrAliquota: 415.34 
    },
];

const _faixasIRPF =[
    {
        numero: 1,
        minimo: 0,
        maximo: 1903.99,
        aliquota: 0,
        deducao: 0
    },
    {
        numero: 2,
        minimo: 1903.99,
        maximo: 2826.65,
        aliquota: 0.075,
        deducao: 142.80
    },
    {
        numero: 3,
        minimo: 2826.66,
        maximo: 3751.05,
        aliquota: 0.15,
        deducao: 354.80 
    },
    {
        numero: 4,
        minimo: 3751.06,
        maximo: 4664.68,
        aliquota: 0.225,
        deducao: 636.13 
    },
    {
        numero: 5,
        minimo:  4664.69,
        maximo: 0,
        aliquota: 0.275,
        deducao: 869.36 
    },
];


const calculaINSS =(salario, faixasINSS) =>{
    if(!salario) return 0;
    let valorINSS = 0;
  
   const faixaPiso = faixasINSS[0];
   const faixaTeto = faixasINSS[faixasINSS.length - 1];

   if( salario>= faixaTeto.maximo){
       valorINSS = faixasINSS.reduce((soma,faixaCalculo)=> soma + faixaCalculo.vlrAliquota, 0);
       return parseFloat(valorINSS).toFixed(2);
   }
   if(salario <= faixaPiso.maximo){
        valorINSS = salario * faixaPiso.aliquota;
        return parseFloat(valorINSS).toFixed(2);
   }
   const [faixa]= faixasINSS.filter( item=>{
        const { minimo, maximo } = item;
        return(salario>minimo && salario<=maximo);
    });
    if(faixa.numero ===1 ){
        return faixa.vlrAliquota;
    }
    const faixasCopia = [...faixasINSS];
    const faixasInferiores = faixasCopia.splice(0, faixa.numero-1);
    const somaFaixasInferiores = faixasInferiores.reduce((soma,item)=> soma+ item.vlrAliquota, 0);
    valorINSS = somaFaixasInferiores + ( salario-faixa.minimo ) * faixa.aliquota;
    return parseFloat(valorINSS).toFixed(2);
}

const calculaIRPF = ( salario, faixasIRPF, faixasINSS ) =>{
    if(!salario) return 0;
    const descontoINSS = calculaINSS(salario,faixasINSS);
    const salarioBase = salario - descontoINSS;
    let valorIRPF = 0;
    const faixaTeto = faixasIRPF[faixasIRPF.length - 1];
    if( salarioBase > faixaTeto.minimo ){
        valorIRPF = salarioBase * faixaTeto.aliquota - faixaTeto.deducao; 
        return parseFloat(valorIRPF).toFixed(2);
    }
    const faixa = faixasIRPF.find(item => {
        const { minimo, maximo } = item; 
        return (salarioBase>(minimo-0.01) && salarioBase <= maximo);

    });

    if(faixa.numero ===1){
        valorIRPF = 0;
        return valorIRPF;
    }
    valorIRPF = salarioBase * faixa.aliquota - faixa.deducao;
    return parseFloat(valorIRPF).toFixed(2);

}

const calcula =(salario)=>{
    if(salario){
        const descontoINSS = calculaINSS(salario,_faixasINSS);
        const descontoIRPF = calculaIRPF(salario,_faixasIRPF,_faixasINSS);
        const salarioLiquido = salario - descontoINSS - descontoIRPF;
         return{
             baseINSS: salario,
             descontoINSS,
             percentINSS: parseFloat((descontoINSS / salario)*100).toFixed(2),
             baseIRPF: parseFloat(salario - descontoINSS).toFixed(2),
             percentIRPF: parseFloat((descontoIRPF / salario)*100).toFixed(2),
             descontoIRPF,
             liquido: parseFloat(salarioLiquido).toFixed(2),
             percentSalarioLiquido: parseFloat((salarioLiquido/salario)*100).toFixed(2)
         }
    }
    return{
        baseINSS: 0,
        descontoINSS: 0,
        percentINSS: 0,
        baseIRPF: 0,
        percentIRPF:0,
        descontoIRPF:0,
        liquido: 0,
        percentSalarioLiquido: 0
    }

   
}

export default calcula;