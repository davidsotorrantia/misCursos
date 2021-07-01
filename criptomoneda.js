//Variación en el precio de una nueva criptomoneda: GDL

//Obtener variación entre la suma de los precios de las quincenas inicial y final. Porcentaje de crecimiento o disminución...

//Obtener el precio medio de la moneda en el mes.


//*******HELPERS*****************************//
function calcularPromedio (lista) { 
    const sumaValores = lista.reduce( 
        function(valorAcumulado = 0, valorActual) {
            return valorAcumulado + valorActual;
        }
    );
    
    const promedioLista = sumaValores / lista.length;
    return promedioLista;
}

function esPar (numero) {
     return (numero % 2 === 0);
 };

 //********************************************** */

 ///////////////Calculadora de mediana////////////////////////////
function medianaPrecios(lista) {
    const mitad = parseInt(lista.length / 2);

    if(esPar(lista.length)) {
        const diaMitad1 = lista[mitad - 1];
        const diaMitad2 = lista[mitad];

        const mediana = calcularPromedio([diaMitad1, diaMitad2]);

        return mediana;

    } else {
        const diaMitad = lista[mitad];
        return diaMitad;
    }
}
////////////////////////////////////////////////////////////

// Mediana con datos del mes
function medianaMensualGdl () {
    const preciosGdl = GDL.map(
        function (day) {
            return day.precio;
        }
        
    );
    
    const preciosGdlSorted = preciosGdl.sort(
        function(precioA, precioB) {
            return precioA - precioB;
        }
    );
    
    medianaMensualGdl = medianaPrecios(preciosGdlSorted);

    return medianaMensualGdl;

    
}

///////////////////////////////////////////////////////////////
//Volver a usar map para los splices
const pricesGdl = GDL.map(
    function (day) {
        return day.precio;
    }
);

const spliceStart = 0;
const spliceCount = 15;

const primeraQuincenaDiario = pricesGdl.splice(spliceStart, spliceCount);

///Sumar las quincenas y sacar diferencias entre la segunda y primera.

function diferenciaQuincenas(){
    
    function primeraQuincena(){
        const sumaPrimeraQuincena = primeraQuincenaDiario.reduce(
            function (valorAcumulado = 0, valorActual) {
                return valorAcumulado + valorActual;
            }
        );
        return sumaPrimeraQuincena;
    };

    function segundaQuincena(){
        const sumaSegundaQuincena = pricesGdl.reduce(
            function (valorAcumulado = 0, valorActual) {
                return valorAcumulado + valorActual;
            }
        );
        return sumaSegundaQuincena;
    };

    return segundaQuincena() / primeraQuincena();
};

/////////////////////Interactuar con el HTML////////////////////////

const medianaMensual = medianaMensualGdl();

const botonMediana = document.querySelector('.mediana');
botonMediana.addEventListener('click', function() {
    
    const mostrarMediana = document.createElement('P');
    mostrarMediana.textContent = `La mediana mensual es: ${medianaMensual}`;
    mostrarMediana.classList.add('mostrarMediana');
    botonMediana.appendChild(mostrarMediana);

    

});



const diferencia = diferenciaQuincenas();

const botonDiferencias = document.querySelector('.diferencia');
botonDiferencias.addEventListener('click', function(){

    const mostrarDiferencia = document.createElement('P');
    mostrarDiferencia.textContent = `La diferencia de la segunda quincena respecto a la primera fue de ${diferencia} veces la primera`;
    mostrarDiferencia.classList.add('mostrarDiferencia');
    botonDiferencias.appendChild(mostrarDiferencia);

    return
});
    

    