import random
from datetime import date
import json
import os

class Entrenador:
    def __init__(self, nombre, genero, dia, mes, anio):
        self.nombre = nombre
        self.genero = genero
        self.fecha_nacimiento = (dia, mes, anio)
        self.pokedex = self.cargar_pokedex()
        self.pokemon_inicial = self.asignar_pokemon(dia, mes, anio)

    def cargar_pokedex(self):
        """Carga la Pokédex desde un archivo JSON"""
        ruta_pokedex = os.path.join("assets", "pokedex.json")
        with open(ruta_pokedex, "r", encoding="utf-8") as archivo:
            return json.load(archivo)

    def asignar_pokemon(self, dia, mes, anio):
        """Asigna un Pokémon inicial basado en la fecha de nacimiento"""
        numero_pokemon = dia + mes + (anio % 10)  # Última cifra del año
        if 1 <= numero_pokemon <= 493:
            return self.pokedex[str(numero_pokemon)]
        else:
            shiny_pokemon = self.pokedex[str(numero_pokemon // 4)]
            return f"{shiny_pokemon} (Shiny)"

    def mostrar_info(self):
        """Muestra la información del entrenador"""
        print(f"Entrenador: {self.nombre}")
        print(f"Género: {self.genero}")
        print(f"Fecha de Nacimiento: {self.fecha_nacimiento[0]}/{self.fecha_nacimiento[1]}/{self.fecha_nacimiento[2]}")
        print(f"Pokémon Inicial: {self.pokemon_inicial}")

# Ejemplo de uso
entrenador1 = Entrenador("Ash", "Masculino", 1, 12, 1997)
entrenador1.mostrar_info()