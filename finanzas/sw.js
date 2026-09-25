/* Service worker de Plata.
   Guarda la aplicación en el teléfono para que abra sin internet. Los
   datos no pasan por acá: viven en el localStorage del navegador.

   Al tocar el archivo hay que subirle el número a VERSION: así el
   navegador tira la copia vieja y se queda con la nueva. */
const VERSION = "plata-v1";
const PIEZAS = ["./", "./index.html", "./manifest.webmanifest", "./icono-192.png", "./icono-512.png"];

self.addEventListener("install", ev => {
  ev.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(PIEZAS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", ev => {
  ev.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", ev => {
  const req = ev.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;                 // nada de afuera
  if(!url.pathname.startsWith(new URL("./", self.location).pathname)) return;  // solo lo propio

  // La página se busca primero en internet, para que una versión nueva
  // llegue apenas se publica; si no hay señal, sale la copia guardada.
  if(req.mode === "navigate" || (req.headers.get("accept")||"").includes("text/html")){
    ev.respondWith(
      fetch(req)
        .then(res => {
          const copia = res.clone();
          caches.open(VERSION).then(c => c.put("./index.html", copia));
          return res;
        })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  // Lo demás (íconos, manifiesto) casi no cambia: primero la copia.
  ev.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copia = res.clone();
      caches.open(VERSION).then(c => c.put(req, copia));
      return res;
    }))
  );
});
