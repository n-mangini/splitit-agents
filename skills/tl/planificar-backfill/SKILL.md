---
name: planificar-backfill
owner: "@FranManfredi"
role: tl
created: 2026-11-11
description: Diseña una carga o corrección histórica de datos por lotes con reanudación y reconciliación. Usar al poblar campos nuevos o transformar registros existentes; no para copiar el esqueleto de un proyecto.
---

# Planificar backfill de datos

## Reconstruir la transformación

Leer esquema, migraciones, restricciones y reglas de negocio del proyecto. Precisar selección de registros, valor de destino, volumen estimado y tratamiento de nulos, duplicados y datos inválidos. Separar cambios de esquema del proceso que transforma datos históricos.

## Diseñar ejecución segura

Definir una clave estable para avanzar por lotes y un checkpoint persistente; evitar paginación por offset si el conjunto puede cambiar. Hacer la transformación idempotente o definir una marca que impida aplicar dos veces una operación acumulativa. Establecer límites transaccionales y estrategia ante escrituras concurrentes, bloqueos y registros fallidos.

Preparar modo de simulación con conteos y muestras anonimizadas. Proponer tamaño inicial del lote, métricas y umbrales de pausa según el ambiente real, sin inventar capacidad disponible. Distinguir reintentos transitorios de errores de datos que requieren revisión.

## Reconciliar y recuperar

Definir invariantes de antes y después, conteos de procesados, omitidos y fallidos, y comprobaciones del valor transformado. Diseñar recuperación según reversibilidad: snapshot o registro de valores previos cuando una transformación pierda información. No prometer rollback si los datos originales no se conservan.

Entregar plan, consulta de selección, pseudocódigo o script si se pidió, y pruebas con interrupción y reanudación en un entorno aislado. La preparación no autoriza ejecutar escrituras masivas en un ambiente compartido.
