# Dictamen · juego de cátedra

Juego educativo en tiempo real para actividades de cátedra universitaria.
Equipos leen un fragmento, dictaminan entre tres opciones y justifican;
cátedra puntúa cada respuesta.

## Estado: Etapa 1 de 8 — esqueleto navegable

`index.html` es la aplicación. Se abre en cualquier navegador (celular o
computadora) y no necesita instalar nada.

Lo que **ya funciona**:

- Pantalla de entrada con código de sala y PIN de cátedra
- Armado de la partida: tipo de actividad, fragmentos de la biblioteca,
  fragmento nuevo al vuelo, tiempo por ronda
- Las tres interfaces completas (docente, cátedra, estudiante) en las cinco
  fases: sala de espera, ronda, puntuación, revelación y cierre
- Cronómetro con autoenvío de la respuesta al vencer el tiempo
- Puntajes +2 / +1 / 0 y ranking acumulado

Lo que **todavía no**: la partida vive solo en la memoria de la pestaña.
Si recargás, se borra, y no se comparte entre celulares. Eso llega en la
Etapa 2, cuando se conecta la base de datos en tiempo real.

Mientras tanto, la barra negra de abajo permite ver las tres interfaces de
la misma partida desde un solo dispositivo. Esa barra desaparece cuando el
tiempo real esté conectado.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La aplicación |
| `prototipo-v1.html` | Prototipo anterior (sincronizaba celular a celular con PeerJS). Se conserva como referencia; no se usa. |
