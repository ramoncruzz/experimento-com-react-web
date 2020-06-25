import React from 'react';


const Barra = ({percentualINSS, percentualIRPF})=>(
    <div style={{height: '30px', width: '100%', background: '#16a085', flexDirection: 'row', display: 'flex'}} >
          <div style={{height: '30px', width: `${percentualINSS}%`, background: ' #e67e22'}} />
          <div style={{height: '30px', width: `${percentualIRPF}%`, background: ' #c0392b'}} />
        </div>
);

export default Barra;
