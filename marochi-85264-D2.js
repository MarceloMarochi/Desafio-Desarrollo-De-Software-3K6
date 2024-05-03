/* Desafío 2:

En este Desafío 02 se propone el desarrollo y prueba de un programa que consuma un archivo .json, lo lea y lo cargue en una colección de objetos en memoria para luego con esa colección calcular los resultados que se requieren en la consigna.

Objetivos:
Lectura de un archivo .json
Creación de objetos y almacenamiento en una colección
Manipulación de colecciones con funciones de orden superior
Enunciado y Consignas:
Su tarea es desarrollar un programa que desde el archivo personas.json que contiene los datos de un conjunto de personas como un array de objetos json almacenados en modo texto, cargue estos datos de cada persona en una colección en memoria para luego procesar dicha colección en busca de resultados.

A continuación transcribimos las primeras líneas del archivo personas.json para su revisión:

[
  {"nombre": "RUBEN", "apellido": "GIL", "edad": 14},
  {"nombre": "MANUELA", "apellido": "RUBIO", "edad": 52},
  {"nombre": "JOSE CARLOS", "apellido": "DELGADO", "edad": 17},
  {"nombre": "IVAN", "apellido": "ALVAREZ", "edad": 51},
  {"nombre": "JOSE ANGEL", "apellido": "MORENO", "edad": 36},
  {"nombre": "TERESA", "apellido": "VELASCO", "edad": 92},
...
Una vez cargado el archivo en una colección de objetos en memoria el programa debe calcular e informar los resultados para las consignas que se definen a continuación:

Calcular el promedio entero de las edades de todas las personas del archivo
Informar el Nombre y Apellido de la persona más joven del conjunto (si hubiere más de una persona con esa misma edad debe informar la primera que aparezca en el archivo).
Informar los Nombres separados por coma ", " de todas las personas con apellido GOMEZ, ordenados alfabéticamente.
Suma de las edades de aquellas personas cuyo nombre tenga una longitud par y el  apellido una longitud impar.
Construir una funcionalidad que genere un objeto en su notación JSON que contenga los siguientes atributos o propiedades:
  - mayores: cantidad de personas con edad > 18
  - menores: cantidad de personas con edad <= 18
  - primeraMitad: cantidad de personas cuyo apellido comienza con A-L
  - segundaMitad: cantidad de personas cuyo apellido comienza con M-Z
Construir una funcionalidad que genere un objeto en su notación JSON que contenga los siguientes atributos, cuyos valores deben ser la cantidad de personas correspondientes a cada apellido:
  - CASTILLO
  - DIAZ
  - FERRER
  - PINO
  - ROMERO

Con su programa finalizado, deberá responder las preguntas siguientes cargando en cada respuesta el resultado respetando la forma de carga para cada caso. */

import fs from "fs";

class Persona {
  constructor(nombre, apellido, edad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }
  toString() {
    return `#${this.nombre} | ${this.apellido} | ${this.edad}`;
  }
}

function recuperar_data_json() {
  const arregloPersonas = [];

  // Leer y cargar el archivo JSON
  const personasJSON = fs.readFileSync("./personas.json", "utf-8");
  const personas = JSON.parse(personasJSON);

  personas.forEach((e) => {
    let nombre = e.nombre;
    let apellido = e.apellido;
    let edad = e.edad;
    const persona = new Persona(nombre, apellido, edad);
    arregloPersonas.push(persona);
  });

  return arregloPersonas;
}

function calcularEdades(arreglo) {
  let sum = 0;
  let cont = 0;
  arreglo.forEach((e) => {
    sum += e.edad;
    cont += 1;
  });
  const prom = Math.round(sum / cont);
  console.log(
    `El promedio de edad es: ${prom}\n--------------------------------------------------------\n`
  );
}

function personaMasJoven(arreglo) {
  let menor = 100;
  let nombrePersonaMenor = "";
  let apellidoPersonaMenor = "";
  arreglo.forEach((e) => {
    if (e.edad < menor) {
      menor = e.edad;
      nombrePersonaMenor = e.nombre;
      apellidoPersonaMenor = e.apellido;
    }
  });

  console.log(
    `El nombre y apellido de la persona con menor edad es: ${nombrePersonaMenor} ${apellidoPersonaMenor}\n--------------------------------------------------------\n`
  );
}

function arregloGomez(arreglo) {
  const v = [];
  arreglo.forEach((e) => {
    if (e.apellido == "GOMEZ") {
      v.push(e.nombre);
    }
  });
  v.sort();

  console.log(
    `Listado de nombres con apellido Gomez: \n\n${v}\n--------------------------------------------------------\n`
  );
}

function nombreParApellidoImpar(arreglo) {
  let sum = 0;
  arreglo.forEach((e) => {
    if (e.nombre.length % 2 === 0 && e.apellido.length % 2 !== 0) {
      sum += e.edad;
    }
  });
  console.log(
    `La suma de las edades de personas con nombre par y apellido impar es: ${sum}\n--------------------------------------------------------\n`
  );
}

function objetoJson(arreglo) {
  const mayores = arreglo.filter((persona) => persona.edad > 18).length;
  const menores = arreglo.filter((persona) => persona.edad <= 18).length;
  const primeraMitad = arreglo.filter((persona) =>
    "ABCDEFGHIJKL".includes(persona.apellido[0].toUpperCase())
  ).length;
  const segundaMitad = arreglo.filter((persona) =>
    "MNOPQRSTUVWXYZ".includes(persona.apellido[0].toUpperCase())
  ).length;

  const objetoCreado = {
    mayores: mayores,
    menores: menores,
    primeraMitad: primeraMitad,
    segundaMitad: segundaMitad,
  };

  console.log(
    "Objeto JSON creado crado con los atributos solicitados: \n\n",
    JSON.stringify(objetoCreado),
    "\n--------------------------------------------------------\n"
  );
}

function objetoApellido(arreglo) {
  const apellidos = ["CASTILLO", "DIAZ", "FERRER", "PINO", "ROMERO"];
  const conteoApellidos = {};

  apellidos.forEach((apellido) => {
    conteoApellidos[apellido] = arreglo.filter(
      (persona) => persona.apellido === apellido
    ).length;
  });

  console.log(
    "Conteo de apellidos:\n",
    JSON.stringify(conteoApellidos, null, 4),
    "\n--------------------------------------------------------\n"
  );
}

(() => {
  console.log(
    "\nRecuperando datos del JSON\n--------------------------------------------------------\n"
  );
  const arreglo = recuperar_data_json();

  calcularEdades(arreglo);
  personaMasJoven(arreglo);
  arregloGomez(arreglo);
  nombreParApellidoImpar(arreglo);
  objetoJson(arreglo);
  objetoApellido(arreglo);
})();
