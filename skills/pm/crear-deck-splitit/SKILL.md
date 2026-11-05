---
name: crear-deck-splitit
owner: "@husseymarcos"
role: pm
created: 2026-11-05
description: Crea o actualiza presentaciones de SplitIt en Reveal.js para Steering, demos y entregas, conservando el sistema visual de los decks del equipo y sustentando los datos de gestión en sus fuentes.
---

# Crear deck SplitIt

Convertir el material del proyecto en un deck HTML editable, listo para exponer en
Reveal.js. Escribir en español salvo que el usuario pida otro idioma.

Ejemplo de uso: `/crear-deck-splitit Steering 3, corte al 5 de noviembre,
10 minutos, con demo y próximos pasos`.

## Contexto y fuentes

Leer las instrucciones del repositorio de destino antes de escribir. Si es de solo
lectura, generar el resultado fuera de él e informar la ubicación.

Buscar el repositorio de documentación `splitit-dirproy` y usar como referencias:

- `04-iteration/sprints/sprint-2/steering/steering.html`: referencia principal de estilo,
  estructura HTML, componentes y configuración de Reveal.js.
- `04-iteration/sprints/sprint-1/steering/steering.html`: referencia de componentes adicionales.
- `04-iteration/sprints/sprint-1/steering/feedback.md`: devoluciones de la cátedra para
  presentaciones de Steering.

Resolver estas rutas desde el checkout disponible, sin depender de una ruta personal.
Si no están disponibles, pedir su ubicación cuando sea necesario para reproducir un
componente; los criterios visuales de abajo permiten comenzar el borrador.

Determinar audiencia, duración, fecha de corte y propósito con el pedido y los materiales.
Preguntar solamente por los datos que cambien el contenido y no puedan inferirse.
Consultar las fuentes pertinentes: roadmap, cronograma, presupuesto, horas reales,
riesgos, decisiones, tickets y evidencia del producto. Registrar archivo o URL y fecha
de corte en notas del presentador o en un apéndice de fuentes.

No trasladar cifras, responsables, roles ni estados de un sprint anterior como si fueran
actuales. Marcar lo que falte como `Por confirmar`; no convertir estimaciones en hechos.

## Relato

Armar una secuencia ajustada al tiempo disponible. Cada slide comunica una conclusión
con un título concreto y una evidencia visual; llevar el desarrollo a las notas.

Para un Steering, adaptar la secuencia a la consigna y al feedback recibido: resultado
del período, cambios y decisiones, producto/demo, alcance, cronograma, presupuesto y
valor ganado, riesgos y oportunidades, próximos pasos y decisiones solicitadas. Si la
consigna pide comenzar por lo inesperado, contar el cambio, su costo y la respuesta al
principio. No forzar estas secciones en una demo breve.

- Cronograma: distinguir línea base, ejecución real y plan futuro; mostrar corte,
  fechas y avance. No presentar un roadmap como prueba de ejecución.
- Valor ganado: mostrar PV, EV y AC con una base y unidad coherentes, indicadores y
  proyección cuando existan datos. Explicar supuestos y aparentes contradicciones;
  no confundir capacidad disponible con trabajo presupuestado ni horas con dinero.
- Riesgos: separar amenazas futuras, oportunidades e issues ya ocurridos. Resumir
  probabilidad, impacto, respuesta y responsable; llevar el detalle a backup si no entra.
- Demo: usar un recorrido verificable del producto. Identificar un mockup como tal y
  no presentarlo como funcionalidad implementada.

## Sistema visual

Reutilizar los componentes pertinentes del deck de referencia, sin copiar sus datos
ni acumular sus overrides históricos de CSS.

- Canvas de 1440 × 810, fondo blanco y contenido alineado a la izquierda.
- Colores: tinta `#080808`, menta `#28c49e`, menta oscura `#138c70`, gris `#6b6b6b`,
  líneas `#e8e8e8`, superficies `#f7f7f7`; ámbar `#d9822b` para alertas.
- Tipografía: `Geist, Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif`; no asumir que Geist o Inter están instaladas.
- Márgenes de referencia: 58 px arriba, 66 px a los lados y 70 px abajo. Títulos de
  portada alrededor de 86 px, títulos de sección de 58 px y cuerpo de 24 px.
- Mantener al menos 18 px en el canvas; la legibilidad proyectada manda. Dividir una
  slide densa antes que achicar su texto. Verificar también la escala del PDF.
- Portada con marca SplitIt, título, período y mockup si aporta contexto. Numeración
  discreta, espacio en blanco, tablas simples, cifras destacadas y gráficos con etiquetas.
- Preferir imágenes, diagramas y tablas breves a párrafos. Usar menta para destacar la
  idea principal; acompañar el color con texto o símbolos para expresar estados.

## Implementación y revisión

Entregar HTML con CSS propio y assets relativos. Conservar Reveal.js 5.2.1 del deck
existente salvo pedido de actualización; mantener CSS, JS y plugins en la misma versión.
El uso por CDN requiere conexión: informarlo; si se pide uso offline, incluir recursos
locales y sus licencias. No agregar paquetes al proyecto sin autorización.

Usar `.reveal > .slides > section`, identificadores estables por slide y
`<aside class="notes">` para el guion, las fuentes y las salvedades. Cargar el plugin
de notas antes de inicializarlo. Configuración de referencia:

```js
Reveal.initialize({
  hash: true, controls: true, controlsTutorial: false, progress: true,
  center: false, transition: "fade", transitionSpeed: "fast",
  width: 1440, height: 810, margin: 0,
  pdfMaxPagesPerSlide: 1, pdfSeparateFragments: false,
  plugins: [RevealNotes]
});
```

Usar fragments sólo cuando ayuden a explicar la secuencia. Hacer visible todo el
contenido al imprimir y respetar la preferencia de movimiento reducido. Si se requiere
otra API de Reveal.js, consultar documentación de la versión correspondiente.

Abrir el deck servido por HTTP y recorrer todas las slides y sus fragments. Revisar
capturas a 1440 × 810, desbordes, legibilidad, assets, consola, navegación por teclado,
enlaces directos y notas. Para PDF, usar `?print-pdf`, esperar fuentes e imágenes y
comprobar que cada slide ocupe una página y que ningún fragment o gráfico desaparezca.
Si no se puede ejecutar una comprobación, declararla pendiente.

Entregar la ruta o preview del HTML, los assets necesarios, PDF si fue solicitado,
instrucciones breves para abrirlo y los datos pendientes de confirmar. Publicar o hacer
push únicamente cuando forme parte del pedido; si se solicitó revisión previa, mostrar
el resultado antes de publicarlo.
