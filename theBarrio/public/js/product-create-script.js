

const productForm = document.querySelector('.product-form')

let productFormProps = Array.from(productForm.elements);

console.log(productFormProps[0])

for (const aProp of productFormProps) {

    aProp.addEventListener("blur", function (event){

        /*if (aProp.value == "Remera") {
            aProp.classList.add('clase-hola')
        }*/

        if (validator.isEmpty(aProp.value)) {
            aProp.classList.add('clase-hola')
        }
    
    })


    
}






