# Commit Message Template

## Format Structure

```
<type>: <short summary (max 50 chars)>

<body - detailed description (wrap at 72 chars)>

<footer - references, breaking changes, etc.>
```

---

## Commit Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semi-colons, etc.)
- **refactor**: Code refactoring (no functional changes)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system or dependency changes
- **ci**: CI/CD configuration changes
- **chore**: Other changes that don't modify src or test files

---

## Examples

### Feature Addition
```
feat: implement responsive header with mobile menu

- Add hamburger menu for mobile devices (<768px)
- Implement slide-out navigation panel with overlay
- Add active route detection and highlighting
- Prevent body scroll when mobile menu is open
- Auto-close menu on route navigation
```

### Bug Fix
```
fix: resolve header positioning typo

Changed 'lef-0' to 'left-0' in header className to properly
position the fixed header on the left edge of viewport.
```

### Refactoring
```
refactor: extract navigation data to separate file

Moved navigation items from Header component to data/data.ts
for better maintainability and reusability across components.
```

### Style Changes
```
style: improve footer responsive layout

- Adjust padding for mobile screens
- Update grid layout for tablet breakpoint
- Add hover effects to social links
```

### Documentation
```
docs: update README with project overview

Added tech stack details, current status, and setup instructions
to help new contributors understand the project structure.
```

---

## Best Practices

### DO
✅ Use imperative mood ("add" not "added" or "adds")
✅ Keep the summary line under 50 characters
✅ Capitalize the first letter of the summary
✅ Don't end the summary with a period
✅ Wrap body text at 72 characters
✅ Use bullet points for multiple changes
✅ Explain **what** and **why**, not **how**
✅ Reference issues/PRs in footer when applicable

### DON'T
❌ Don't make generic commits like "fix stuff" or "updates"
❌ Don't commit unrelated changes together
❌ Don't include implementation details in summary
❌ Don't use past tense
❌ Don't skip the commit message body for complex changes

---

## Quick Template

```
<type>: <summary>

What changed:
-
-
-

Why:
-

References: #<issue-number>
```

---

## Current Project Conventions

Based on existing commits in this project:
- Simple, descriptive summaries
- Imperative mood (e.g., "Implement TextBlock", "fix favicon")
- Focus on what component/feature was changed
- Lowercase for simple fixes, capitalize for features

### Recent Commit Examples from Project
```
Implement TextBlock
clean code
Implement Hero component
implement footer & adjust layout
fix favicon & public directory
```

## Important Notes

- **Do NOT add Claude Code attribution**: Commit messages should NOT include "🤖 Generated with Claude Code" or "Co-Authored-By: Claude" footers