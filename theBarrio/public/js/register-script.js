// Sequelize
//const db = require('../../src/database/models')
//const sequelize = db.sequelize

// capturamos el formulario
const form = document.querySelector('#validation-form');

// capturar los elementos del formulario en un array
const formInputs = Array.from(form.elements);
//Saca el boton de Submit del array con un pop
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
                this.nextElementSibling.innerHTML = `Debe tener un formato email valido`;
                // agregamos el campo al array de errores
                inputError[oneInput.name] = true;  
            }
        }); 
      }

      if (oneInput.name === 'email') {
         oneInput.addEventListener('blur', function () {
             let userEmail = this.value.trim();
 
             fetch(`http://localhost:3000/api/users`)
                 .then(response => response.json())
                 .then(data => {

                  let userArray = data.users   
                    
                   userArray.forEach(oneUser => {
                       if(userEmail == oneUser.email ){
                        this.classList.add('form-error');
                        this.nextElementSibling.innerHTML = `Ya existe un usuario registrado con este email`;
                        inputError[oneInput.name] = true;    
                       }
                    });
                 })
                 .catch(error => console.error("El error es" + error))
                 console.log("################################");
             
         })
     }
     
       
      // ===== Para validar el campo de nombre y apellido =====
      if (oneInput.name === 'first_name' || oneInput.name === 'last_name') {
         oneInput.addEventListener('blur', function () { 
               let inputValue = this.value;
               // si NO esta vacio y el campo tiene menos de 2 caracteres
               if (!validator.isEmpty(inputValue) && inputValue.length<2) {
                  // agrego la clase error al campo
                  this.classList.add('form-error');
                  //mostramos el mensaje de error en el span con clase feedback
                  this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> debe tener como minimo 2 caracteres`;
                  // agregamos el campo al array de errores
                  inputError[oneInput.name] = true;  
               }
         }); 
      }

      // ===== Para validar el campo de contraseña =====
      if (oneInput.name === 'password') {
         oneInput.addEventListener('blur', function () { 
               let inputValue = this.value;
               // si NO esta vacio y el campo tiene menos de 8 caracteres
               if (!validator.isEmpty(inputValue) && inputValue.length<8) {
                  // agrego la clase error al campo
                  this.classList.add('form-error');
                  //mostramos el mensaje de error en el span con clase feedback
                  this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> debe tener como minimo 8 caracteres`;
                  // agregamos el campo al array de errores
                  inputError[oneInput.name] = true;  
               }
         }); 
      }

      // ===== Para validar el campo de chequeo de contraseña =====
      if (oneInput.name === 'passwordCheck') {
         oneInput.addEventListener('blur', function () { 
               let inputValue = this.value;
               // si NO esta vacio y el campo NO coinciden con la contraseña
               if (!validator.isEmpty(inputValue) && (formInputs[3].value!=inputValue)) {
                  // agrego la clase error al campo
                  this.classList.add('form-error');
                  //mostramos el mensaje de error en el span con clase feedback
                  this.nextElementSibling.innerHTML = `No coinciden las contraseñas`;
                  // agregamos el campo al array de errores
                  inputError[oneInput.name] = true;  
               }
         }); 
      }



      // ===== Para validar el campo de IMAGEN =====
      if (oneInput.name === 'avatar') {
         oneInput.addEventListener('blur', function () { 
               let inputValue = this.value;

               //Almacenamos la extension como string en una variable
               let avatarExtension = inputValue.substring(inputValue.lastIndexOf('.') + 1).toLowerCase()

               if ((avatarExtension != "jpg" && avatarExtension != "png" && avatarExtension != "gif" && avatarExtension != "jpeg")) {
                  // agrego la clase error al campo
                  this.classList.add('form-error');
                  //mostramos el mensaje de error en el span con clase feedback
                  this.nextElementSibling.innerHTML = `La extension del archivo no es valida`;
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


