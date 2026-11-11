---
name: revisar-contrato-api
owner: "@FranManfredi"
role: tl
created: 2026-11-11
description: Detecta incompatibilidades entre dos versiones de una API y sus consumidores. Usar antes de cambiar endpoints, esquemas o códigos de respuesta.
---

# Revisar contrato de API

## Delimitar el contrato

Identificar versión base y propuesta, consumidores conocidos y política de compatibilidad del proyecto. Leer OpenAPI, esquemas, rutas, serializadores y pruebas de contrato disponibles. Si documentación y código difieren, mostrar ambos con su fuente; no asumir que el documento describe lo desplegado.

## Comparar comportamiento observable

Revisar métodos y rutas, campos obligatorios, nulabilidad, tipos, enumeraciones, valores por defecto, paginación, errores y autenticación. Separar cambios de entrada y salida: aceptar un campo adicional no tiene el mismo efecto que exigirlo; agregar un valor a un enum de respuesta puede romper clientes exhaustivos.

Rastrear consumidores en el repositorio y ejemplos públicos aportados. Marcar consumidores externos como desconocidos cuando no haya evidencia. Comparar también semántica, como unidades, orden o idempotencia, aunque el esquema no cambie.

## Entregar un plan de compatibilidad

Para cada incompatibilidad incluir contrato anterior, nuevo, consumidor afectado, evidencia y alternativa de transición. Proponer pruebas de contrato con solicitudes y respuestas mínimas, usando datos sintéticos. Distinguir ruptura confirmada de riesgo pendiente de validar.

Entregar una recomendación de versionado o transición ajustada a las convenciones existentes. No modificar ni publicar la API salvo que la implementación forme parte del pedido.
