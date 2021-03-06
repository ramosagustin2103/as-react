import React from 'react';
import { Row, Col, FormGroup, Label, Button } from 'reactstrap';
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { ingresosActions } from '../../../redux/actions/ingresos';
import { toastr } from "react-redux-toastr";

import { ingresos } from '../../../utility/options/taxones';
import Spinner from '../../../components/spinner/spinner';
import { useTitulos, useIntereses, useDescuentos } from '../../../utility/hooks/dispatchers';

const empty = 'Campo requerido';


const CU = ({ selected, onClose }) => {
  const dispatch = useDispatch();
  const [titulos, loadingTitulos] = useTitulos();
  const [intereses, loadingIntereses] = useIntereses();
  const [descuentos, loadingDescuentos] = useDescuentos();

  if (loadingTitulos || loadingIntereses || loadingDescuentos) {
    return (
      <div className="loading-modal">
        <br/><br/>
        <Spinner />
      </div>
    )
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        nombre: get(selected, 'nombre', ''),
        taxon: get(selected, 'taxon', ''),
        titulo: get(selected, 'titulo', ''),
        interes: get(selected, 'interes', ''),
        descuento: get(selected, 'descuento', ''),
      }}
      validationSchema={Yup.object().shape({
        nombre: Yup.string(),
        taxon: Yup.string(),
        titulo: Yup.number().required(empty),
        interes: Yup.number()
        .transform((value, originalValue) => (originalValue && originalValue.trim() === "" ? null: value))
        .nullable(),
        descuento: Yup.number()
          .transform((value, originalValue) => (originalValue && originalValue.trim() === "" ? null: value))
          .nullable(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          await dispatch(ingresosActions.send({ 
            ...values, 
            id: get(selected, 'id', null) 
          })).then(() => {
            toastr.success('??Listo! Guardado con ??xito');
          });
          if (onClose) {
            onClose(false);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm="12">
              <h4>Datos Principales</h4>
              <FormGroup>
                <Label for="nombre">Nombre</Label>
                <Field name="nombre" id="nombre" className={`form-control ${errors.nombre && touched.nombre && 'is-invalid'}`} />
                {errors.nombre && touched.nombre ? <div className="invalid-feedback">{errors.nombre}</div> : null}
              </FormGroup>
              <FormGroup>
                <Label for="taxon">Tipo de recurso</Label>
                <Field component="select" name="taxon" id="taxon" className={`form-control ${errors.taxon && touched.taxon && 'is-invalid'}`}>
                  {ingresos.map((ingreso, i) => {
                    return <option key={i} value={ingreso.id}>{ingreso.nombre}</option>
                  })}
                </Field>
                {errors.taxon && touched.taxon ? <div className="invalid-feedback">{errors.taxon}</div> : null}
              </FormGroup>     
                          
              <FormGroup>
                <Label for="interes">Metodologia de intereses</Label>
                <Field component="select" name="interes" id="interes" className={`form-control ${errors.interes && touched.interes && 'is-invalid'}`}>
                  <option value={""}>---</option>
                  {intereses.map((interes, i) => {
                    return <option key={i} value={interes.id}>{interes.full_name}</option>
                  })}
                </Field>
                {errors.interes && touched.interes ? <div className="invalid-feedback">{errors.interes}</div> : null}
              </FormGroup>
              <FormGroup>
                <Label for="descuento">Metodologia de descuentos</Label>
                <Field component="select" name="descuento" id="descuento" className={`form-control ${errors.descuento && touched.descuento && 'is-invalid'}`}>
                <option value={""}>---</option>
                  {descuentos.map((descuento, i) => {
                    return <option key={i} value={descuento.id}>{descuento.full_name}</option>
                  })}
                </Field>
                {errors.descuento && touched.descuento ? <div className="invalid-feedback">{errors.descuento}</div> : null}
              </FormGroup>    
              <FormGroup>
                <Label for="titulo">Titulo contable</Label>
                <Field component="select" name="titulo" id="titulo" className={`form-control ${errors.titulo && touched.titulo && 'is-invalid'}`}>
                <option value={""}>---</option>
                  {titulos.map((titulo, i) => {
                    return <option key={i} value={titulo.id}>{titulo.nombre}</option>
                  })}
                </Field>
                {errors.titulo && touched.titulo ? <div className="invalid-feedback">{errors.titulo}</div> : null}
              </FormGroup>                                       
            </Col>

            <Col xs={12}>
              <hr />
            </Col>


          </Row>

          <Button type="submit" color="primary" className="button-clip-loader" disabled={isSubmitting}>
            {isSubmitting && (
              <ClipLoader
                sizeUnit="px"
                size={18}
                color="#FF586B"
              />
            )}

            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CU;