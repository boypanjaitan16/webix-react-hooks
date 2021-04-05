import React from 'react';
import Webix from '../WebixComponent';

function getUI(onSelect){
  return {
    view:"datatable",
    // id:"grid",
    columns:[
        { id:"nisn", header:[{text: "NISN"},{content:"textFilter"}], minWidth: 150, fillspace: true, sort: "int"},
        { id:"name", header:[{text: "Name"},{content:"textFilter"}], minWidth: 250, sort: "string"},
        { id:"gender", header: [{text: "Gender"},{content:"selectFilter", options: [{id: "FEMALE", value: "FEMALE"}, {id: "MALE", value: "MALE"}]}], minWidth: 150},
        { id:"place_of_birth", header:[{text: "Place of Birth"},{content:"textFilter"}], minWidth: 200},
        { id:"date_of_birth", header:[{text: "Date of Birth"},{content:"textFilter"}], minWidth: 200},
        { id:"religion", header:[{text: "Religion"},
          {
            content:"selectFilter", 
            options: [
              {id: "PROTESTAN", value: "PROTESTAN"}, 
              {id: "KATOLIK", value: "KATOLIK"},
              {id: "ISLAM", value: "ISLAM"},
              {id: "BUDDHA", value: "BUDDHA"},
              {id: "HINDU", value: "HINDU"},
              {id: "KHONGHUCU", value: "KHONGHUCU"},
            ]
          }], width: 200
        },
        { id:"entry_year", header:[{text: "Entry Year"},{content:"textFilter"}]},
        { id:"mobile_phone_number", header:[{text: "Phone Number"},{content:"textFilter"}], width: 200}
    ],
    scroll:true,
    autoheight:true,
    select: "row",
    // data:small_film_set,
    // footer:true,
    resizeColumn: true,
    borderless:true,
    multiselect: true,
    leftSplit: 2,
    on:{
      onAfterSelect:function(id){
        onSelect(id);
      }
    }
  };
}

const TableView = ({ data, onSelect }) => (
  <Webix ui={getUI(onSelect)} data={data} />
)

export default TableView;