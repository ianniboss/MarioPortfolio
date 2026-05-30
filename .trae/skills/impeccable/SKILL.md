---
name: "impeccable"
description: "Production-grade UI redesign/polish playbook. Invoke when improving UX/UI quality, hierarchy, motion, a11y, responsiveness, or when a design feels generic and needs real craft."
---

# Impeccable (UI craft)

Use this skill when working on any frontend surface (portfolio sections, landing pages, components) where perceived quality matters.

## Ground truth reference (optional)

You have a full reference copy here:

- `C:\\Users\\ianha\\.codex\\skills\\impeccable\\`

If you need deeper rules (audit/polish/animate/etc), consult its `reference/` docs.

## Workflow (minimal, repeatable)

1. **Identify the surface**
   - Link the exact route/section/component(s) being changed.
2. **Audit before changing**
   - Clarity of message and hierarchy (what is the 1 primary action).
   - Accessibility: contrast, focus states, keyboard navigation.
   - Responsiveness: mobile layout, touch targets, no CLS.
   - Performance: heavy effects gated, lazy-load expensive modules.
3. **Declare the register**
   - If design IS the product (portfolio/landing): use a brand/marketing register.
   - If design SERVES the product (app/admin/tool): use a product register.
4. **Make committed decisions**
   - Choose a coherent type scale, spacing rhythm, radii system, and shadow/elevation scale.
   - Motion must be motivated and reduced-motion safe.
5. **Implement real code changes**
   - Prefer improving existing components/styles over adding new dependencies.
6. **Verify**
   - Check desktop + mobile, and reduced motion.

## Hard rules (quality guardrails)

- Readability first: body text contrast should pass WCAG AA.
- Motion is never required, but if used it must be purposeful and have a reduced-motion fallback.
- Avoid “templated landing” reflexes: endless identical card grids, decorative-only effects, unclear CTAs.
