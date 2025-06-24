// Clase que representa al Entrenador Pokémon
class Entrenador {
  constructor(nombre, genero, dia, mes, anio) {
    this.nombre = nombre;
    this.genero = genero;
    this.fechaNacimiento = { dia, mes, anio };
    this.pokemonInicial = null;
    this.sprite = null;
    this.tipos = [];
    this.esShiny = false; // Indica si el Pokémon es shiny
  }

  // Asigna un Pokémon en base a la fecha de nacimiento y semilla aleatoria
  async asignarPokemon(dia, mes, anio) {
    const seed = anio;
    const random = this.seededRandom(seed);

    const base = (dia * mes) + (anio % 100);
    const mix = Math.floor(random() * 493);
    const numeroPokemon = ((base + mix) % 493) + 1;

    // Determina si el Pokémon será shiny (1 en 4000)
    const esShiny = Math.floor(Math.random() * 4000) === 0;
    this.esShiny = esShiny;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`);
      if (!response.ok) throw new Error(`Respuesta inválida: ${response.status}`);

      const data = await response.json();

      const nombrePokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      this.sprite = esShiny ? data.sprites.front_shiny : data.sprites.front_default;
      this.tipos = data.types.map(t => t.type.name);

      return `#${numeroPokemon} - ${nombrePokemon}${esShiny ? " (Shiny)" : ""}`;
    } catch (error) {
      console.error("❌ Error al obtener el Pokémon:", error);
      return `#${numeroPokemon} (Error al obtener el nombre)`;
    }
  }

  // Generador aleatorio basado en una semilla
  seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return function () {
      x = Math.sin(x) * 10000;
      return x - Math.floor(x);
    };
  }

  // Inicializa al entrenador asignándole su Pokémon
  async inicializar() {
    this.pokemonInicial = await this.asignarPokemon(
      this.fechaNacimiento.dia,
      this.fechaNacimiento.mes,
      this.fechaNacimiento.anio
    );
    return this;
  }

  // Muestra toda la info del entrenador
  mostrarInfo() {
    return `Entrenador: ${this.nombre}\n` +
      `Género: ${this.genero}\n` +
      `Fecha de Nacimiento: ${this.fechaNacimiento.dia}/${this.fechaNacimiento.mes}/${this.fechaNacimiento.anio}\n` +
      `Pokémon Inicial: ${this.pokemonInicial}\n` +
      `Tipo(s): ${this.tipos.join(", ")}`;
  }
}

// Función principal que se llama al presionar el botón
async function crearEntrenador() {
  const nombre = document.getElementById("nombre").value.trim();
  const genero = document.getElementById("genero").value;
  const dia = parseInt(document.getElementById("dia").value);
  const mes = parseInt(document.getElementById("mes").value);
  const anio = parseInt(document.getElementById("anio").value);

  // Validación básica de campos
  if (!nombre || isNaN(dia) || isNaN(mes) || isNaN(anio)) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  // Validaciones adicionales
  if (anio < 1900 || anio > 2025) {
    alert("El año debe estar entre 1900 y 2025.");
    return;
  }
  if (mes <= 0 || mes > 12) {
    alert("El mes debe estar entre 1 y 12.");
    return;
  }
  if (dia <= 0 || dia > 31) {
    alert("El día debe estar entre 1 y 31.");
    return;
  }

  try {
    const entrenador = new Entrenador(nombre, genero, dia, mes, anio);
    await entrenador.inicializar();

    const infoContainer = document.getElementById("info");
    infoContainer.textContent = entrenador.mostrarInfo();

    if (entrenador.esShiny) {
      infoContainer.textContent += "\n🌟 ¡Es un Pokémon shiny!";
    }

    const spriteImg = document.getElementById("sprite");
    if (entrenador.sprite) {
      spriteImg.src = entrenador.sprite;
      spriteImg.hidden = false;
      spriteImg.style.filter = entrenador.esShiny ? "drop-shadow(0 0 10px gold)" : "none";
    } else {
      spriteImg.hidden = true;
    }
  } catch (error) {
    console.error("Error general al crear el entrenador:", error);
    alert("Ocurrió un error al crear tu entrenador. Intenta de nuevo más tarde.");
  }
}
