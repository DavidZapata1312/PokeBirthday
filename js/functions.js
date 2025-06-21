// Clase que representa al Entrenador Pokémon
class Entrenador {
  constructor(nombre, genero, dia, mes, anio) {
    // Se almacenan los datos básicos del entrenador
    this.nombre = nombre;
    this.genero = genero;
    this.fechaNacimiento = { dia, mes, anio };

    // Atributos que se completarán más adelante
    this.pokemonInicial = null; // nombre y número del pokémon asignado
    this.sprite = null;         // URL del sprite
    this.tipos = [];            // Tipos del Pokémon (agua, fuego, etc.)
  }

  // Método para asignar un Pokémon según la fecha de nacimiento
  async asignarPokemon(dia, mes, anio) {
    // Semilla para generar aleatoriedad basada en el año de nacimiento
    const seed = anio;
    const random = this.seededRandom(seed); // función personalizada de aleatoriedad

    // Base numérica a partir del día, mes y dos últimos dígitos del año
    const base = (dia * mes) + (anio % 100);

    // Mezcla aleatoria (pseudoaleatoria) para variar aún más
    const mix = Math.floor(random() * 493);

    // Se calcula un número final entre 1 y 493 (Gen 1-4)
    const numeroPokemon = ((base + mix) % 493) + 1;

    // Probabilidad 1 entre 4000 para que salga shiny
    const esShiny = Math.floor(Math.random() * 4000) === 0;

    try {
      // Se consulta la PokéAPI para obtener datos del Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`);
      if (!response.ok) throw new Error("No se pudo obtener el Pokémon");

      const data = await response.json();

      // Se capitaliza el nombre del Pokémon (por estética)
      const nombrePokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);

      // Se asigna el sprite (normal)
      this.sprite = data.sprites.front_default;

      // Se extraen los tipos del Pokémon desde la API
      this.tipos = data.types.map(t => t.type.name);

      // Se retorna una cadena con número, nombre y si es shiny
      return `#${numeroPokemon} - ${nombrePokemon}${esShiny ? " (Shiny)" : ""}`;
    } catch (error) {
      // Si falla la API, se retorna un mensaje con el número pero sin nombre
      console.error("Error al obtener el Pokémon:", error);
      return `#${numeroPokemon} (Error al obtener el nombre)`;
    }
  }

  // Generador de número aleatorio basado en semilla (como random.seed en Python)
  seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return function () {
      x = Math.sin(x) * 10000;
      return x - Math.floor(x);
    };
  }

  // Inicializa todo el proceso: asigna el Pokémon y guarda el resultado
  async inicializar() {
    this.pokemonInicial = await this.asignarPokemon(
      this.fechaNacimiento.dia,
      this.fechaNacimiento.mes,
      this.fechaNacimiento.anio
    );
    return this; // retorna el objeto Entrenador con todo listo
  }

  // Devuelve una cadena con toda la info del entrenador y su Pokémon inicial
  mostrarInfo() {
    return `Entrenador: ${this.nombre}\n` +
           `Género: ${this.genero}\n` +
           `Fecha de Nacimiento: ${this.fechaNacimiento.dia}/${this.fechaNacimiento.mes}/${this.fechaNacimiento.anio}\n` +
           `Pokémon Inicial: ${this.pokemonInicial}\n` +
           `Tipo(s): ${this.tipos.join(", ")}`;
  }
}

// ===============================
// Función que se ejecuta al presionar el botón
// ===============================
async function crearEntrenador() {
  // Se obtienen los valores desde los inputs del formulario
  const nombre = document.getElementById("nombre").value;
  const genero = document.getElementById("genero").value;
  const dia = parseInt(document.getElementById("dia").value);
  const mes = parseInt(document.getElementById("mes").value);
  const anio = parseInt(document.getElementById("anio").value);

  // Validación básica para que no falte nada
  if (!nombre || isNaN(dia) || isNaN(mes) || isNaN(anio)) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  // Se crea el objeto Entrenador
  const entrenador = new Entrenador(nombre, genero, dia, mes, anio);

  // Se inicializa (asigna el Pokémon y obtiene todo)
  await entrenador.inicializar();

  // Se muestra la info del entrenador y Pokémon en el div de resultado
  document.getElementById("info").textContent = entrenador.mostrarInfo();

  // Se muestra el sprite del Pokémon si existe
  const spriteImg = document.getElementById("sprite");
  if (entrenador.sprite) {
    spriteImg.src = entrenador.sprite;
    spriteImg.hidden = false;
  } else {
    spriteImg.hidden = true;
  }
}
