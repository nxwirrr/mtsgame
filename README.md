# Dictamen · juego de cátedra

Juego educativo en tiempo real para actividades de cátedra universitaria.
Equipos leen un fragmento, dictaminan entre tres opciones y justifican;
cátedra puntúa cada respuesta.

## Estado: Etapa 2 de 8 — tiempo real

`index.html` es la aplicación. Se abre en cualquier navegador (celular o
computadora) y no necesita instalar nada.

Funciona en dos modalidades, según haya o no configuración de base de datos:

- **Modo nube** (con `FIREBASE_CONFIG` completo): la partida vive en
  Firestore. Cada dispositivo escucha los cambios y se actualiza solo.
- **Modo demo** (configuración vacía, o sin internet): la partida vive en la
  memoria de la pestaña y aparece una barra para recorrer los tres roles
  desde un solo dispositivo. Es también la red de seguridad si la librería
  de Firebase no carga.

Lo que ya funciona:

- Entrada con código de sala; PIN aparte para el equipo de cátedra
- Sorteo automático de equipos al entrar, equilibrando la cantidad de gente
- Armado de la partida: tipo de actividad, fragmentos, tiempo por ronda
- Las tres interfaces en las cinco fases: sala de espera, ronda, puntuación,
  revelación y cierre, sincronizadas entre dispositivos
- Cronómetro con autoenvío de la respuesta al vencer el tiempo
- Puntajes +2 / +1 / 0 y ranking acumulado
- Reingreso: quien recarga el navegador vuelve a su mismo equipo

Falta: biblioteca de fragmentos persistente (Etapa 3), criterios de puntaje
editables desde la app (Etapa 7) y reglas de seguridad (Etapa 8).

## Poner en marcha la base de datos

1. Crear un proyecto en <https://console.firebase.google.com>
2. Agregar una aplicación web y copiar el bloque `firebaseConfig`
3. Activar Firestore Database y el proveedor de acceso *Anónimo*
4. Pegar esos valores en `FIREBASE_CONFIG`, arriba de todo en `index.html`

Esos valores no son secretos: Firebase los publica en el código de la
página a propósito. Lo que protege los datos son las reglas de seguridad.

Para desarrollo, `?emulador=1` conecta contra un Firestore de prueba local
(`firebase emulators:start --only firestore,auth`) sin necesidad de cuenta.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La aplicación |
| `prototipo-v1.html` | Prototipo anterior (sincronizaba celular a celular con PeerJS). Se conserva como referencia; no se usa. |
