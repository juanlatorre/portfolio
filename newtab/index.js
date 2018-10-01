window.onload = function() {
  // contenido de Favoritos
  const favs_config = {
    "ｇｅｎｅｒａｌ　一般": [
      "http://www.gita.cl:8080/lams/index.do",
      "https://www.fayerwayer.com/",
      "https://best.aliexpress.com/?lan=es",
      "https://www.reddit.com/",
      "https://news.ycombinator.com"
    ],
    "ｓｏｃｉａｌ　社会的": [
      "https://www.facebook.com/",
      "https://web.whatsapp.com/",
      "https://twitter.com/",
      "https://www.instagram.com/"
    ],
    "ｏｆｉｃｉｎａ　事務所": [
      "https://mail.protonmail.com/login",
      "https://mail.google.com/mail/u/0/#inbox",
      "http://www.bancoestado.cl/imagenes/_personas/home/default.asp",
      "https://secure02.uach.cl/infoalumnos/CheqLogin.aspx?pagina=principal.aspx"
    ],
    "ｍｉｓｃ　その他": [
      "https://www.youtube.com/",
      "https://animeflv.net/",
      "https://myanimelist.net/animelist/juanlatorre",
      "https://myanimelist.net/mangalist/juanlatorre",
      "https://tumangaonline.me/",
      "https://www.netflix.com/browse",
      "http://choromota.elbruto.es/cellule"
    ]
  };

  // Handle de botones y tabs
  var favsBtn = document.getElementById("favs-btn");
  var notasBtn = document.getElementById("notas-btn");

  var favsTab = document.getElementById("favs");
  var notasTab = document.getElementById("notas");

  favsBtn.onclick = function() {
    this.classList.add("active");
    notasBtn.classList.remove("active");
    checkCurrentTab("favs-btn");
  };

  notasBtn.onclick = function() {
    this.classList.add("active");
    favsBtn.classList.remove("active");
    checkCurrentTab("notas-btn");
  };

  function checkCurrentTab(button) {
    if (button == "favs-btn") {
      favsTab.classList.remove("hidden");
      notasTab.classList.add("hidden");
    } else {
      notasTab.classList.remove("hidden");
      favsTab.classList.add("hidden");
    }
  }

  // Generar categorias
  for (var categoria in favs_config) {
    if (favs_config.hasOwnProperty(categoria)) {
      favsTab.innerHTML += "<h4>" + categoria + "</h4>";
      favsTab.innerHTML += "<ul id='" + categoria + "'></u>";
      for (uri in favs_config[categoria]) {
        var x = document.getElementById(categoria);
        var uri = favs_config[categoria][uri];

        x.innerHTML +=
          "<li class='tooltip'> <a href='" +
          uri +
          "'><img class='favicon' title='" +
          uri +
          "' src='https://www.google.com/s2/favicons?domain=" +
          uri +
          "' height='20px;' width='auto'></a></li>";
      }
    }
  }

  // Notas
  var notasTextArea = document.getElementById("notas-textarea");

  window.addEventListener("load", function load(event) {
    notasTextArea.value = localStorage.getItem("nota");

    notasTextArea.addEventListener("keyup", function() {
      localStorage.setItem("nota", notasTextArea.value);
    });
  });
};
