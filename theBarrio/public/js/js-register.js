//window.alert("hola")

const elFormulario = document.querySelector(".formulario-register");

let camposDelFormulario = Array.from(elFormulario.elements);

// Sacamos al botón del array de campos
camposDelFormulario.pop();

let camposConError = {};

// Iteramos sobre el array de campos
for (const unCampo of camposDelFormulario) {

	// A cada campo le pasamos el evento blur
	unCampo.addEventListener('blur', function () {
		// Capturamos el valor del campo
		let valorDelCampo = unCampo.value.trim();
		// trim() es un método que elimina los espacios vacíos al principio y al final
		
		// Sí el valor del campo está vacío
		if (validator.isEmpty(valorDelCampo))  {
			// Si el campo tiene error, agregamos la clase de boostrap 'is-invalid'
			unCampo.classList.add('is-invalid');
			// Insertamos un mensaje de error en el div 'invalid-feedback'
			unCampo.nextElementSibling.innerHTML = `El campo <b>${unCampo.getAttribute('data-name')}</b> es obligatorio`;
			// Al objeto literal de errores, la asignamos una prop con el nombre del campo y valor true
			camposConError[unCampo.name] = true;
		} else {
			// Cuando no hay error, eliminamos la clase por si la tuviera
			unCampo.classList.remove('is-invalid');
			unCampo.classList.add('is-valid');
			// Eliminamos el mensaje de error en el div 'invalid-feedback'
			unCampo.nextElementSibling.innerHTML = '';
			// Al objeto literal de errores, le eliminamos la prop del campo que tenía error
			delete camposConError[unCampo.name];
		}
	});

	// Si el nombre del campo es 'email'
	if (unCampo.name === 'email') {
		unCampo.addEventListener('blur', function () {
			// Capturamos lo que se escribío en el campo email
			let valorDelCampo = unCampo.value.trim();

			// Si el valor del campo NO es un formato de correo electrónico
			if (!validator.isEmail(valorDelCampo)) {
				// Si el campo tiene error, agregamos la clase de boostrap 'is-invalid'
				unCampo.classList.remove('is-valid');
				unCampo.classList.add('is-invalid');
				// Insertamos un mensaje de error en el div 'invalid-feedback'
				unCampo.nextElementSibling.innerHTML = `El campo <b>${unCampo.getAttribute('data-name')}</b> debe contener un formato de correo electrónico`;
				// Al objeto literal de errores, la asignamos una prop con el nombre del campo y valor true
				camposConError[unCampo.name] = true;
				console.log(camposConError);
			} else {
				// Cuando no hay error, eliminamos la clase por si la tuviera
				unCampo.classList.remove('is-invalid');
				unCampo.classList.add('is-valid');
				// Eliminamos el mensaje de error en el div 'invalid-feedback'
				unCampo.nextElementSibling.innerHTML = '';
				// Al objeto literal de errores, le eliminamos la prop del campo que tenía error
				delete camposConError[unCampo.name];
			}
		})
	}
}

elFormulario.addEventListener('submit', function (event) {
	// verificamos SI hay campos vacíos
	for (const unCampo of camposDelFormulario) {
		let valorDelCampo = unCampo.value.trim();
		if (validator.isEmpty(valorDelCampo)) {
			camposConError[unCampo.name] = true;
		}
	}

	console.log(camposConError);	

	if (Object.keys(camposConError).length > 0) {
		event.preventDefault();
		alert('Hay campos con errores'); 
	}
})
