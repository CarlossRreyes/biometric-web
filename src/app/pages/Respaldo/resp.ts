//*********Group data institutions*********/
groupDataCarlito( institute: IntitutionCountryCity[] ): any[] {
    const groupedData: any[] = [];
    

    institute.map( ( item ) => {

      const nombre_pais = item.institucion_pais_ciudad[0].pais.nombre_pais;
      const provincia = item.institucion_pais_ciudad[0].provincia;
      const ciudad = item.institucion_pais_ciudad[0].ciudad;

      let paisNode = groupedData.find( (node) => node.data.name === nombre_pais );
      // console.log("Node pais: ", paisNode)
      if( !paisNode ){
        paisNode = {
          data: {
            name: `${ nombre_pais }`,
            nombre_provincia: '',
            nombre_ciudad: '',
            nombre_institucion: '',
            btn: false
            
          },
          children: []
        };
        
        groupedData.push( paisNode );
      }



      if (provincia) {
        let provinciaNode = paisNode.children.find((node: any) => node.data.nombre_provincia === provincia.nombre_provincia);

        if (!provinciaNode) {
         
          provinciaNode = {
            data: {
              name: '', 
              nombre_provincia: `${provincia.nombre_provincia}`,
              nombre_ciudad: '',
              nombre_institucion: '',
              btn: false,
            },
            children: [],
          };
    
          paisNode.children.push(provinciaNode);
        }

        let ciudadNode = provinciaNode.children.find((node: any) => node.data.nombre_ciudad === `${ciudad?.nombre_ciudad}`);

        if (!ciudadNode) {
          ciudadNode = {
            data: {
              name: '',
              nombre_provincia: '',
              nombre_ciudad: `${ciudad?.nombre_ciudad}`,
              nombre_institucion: '',
              btn: false,
            },
            children: [],
          };

          provinciaNode.children.push(ciudadNode);
        }

        // Ahora agregamos la institución a la ciudad
        ciudadNode.children.push({
          data: {
            name: '',
            nombre_provincia: '',
            nombre_ciudad: '',
            nombre_institucion: item.nombre,
            btn: true,
            data: item
          },
          children: [],
        });
        
       

      }

      if (!provincia && !ciudad) {
        // La institución pertenece al país directamente
        const institucionNode = {
          data: {
            name: '', 
            nombre_provincia: '',
            nombre_ciudad: '',
            nombre_institucion: item.nombre,
            btn: true,
            data: item
          },
          children: [],
        };
        
        paisNode.children.push(institucionNode);
      }
    });


    console.log("groupedData institutions : ", groupedData)
    return groupedData;
  }