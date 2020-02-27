
// capturamos el formulario
let form = document.querySelector('#loginForm');

// capturar los elementos del formulario

let formInputs = Array.from(form.elements);    //form.elemts te da todos los campos que tenga un formulario
 // lo convierto en array para hacer pop del button

//sacamos  el boton de ingresar del array
formInputs.pop();

 // iteramos el array de campos del formulario
 formInputs.forEach(oneInput => {
     // agregamos el evento blur a cada campo
     oneInput.addEventListener('blur', function () {
         // capturamos el valor del campo
         let inputValue = this.value;

         // validamos si el  valor del campo está vacio
         if (validator.isEmpty(inputValue, { ignore_whitespace: true })) { //evita escribir espacios
        
        // agrego la clsae error al campo
        this.classList.add('error');

         // mostramos el mensaje de error en el span con clase feedback
            this.nextElementSibling.innerHTML = `el campo <b>${this.dataset.name}</b> no puede estar vacio`; //si tiene un texto vacio le voy a hacer algo a su elemento hermano
           
         } else
          
        // elimino la clase error del campo
        this.classList.remove('error');

        // elimino el texto que tenga el feedback
        this.nextElementSibling.innerHTML = `el campo <b>${this.dataset.name}</b> no puede estar vacio`; //si tiene un texto vacio le voy a hacer algo a su elemto hermano
     });

     // validando el campo email de manera particular
     if (oneInput.name === 'email') {
         // cuando salimos del campo
        oneInput.addEventListener('blur', function () { 
            //capturo el valor del campo
            let inputValue = this.value;

            

            // si NO esta vacio y el campo NO es un email
            if (!validator.isEmpty(inputValue) && !validator.isEmail(inputValue)) {
                
                
            // agrego la clase error al campo
            this.classList.add('error');
            //mostramos el mensaje de error en el span con clase feedback
            this.nextElementSibling.innerHTML = `el campo <b>${this.dataset.name}</b> debe tener un formato email valido`;
                   
            }
            
        }); 
         
         
     }
 });


