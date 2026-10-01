---
name: generar-informe-desempeno
owner: "@husseymarcos"
role: pm
created: 2026-10-01
description: Prepara informes de desempeño de developers con la rúbrica de Evaluación de devs, evidencia de Linear y una evaluación guiada para el PM. Usar al evaluar a una persona durante un período o al preparar el relevo de PM.
---

# Generar informe de desempeño

Invocar como `/generar-informe-desempeno persona, desde, hasta`.
Ejemplo: `/generar-informe-desempeno Mateo, 2026-09-01, 2026-09-30`.
Si faltan persona o período, pedirlos juntos. Resolver la identidad en Linear;
si hay homónimos, pedir una elección antes de atribuir tareas.

## Rúbrica compartida

Usar la misma rúbrica de [Evaluación de devs](sites-project://appgprj_6ab47d343f688191a604ce608f8d852f).
Leer su contenido mediante una herramienta disponible o una copia aportada por el PM.
Conservar exactamente criterios, descriptores, escala, pesos y fórmula de esa fuente.
Registrar la versión o fecha de consulta y la fuente usada para que otro PM pueda
reproducir la evaluación. No sustituirla por una rúbrica genérica.

Si la fuente no es accesible, pedir su contenido una sola vez y avanzar con la
evidencia de Linear. Dejar la evaluación como borrador sin puntajes hasta recibirla.

## Evidencia de Linear

Consultar Linear en modo lectura. Resolver workspace, equipo y persona con las
herramientas disponibles; usar el ID de usuario para filtrar. Recorrer todas las
páginas e incluir archivadas. No filtrar únicamente por fecha de creación: una
tarea antigua puede haberse entregado en el período evaluado.

Recuperar ID, título, URL, responsable, estado y tipo de estado, `completedAt`,
`dueDate`, ciclo y proyecto. Revisar descripción y comentarios cuando hagan falta
para verificar compromisos, entrega, bloqueos o cambios de alcance. No asumir que
las herramientas exponen el historial de estados o vencimientos.

Antes de calcular, establecer qué significa entrega en la rúbrica: PR lista para
review, merge o tarea terminada. Si la fuente no lo define, pedirlo al PM mientras
se reúne la evidencia. `completedAt` acredita cierre en Linear, no fecha de PR ni
merge. Una tarea en review puede estar entregada si ése es el hito acordado.

### Cómputo reproducible

- Usar las fechas inclusivas del período y la zona `America/Argentina/Buenos_Aires`,
  salvo otra zona acordada. Un vencimiento sin hora permite entregar hasta el fin
  de ese día; comparar fechas locales, no medianoche UTC.
- Contar como entregadas las tareas con evidencia del hito de entrega dentro del
  período. Deduplicar por ID; no contar canceladas o duplicadas como entregas.
- Clasificar como tardía sólo una entrega posterior a su vencimiento documentado.
  Si falta el vencimiento o la fecha del hito, marcar «No verificable»; nunca
  convertir un dato faltante en entrega puntual o tardía.
- Mostrar entregadas, a tiempo, tardías, no verificables y porcentaje de tardías:
  `tardías / (a tiempo + tardías) × 100`. Con denominador cero, mostrar «No calculable».
- Mostrar aparte las pendientes vencidas al cierre del período: no son entregas
  tardías. Reconstruir el estado al corte sólo con evidencia; el estado actual no
  demuestra el estado histórico de una tarea reabierta o cerrada posteriormente.
- Si sólo se conoce el vencimiento actual, indicar «Comparación con vencimiento
  actual; historial no verificado». No afirmar que es el compromiso original.
  No usar fin de ciclo como vencimiento sin un acuerdo documentado.
- Para reasignaciones, distinguir responsable actual de responsable de la entrega;
  no atribuir desempeño histórico sin evidencia. Separar bloqueos, cambios de
  alcance y demoras de revisión de los hechos comprobados sobre la entrega.
- Si la consulta queda incompleta, declarar la cobertura y presentar los conteos
  como parciales. No afirmar que faltan tareas cuando sólo faltan permisos o datos.

## Evaluación guiada para cualquier PM

Presentar primero la evidencia y precargar cada criterio de la rúbrica con los
hechos que lo sustentan. El volumen de tickets y la puntualidad no prueban por sí
solos calidad técnica, colaboración u otros criterios.

Pedir al PM en un único bloque los datos pendientes por criterio: observación,
ejemplo concreto y puntaje dentro de la escala original. Permitir «Sin evidencia».
No volver a preguntar información ya aportada. Cuando haya evidencia suficiente,
proponer puntajes con su justificación para revisión del PM; distinguir propuestas
de puntajes confirmados y no cerrar una evaluación con puntajes pendientes.

Aplicar únicamente la fórmula original. No inventar pesos ni reemplazar criterios
sin evidencia por cero; si la rúbrica no define cómo tratar faltantes, dejar el
resultado global pendiente. Mantener separados datos, interpretación y comentario
del PM, y señalar contradicciones sin resolverlas por suposición.

## Informe

Entregar un informe listo para revisar con:

1. Persona, PM evaluador, período, fecha de corte, definición de entrega y fuente
   de la rúbrica. Si no se conoce el PM, dejarlo por completar.
2. Resumen de entregas y cobertura de datos, con el denominador del porcentaje.
3. Evidencia por tarea:

   | Tarea enlazada | Responsable acreditado | Vencimiento y fuente | Entrega y evidencia | Resultado | Contexto |
   |---|---|---|---|---|---|

4. Evaluación con los nombres exactos de los criterios:

   | Criterio | Evidencia | Puntaje propuesto o confirmado | Observación del PM | Pendiente |
   |---|---|---|---|---|

5. Resultado según la rúbrica cuando sea calculable, fortalezas, aspectos a mejorar
   y acciones acordadas con responsable y fecha. No inventar acuerdos.

Terminar indicando qué falta para que el PM valide el informe. Entregarlo en el
chat o en un archivo si se solicita; no publicarlo, enviarlo a otras personas ni
modificar Linear como parte de esta skill.
