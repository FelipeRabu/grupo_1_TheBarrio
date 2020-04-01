//capturamos los formularios
let form = document.querySelector('#products-form');

//capturamos los elementos del formulario
let formInputs = Array.from(form.elements);

// sacamos el valor del boton del array
formInputs.pop();

//objeto literal donde tengo los campos con error
let inputError = {};

//Iteramos el array de campos del formulario
formInputs.forEach(oneInput => {
   //agregamos el evento blur al campo 
    oneInput.addEventListener('blur',function() {
        //capturamos el valor del campo 
        let inputValue = this.value;
        //console.log(`El valor del campo' ${this.name} es ${inputValue}`);
        
        //validamos si el valor del campo esta vació //  Docuemntacion express isEmpty{ ignore_whitespace: false }  
        if (validator.isEmpty(inputValue,{ ignore_whitespace: true }) ){
           console.log(`El valor del campo ${this.name} esta vació `)
           //Agrego la clase de error al campo 
           this.classList.add('error');
           // Mostramos el mensaje de error en el span con clase (errorProduct) /  (dataset) > es para mostrar el valor (data-name) del formulario
           this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> no puede estar vacio`
        
        } 
        else  
        {
           //Elimino la clase de error del campo (remove) 
           this.classList.remove('error');
           // Elimino el texto que tenga feeback  
           this.nextElementSibling.innerHTML = ''
         
        }

        /*
        // El nombre debe tener al menos 5 caracteres 
        if (inputValue.length <= 5){
             
            console.log(`El nombre debe tener almenos 5 caracteres `)
            this.classList.add('error');
            this.nextElementSibling.innerHTML = `El nombre debe tener al menos 5 caracteres`
        }
        else
        {
            //Elimino la clase de error del campo (remove) 
           this.classList.remove('error');
           // Elimino el texto que tenga feeback  
           this.nextElementSibling.innerHTML = '' 
        };
        
         */

        
        // Validando el campo de imagen jpg - png - jpge    
        if (oneInput.name ==='image') {
            oneInput.addEventListener('change', function(){
                //  Array de extensiones validas a subir
                let valiExtension = ['jpg','jpeg','gif','svg','png','webm']
                // nos separa por puntos y sacamos el ultimo  .split('.').pop();
                let fileExtension = this.value.split('.').pop();
                
                let isValidExtension = valiExtension.includes(fileExtension);
                // Si no esta la extension en el array 
                if(!isValidExtension){
                    this.nextElementSibling.innerHTML = `La extensión <b>${fileExtension}</b> no esta permitida, solo se permiten <i>${valiExtension}</i>`
                }
                else
                {
                 //Elimino la clase de error del campo 
                 this.classList.remove('error');
                 // Elimino el texto que tenga feeback  
                 this.nextElementSibling.innerHTML = ''
                }
            }) 
        }
    
    })

});




// Si se trata de enviar el formulario antes de hacer el blur de los campos 
form.addEventListener('submit', function(e){
    //Iteramos sobre los campos del formulario
    formInputs.forEach(oneInput =>{
        //capturamos el valor de cada campo
        let inputValue = oneInput.value;

        if(validator.isEmpty(inputValue,{ ignore_whitespace: true })) {
         // Si el campo esta vacio agrego una propiedad al objeto de errores con valor true
         inputError[oneInput.name] = true;
         // Agregamos la clase error para notificar al usuario que no enviamos el formulario
         oneInput.classList.add('error');
        } 
    }) 
    // si el objeto de errores tiene algo  
    if(Object.keys(inputError).length > 0){
        
       // Evita el envio del formulario
        e.preventDefault();
    }

});