---
name: diagnosticar-rendimiento
owner: "@FranManfredi"
role: tl
created: 2026-11-11
description: Investiga una operación lenta con mediciones reproducibles y propone mejoras sustentadas en perfiles. Usar cuando una página, consulta o proceso excede su latencia esperada.
---

# Diagnosticar rendimiento

## Definir la medición

Ubicar la operación, ambiente, volumen de datos y objetivo de latencia acordado. Reutilizar instrumentación y herramientas del proyecto. Registrar versión, configuración, caché fría o caliente y condiciones de ejecución; no comparar ambientes distintos como si fueran equivalentes.

## Localizar el costo

Tomar una línea base repetida y separar tiempo de cliente, red, servidor y base según la evidencia disponible. Para percentiles informar tamaño y ventana de la muestra; una sola ejecución no permite afirmar un p95. Usar perfiles, trazas o planes de consulta existentes antes de atribuir la causa a una dependencia.

Investigar trabajo repetido, consultas N+1, bloqueos, serialización y tamaño de recursos donde el perfil lo indique. No ejecutar carga sobre producción ni consultas costosas sin autorización para ese alcance. Evitar registrar datos personales o secretos.

## Probar una hipótesis

Proponer el cambio mínimo que ataque el costo dominante. Si se pidió corregir, implementarlo y repetir la medición bajo las mismas condiciones, verificando resultados funcionales, consumo de memoria y tasa de errores. No sumar caché sin explicar clave, invalidación y consistencia.

Entregar línea base, evidencia de la causa, resultados comparables y límites de la medición. Si no hay acceso al ambiente o al perfil, entregar un procedimiento reproducible y mantener la causa como hipótesis.
