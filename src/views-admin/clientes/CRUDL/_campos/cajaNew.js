import React, { useEffect } from 'react';
import moment from 'moment';
import { Row, Col } from "reactstrap";

// Components

import { AppendableRowField } from '../../../../components/form/AppendableRowField';
import { mapToOptions } from '../../../../utility/mappers';


import { useAppendableField } from '../../../../components/form/hooks';

// const basicErrorMessage = "La suma de los montos a perdonar deben ser estrictamente iguales al la suma del los montos de cada portador.";

const filterCompletedObject = (arr) =>
  arr.filter((x) => (x.cuenta && x.monto > 0));


const CajaNew = ({ documento, setDocumento, tesoros, errors, onlyRead }) => {
  
  const cleanItem = {
    monto: '',
    fecha_vencimiento: moment().format('YYYY-MM-DD'),
    detalle: '',
    cuenta: '',
  }

  const [
    cajas,
    handleCajasChange,
    handleCajasAppend,
    handleCajasPop,
    setCaja
  ] = useAppendableField(onlyRead ? documento.cajas : [cleanItem], {
    custom: {
      handleChange: (index) => (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const caja = cajas[index];
        const updatedCaja = { ...caja, [name]: value };

        setCaja(index, updatedCaja);        

      }
    },
    cleanItem
  });

  useEffect(() => {
    const updatedCajas = filterCompletedObject(cajas);
    setDocumento((state) => ({
      ...state,
      cajas: updatedCajas
    }));
  }, [cajas, setDocumento])

  return (
    <Row>
      <Col sm="12">
        <AppendableRowField
          appendButtonDisabled={onlyRead}
          popButtonDisabled={onlyRead}
          onAppendClick={handleCajasAppend}
          onPopClick={handleCajasPop}
          data={cajas}
          errors={errors && errors.cajas}
          fields={[ {
            type: 'select',
            name: 'cuenta',
            placeholder: 'Cuenta',
            header: 'Cuenta',
            disabled: onlyRead,
            handleChange: handleCajasChange,
            options: (
              <>
                <option defaultValue="">---</option>
                {mapToOptions(tesoros).map((tesoro) => (
                  <option key={tesoro.value} value={tesoro.value}>
                    {tesoro.label}
                  </option>
                ))}
              </>
            ),
          },{
            type: 'text',
            name: 'detalle',
            placeholder: 'Detalle',
            header: 'Detalle',
            disabled: onlyRead,
            handleChange: handleCajasChange
          }, {
            type: 'date',
            name: 'fecha_vencimiento',
            placeholder: 'Fecha Vencimiento',
            header: 'Fecha Vencimiento',
            disabled: onlyRead,
            handleChange: handleCajasChange
          }, {
            type: 'number',
            name: 'monto',
            placeholder: 'Monto',
            min: 0,
            header: 'Monto',
            disabled: onlyRead,
            handleChange: handleCajasChange
          }]}
          header={{
            appendButton: '+ tesoro'
          }}
        />
      </Col>
    </Row>
  );
};


export default CajaNew;