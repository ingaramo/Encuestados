/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;
  
  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function() {
    contexto.reconstruirLista(); 
  });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista(); 
  });
/*  this.modelo.sumarUnVoto1.suscribir(function() {
    contexto.reconstruirLista(); 
  });*/
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.modelo.recuperar();
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    let textoPregunta = pregunta.textoPregunta;
    nuevoItem = $(`<li>${textoPregunta}</li>`).attr({class : 'list-group-item', id: `${pregunta.id}`});
    
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var pregunta = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        //completar
        let respuesta = $(this).val();
        respuestas.push({'textoRespuesta': respuesta, 'cantidad': 0 });
      });
      debugger
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(pregunta, respuestas);
    });
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });
    e.botonEditarPregunta.click(function(){});
    e.borrarTodo.click(function(){
      contexto.controlador.borrarTodasLasPreguntas();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};

