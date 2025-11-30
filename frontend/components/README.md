# Components Documentation

This directory contains the reusable UI components for TypeForge.

## Structure

- `ui/`: Atomic components (Button, Input, Card).
- `layout/`: Global layout components (Header, Footer).
- `sections/`: Landing page sections.

## Guidelines

- **Atomic Design**: Keep components small and focused.
- **Reusability**: Avoid hardcoding values; use props.
- **Styling**: Use TailwindCSS classes.
- **Animation**: Use Framer Motion for interactions.

## Adding New Components

1. Create the component file in the appropriate subdirectory.
2. Export it as a named export.
3. Add a simple usage example in comments if complex.
