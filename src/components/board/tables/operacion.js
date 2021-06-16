import React, {useRef } from 'react';
import ReactTable from 'react-table';
import ReactToPrint from 'react-to-print';
import ReactExport from "react-export-excel";
import { Button } from 'reactstrap';
import { Printer, FileText} from "react-feather";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const TableOperacion = ({data, columns}) => {

  const tableHeaders = columns.map(c => ({ label: c.Header, key: typeof c.accessor === "string" ? c.accessor : c.Header.toLowerCase() }));
  const column =[
    {label: tableHeaders[0] !== undefined ?tableHeaders[0].label : " ", value:tableHeaders[0]!== undefined ?tableHeaders[0].key :" "},
    // {label: "Documento", value: (col) => col.documento.nombre},
    {label: tableHeaders[1] !== undefined ? tableHeaders[1].label : " ", value:tableHeaders[1] !== undefined ?tableHeaders[2].key :" "},
    {label: tableHeaders[2] !== undefined ? tableHeaders[2].label : " ", value:tableHeaders[2] !== undefined ?tableHeaders[2].key :" "},
    {label: tableHeaders[3] !== undefined ? tableHeaders[3].label : " ", value:tableHeaders[3] !== undefined ?tableHeaders[3].key :" "},
    {label: tableHeaders[4] !== undefined ? tableHeaders[4].label: " ", value:tableHeaders[4] !== undefined ?tableHeaders[4].key :" "},
    {label: tableHeaders[5] !== undefined ? tableHeaders[5].label : " ", value:tableHeaders[5] !== undefined ?tableHeaders[5].key : " "},
    {label: tableHeaders[6] !== undefined ? tableHeaders[6].label : " ", value:tableHeaders[6] !== undefined ?tableHeaders[6].key : " "},
    {label: tableHeaders[7] !== undefined ? tableHeaders[7].label : " ", value:tableHeaders[7] !== undefined ?tableHeaders[7].key : " "},
    {label: tableHeaders[8] !== undefined ? tableHeaders[8].label : " ", value:tableHeaders[8] !== undefined ?tableHeaders[8].key : " "},
    {label: tableHeaders[9] !== undefined ? tableHeaders[9].label : " ", value:tableHeaders[9] !== undefined ?tableHeaders[9].key : " "},
    {label: tableHeaders[10] !== undefined ? tableHeaders[10].label : " ", value:tableHeaders[10] !== undefined ?tableHeaders[10].key : " "},
    {label: tableHeaders[11] !== undefined ? tableHeaders[11].label : " ", value:tableHeaders[11] !== undefined ?tableHeaders[11].key : " "},
    {label: tableHeaders[12] !== undefined ? tableHeaders[12].label : " ", value:tableHeaders[12] !== undefined ?tableHeaders[12].key : " "},
    {label: tableHeaders[13] !== undefined ? tableHeaders[13].label : " ", value:tableHeaders[13] !== undefined ?tableHeaders[13].key : " "}]

  const refButton = useRef(null);
  const columns_final = columns.map(c => {
    if (c.Header === "Documento") {
      return ({...c, Cell: rowData => (
        <div
          className={rowData.row._original.documento.fecha_anulacion && "text-danger" }
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
      <section className="bg-lighten-5 text-left">
        <ReactToPrint
          trigger={() => <Button className="btn-sm" outline><Printer size={18} /></Button>}
          content={() => refButton.current}
        />
        <ExcelFile
          element={
            <Button className="btn-sm" outline>
              <FileText size={18} />
            </Button>
          }
          filename="adminsmart-cuenta.xls"
        >
          <ExcelSheet data={data} name="adminsmart-deudas">
            {column.map((column) => (
              <ExcelColumn label={column.label} value={column.value} />
            ))}
          </ExcelSheet>
        </ExcelFile>
      </section>
      <ReactTable
        showPagination
        defaultPageSize={100}        
        data={data}
        columns={columns_final}
        className="-striped -highlight"
      />
    </React.Fragment>
  );
};

export default TableOperacion;
