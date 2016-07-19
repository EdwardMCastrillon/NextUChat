//-----FUNCIONES DEL DISEÑO ADAPTATIVO------//
function isMobile(){
  var screenSize = screen.width;
  if(screenSize<600){
    return true
  }else return false;
}

function inicioOrganizacion(){
  if (isMobile()==true) {
    organizarMensaje();
  }
}

function organizarMensaje(){
  $(".numHora").unwrap();
  var horas = $(".numHora");
  for (var i = 0; i < horas.length; i++) {
    $(horas[i]).prependTo($(horas[i]).prev());
  }
  var horasRecibido=$(".recibidos .numHora");
  for (var i = 0; i < horasRecibido.length; i++) {
    $(horasRecibido[i]).next().after(horasRecibido[i]);
  }

}

(function(document, window, undefined, $, io){
  (function () {
    return Chat = {
      apiUrl: '/chat',
      userDataModal: $('#modalCaptura'),
      socket: io(),

      Init: function() {
        var self = this
        this.fetchUserInfo(function (user) {
          self.renderUsers(user)
        })
        self.socket.on('userJoin', function(user) {
          self.renderUsers([user])
        })
      },

      getInitialUsers: function() {
        var self = this
        var endpoint = self.apiUrl + '/users'
        self.ajaxRequest(endpoint, 'GET', {})
            .done(function(data) {
              var users = data.current
              self.renderUsers(users)
            }).fail(function(err) {
              console.log(err)
            })
      },

      ajaxRequest: function(url, type, data) {
        return $.ajax({
          url: url,
          type: type,
          data: data
        })
      },

      watchMessages: function() {},

      joinUser: function(user) {
        var self = this
        var endpoint = self.apiUrl + '/users'
        var userObj = { user: user }
        self.ajaxRequest(endpoint, 'POST', userObj)
            .done(function(confirm) {
              alert(confirm)
            }).fail(function(error) {
              alert(error)
            })
      },

      renderUsers: function(users) {
        var self = this
        var userList = $('.users-list')
        var userTemplate = '<li class="collection-item avatar">'+
                              '<img src="image/:image:" class="circle">'+
                              '<span class="title">:nombre:</span>'+
                              '<p><img src="image/online.png"/> En línea </p>'+
                            '</li>'
        users.map(function(user) {
          var newUser = userTemplate.replace(':image:', 'p2.jpg')
                                    .replace(':nombre:', user.nombre)
          userList.append(newUser)
        })
      },

      fetchUserInfo: function(callback) {
        var self = this
        if (!localStorage.user) {
          this.userDataModal.openModal()
          var $GuardaInfo = $('.guardaInfo')
          $GuardaInfo.on('click', function() {
            var nombre = $('.nombreUsuario').val()
            var user = [{nombre: nombre, img: 'p2.png'}]
            self.socket.emit('userJoin', user[0])
            callback(user)
            localStorage.user = JSON.stringify(user)
            self.joinUser(user[0])
            self.userDataModal.closeModal()
          })
        }
        self.getInitialUsers()
      }
    }
  })()
  Chat.Init()
})(document, window, undefined, jQuery, io)

$(function(){
  //----VARIABLES Y FUNCIONES DEL DISEÑO ADAPTATIVO -----//
  var desplegado = false;
  inicioOrganizacion();
  if (isMobile()) {
    $("body").swipe({
      swipe:function(event, direction, distance, duration, fingerCount){
        if (!desplegado) {
          $(".right-side").removeClass("hide-on-small-only");
          $(".collection").css({
            position: "absolute",
            display: "block"
          }).animate({
            left: "40px",
            top: "0"
          },500)
          desplegado = true;
        } else {
          $(".collection")
          .animate({
            left: "500px",
            top: "0"
          }, 500, function(){
            $(this).css({
              position: "relative",
              display: "block"
            })
            $(".right-side").addClass("hide-on-small-only");
            desplegado=false;
          })
        }
      }
    });
  }
})
