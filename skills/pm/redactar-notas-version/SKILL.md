---
name: redactar-notas-version
owner: "@FranManfredi"
role: pm
created: 2026-11-11
description: Redacta notas de una versión desde cambios efectivamente incluidos, orientadas a sus usuarios. Usar al comunicar una entrega; no reemplaza la evaluación técnica previa al deploy.
---

# Redactar notas de versión

## Fijar el corte

Identificar audiencia, versión o rango de referencias y estado de publicación. Consultar tags, changelog, PRs y tickets del proyecto para delimitar lo incluido. Si falta una referencia de base, explicitar el corte propuesto antes de presentar una lista como exhaustiva.

## Convertir cambios en efectos

Cruzar cambios con evidencia de inclusión y describir qué puede hacer ahora el usuario, qué error se resolvió o qué acción debe tomar. Agrupar por novedades, correcciones y cambios incompatibles según el formato existente. Omitir refactors internos que no afecten a esa audiencia.

Distinguir código mergeado, funcionalidad habilitada y versión desplegada. Para feature flags o distribución gradual, indicar disponibilidad confirmada. No anunciar como entregado un ticket cerrado sin evidencia en la versión.

## Explicar acciones y límites

Para cambios incompatibles incluir público afectado, comportamiento anterior y nuevo, pasos de adaptación y fecha solo si está acordada. Incluir problemas conocidos verificados y mitigaciones disponibles sin divulgar detalles sensibles de vulnerabilidades aún no publicados.

Entregar borrador con título, versión, estado y fuentes de verificación. Usar el idioma y canal habituales del proyecto; no inventar métricas de mejora ni compromisos futuros. Publicar o enviar las notas requiere que esa acción forme parte del pedido.
