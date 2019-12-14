/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento (this);
  this.preguntaEditada = new Evento (this);
  this.sumarUnVoto = new Evento (this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() { 
    let contexto = this;
    this.preguntas.forEach(e=>{
      if (e.id>contexto.ultimoId){
        contexto.ultimoId = e.id
      }
    })
    return contexto.ultimoId
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
  borrarPregunta: function (index){
    this.preguntas.splice(index,1);
    this.guardar();
    this.preguntaBorrada.notificar()
    
  },
  editarPregunta:function (index, pregunta){
    this.preguntas[index]= pregunta;
    this.guardar();
    this.preguntaEditada.notificar()
  },
  borrarTodo: function(){
    this.preguntas = [];
    this.guardar();
    this.preguntaBorrada.notificar();
  },
  agregarUnVoto: function(indexPregunta, textoRespuesta){
    let respuestas = this.preguntas[indexPregunta].cantidadPorRespuesta
    for (let i = 0 ; i < respuestas.length ; i++){
      if(textoRespuesta === respuestas[i].textoRespuesta){
        respuestas[i].cantidad++  
        this.sumarUnVoto.notificar();
        this.guardar();
        return
      }
    }    
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
};
