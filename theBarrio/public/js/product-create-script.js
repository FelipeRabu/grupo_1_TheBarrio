

const productForm = document.querySelector('.product-form')

let productFormProps = Array.from(productForm.elements);

//sacar el boton de envio del array. Hace un pop y saca el ultimo elemento que es el boton de submit
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
            span.innerHTML = "<span> Error el campo esta vacio <span>"
            span.setAttribute("class", "form-error")
            aProp.classList.add('form-error')
        } else {
            aProp.classList.remove('form-error')
        }

        // ===== Para validar emails =====
        if (aProp.name === 'email') { 
            
            console.log("ESTE ES UN CAMPO DE EMAIL")
            
            aProp.addEventListener('change', function() {
                
                let propValue = aProp.value;

                if (!validator.isEmail(propValue)) {
                    
                    aProp.classList.add('form-error')
                }
            })
        }
    
    }) //Cierre del event blur 
} //Cierre del For






