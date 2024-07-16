/**
 * 
 * @param {numbers[]} arr1 Array 1 con un conjunto de elementos
 * @param {numbers[]} arr2 Array 2 con un conjunto de elementos
 */
function intersectArrays(arr1, arr2) {
    // implementar la función

    // Debemos comprobar si cada número del array arr1 existe dentro del arr2
    // Podemos filtrar este array mirando si cada uno de los elementos del arr1 esta incluido en el arr2
    return arr1.filter(v => arr2.includes(v));

    // return 
}

// Caso de prueba 1
const arr1_1 = [1, 2, 3, 4, 5];
const arr2_1 = [1, 2, 3, 4, 5];
console.log(intersectArrays(arr1_1, arr2_1)); // Resultado esperado: [1, 2, 3, 4, 5]

// Caso de prueba 2
const arr1_2 = ['10', '20', '30', '40'];
const arr2_2 = ['30', '40', '50', '60'];
console.log(intersectArrays(arr1_2, arr2_2)); // Resultado esperado: [30, 40]

// Caso de prueba 3
const arr1_3 = [1, 2, 3];
const arr2_3 = [4, 5, 6];
console.log(intersectArrays(arr1_3, arr2_3)); // Resultado esperado: []