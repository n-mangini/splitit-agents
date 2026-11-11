---
name: auditar-accesibilidad
owner: "@FranManfredi"
role: qa
created: 2026-11-11
description: Evalúa barreras de teclado y tecnologías de asistencia en un recorrido de interfaz. Usar para una auditoría de accesibilidad; no sustituye una revisión visual general.
---

# Auditar accesibilidad de un recorrido

## Elegir recorrido y evidencia

Identificar URL o build, tareas principales, estados de error y dispositivos relevantes. Consultar criterios y convenciones de accesibilidad del proyecto. Usar herramientas disponibles sin instalar dependencias por iniciativa propia.

## Evaluar interacción real

Recorrer la tarea solo con teclado: orden de foco, foco visible, controles operables, escape de diálogos y devolución del foco. Inspeccionar nombres accesibles, etiquetas, instrucciones, errores, encabezados y semántica. Comprobar zoom, reflow, contraste y preferencias de movimiento en los estados relevantes.

Cuando haya lector de pantalla disponible, registrar cuál y probar anuncios de cambios y errores. Si no lo hay, distinguir inspección del árbol accesible de una prueba con lector. Complementar con análisis automático; un reporte sin alertas no demuestra conformidad.

## Informar barreras

Por hallazgo registrar tarea bloqueada, pasos, resultado observado, evidencia, criterio aplicable verificado y corrección sugerida. Priorizar por impacto en la tarea y alcance, no solo por el nivel del criterio. Separar barreras confirmadas de aspectos no evaluados.

Entregar un informe acotado al recorrido probado, con versión y limitaciones. Si se pidió corregir, reutilizar componentes y estilos existentes y repetir la interacción afectada. No declarar que toda la aplicación es accesible a partir de una muestra.
