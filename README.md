# Skills · SplitIt

Catálogo de skills reutilizables para equipos de producto, gestión, desarrollo y calidad.
La aplicación sólo muestra el catálogo: permite copiar, descargar y consultar el Markdown,
y copiar el comando de instalación de cada skill. Las skills se ejecutan en el agente del
usuario; esta app no ejecuta agentes ni se conecta a servicios externos.

## Desarrollo

Requiere Node.js 24 y npm.

```bash
npm ci
npm run dev
```

Abrí `http://localhost:3000`. `/skills` redirige al catálogo de inicio.
No requiere variables de entorno, claves de IA ni conexiones a Linear o GitHub.

## Agregar o usar skills

Cada skill vive en `skills/<rol>/<nombre>/SKILL.md`. La app las descubre por rol y
muestra su descripción, owner y acciones. Ver [formato e índice](skills/README.md).

Podés instalar una skill desde su comando en el catálogo, copiar su contenido o descargarla.
`./skills/install.sh` enlaza las skills del checkout en `~/.claude/skills`.

## Verificación

```bash
npm test
npm run typecheck
npm run build
```

Los tests verifican el catálogo y la lectura del Markdown. El build genera la página de
inicio y conserva la descarga por `/skills/<rol>/<nombre>/raw`.

## Publicación

Desplegar como una aplicación Next.js estándar con `npm run build` y `npm start`, o con
la integración Git del proveedor de hosting. No hay cron jobs ni funciones de agentes.
