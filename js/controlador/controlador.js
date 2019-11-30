/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    for(let i = 0 ; i < respuestas.length ; i++){
      if(!this.validarRespuesta(respuestas[i])){
        respuestas.splice(i, 1);
        
      }
    }
    if(this.validarPregunta(pregunta)){
      this.modelo.agregarPregunta(pregunta, respuestas);
    }
  },
  borrarPregunta: function(id){
    if(this.validarId(id)){
      this.modelo.borrarPregunta(id)
    }
  },
  agregarRespuesta: function(id, respuesta){
    if(this.validarId(id) && this.validarRespuesta(respuesta)){
      this.modelo.agregarRespuesta(id, respuesta);
    }
  },
  borrarTodasLasPreguntas: function(){
    this.modelo.borrarTodasLasPreguntas();
  },
  agregarVoto: function(idPregunta, respuesta){
    //if (this.validarId(idPregunta) && this.validarRespuesta(respuesta)){
      this.modelo.sumarUnVoto(idPregunta, respuesta);
    //}
  }, 
  validarPregunta: function(pregunta){
    if(pregunta === '' || pregunta === null){
      return false
    }
    return true
  },
  validarId: function(id){
    if( isNaN(id) || id === null || id=== '' || id < 0 ){
      return false
    }
    return true
  },
  validarRespuesta: function (respuesta){
    if(respuesta.textoRespuesta === null || respuesta.textoRespuesta === ''
    || isNaN(respuesta.cantidad) || respuesta.cantidad < 0 ) {
      return false
    } 
    return true
  }
};
