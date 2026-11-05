---
name: SplitIt Skills
description: A quiet catalog of reusable agent skills.
colors:
  signal-mint: "#29c3a0"
  ink: "#0c0c0c"
  canvas: "#f8f8f6"
  surface: "#ffffff"
  sidebar: "#0c0c0c"
  muted: "#f1f1ef"
  muted-ink: "#737373"
  border: "#e2e2df"
typography:
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.25
  micro:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.signal-mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "36px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    height: "36px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
    height: "36px"
---

# Design System: SplitIt Skills

## Overview

**Creative North Star: "The Quiet Catalog"**

This is a restrained catalog for finding reusable instructions by role. The interface
prioritizes skill names, descriptions, authorship and familiar copy/download actions.
Use a single centered content column with responsive cards and compact controls.

## Colors

The palette is neutral and warm, with mint reserved for functional emphasis.

### Primary
- **Signal Mint:** Use only for primary actions, focus, selection, and meaningful active state.

### Neutral
- **Ink:** Primary text and high-emphasis controls.
- **Canvas:** App background and composer surround.
- **Surface:** Reading and interaction surface.
- **Sidebar:** Quiet separation for navigation and project utilities.
- **Muted / Muted Ink:** Secondary surfaces and supporting copy.
- **Border:** Dividers and control boundaries.

**The Signal Rule.** Signal Mint is rare. Never use it as decoration or to make inactive content look important.

## Typography

**Display Font:** Geist (with ui-sans-serif and system-ui fallback)  
**Body Font:** Geist (with ui-sans-serif and system-ui fallback)  
**Label/Mono Font:** Geist Mono for machine-readable values only

**Character:** One sans-serif family creates a precise product voice. Hierarchy comes from weight, size, and spacing rather than a decorative type pairing.

### Hierarchy
- **Headline** (600, 1.5rem, 1.25): Empty-state prompts and primary task framing.
- **Title** (600, 1rem, 1.25): Agent and panel titles.
- **Body** (400, 0.875rem, 1.5): Messages and explanations, capped near 70ch.
- **Label** (500, 0.75rem, 1.25): Navigation, statuses, and metadata; sentence case only.
- **Micro** (400, 0.6875rem, 1.25): Dates, keyboard hints, and low-emphasis metadata only.

**The Working Type Rule.** Product copy is sentence case and compact. Never use display typography, tracked uppercase eyebrows, or oversized metrics in the catalog.

## Elevation

The interface is flat by default. Depth comes from tonal layers and dividers; tiny shadows may clarify an active navigation item or focused composer but never decorate a static card.

### Shadow Vocabulary
- **State lift** (`0 1px 2px rgb(0 0 0 / 0.05)`): Active controls and the composer only.

**The Tonal First Rule.** Use a surface change or divider before adding shadow.

## Components

Components feel restrained and immediate, using familiar web affordances and 150-200ms state transitions.

### Buttons
- **Shape:** Gently squared corners (6px).
- **Primary:** Signal Mint with dark text; reserve for the action that advances the task.
- **Hover / Focus:** Slight tonal shift and a visible three-pixel focus ring.
- **Secondary / Ghost:** Neutral surfaces; no decorative color.

### Cards / Containers
- **Corner Style:** Small or medium radius (6-10px) only when grouping is necessary.
- **Background:** Surface or muted neutral.
- **Shadow Strategy:** Flat by default.
- **Border:** One-pixel neutral divider when adjacency does not provide enough separation.
- **Internal Padding:** 16-24px based on density.

### Inputs / Fields
- **Style:** White surface, one-pixel input border, 6px radius, 36px minimum height.
- **Focus:** Signal Blue border and three-pixel translucent ring.
- **Error / Disabled:** Semantic state plus text or icon; never color alone.

### Catalog layout

Use a single centered column, role sections and compact cards. Do not show a sidebar,
project dashboard, agent selection or connection status. Keep card actions keyboard
accessible, with visible focus and feedback after copying.

## Do's and Don'ts

### Do:
- **Do** make the next action visible without scanning multiple panels.
- **Do** use Signal Mint only for action, focus, selection, and meaningful state.
- **Do** preserve keyboard access, visible focus, reduced motion, and WCAG 2.2 AA contrast.
- **Do** keep skill descriptions and instructions readable at a maximum line length near 70ch.

### Don't:
- **Don't** create a generic AI dashboard with gradients, chat gimmicks, excessive cards, decorative metrics, or gratuitous motion.
- **Don't** add chat history, new-chat, or delete-chat management unless a demonstrated workflow requires persistence.
- **Don't** use gradient text, glassmorphism, colored side stripes, or decorative grid backgrounds.
- **Don't** pair a one-pixel border with a wide soft shadow or use card radii above 16px.
- **Don't** use color alone to communicate connection, risk, or completion state.
