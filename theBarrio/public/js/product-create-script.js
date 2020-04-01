/*
// capturamos el formulario de producto por medio de la clase 
const productForm = document.querySelector('.product-form')

// capturamos los elementos del formulario en un array
let productFormProps = Array.from(productForm.elements);

//sacar el boton de envio del array. 
productFormProps.pop()

console.log(productFormProps[1])

for (const aProp of productFormProps) {

    aProp.addEventListener("blur", function (event){

        
        // ===== Para validar si los campos estan vacios =====
        if (validator.isEmpty(aProp.value, { ignore_whitespace : true })) {
            //let span = document.querySelectorAll('span')   //NO ME ANDAAA EL "All"
            let span = document.querySelector('span')
            //tambien lo podriamos hacer con querySelector en span e innerHTML?
            //otra forma de hacerlo es con un display:block en una clase de css
            //span.innerHTML = "<span> Error el campo esta vacio <span>"
            span.setAttribute("class", "form-error")
            aProp.classList.add('form-error')
        } else {
            aProp.classList.remove('form-error')
        }
        

        // VALIDACION DE IMAGEN
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
    
    }) //Cierre del event blur 
} //Cierre del For

