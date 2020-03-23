
// capturamos el formulario
const form = document.querySelector('#validation-form');

// capturar los elementos del formulario en un array
const formInputs = Array.from(form.elements);
//Saca el boton de Submit del array con un pop
formInputs.pop();
//Saca el boton de Recuerdame
formInputs.pop();

//Variable para almacenar los campos con errores
let inputError = {};

// ================== Recorre los campos del formulario y valida cada uno ==================
 formInputs.forEach(oneInput => {
     
    // ===== Para validar si los campos estan vacios =====
     oneInput.addEventListener('blur', function () {
         // capturamos el valor del campo
         let inputValue = this.value;

         // validamos si el  valor del campo está vacio
         if (validator.isEmpty(inputValue, { ignore_whitespace: true })) {
        
            // agrego la clsae error al campo
            this.classList.add('form-error');
            // mostramos el mensaje de error en el span con clase feedback
            this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> no puede estar vacio`;
            // agregamos el campo al array de errores
            inputError[oneInput.name] = true;
           
         } else
          
        // elimino la clase error del campo
        this.classList.remove('form-error');
        // elimino el texto que tenga el feedback
        this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> no puede estar vacio`;
        // elimina el campo del array de errores
        delete inputError[oneInput.name];

     });

     // ===== Para validar el campo de email =====
     if (oneInput.name === 'email') {

        oneInput.addEventListener('blur', function () { 
            let inputValue = this.value;

            // si NO esta vacio y el campo NO es un email
            if (!validator.isEmpty(inputValue) && !validator.isEmail(inputValue)) {
                
                // agrego la clase error al campo
                this.classList.add('form-error');
                //mostramos el mensaje de error en el span con clase feedback
                this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> debe tener un formato de email valido`;
                // agregamos el campo al array de errores
                inputError[oneInput.name] = true;  
            }
        }); 
    }
 }); //Cierre del forEach



// ================== Validacion para el boton de Submit ================== (En caso de que haya errores no va a funcionar el boton)
 form.addEventListener('submit', function () {

    formInputs.forEach(oneInput => {
             let inputValue = oneInput.value;
             if (validator.isEmpty(inputValue, { ignore_whitespace: true })) {
                inputError[oneInput.name] = true;
             }
    });
    
    console.log(inputError);	

	if (Object.keys(inputError).length > 0) {

        event.preventDefault();

        
        let sumbitButton = document.querySelector('.button-register');
        sumbitButton.nextElementSibling.classList.add('form-sumbit-error')
        sumbitButton.nextElementSibling.innerHTML = `Hay errores en el formulario`;
        
        
        
	}
})


