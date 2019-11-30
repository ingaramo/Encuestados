//Evento QUE HACE LA LINEA 13 vistaAdmin.suscribirLista()(modelo)
var Evento = function(emisor) {
  this.sujeto = emisor;
  this.observadores = [];
};

Evento.prototype = {
  suscribir: function(observador) {
    this.observadores.push(observador);
  },
  notificar: function() {
    for (var i = 0; i < this.observadores.length; i++) {
      this.observadores[i](this.sujeto);
    }
  }
};
