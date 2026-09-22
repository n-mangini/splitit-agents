---
name: armar-tickets-semanales
owner: "@husseymarcos"
role: pm
created: 2026-09-08
description: Planifica y redacta los tickets semanales de SplitIt para un dev frontend y uno backend con 6 horas disponibles cada uno. Usar al elegir alcance, estimar, dividir o cargar el trabajo de la semana; no usar para implementar los tickets.
---

# Armar tickets semanales

Convertir las prioridades de la semana en trabajo realizable por dos personas: un dev
frontend y un dev backend, con **6 horas por persona**.

## Invocación

`/armar-tickets-semanales` prepara el borrador de la semana actual.

El texto que siga al comando agrega contexto o restricciones, por ejemplo:

`/armar-tickets-semanales priorizar terminar el flujo de cuenta`

## Antes de proponer

Reconstruir el estado real con las fuentes disponibles, en este orden:

1. El GitHub Project **SplitIt Roadmap**, especialmente su vista Gantt:
   `https://github.com/orgs/SplitItLab/projects/1/views/2`. Tomar de ahí el Sprint,
   milestone y las user stories previstas para la semana actual.
2. Las issues `SPLT-*` enlazadas desde el Roadmap, que definen alcance y criterios de
   producto.
3. Implementación actual, PRs abiertos, issues técnicas y trabajo pendiente de revisión.
4. Roadmap, iteración y decisiones del repositorio; usar
   `03-release/release-plan.md` como respaldo si el GitHub Project no está accesible.
5. Sesiones recientes del mismo proyecto, si son accesibles.

El Roadmap define la intención semanal; el estado del código define qué es viable. Si
deuda, un revert o trabajo arrastrado consume capacidad, mostrar el desvío respecto del
Gantt y su impacto en las semanas siguientes. No reemplazar silenciosamente una historia
programada. Ante otras contradicciones, señalarla y usar la decisión explícita más
reciente.

GitHub Projects y las referencias `SPLT-*` son contexto privado de planificación. Usarlas
para decidir alcance y trazabilidad interna, pero nunca mencionarlas ni enlazarlas en los
tickets destinados a developers. Los enlaces al Canvas sí pueden incluirse.

## Reglas de planificación

- Presupuestar como máximo 6 h para frontend y 6 h para backend. Incluir dentro de ese
  tiempo pruebas, integración, documentación imprescindible y correcciones previsibles.
- Si hay feedback pendiente de la semana anterior, reservar hasta 1 h de la capacidad
  del dev afectado y planificar como máximo 5 h de trabajo nuevo.
- Mantener un rol responsable (frontend o backend) y una branch/PR por ticket. No crear
  una issue compartida entre ambos roles ni asignarla automáticamente a una persona.
- Agrupar tareas estrechamente relacionadas cuando separarlas solo agregaría branches,
  PRs, merges o bloqueos. Preferir un ticket principal por dev; agregar otro solo si es
  independiente y completa mejor el flujo.
- Frontend y backend deben poder avanzar en paralelo. Definir primero el contrato mínimo
  que comparten y evitar dependencias duras que obliguen a esperar un merge.
- Priorizar un recorrido natural y comprobable del producto. No dejar datos creados sin
  una forma razonable de volver a encontrarlos ni pantallas sin salida.
- Recortar primero pulido visual, animaciones, búsquedas avanzadas y extras. No recortar
  validación, aislamiento entre usuarios, manejo de errores, accesibilidad básica ni la
  prueba mínima del recorrido.
- No forzar una historia completa si no entra. Nombrar con precisión el incremento
  entregable y dejar explícito qué criterio de la historia queda pendiente.
- Mantener internamente la relación de cada ticket técnico con la user story de la semana.
  Si una historia necesita tickets frontend y backend, mantener el contrato compartido
  pero un rol responsable y una PR por ticket.
- Los tickets describen qué entregar, no el razonamiento de planificación. Mantener la
  justificación en el resumen semanal.

## Borrador semanal

Antes de crear o modificar issues, entregar un cuadro corto:

| Dev | Ticket | Horas | Resultado | Dependencias |
|---|---|---:|---|---|

Debajo, mostrar el flujo de usuario que quedará funcionando y el total por dev. Si hay
dos alternativas razonables, recomendar una y explicar el único trade-off decisivo.

Cada ticket debe incluir únicamente:

- objetivo y resultado observable;
- alcance de implementación;
- criterios de aceptación verificables;
- fuera de alcance;
- dependencias o contrato compartido reales;
- estimación en horas y checks mínimos de test/build.

Usar [SPT-43](https://linear.app/splitit/issue/SPT-43/crear-consultar-y-buscar-eventos-desde-el-frontend)
como formato de referencia: resultado esperado al inicio y luego, cuando correspondan,
`Contexto de producto`, `Diseño`, `Documentación`, `Dependencias`, `Contrato`,
`Flujo`, `Implementación`, `Criterios de aceptación`, `Fuera de alcance`, `Estimación` y
`Entrega`. Omitir secciones que no aporten al ticket.

Usar enlaces accesibles al diseño o la documentación en vez de copiar su contenido; no
incluir enlaces privados de GitHub Projects o issues `SPLT-*`.
Si Linear usa puntos como horas, cargar la relación 1:1 y conservar también las horas en
la descripción.

## Escritura en herramientas

El borrador es de solo lectura. Crear o actualizar issues únicamente cuando el usuario lo
autorice explícitamente. Antes de escribir, releer las issues objetivo y preservar campos
o contenido no relacionados. Dejar el campo de asignación sin cambios; asignar una
persona solo si el usuario lo autoriza explícitamente e indica a quién. Después, informar
links, estimaciones, ciclo y vencimiento; no afirmar que una hora quedó guardada si la
herramienta solo admite fecha.

## Cadencia

Entregar los tickets el lunes para que las PR queden listas para review el jueves. La
revisión puede continuar mientras empieza el siguiente ciclo. Para una demo mensual,
incluir solo lo mergeado y validado antes del corte acordado; una PR tardía pasa al
siguiente corte.

Cuando una corrección del usuario revele una regla reutilizable, aplicarla en la sesión.
Actualizar esta skill solo si el usuario pide persistir esa regla, evitando acumular casos
particulares.
