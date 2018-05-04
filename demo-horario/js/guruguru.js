// un par de globales
let DBAsignaturas

let agregarDatos = (id) => {
	let [c,g] = id.split("-")
	let encontrado = DBAsignaturas.find(o => o.codigo === c)
	let gruposEncontrados = Object.keys(encontrado.grupos).find((e) => e === g)
	encontrado.grupos[gruposEncontrados].forEach((clase) => {
		document.getElementById("tabla-horario").rows[clase.periodo].cells[clase.dia].innerHTML += `
			<div class="${id} clase has-background-success has-text-white">
				<p><b>${c}</b></p>
				<p>${clase.sala}</p>
			</div>
		`
	})
}

let quitarDatos = (id) => {
	$('.'+id).remove()
}

$(document).ready(() => {
	$('input[type="text"]').keyup(function() {
		var valor_de_busqueda = $(this).val().toLowerCase()
		$('.nombre, .codigo').closest('.box').css('display', 'none')
		$('.nombre, .codigo').each(function() {
			var val = $(this).text().replace('Á','A').replace('É','E').replace('Í','I').replace('Ó','O').replace('Ú','U').replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u')
			if(val.toLowerCase().indexOf(valor_de_busqueda) >= 0) {
				$(this).closest('.box').css('display', 'block')
			}
		})
	})

	$('.cb-ramo').on("change", function() {
		$(this).closest("input").toggleClass("checked", this.checked)
		$(this).hasClass("checked") ? agregarDatos($(this).attr("id")) : quitarDatos($(this).attr("id"))
	})

	$('#horas-toggle').on("change", function() {
		$(this).closest("input").toggleClass("checked", this.checked)
		$(this).hasClass("checked") ? $("p.pc.ocultable").removeClass("oculto") : $("p.pc.ocultable").addClass("oculto")
	})

	$('#btnImprimir').click( () => {
		print()
	})

	$('#btnExcel').click( () => {
		TableExport(document.getElementById("tabla-horario"), {
			formats: ['xlsx'],
			filename: 'id'
		})
		$('.button-default.xlsx').click()
	})

	$('#btnColorizar').click( () => {
		$(".modal").addClass("is-active")
	})

	$('.modal-close').click( () => {
		$(".modal").removeClass("is-active")
	})
})

$.getJSON("asignaturas.json", (data) => {
	DBAsignaturas = data
	data.forEach((ramo) => {
		for (var grupo in ramo.grupos) {
			let grupito = grupo.split('_').join(' ')
			let codigoMasGrupo = ramo.codigo + "-" + grupo

			$("#lista-de-asignaturas").append(`
				<div class="box">
					<div class="columns">
						<div class="column is-11">
							<h2 class="nombre title is-5">${ramo.nombre}</h2>
							<h3 class="codigo subtitle is-7">${ramo.codigo} - ${grupito}</h3>
						</div>
						<div class="column">
							<label class="checkbox">
								<input id="${codigoMasGrupo}" type="checkbox" class="regular-checkbox cb-ramo"/>
							</label>
						</div>
					</div>
				</div>
				`)
		}
	})
})