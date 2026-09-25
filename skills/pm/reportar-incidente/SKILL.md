---
name: reportar-incidente
owner: "@husseymarcos"
role: pm
created: 2026-09-08
description: Convierte la descripción de un incidente de SplitIt en una fila breve y lista para registrar. Usar al documentar un incidente nuevo o ya resuelto; no usar para diagnosticarlo ni corregirlo.
---

# Reportar incidente

Convertir el relato recibido en un registro factual, breve y listo para copiar. No
diagnosticar causas ni inventar impacto, fechas, acciones o resultados que el usuario no
haya informado.

Invocar como `/reportar-incidente <descripción del incidente>`.

## Criterios

- **Descripción:** resumir qué ocurrió, a quién o qué afectó y el impacto observado. No
  incluir hipótesis ni la solución.
- **Estado:** usar `Cerrado` sólo si se informan una acción correctiva y una validación del
  funcionamiento; en cualquier otro caso, `Abierto`.
- **Criticidad:** usar `Alta` si bloquea un flujo esencial, afecta a varias personas,
  compromete datos o seguridad, o impide operar; `Media` si degrada o bloquea parcialmente
  el trabajo de una persona o un flujo con alternativa; `Baja` si el impacto es menor y no
  bloquea el trabajo. Si el relato no permite decidir, usar `Por definir`.
- **F. Alta:** usar la fecha del incidente si fue informada; de lo contrario, la fecha
  actual. Formato `DD/MM/YYYY`.
- **F. Límite:** usar únicamente una fecha o un SLA informado. Dejar vacío si no existe.
- **F. Cierre:** completar sólo para un incidente cerrado y únicamente con la fecha
  informada. Si se sabe que cerró hoy, usar la fecha actual; en otro caso, dejar vacío.
- **Resolución:** para incidentes cerrados, resumir la acción realizada y cómo se comprobó
  el resultado. Dejar vacío si sigue abierto o falta validación.

Si hay información contradictoria, señalarla en una sola línea debajo de la tabla. No hacer
preguntas antes de entregar el borrador; los campos vacíos hacen visible lo que falta.

## Salida

Responder únicamente con esta tabla y, si corresponde, la línea de contradicción:

| Descripción | Estado | Criticidad | F. Alta | F. Límite | F. Cierre | Resolución |
|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... |
