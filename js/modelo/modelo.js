/* 8

 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos  PUEDE TENER EL MISMO NOMBRE QUE UN METODO?
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);  
  this.preguntaEditada = new Evento(this);  
  this.sumarUnVoto1 = new Evento(this);  
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    let contexto = this;
    this.preguntas.forEach(function(elem){
      if(elem.id > contexto.ultimoId){
        contexto.ultimoId = elem.id;
      }
    });
    return this.ultimoId
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas',JSON.stringify(this.preguntas));
    localStorage.setItem('ultimoId',this.ultimoId);
  },
  recuperar: function(){
    this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    if(this.preguntas === null){
      this.preguntas=[]
    }
    this.ultimoId = localStorage.getItem('ultimoId');
    this.preguntaAgregada.notificar()
  },
  borrarPregunta: function(id){
    let index = this.buscarIndicePorId(id)
    this.preguntas.splice(index,1);
    this.guardar();
    this.preguntaEliminada.notificar();
  },
  agregarRespuesta: function(id, respuesta){
    this.preguntas[id].respuestas.push(respuesta);
    
  },
  borrarTodasLasPreguntas: function(){
    this.preguntas = [];
    this.ultimoId = 0;
    this.guardar();
    this.preguntaEliminada.notificar();
    
  },
  editarPregunta: function(id, nombre, respuestas){
    let index = this.buscarIndicePorId(id);
    this.preguntas[index] =  {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.guardar();
    this.preguntaEditada.notificar();
    
  },
  sumarUnVoto: function(idPregunta, respuesta){
    let indexPregunta = this.buscarIndicePorId(idPregunta);
    let pregunta = this.preguntas[indexPregunta];
    let textoRespuestasArray = pregunta.cantidadPorRespuesta.map(function (e){ return e.textoRespuesta});
    let indexRespuesta = textoRespuestasArray.indexOf(respuesta);
    //guardo la cantidad original en una variable
    let cantidad = this.preguntas[indexPregunta].cantidadPorRespuesta[indexRespuesta].cantidad; 
    //agrego 1 voto a la respuesta
    this.preguntas[indexPregunta].cantidadPorRespuesta[indexRespuesta].cantidad = cantidad + 1
    this.guardar();
    this.sumarUnVoto1.notificar();
  },
  buscarIndicePorId: function (id){
    let preguntasId = this.preguntas.map(function(e){ return e.id});
    let index = preguntasId.indexOf(id);
    return index
  },
};
