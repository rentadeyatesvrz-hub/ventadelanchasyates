# Aurum Marine

Landing page premium para venta de lanchas y yates.

## Cambios finales aplicados

- Se elimino por completo la seccion **UX / UI**.
- Se quitaron los enlaces del menu que apuntaban a esa seccion.
- Se redujo el espacio vertical entre **Catalogo** y **Reservas** en escritorio y movil.
- El ajuste final de espaciado vive en `assets/css/main.css`.

## Estructura incluida en este paquete

```text
aurum-marine-proyecto-final/
├─ index.html
├─ robots.txt
├─ sitemap.xml
├─ firebase.json
├─ .firebaserc
├─ .gitignore
├─ firestore.rules
├─ firestore.indexes.json
├─ README.md
└─ assets/
   ├─ css/
   │  └─ main.css
   ├─ js/
   │  ├─ app.js
   │  └─ firebase-config.example.js
   └─ icons/
      └─ favicon.svg
```

## Publicacion

### GitHub Pages
1. Sube todos los archivos al repositorio.
2. Verifica que la carpeta `assets/` quede completa.
3. Activa GitHub Pages si quieres una demo estatica.

### Firebase Hosting
1. Instala Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Inicia sesion:
   ```bash
   firebase login
   ```
3. Cambia `.firebaserc` por tu proyecto.
4. Despliega:
   ```bash
   firebase deploy
   ```

## Firebase real
1. Copia `assets/js/firebase-config.example.js` a `assets/js/firebase-config.js`
2. Pega tu configuracion real.
3. Agrega este script antes de `app.js` en `index.html`:
   ```html
   <script src="assets/js/firebase-config.js"></script>
   ```
4. Despliega nuevamente.
