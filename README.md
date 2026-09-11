# Dictamen · juego de cátedra

Juego educativo en tiempo real para actividades de cátedra universitaria.
Equipos leen un fragmento, dictaminan entre tres opciones y justifican;
cátedra puntúa cada respuesta.

## Estado: funcional, a falta de la configuración de Firebase

`index.html` es la aplicación entera. Se abre en cualquier navegador, de
celular o de computadora, y no necesita instalar nada.

Funciona en dos modalidades, según haya o no configuración de base de datos:

- **Modo nube** (con `FIREBASE_CONFIG` completo): la partida vive en
  Firestore y cada dispositivo se actualiza solo.
- **Modo demo** (configuración vacía, o sin internet): la partida vive en la
  pestaña y una barra permite recorrer los tres roles desde un solo
  dispositivo. Es también la red de seguridad si la librería no carga.

### Qué hace

- Entrada con código de sala; PIN aparte para el equipo de cátedra
- Sorteo de equipos al entrar, entre dos y ocho, equilibrando integrantes
- Biblioteca de fragmentos que se guarda y se reusa entre clases
- Criterios de puntaje editables por tipo de actividad, guardados para toda
  la cátedra; cada partida se lleva su copia al crearse
- Las tres interfaces en las cinco fases, sincronizadas entre dispositivos
- Cronómetro con envío automático de la respuesta al vencer el tiempo
- Puntajes +2 / +1 / 0, ranking acumulado y varias rondas seguidas
- Reingreso automático: quien recarga vuelve a su partida y a su equipo

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

Dos límites conocidos, por no haber cuentas:

- Las respuestas de la ronda son legibles por cualquiera que esté en la
  sala. En la pantalla nadie ve las de los demás antes de la revelación,
  pero alguien con herramientas de desarrollo podría. Se cierra haciendo que
  cada equipo escuche solo su propia respuesta hasta que se revele.
- La biblioteca y los criterios los puede editar cualquier dispositivo que
  haya entrado a una partida. Se cierra con una clave de cátedra, con el
  mismo mecanismo que usa el PIN de sala.

Para desarrollo, `?emulador=1` conecta contra un Firestore local
(`firebase emulators:start --only firestore,auth`) sin necesidad de cuenta.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La aplicación |
| `firestore.rules` | Reglas de seguridad, para pegar en la consola de Firebase |
| `prototipo-v1.html` | Prototipo anterior (sincronizaba celular a celular con PeerJS). Se conserva como referencia; no se usa. |
