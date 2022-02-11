import React, { useState, useEffect, useReducer } from 'react';
import { TYPES } from '../actions/crudActions';
import { helpHttp } from '../helpers/helpHttp';
import { crudReducer, crudInitialState } from '../reducers/crudReducer';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader from './Loader';
import Message from './Message';

const CrupApi = () => {
  const [state, dispatch] = useReducer(crudReducer, crudInitialState);
  const { db } = state;
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let api = helpHttp();
  let url = 'http://localhost:5000/santos';

  useEffect(() => {
    setLoading(true);

    helpHttp()
      .get(url)
      .then(res => {
        // console.log(res);
        if (!res.err) {
          dispatch({ type: TYPES.READ_ALL_DATA, payload: res });
          setError(null);
        } else {
          dispatch({ type: TYPES.NO_DATA });
          setError(res);
        }

        setLoading(false);
      });
  }, [url]);

  const createData = data => {
    data.id = Date.now();
    // console.log(data);
    let options = {
      body: data,
      headers: { 'content-type': 'application/json' },
    };

    api.post(url, options).then(res => {
      // console.log(res);
      if (!res.err) {
        dispatch({ type: TYPES.CREATE_DATA, payload: res });
      } else {
        setError(res);
      }
    });
  };

  const updateData = data => {
    let endpoint = `${url}/${data.id}`;
    console.log(endpoint);

    let options = {
      body: data,
      headers: { 'content-type': 'application/json' },
    };

    api.put(endpoint, options).then(res => {
      if (!res.err) {
        dispatch({ type: TYPES.UPDATE_DATA, payload: data });
      } else {
        setError(res);
      }
    });
  };

  const deleteData = id => {
    let isDelete = window.confirm(
      `Estas seguro de eliminar el registro con el id '${id}'?`
    ); // Usamos indow antes del confirm para no tener conflictos en React

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { 'content-type': 'application/json' },
      };

      api.del(endpoint, options).then(res => {
        if (!res.err) {
          dispatch({ type: TYPES.DELETE_DATA, payload: id });
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD Api</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {error && (
          <Message
            msg={`Error ${error.status} : ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {loading && <Loader />}
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </div>
  );
};

export default CrupApi;
