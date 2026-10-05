---
name: armar-tickets-semanales
owner: "@husseymarcos"
role: pm
created: 2026-09-08
description: Planifica y redacta los tickets semanales de SplitIt para devs full-stack con 6 horas disponibles cada uno. Usar al elegir alcance, estimar, dividir o cargar el trabajo de la semana; no usar para implementar los tickets.
---

# Armar tickets semanales

> Nota (2026-10-05, @lucasmonteverdi1): el equipo pasó a devs full-stack, sin carriles fijos
> de frontend/backend. Se actualizó la planificación para repartir por feature/responsable en
> vez de por capa, y se sumó el modo de invocación de la sección "Modo del ticket". El resto
> del documento y su autoría original quedan sin cambios.

Convertir las prioridades de la semana en trabajo realizable por los devs disponibles, con
**6 horas por persona**. Los devs son full-stack: no hay un carril fijo de frontend y otro de
backend — cada ticket lo cierra una persona de punta a punta, o se reparte por feature/épica
(por ejemplo, un dev a cargo de toda una iniciativa transversal, otro a cargo de las historias
de producto de la semana), según convenga a la prioridad del momento.

## Invocación

`/armar-tickets-semanales` prepara el borrador de la semana actual.

El texto que siga al comando agrega contexto, restricciones o el modo de los tickets, por
ejemplo:

`/armar-tickets-semanales priorizar terminar el flujo de cuenta`
`/armar-tickets-semanales modo diseño para los tickets de X`

## Antes de proponer

Reconstruir el estado real con las fuentes disponibles, en este orden:

1. El GitHub Project **SplitIt Roadmap**, especialmente su vista Gantt:
   `https://github.com/orgs/SplitItLab/projects/1/views/2`. Tomar de ahí el Sprint,
   milestone y las user stories previstas para la semana actual y la siguiente.
2. Las issues `SPLT-*` enlazadas desde el Roadmap, que definen alcance y criterios de
   producto.
3. Implementación actual, PRs abiertos, issues técnicas y trabajo pendiente de revisión.
4. Roadmap, iteración y decisiones del repositorio; usar
   `03-release/release-plan.md` como respaldo si el GitHub Project no está accesible.
5. Sesiones recientes del mismo proyecto, si son accesibles.

Para diseños frontend, consultar [SplitIt Canvas](https://splitit-canvas.vercel.app/canvas)
y enlazar en el ticket la pantalla o flujo correspondiente, si tiene enlace directo;
en caso contrario, enlazar el Canvas e identificar la pantalla. Si no se puede acceder
o falta el diseño, explicitarlo sin inventar especificaciones visuales.

El Roadmap define la intención semanal; el estado del código define qué es viable. Si
deuda, un revert o trabajo arrastrado consume capacidad, mostrar el desvío respecto del
Gantt y su impacto en las semanas siguientes. No reemplazar silenciosamente una historia
programada. Ante otras contradicciones, señalarla y usar la decisión explícita más
reciente.

GitHub Projects y las referencias `SPLT-*` son contexto privado de planificación. Usarlas
para decidir alcance y trazabilidad interna, pero nunca mencionarlas ni enlazarlas en los
tickets destinados a developers. Los enlaces al Canvas sí pueden incluirse.

## Reglas de planificación

- Presupuestar como máximo 6 h por dev. Incluir dentro de ese tiempo pruebas, integración,
  documentación imprescindible y correcciones previsibles. Un ticket full-stack (que toca
  backend y frontend) se presupuesta entero contra las 6 h de una sola persona, no se reparte
  automáticamente en mitades de dos personas distintas.
- Si hay feedback pendiente de la semana anterior, reservar hasta 1 h de la capacidad
  del dev afectado y planificar como máximo 5 h de trabajo nuevo.
- Mantener un responsable y una branch/PR por ticket. No crear una issue compartida entre
  dos personas ni asignarla automáticamente.
- Agrupar tareas estrechamente relacionadas cuando separarlas solo agregaría branches,
  PRs, merges o bloqueos. Preferir un ticket principal por dev; agregar otro solo si es
  independiente y completa mejor el flujo.
- Si la semana reparte por feature/épica en vez de por capa (un dev a cargo de una
  iniciativa transversal entera, otro de las historias de producto), los dos frentes deben
  poder avanzar en paralelo sin bloquearse entre sí — no hace falta el contrato mínimo
  compartido que exige repartir frontend/backend de la misma historia entre dos personas,
  porque cada frente es autocontenido.
- No incluir creación, mantenimiento ni uso de una API mock en los tickets. Si una API real
  no está lista para lo que necesita un ticket, elegir trabajo independiente que no dependa
  de ella o reprogramar ese incremento.
- Priorizar un recorrido natural y comprobable del producto. No dejar datos creados sin
  una forma razonable de volver a encontrarlos ni pantallas sin salida.
- Recortar primero pulido visual, animaciones, búsquedas avanzadas y extras. No recortar
  validación, aislamiento entre usuarios, manejo de errores, accesibilidad básica ni la
  prueba mínima del recorrido.
- No forzar una historia completa si no entra. Nombrar con precisión el incremento
  entregable y dejar explícito qué criterio de la historia queda pendiente.
- Mantener internamente la relación de cada ticket técnico con la user story de la semana.
  Si una historia necesita más de un ticket, mantener el contrato compartido entre ellos
  pero un responsable y una PR por ticket.
- Los tickets describen qué entregar, no el razonamiento de planificación. Mantener la
  justificación en el resumen semanal.

## Modo del ticket

*(Agregado 2026-10-05, @lucasmonteverdi1 y @husseymarcos.)*

Cada ticket se escribe en uno de dos modos. Por defecto, **detallado** — es el que necesita
la mayoría del trabajo semanal, donde la prioridad es llegar al jueves con algo entregado.
Pasar a **diseño abierto** es una decisión explícita del PM, no automática.

**Detallado** (por defecto): el ticket resuelve el alcance de implementación de antemano —
qué endpoint, qué archivo, qué patrón existente copiar. Es el formato que ya describe
"Borrador semanal" más abajo. Conviene para trabajo acoplado a patrones ya resueltos en el
código (otro CRUD sobre una entidad existente, una pantalla más del mismo tipo), donde la
decisión de diseño ya se tomó la primera vez y repetirla no aporta.

**Diseño abierto**: el ticket da el resultado esperado y principios genéricos a seguir, sin
nombrar clases, archivos ni la solución. Quien lo toma decide la forma y documenta en el PR
las alternativas que consideró. Conviene cuando:

- la tarea es una decisión de arquitectura real (qué estructura de datos, cómo se extiende a
  futuro) y no una repetición de un patrón ya resuelto;
- vale la pena invertir el tiempo extra de exploración a cambio de que el dev se apropie del
  diseño, no solo lo ejecute;
- no hay todavía un patrón establecido en el repo que el ticket detallado pudiera citar.

Un ticket en modo diseño abierto estima más horas que su equivalente detallado — incluye el
tiempo de explorar alternativas, no solo de escribir código ya decidido.

Se elige por ticket, no por persona ni por semana entera: la misma persona puede tener un
ticket detallado y otro de diseño abierto en la misma semana, según lo que cada uno pida.

## Borrador semanal

Antes de crear o modificar issues, entregar un cuadro corto:

| Dev | Ticket | Horas | Resultado | Dependencias |
|---|---|---:|---|---|

Debajo, mostrar el flujo de usuario que quedará funcionando y el total por dev. Si hay
dos alternativas razonables, recomendar una y explicar el único trade-off decisivo.

Cada ticket debe incluir únicamente:

- objetivo y resultado observable;
- en modo detallado, alcance de implementación con el patrón existente a seguir (archivo,
  clase, endpoint de referencia); en modo diseño abierto, principios genéricos en vez de
  solución — ver "Modo del ticket";
- criterios de aceptación verificables;
- fuera de alcance;
- dependencias o contrato compartido reales;
- estimación en horas (mayor en diseño abierto que en detallado, para el mismo resultado) y
  checks mínimos de test/build.

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
