## 🤔 ¿Qué es una API?

Una **API** (Interfaz de Programación de Aplicaciones) es una especie de puente entre tu aplicación y otra fuente de datos.  
Con una API podés pedir información, como si fueras a una biblioteca digital, y te la devuelven en un formato entendible (generalmente **JSON**).

> 🧠 Ejemplo de API:  
> [https://pokeapi.co](https://pokeapi.co) te da datos de todos los Pokémon.

---

## ✅ Requisitos

- Un navegador moderno (Chrome, Firefox, Edge…)
- Conexión a Internet (si la API es en línea)
- Archivos HTML + JS

---

## 🔧 ¿Cómo consumir una API en JS?

### Paso 1: Hacer la petición con `fetch()`

```js
fetch("https://pokeapi.co/api/v2/pokemon/25")
  .then(response => response.json())
  .then(data => {
    console.log(data.name);         // 👉 "pikachu"
    console.log(data.types);        // 👉 tipos del pokémon
    console.log(data.sprites.front_default); // 👉 URL del sprite
  })
  .catch(error => {
    console.error("Error al consumir la API:", error);
  });
```

📌 Tips útiles
Siempre usá try/catch o .catch() para manejar errores de red o respuestas inválidas.

Revisá la documentación de la API (¡casi todas tienen!).

Si la API requiere una clave (API key), protegela bien.

Si ves algo como CORS o Access-Control-Allow-Origin, es que esa API no se puede usar directo desde navegador (en ese caso, necesitás backend o proxy).

📚 ¿Qué podés hacer con una API?
Mostrar datos dinámicos (clima, noticias, Pokémon )

Crear apps interactivas conectadas a servicios externos

Hacer juegos, estadísticas, dashboards...
