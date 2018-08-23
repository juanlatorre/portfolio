// un par de globales
let DBAsignaturas;

function update(picker) {
  document.getElementById("hex-str").innerHTML = picker.toHEXString();
  document.getElementById("rgb-str").innerHTML = picker.toRGBString();

  document.getElementById("rgb").innerHTML =
    Math.round(picker.rgb[0]) +
    ", " +
    Math.round(picker.rgb[1]) +
    ", " +
    Math.round(picker.rgb[2]);

  document.getElementById("hsv").innerHTML =
    Math.round(picker.hsv[0]) +
    "&deg;, " +
    Math.round(picker.hsv[1]) +
    "%, " +
    Math.round(picker.hsv[2]) +
    "%";
}

let agregarDatos = id => {
  let [c, g] = id.split("-");
  let encontrado = DBAsignaturas.find(o => o.codigo === c);
  let gruposEncontrados = Object.keys(encontrado.grupos).find(e => e === g);
  encontrado.grupos[gruposEncontrados].forEach(clase => {
    document.getElementById("tabla-horario").rows[clase.periodo].cells[
      clase.dia
    ].innerHTML += `
		<div class="${id} notification clase">
		<p><b>${c}</b></p>
		<p>${clase.sala}</p>
		</div>
		`;
  });
};

let quitarDatos = id => {
  $("." + id).remove();
};

let paletaAlemana = [
  "#FFC312",
  "#C4E538",
  "#12CBC4",
  "#FDA7DF",
  "#ED4C67",
  "#EE5A24",
  "#009432",
  "#0652DD",
  "#9980FA",
  "#833471",
  "#F79F1F",
  "#A3CB38",
  "#1289A7",
  "#D980FA",
  "#B53471",
  "#EA2027",
  "#006266",
  "#1B1464",
  "#5758BB",
  "#6F1E51"
];

$(document).click(event => {
  if ($(event.target).closest(".modal-background").length) {
    $("body")
      .find(".modal")
      .removeClass("is-active");
  }
});

// $('#btnCambiarColor').click( () => {
// 	$(".modal").addClass("is-active")
// })

$(document).ready(() => {
  $(".pageloader").toggleClass("is-active");

  $('input[type="text"]').keyup(function() {
    var valor_de_busqueda = $(this)
      .val()
      .toLowerCase();
    $(".nombre, .codigo")
      .closest(".box")
      .css("display", "none");
    $(".nombre, .codigo").each(function() {
      var val = $(this)
        .text()
        .replace("Á", "A")
        .replace("É", "E")
        .replace("Í", "I")
        .replace("Ó", "O")
        .replace("Ú", "U")
        .replace("á", "a")
        .replace("é", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ú", "u");
      if (val.toLowerCase().indexOf(valor_de_busqueda) >= 0) {
        $(this)
          .closest(".box")
          .css("display", "block");
      }
    });
  });

  $(".cb-ramo").on("change", function() {
    $(this)
      .closest("input")
      .toggleClass("checked", this.checked);
    $(this).hasClass("checked")
      ? agregarDatos($(this).attr("id"))
      : quitarDatos($(this).attr("id"));
  });

  $("#mostrarHoras").on("change", function() {
    $(this)
      .closest("input")
      .toggleClass("checked", this.checked);
    $(this).prop("checked")
      ? $("p.pc.ocultable").removeClass("is-invisible")
      : $("p.pc.ocultable").addClass("is-invisible");
  });

  $("#btnImprimir").click(() => {
    print();
  });

  $("#btnExcel").click(() => {
    TableExport(document.getElementById("tabla-horario"), {
      formats: ["xlsx"],
      filename: "id"
    });
    $(".button-default.xlsx").click();
  });

  $("#btnColorizar").click(() => {
    $(".modal").addClass("is-active");
  });

  $("button.delete").click(() => {
    $(".modal").removeClass("is-active");
  });

  $("#btnAjustes").click(() => {
    $("#parentAjustes").toggleClass("is-active");
  });
});

$.getJSON("asignaturas_s1_2018.json", data => {
  DBAsignaturas = data;
  data.forEach(ramo => {
    for (var grupo in ramo.grupos) {
      let grupito = grupo.split("_").join(" ");
      let codigoMasGrupo = ramo.codigo + "-" + grupo;

      $("#lista-de-asignaturas").append(`
				<div class="box">
				<span class="nombre title is-5">${ramo.nombre}</span>
				<br>
				<span class="codigo subtitle is-7">${ramo.codigo} - ${grupito}</span>
				<div class="contenedor-checkbox">
				<label class="checkbox is-pulled-right">
				<input id="${codigoMasGrupo}" type="checkbox" class="regular-checkbox cb-ramo"/>
				</label>
				</div>
				</div>
				`);
    }
  });
});
