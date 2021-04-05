import React, { useRef, createRef, useEffect } from 'react';

import * as webix from 'webix/webix.js';
import 'webix/webix.css';

function WebixComponent({data, select, ui}){
  const webixRef  = createRef()
  const uiState   = useRef()     

  const setWebixData= (dataToUpdate) => {
    if (uiState.current.setValues)
      uiState.current.setValues(dataToUpdate);
    else if (uiState.current.parse)
      uiState.current.parse(dataToUpdate)
    else if (uiState.current.setValue)
      uiState.current.setValue(dataToUpdate); 
  }

  useEffect(() => {
    uiState.current = webix.ui(
  	  ui, 
  	  webixRef.current
    );
  
    return () => {
      ui.current  = null;
    }
  }, [])

  useEffect(() => {
      if (data){
        setWebixData(data);
      }
  }, [data])

  return (
    <div ref={webixRef}></div>
  );
}

export default WebixComponent;