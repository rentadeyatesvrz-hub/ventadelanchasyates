# Aurum Marine

Landing page premium para venta de lanchas y yates, lista para GitHub y preparada para:
- Menu hamburguesa responsive
- Catalogo visual premium
- WhatsApp flotante
- SEO tecnico inicial
- Google Ads y Meta Pixel
- Firebase para reservas y CRM
- CRM unificado en una sola captura

## Estructura

```text
aurum-marine/
├─ index.html
├─ robots.txt
├─ sitemap.xml
├─ firebase.json
├─ .firebaserc
├─ firestore.rules
├─ firestore.indexes.json
├─ assets/
│  ├─ css/main.css
│  ├─ js/app.js
│  ├─ js/firebase-config.example.js
│  └─ icons/favicon.svg
└─ docs/
   ├─ whatsapp-business-setup.md
   ├─ ads-and-seo-setup.md
   ├─ firebase-setup.md
   └─ crm-recommendation.md
```

## Cambio principal de esta version

Se elimino el formulario duplicado de leads.
Ahora todo el proceso comercial entra desde una sola seccion de **Reserva y CRM** y se guarda en la coleccion:

- `reservations`

Cada registro incluye:
- Nombre completo
- Fecha de nacimiento valida
- Email
- Telefono
- Embarcacion de interes
- Interes principal
- Fecha de cita
- Tipo de cita
- Mensaje
- Consentimiento de privacidad
- `status`
- `crmStage`
- `source`
- `createdAt`

## Stack elegido

### Por que NO use un framework pesado aqui
Para una web comercial de una sola pagina, la mejor combinacion suele ser:
- HTML semantico
- CSS moderno
- JavaScript modular

Eso te da mejor velocidad, SEO mas simple, menos dependencias y despliegue inmediato.

### Que si esta de moda y si vale la pena
- CSS Grid + Flexbox
- Variables CSS
- `clamp()` para tipografia fluida
- glassmorphism ligero
- motion sutil
- JSON-LD
- Firebase / serverless

### Si quieres una version mas escalable
La siguiente evolucion seria:
- Next.js
- TypeScript
- Tailwind CSS
- Firebase / Supabase

## Como abrir el proyecto localmente
Puedes abrir `index.html` directamente en el navegador.

## Como publicarlo en GitHub
1. Crea un repositorio nuevo.
2. Sube todos los archivos y carpetas.
3. Verifica que tambien subas `assets/` y `docs/`.
4. Activa GitHub Pages si solo quieres demo estatica.

## Como publicarlo en Firebase Hosting
1. Instala Node.js.
2. Instala Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
3. Inicia sesion:
   ```bash
   firebase login
   ```
4. Cambia `.firebaserc` por tu proyecto.
5. Despliega:
   ```bash
   firebase deploy
   ```

## Como activar Firebase real
1. Copia `assets/js/firebase-config.example.js` a `assets/js/firebase-config.js`
2. Pega tu configuracion web real.
3. Agrega este script antes de `app.js` en `index.html`:
   ```html
   <script src="assets/js/firebase-config.js"></script>
   ```
4. Despliega nuevamente.

## Flujo CRM sugerido
- `status: new` al capturar el registro
- `crmStage: reservation_requested` al llegar desde el formulario
- luego puedes mover manualmente a `contacted`, `qualified`, `visit_scheduled`, `won`, `lost`

## Recomendacion operativa
- Sitio web: este proyecto
- CRM comercial: HubSpot Free si quieres vista comercial adicional
- Backend operativo: Firebase
- Automatizaciones futuras: Make / Zapier / Cloud Functions

## Personalizaciones pendientes
- Reemplazar marca demo
- Reemplazar dominio y correos
- Agregar IDs reales de Google Ads, GA4 y Meta Pixel
- Ajustar textos comerciales finales
