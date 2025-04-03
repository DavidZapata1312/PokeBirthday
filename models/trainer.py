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
            return json.load(archivo)["pokemon"]  # Accede a la lista de Pokémon

    def asignar_pokemon(self, dia, mes, anio):
        """Asigna el Pokémon inicial basado en la fecha de nacimiento"""
        random.seed(anio)
        resta_random = random.randint(1500, 1800)
        numero_pokemon = (dia * 2) + mes + (anio - resta_random)

        # Buscar el Pokémon correspondiente en la Pokédex
        for pokemon in self.pokedex:
            if pokemon["numero"] == numero_pokemon:
                return f"#{pokemon['numero']} - {pokemon['nombre']}"

        # Si no está en la Pokédex, calcular el shiny
        shiny_numero = numero_pokemon // 2
        for pokemon in self.pokedex:
            if pokemon["numero"] == shiny_numero:
                return f"#{shiny_numero} - {pokemon['nombre']} (Shiny)"

        # Si no hay Pokémon con ese número, solo mostrar el número
        return f"#{shiny_numero} (Shiny)"

    def mostrar_info(self):
        """Muestra la información del entrenador"""
        print(f"Entrenador: {self.nombre}")
        print(f"Género: {self.genero}")
        print(f"Fecha de Nacimiento: {self.fecha_nacimiento[0]}/{self.fecha_nacimiento[1]}/{self.fecha_nacimiento[2]}")
        print(f"Pokémon Inicial: {self.pokemon_inicial}")

# Ejemplo de uso
entrenador1 = Entrenador("Ash", "Masculino", 5, 5, 2015)
entrenador1.mostrar_info()
