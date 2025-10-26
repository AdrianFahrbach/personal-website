---
applyTo: '**/*.scss'
---

# Styling guidelines

This project uses SCSS modules for styling components. Each component has its own SCSS file that is imported as a module in the component file. This ensures that styles are scoped to the component and do not leak into other components.
Since we therfore don't have to worry about class name collisions, we can use simple class names like `.button` or `.image` without worrying about them being used in other components. We can therefore avoid using BEM or other class naming conventions.

```scss
.button {
  background-color: red;
}
```

To apply modifiers to a class, you can use the `&` selector and simple modifiers classes like `.isFoo` or `.hasBar`.

```scss
.button {
  &.isRed {
    background-color: red;
  }

  &.isRlue {
    background-color: blue;
  }

  &.hasOutline {
    border: 1px solid black;
  }
}
```

CSS variables for colors, font styles, layout, and more are added to the `:root` element in our `global.scss` file. Use these variables instead of hardcoding values in your styles.
