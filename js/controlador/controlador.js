/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      let arrayRespuestas = [];
      respuestas.forEach(e => {
        if(this.validarRespuesta(e)){
          arrayRespuestas.push({'textoRespuesta': e, 'cantidad': 0});
        }
      })
      this.modelo.agregarPregunta(pregunta, arrayRespuestas);
  },
  borrarPregunta: function (id){
    if(!this.validarId){
    alert ('invalid id')
    return
    }
    let index = this.obtenerIndexPregunta(id)
    if (index != -1){
      this.modelo.borrarPregunta(index)
    }
    else {
      alert('error pregunta no eliminada')
    }
  },
  borrarTodo: function(){
      this.modelo.borrarTodo()
  },
  editarPregunta: function(id){
    this.borrarPregunta(id)
  },
  validarRespuesta: function(textoRespuesta){
    if(textoRespuesta != '' && textoRespuesta != null &&textoRespuesta != undefined){
      return true
    }
    else {
      return false
    }
  },
  validarId: function(id){
    let preguntas = this.modelo.preguntas
    if (!isNaN(parseInt(id))&& preguntas.map(e=>e.id).indexOf( parseInt(id)) != -1){
      return true;
    }
    else {
      return false
    }
    
  },
  obtenerIndexPregunta: function(idPregunta){
    let arrayAux = this.modelo.preguntas.map(function (e){return e.id});
    let index = arrayAux.indexOf(parseInt(idPregunta));
    return index

  },
  //agregarUnVoto(nombrePregunta,respuestaSeleccionada)
  agregarUnVoto(preguntaId, textoRespuesta){
    if(this.validarId(preguntaId)){
      let index = this.obtenerIndexPregunta(preguntaId)
      if(index!= -1){
      this.modelo.agregarUnVoto(index, textoRespuesta);        
      }
    }else{
      alert('id pregunta invalido')
    }

  }
 
};
