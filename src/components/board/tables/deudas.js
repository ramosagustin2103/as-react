import React, {useRef } from 'react';
import ReactTable from 'react-table';
import ReactToPrint from 'react-to-print';
import ReactExport from "react-export-excel";
import { Button, ButtonGroup } from 'reactstrap';
import { Printer, FileText} from "react-feather";
import {Numero} from "../../../utility/formats";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const TableDeudas = ({data, columns, addProps}) => {

  const tableHeaders = columns.map(c => ({ label: c.Header, key: typeof c.accessor === "string" ? c.accessor : c.Header.toLowerCase() }));
  const column = [
    {
      label: tableHeaders[0] !== undefined ? tableHeaders[0].label : " ", value: tableHeaders[0] !== undefined ? tableHeaders[0].key : " ",
    },
    { label: "Documento", value: (col) => col.documento.nombre },
    {
      label: tableHeaders[2] !== undefined ? tableHeaders[2].label : " ", value: tableHeaders[2] !== undefined ? tableHeaders[2].key : " ",
    },
    {
      label: tableHeaders[3] !== undefined ? tableHeaders[3].label : " ", value: tableHeaders[3] !== undefined ? tableHeaders[3].key : " ",
    },
    {
      label: tableHeaders[4] !== undefined ? tableHeaders[4].label : " ", value: tableHeaders[4] !== undefined ? tableHeaders[4].key : " ",
    },
    {
      label: tableHeaders[5] !== undefined ? tableHeaders[5].label : " ", value: tableHeaders[5] !== undefined ? tableHeaders[5].key : " ",
    },
    {
      label: tableHeaders[6] !== undefined ? tableHeaders[6].label : " ", value: tableHeaders[6] !== undefined ? tableHeaders[6].key : " ",
    },
    {
      label: tableHeaders[7] !== undefined ? tableHeaders[7].label : " ", value: tableHeaders[7] !== undefined ? tableHeaders[7].key : " ",
    },
  ];

  const refButton = useRef(null);
  const columns_final = columns.map(c => {
    if (c.Header === "Documento") {
      return ({...c, Cell: rowData => (
        <div
          style={{
            cursor:"pointer"
          }}
        >
          {rowData.value}
        </div>
      )   })
    }
    return ({...c})  
  })
  return (
    <React.Fragment>
      <section className="bg-lighten-5 d-flex justify-content-between">
        <ButtonGroup>
          <ReactToPrint
            trigger={() => <Button className="btn-sm" outline><Printer size={18} /></Button>}
            content={() => refButton.current}
          />
          <ExcelFile element={<Button className="btn-sm" outline>
              <FileText size={18} />
             </Button>}
                filename="adminsmart-cuenta.xls">
                <ExcelSheet data={data} name="adminsmart-deudas" >
                {column.map(column => <ExcelColumn label={column.label} value={column.value}/>)}
                </ExcelSheet>
            </ExcelFile>
        </ButtonGroup>
        <ButtonGroup>
          <div className="text-danger mr-2">
            <b>Total a pagar (+) a favor (-):</b>
          </div>
          <Button className="btn-sm btn-warning" disabled outline title="Saldo adeudado">
            {Numero(data.reduce((a,v) =>  a = a + v.saldo , 0 ))}
          </Button>            
        </ButtonGroup>
      </section>

      <ReactTable
        showPagination
        defaultPageSize={50}
        data={data}
        columns={columns_final}
        className="-striped -highlight"
        {...addProps}
      />
    </React.Fragment>
  );
};

export default TableDeudas;
