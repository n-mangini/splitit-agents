---
name: verificar-permisos
owner: "@FranManfredi"
role: qa
created: 2026-11-11
description: Contrasta la autorización de endpoints y recursos con una matriz de roles y pertenencia. Usar para probar acceso indebido entre usuarios, organizaciones o niveles de permiso en un entorno autorizado.
---

# Verificar permisos por recurso

## Construir la matriz esperada

Leer reglas de autorización, historias y fixtures del proyecto. Enumerar actor, acción, recurso y pertenencia: anónimo, propietario, otro usuario, otro tenant y administrador cuando existan. No inferir privilegios por el nombre del rol; marcar reglas sin definición como preguntas.

## Preparar casos aislados

Usar cuentas y datos de prueba en un entorno autorizado. Elegir pares de recursos de distintos propietarios para probar acceso directo por identificador. Incluir lectura, listado, creación, actualización y borrado solo según el alcance pedido; las pruebas destructivas requieren recursos descartables.

## Comprobar el servidor

Comparar respuesta y efectos persistidos con la matriz esperada. Probar solicitudes directas aunque la interfaz oculte el botón. Incluir campos protegidos en actualizaciones y relaciones con recursos ajenos cuando correspondan. Distinguir autenticación de autorización y comprobar que una denegación no filtre contenido sensible.

Para cada caso registrar actor de prueba, operación, estado esperado, observado y evidencia sin tokens. No ampliar el análisis a sistemas o cuentas fuera del alcance autorizado.

## Entregar resultados

Separar regla ausente, fallo confirmado y caso no ejecutado. Para un fallo incluir reproducción mínima con identificadores sintéticos e impacto concreto. Si se pidieron pruebas automatizadas, reutilizar el harness del proyecto y verificar tanto la denegación como la ausencia de efectos laterales.
