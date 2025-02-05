import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function ListadoEmpleados() {

  const urlBase = "http://localhost:8080/rh-app/empleados";

  const [empleados, setEmpleados] = useState([]); // Hook

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => { // Función asíncrona
    const resultado = await axios.get(urlBase);
    console.log('Resultado de cargar empleados:');
    console.log(resultado.data);
    setEmpleados(resultado.data);
  }

  const eliminarEmpleado = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarEmpleados();
  }

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "50px" }}>
        <h1>Sistema de Recursos Humanos</h1>
      </div>
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
         {
          empleados.map((empleado, indice) => (
            <tr key={indice.id}>
              <th scope="row">{empleado.id}</th>
              <td>{empleado.nombre}</td>
              <td>{empleado.departamento}</td>
              <td><NumericFormat value={empleado.sueldo} 
                   displayType={'text'} 
                   thousandSeparator=',' prefix={'$'}
                   decimalScale={2} fixedDecimalScale={true}/>
              </td>
              <td className="text-center">
                <Link to={`/editar/${empleado.id}`} className="btn btn-warning btn-sm me-3">Editar</Link>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarEmpleado(empleado.id)}>Eliminar</button>
              </td>
            </tr>
          )) 
         }
        </tbody>
      </table>
    </div>
  );
}
