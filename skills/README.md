# Skills

Instrucciones reutilizables para equipos, organizadas por rol. Cada skill descubre
las fuentes, herramientas y convenciones del proyecto donde se usa.

Son markdown plano: las ejecuta el agente que tenga el equipo (Claude Code,
Codex, Cursor, etc.), no esta app. La app las lee de acá y las muestra; ellas
no dependen de la app.

## Estructura

```
skills/<rol>/<nombre-en-kebab-case>/SKILL.md
```

Roles: `pm`, `po`, `qa`, `tl`.

## Instalar

Para que estén disponibles desde cualquier carpeta, enlazarlas a las skills del usuario:

```bash
./skills/install.sh
```

Crea un symlink por skill en `~/.claude/skills`. Se corre una vez por máquina, y de nuevo
cuando se agrega una skill nueva. Al ser symlinks, editar el archivo del repo alcanza:
no hay copias que se desincronicen.

## Escribir una skill

Cada `SKILL.md` arranca con este frontmatter:

```yaml
---
name: nombre-en-kebab-case
owner: "@handle-de-github"
role: pm | po | qa | tl
created: YYYY-MM-DD
description: Qué hace y cuándo conviene usarla. Es lo que decide si se invoca.
---
```

`owner` es quien la escribió, igual que en el decision log: si algo no se entiende o hay
que cambiarla, se sabe con quién hablar. Como los roles rotan, el autor no cambia aunque
cambie el rol.

`created` es la fecha en que se agregó. La página de skills ordena por ese campo, de la más
vieja a la más nueva, para que la lista se lea como la historia del toolkit. Una skill sin
`created` no rompe nada, pero cae al final de su rol.

El cuerpo dice sobre qué datos opera, cuándo se corre y qué devuelve.

Una skill nace de una fricción real que ya pasó, no de completar una cuota. Si nadie la
corre, conviene borrarla.

## Índice

| Rol | Skill | Autor | Qué hace |
|---|---|---|---|
| PO | [revisar-diseno](po/revisar-diseno/SKILL.md) | @n-mangini | Cruza una user story contra su diseño de Figma y anota las discrepancias en la issue |
| TL | [migrar-proyecto](tl/migrar-proyecto/SKILL.md) | @lucasmonteverdi1 | Migra el esqueleto de un monorepo A (Spring Boot + Next.js + JWT) a B, sin copiar ejercicios ni secretos, y cierra con informe |
| TL | [generar-tests-e2e](tl/generar-tests-e2e/SKILL.md) | @lucasmonteverdi1 | Genera tests E2E para una PR de un repo de aplicación, los pushea, y si fallan por un bug real pushea el fix en un commit aparte |
| PO | [to-canvas](po/to-canvas/SKILL.md) | @n-mangini | Convierte un prototipo navegable en un canvas de pantallas, con una dirección estable por historia |
| QA | [frontend-screenshots](qa/frontend-screenshots/SKILL.md) | @FranManfredi | Arma un pipeline de screenshots de frontend con Playwright y GitHub Actions, con capturas desktop/mobile, artefacto descargable y galería HTML |
| PO | [iterar-canvas](po/iterar-canvas/SKILL.md) | @n-mangini | Trabaja una historia sobre el canvas ya construido: cruza sus criterios contra la pantalla, cierra los huecos con el PO, y deja la issue y el deploy al día |
| TL | [reparar-secuencia-de-prs](tl/reparar-secuencia-de-prs/SKILL.md) | @lucasmonteverdi1 | Repara dos PRs dependientes mergeadas en orden incorrecto cuando un revert hizo desaparecer funcionalidad de main, sin reescribir su historia |
| PO | [construir-pantalla](po/construir-pantalla/SKILL.md) | @n-mangini | Construye en el prototipo la pantalla de una historia que todavía no tiene ninguna, y la enchufa al canvas con su dirección estable |
| TL | [contenerizar-app](tl/contenerizar-app/SKILL.md) | @lucasmonteverdi1 | Conteneriza las apps de un repo (una sola o monorepo) y arma el pipeline que publica cada imagen en GHCR |
| PO | [orientar-sprint](po/orientar-sprint/SKILL.md) | @lucasmonteverdi1 | Cruza Linear, el repo de aplicación, el roadmap y el canvas para mostrar el estado real del sprint y recomendar con qué historia seguir |
| PM | [verificar-historias-completadas](pm/verificar-historias-completadas/SKILL.md) | @lucasmonteverdi1 | Cruza cada historia abierta del roadmap contra el código real de SplitIt y propone cuáles cerrar, con la PR y el endpoint/componente como evidencia |
| PM | [actualizar-cronograma](pm/actualizar-cronograma/SKILL.md) | @husseymarcos | Prepara o aplica una actualización del cronograma de un proyecto comparando línea base, ejecución real y plan futuro en su herramienta de planificación, con evidencia por cambio. |
| PM | [armar-tickets-semanales](pm/armar-tickets-semanales/SKILL.md) | @husseymarcos | Planifica y redacta tickets semanales según las prioridades, capacidad real, especialidades y convenciones de un equipo. Usar al elegir alcance, estimar, dividir o cargar trabajo; no para implementarlo. |
| PM | [calcular-valor-ganado](pm/calcular-valor-ganado/SKILL.md) | @husseymarcos | Calcula el valor ganado de un proyecto a una fecha de corte, con PV, EV, AC, indicadores y proyección trazables a la línea base aprobada y a la evidencia de ejecución. |
| PM | [crear-deck-reveal](pm/crear-deck-reveal/SKILL.md) | @husseymarcos | Crea o actualiza presentaciones HTML con Reveal.js a partir de un brief y fuentes, adaptando narrativa, identidad visual, notas y exportación a la audiencia y al proyecto. |
| PM | [generar-informe-desempeno](pm/generar-informe-desempeno/SKILL.md) | @husseymarcos | Prepara un informe de desempeño con la rúbrica acordada, evidencia del trabajo realizado y evaluación guiada del responsable. Usar al evaluar una persona durante un período; no inventa criterios ni puntajes. |
| PM | [preparar-relevo-rol](pm/preparar-relevo-rol/SKILL.md) | @husseymarcos | Prepara el traspaso de una responsabilidad o rol de proyecto con estado a la fecha, decisiones vigentes, pendientes con responsable y próximos pasos sustentados en fuentes. |
| PM | [registrar-decision](pm/registrar-decision/SKILL.md) | @husseymarcos | Documenta una decisión o sesión de trabajo con contexto, alternativas y consecuencias, adaptándose al decision log o formato ADR del proyecto. |
| PM | [reportar-incidente](pm/reportar-incidente/SKILL.md) | @husseymarcos | Convierte el relato de un incidente en un registro factual con impacto, estado, criticidad, fechas y resolución. Adapta el formato al proyecto; no diagnostica ni corrige la falla. |
| PO | [preparar-demo](po/preparar-demo/SKILL.md) | @husseymarcos | Prepara un guion verificable de demo de un producto con recorrido, datos de prueba, tiempos, evidencia y alternativa ante fallas, ajustado al estado del producto. |
| QA | [frontend-atomic-refactor](qa/frontend-atomic-refactor/SKILL.md) |  | Refactor an existing frontend in place into atomic, reusable components with centralized typography, UI copy, and global design tokens while preserving its current visual design and behavior. Use when asked to remove hardcoded UI values or magic numbers, standardize styles and text, improve responsiveness, or componentize an existing frontend; do not use to invent or redesign the interface. |
| QA | [visual-review-agent](qa/visual-review-agent/SKILL.md) |  | Create or maintain the repository visual review agent that runs after frontend-screenshots, reads Playwright HTML/DOM snapshots plus a live reference page, calls NVIDIA through an OpenAI-compatible chat API, and comments on pull requests. Use when the user asks to set up or repair the current agentic PR visual review flow; do not use for screenshot capture alone. |
| TL | [revisar-pr](tl/revisar-pr/SKILL.md) | @husseymarcos | Revisa un PR contra las convenciones del repositorio y los criterios de la historia. Devuelve hallazgos en español, líneas exactas y comentarios listos para copiar. |
| PM | [registrar-riesgo](pm/registrar-riesgo/SKILL.md) | @n-mangini | Suma un riesgo como fila del risk log del sprint, con probabilidad, impacto, respuesta y contingencia, sin duplicar uno abierto ni contradecir lo decidido |
| PM | [cerrar-semana](pm/cerrar-semana/SKILL.md) | @n-mangini | Cierra la semana en el seguimiento con PV, EV y AC, y escribe el resumen en la celda Notas |
| PM | [asignar-capacidad-sobrante](pm/asignar-capacidad-sobrante/SKILL.md) | @n-mangini | Propone qué hace un dev con las horas que le sobran: adelantar la semana siguiente, un bug o tiempo libre |
| PM | [reportar-semaforo](pm/reportar-semaforo/SKILL.md) | @n-mangini | Arma el estado semanal para la cátedra con alcance, cronograma, costo, riesgos e incidentes en verde, amarillo o rojo, a alto nivel |
| PM | [armar-linktree](pm/armar-linktree/SKILL.md) | @n-mangini | Arma la página de links del proyecto con la estructura de Linktree y la identidad visual de la app |
| QA | [validar-pr-de-producto](qa/validar-pr-de-producto/SKILL.md) | @n-mangini | Prueba la historia desde la preview de la PR, cruza los criterios de aceptación, revisa que sea un slice vertical y marca solo lo técnico que rompe algo |
