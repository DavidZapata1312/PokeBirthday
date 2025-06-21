# 🎉 PokeBirthday - Tu Pokémon inicial según tu fecha de nacimiento

Este proyecto es una mini aplicación web que te asigna un Pokémon inicial basado en tu **fecha de nacimiento**, con una probabilidad de 1 en 4000 de que te salga **shiny** ✨. Utiliza datos reales obtenidos desde una API oficial.

---

## 🌐 ¿Qué es una API?

Una **API** (Interfaz de Programación de Aplicaciones) es como un *mesero digital* 📡 que te permite pedir datos o servicios a una aplicación externa (como una base de datos, otro programa o un servidor web), y te devuelve la información que pediste en un formato entendible, usualmente JSON.

En este proyecto usamos una **API pública llamada [PokeAPI](https://pokeapi.co/)**, que contiene información de todos los Pokémon como:
- Nombre
- Tipos
- Imágenes (sprites)
- Habilidades, movimientos y más

---

## 🧠 ¿Cómo consumimos la API en este proyecto?

Usamos `fetch()` en JavaScript para hacer una petición a la URL de un Pokémon específico:

```javascript
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`);
const data = await response.json();
```

Esto nos devuelve un objeto con toda la información del Pokémon, y de ahí extraemos:
- Su **nombre**
- Su(s) **tipo(s)** (agua, fuego, etc.)
- Su **sprite** (imagen frontal del Pokémon)

El número del Pokémon se calcula con una fórmula basada en el día, mes y año de nacimiento del usuario, combinando lógica y aleatoriedad controlada.

---

## 🧪 Tecnologías usadas

- **HTML5**: Estructura básica de la app
- **CSS3**: Estilizado con colores inspirados en Lugia
- **JavaScript (ES6)**: Lógica, clases, consumo de API
- **[PokeAPI](https://pokeapi.co/)**: Para obtener datos reales de los Pokémon

---

## 🖼️ Resultado visual

El usuario rellena un formulario con su nombre y fecha de nacimiento, y al hacer clic, se le muestra:
- Su Pokémon asignado
- El tipo del Pokémon
- Su sprite (imagen frontal)

---

## 🛠️ Cómo ejecutarlo

1. Clona este repositorio o descarga los archivos.
2. Abre `index.html` en tu navegador.
3. ¡Listo! Solo necesitas conexión a internet para consumir la API.

---

## 🤔 ¿Por qué esto es útil para aprender?

Este proyecto es ideal para aprender:
- Cómo conectar una app web con una API real
- Cómo manipular datos JSON
- Cómo trabajar con clases en JavaScript
- Cómo separar bien la lógica de presentación (JS/CSS/HTML)

---

## 🚀 Extras que podrías agregar

- Sonido de aparición de Pokémon
- Opciones para elegir generaciones
- Guardar tu resultado en localStorage
- Compartir tu Pokémon en redes

---

## 📜 Licencia

Este proyecto es libre para uso educativo y personal.

---

### Hecho con cariño por Davi 🧢⚡
