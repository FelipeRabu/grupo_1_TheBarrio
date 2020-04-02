//Capturamos los formularios
let form = document.querySelector('#products-form');

//Capturamos los elementos del formulario
let formInputs = Array.from(form.elements);

//Sacamos el valor del boton del array
formInputs.pop();

//Objeto literal donde tengo los campos con error
let inputError = {};


//Iteramos el array de campos del formulario
formInputs.forEach(oneInput => {
   //agregamos el evento blur al campo 
    oneInput.addEventListener('blur',function() {
        //capturamos el valor del campo 
        let inputValue = this.value;
        
        //validamos si el valor del campo esta vacio  
        if (validator.isEmpty(inputValue,{ ignore_whitespace: true }) ){
           //Agrego la clase de error al campo 
           this.classList.add('error');
           // Mostramos el mensaje de error en el span con clase (errorProduct) /  (dataset) > es para mostrar el valor (data-name) del formulario
           this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> no puede estar vacio`
           inputError[oneInput.name] = true;  
        } else
        {
            // elimino la clase error del campo
            this.classList.remove('error');
            // elimino el texto que tenga el feedback
            this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> no puede estar vacio`;
            // elimina el campo del array de errores
            delete inputError[oneInput.name];
        }
   })      
    
    // El nombre debe tener al menos 5 caracteres 
    if (oneInput.name ==='name'){
        oneInput.addEventListener('blur', function(){ 
            let inputValue = this.value;
            // si NO esta vacio y el campo tiene menos de 5 caracteres
            if (!validator.isEmpty(inputValue) && inputValue.length<5)  {
                this.classList.add('error');
                this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> debe tener como minimo 5 caracteres`;
                inputError[oneInput.name] = true; 
            }else{
                // elimino la clase error del campo
                this.classList.remove('form-error');
                // elimino el texto que tenga el feedback
                this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> no puede estar vacio`;
                // elimina el campo del array de errores
                delete inputError[oneInput.name];
            }
        }) 
    }

    // Validando el campo de imagen jpg - png - jpge    
    if (oneInput.name ==='image') {
        oneInput.addEventListener('blur', function(){
            //  Array de extensiones validas a subir
            let valiExtension = ['jpg','jpeg','gif','png']
            // nos separa por puntos y sacamos el ultimo  .split('.').pop();
            let fileExtension = this.value.split('.').pop(); 
            let isValidExtension = valiExtension.includes(fileExtension);
            // Si no esta la extension en el array 
            if(!isValidExtension){
                this.nextElementSibling.innerHTML = `La extensión <b>${fileExtension}</b> no esta permitida, solo se permiten <i>${valiExtension}</i>`
                inputError[oneInput.name] = true;
            }else{
                // elimino la clase error del campo
                this.classList.remove('form-error');
                // elimino el texto que tenga el feedback
                this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> no puede estar vacio`;
                // elimina el campo del array de errores
                delete inputError[oneInput.name];
            }
        })    
    } 

  

}); //cierre foreach



// Si se trata de enviar el formulario antes de hacer el blur de los campos 
form.addEventListener('submit', function(e){
    
    //Por si los que tocan Sumbit de una, se fija si los campos estan vacios:
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

    // Almacena las propiedades del obj de errores en un array y se fija si ese array tiene algo 
    if(Object.keys(inputError).length > 0){
       // Evita el envio del formulario
        e.preventDefault();
        
    }

});