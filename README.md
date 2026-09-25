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
- Cuatro formatos de respuesta: dictamen (los tres fallos), verdadero o
  falso, opción múltiple con opciones escritas por quien carga cada ítem
  marcando una o varias correctas, y respuesta abierta
- Respuesta esperada por ítem —o respuesta modelo, en las abiertas— que
  cátedra ve como referencia al puntuar, junto con un aviso de si el equipo
  coincidió
- Puntaje sugerido opcional: al cerrar la ronda los equipos que acertaron
  quedan con +2 marcado como sugerencia, hasta que cátedra lo confirme
- Justificación escrita opcional por actividad, para controles de lectura
- Duplicar actividades e ítems
- La justificación mejor puntuada de la ronda aparece al revelar, en las tres
  pantallas
- Resumen de la partida descargable en un archivo que abre cualquier planilla
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

Una clave de cátedra protege lo demás: sin ella no se crean partidas, no se
editan los criterios y no se lee la biblioteca, que guarda las respuestas
correctas de cada ítem. La clave no está en ningún documento legible; se
presenta y las reglas comparan, igual que el PIN de sala. La primera vez que
se usa la aplicación, la clave que se escriba queda como la de la cátedra,
así que conviene definirla antes de compartir el enlace.

Para desarrollo, `?emulador=1` conecta contra un Firestore local
(`firebase emulators:start --only firestore,auth`) sin necesidad de cuenta.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La aplicación |
| `firestore.rules` | Reglas de seguridad, para pegar en la consola de Firebase |
| `prototipo-v1.html` | Prototipo anterior (sincronizaba celular a celular con PeerJS). Se conserva como referencia; no se usa. |
| `finanzas/` | Plata: finanzas personales del mes. Aplicación aparte, sin relación con el juego. |

---

# Plata · finanzas del mes

`finanzas/index.html` es otra aplicación entera en un archivo. Se abre en
cualquier navegador y no necesita instalar nada, ni cuenta, ni internet: todo
lo que se carga queda en el `localStorage` de ese navegador y no sale del
dispositivo.

Contesta cuatro preguntas:

1. **cuánta plata hay** — lo que entra, lo que ya está comprometido y lo que
   queda libre de verdad, mes por mes;
2. **cuánto se va** — cuentas fijas con su día de vencimiento, suscripciones,
   cuotas y gastos sueltos, con lo pagado y lo que falta pagar;
3. **cuánto se puede guardar** — ahorro y gastos random como reservas que
   salen antes de que la plata se evapore, en porcentaje o en monto fijo;
4. **si conviene una compra** — contado contra cuotas, y si la cuota entra
   en el mes.

### Qué hace

- Resumen del mes con la composición del gasto y el aviso cuando no cierra
- Navegación por mes: lo de cada mes se calcula solo, con los gastos únicos y
  las cuotas que caen ahí
- Cuentas con vencimiento, marcadas como pagadas mes a mes; aviso de las que
  están por vencer y de las que ya vencieron
- Suscripciones en pesos o en dólares, mensuales o anuales; las anuales pesan
  en su mes y aparte se ve cuánto conviene reservar por mes para ellas
- Cuotas con su cantidad y su mes de arranque, cuánto falta pagar y en qué mes
  se libera cada peso, a doce meses
- Dólar oficial, libre y tarjeta —con el recargo editable, porque los
  impuestos cambian seguido—, cotizaciones de dolarapi.com con un botón y,
  si no hay internet, a mano; tabla de qué pasa si el dólar sube 10, 25 o 50 %
- Calculadora de compras: descuenta las cuotas a la tasa que compite con
  ellas (la inflación, o lo que rinde la plata), saca el interés implícito
  —TNA y efectiva anual— y dice si conviene el contado o las cuotas, si la
  cuota entra en el mes y cuánto de lo que entra quedaría atado a cuotas
- La compra que convenga se suma a las cuotas con un botón
- Exportar e importar los datos en un archivo, y datos de ejemplo para
  mirarla funcionando antes de cargar los propios

### Tenerla a mano en cualquier lado

La carpeta `finanzas/` se publica sola con GitHub Pages y queda en una
dirección fija que abre en cualquier teléfono o computadora:

1. en GitHub, **Settings → Pages**;
2. en *Source*, elegir **Deploy from a branch**, rama `main`, carpeta `/ (root)`;
3. esperar un minuto: la aplicación queda en
   `https://<usuaria>.github.io/<repositorio>/finanzas/`.

Con esa dirección abierta en el celular, *Agregar a la pantalla de inicio*
(iPhone: compartir → Agregar a inicio; Android: menú → Instalar aplicación) la
deja como un ícono más, a pantalla completa. El `sw.js` guarda la aplicación en
el aparato, así que después abre aunque no haya señal.

El repositorio es público: lo que se publica es la aplicación, nunca los datos.
Los números viven en el navegador de cada dispositivo y no viajan a ningún
servidor. Eso tiene una consecuencia que conviene saber: **lo cargado en el
celular no aparece solo en la computadora**. Para pasarlos, *Exportar datos* en
uno e *Importar* en el otro.

Al tocar el archivo hay que subirle el número a `VERSION` dentro de `sw.js`;
si no, los navegadores que ya la tengan guardada siguen mostrando la versión
vieja.

### Lo que la aplicación no hace

No se conecta al banco ni lee resúmenes de tarjeta: los números se cargan a
mano. No es asesoramiento financiero; es una calculadora que hace explícito
lo que uno ya intuye.
