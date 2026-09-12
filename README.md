# Dictamen · juego de cátedra

Juego educativo en tiempo real para actividades de cátedra universitaria.
Equipos reciben un ítem, eligen una respuesta y la justifican; cátedra puntúa
la justificación. La actividad y el formato de respuesta los define la
cátedra: evaluación de fragmentos, verdadero o falso, opción múltiple.

## Estado: en uso

`index.html` es la aplicación entera. Se abre en cualquier navegador, de
celular o de computadora, y no necesita instalar nada.

Está conectada a la base de datos de la cátedra. Funciona en dos modalidades:

- **Modo nube** (con `FIREBASE_CONFIG` completo): la partida vive en
  Firestore y cada dispositivo se actualiza solo.
- **Modo demo** (configuración vacía, o sin internet): la partida vive en la
  pestaña y una barra permite recorrer los tres roles desde un solo
  dispositivo. Es también la red de seguridad si la librería no carga.

### Qué hace

- Entrada con código de sala; PIN aparte para el equipo de cátedra
- Sorteo de equipos al entrar, entre dos y ocho, equilibrando integrantes
- Actividades propias: las tres de fábrica se editan y se pueden crear otras
  desde la aplicación, con nombre, consigna y criterio propios
- Tres formatos de respuesta: dictamen (los tres fallos), verdadero o falso,
  y opción múltiple con opciones escritas por quien carga cada ítem, marcando
  una o varias correctas
- Respuesta esperada por ítem, que cátedra ve como referencia al puntar,
  junto con un aviso de si el equipo coincidió
- Biblioteca de ítems que se guarda y se reusa entre clases
- Criterios de puntaje editables por actividad, guardados para toda la
  cátedra; cada partida se lleva su copia al crearse
- Las tres interfaces en las cinco fases, sincronizadas entre dispositivos
- Cronómetro con envío automático de la respuesta al vencer el tiempo
- Puntajes +2 / +1 / 0, ranking acumulado y varias rondas seguidas
- Reingreso automático: quien recarga vuelve a su partida y a su equipo; la
  sesión caduca a las seis horas, para que la clase siguiente arranque limpia
- Los equipos sin nadie no participan: no esperan respuesta ni frenan el
  puntaje, aunque la partida se haya armado para más equipos que los que vinieron
- El cronómetro se cuenta contra la hora del servidor, no la del celular, así
  un teléfono desajustado no ve otro número; quien entra a mitad de la ronda
  recibe el tiempo que queda
- Si el dispositivo de quien dicta la clase se apaga, cátedra cierra la ronda
  cuatro segundos después: la ronda no queda colgada
- Toda escritura que falla avisa en pantalla, y hay un aviso de "sin conexión"

## Cómo se pone en marcha

1. Crear un proyecto en <https://console.firebase.google.com>
2. Agregar una aplicación web y copiar el bloque `firebaseConfig`
3. Activar Firestore Database y el proveedor de acceso *Anónimo*
4. Pegar esos valores en `FIREBASE_CONFIG`, arriba de todo en `index.html`
5. Pegar el contenido de `firestore.rules` en Firestore Database → Reglas

Los valores de `firebaseConfig` no son secretos: Firebase los publica en el
código de la página a propósito. Lo que protege los datos son las reglas.

### Qué garantizan las reglas

Nadie tiene cuenta: cada dispositivo recibe una identidad anónima. Con eso
alcanza para lo que importa, y está verificado contra el emulador:

- el puntaje lo escribe solo cátedra;
- cada equipo escribe solo su propia respuesta, y solo con la ronda abierta;
- el ritmo de la partida lo maneja solo quien la creó, o cátedra;
- el PIN no está en ningún documento que se pueda leer, y declararse cátedra
  exige haberlo presentado.

Cada equipo lee únicamente su propia respuesta: no hay forma de espiar la de
otro equipo durante la ronda, ni desde la pantalla ni desde las herramientas
del navegador. Cátedra las lee todas.

Queda un límite conocido, por no haber cuentas: la biblioteca y los criterios
los puede editar cualquier dispositivo que haya entrado a una partida. Se
cierra con una clave de cátedra, con el mismo mecanismo que usa el PIN de
sala, si alguna vez hace falta.

Para desarrollo, `?emulador=1` conecta contra un Firestore local
(`firebase emulators:start --only firestore,auth`) sin necesidad de cuenta.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La aplicación |
| `firestore.rules` | Reglas de seguridad, para pegar en la consola de Firebase |
| `prototipo-v1.html` | Prototipo anterior (sincronizaba celular a celular con PeerJS). Se conserva como referencia; no se usa. |
