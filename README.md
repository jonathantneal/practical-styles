# Practical Styles

**[Practical Styles]** are a collection of meaningful properties and functional
classes designed to help you write cleaner, scalable, and easier to maintain
CSS.

They are built upon [CSS Custom Properties] and the [CSS Functional Classes].

```sh
npm install --save-dev jonathantneal/practical-styles
```

## Usage

Practical Styles are used like extensions for rules. Their purposeful names
make them highly readable and reusable.

```css
.my-image {
  @extend %ratio, %ratio-cinema;
}

/* becomes */

.my-image {
  display: block;
  position: relative;
}

.my-image::before {
  content: "";
  display: block;
  padding-top: 41.841%;
}

.my-image > :first-child {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
```

## Styles

### Border Box

Apply sizing, padding, and borders more intuitively to an element and all of
its descendants. See the [rule](dependent-css/border-box.css) and its
[atomic variation](dependent-css/border-box.atomic.css).

```css
.some-selector {
  @extend %border-box;
}

/* becomes */

.some-selector {
  &, &::before, &::after {
    box-sizing: border-box;
  }
}
```

### Timing

Apply a greater variety of easings to animations and transitions. See the
[properties](dependent-css/timing.css).

```css
.some-selector {
  transition-timing-function: var(--ease-out-quad-timing);
}

/* becomes */

.some-selector {
  &, &::before, &::after {
    box-sizing: border-box;
  }
}
```

### Normalize

Selectively normalize the appearance of native elements in all browsers. See
all the [available normalizations](dependent-css/normalize.css) and their
[atomic variations](dependent-css/normalize.atomic.css).

```scss
.some-selector {
  @extend %normalize-button;
}

/* becomes */

.some-selector {
  -webkit-appearance: button;
  margin: 0;
  overflow: visible;
  text-transform: none;

  &::-moz-focus-inner {
    border-style: none;
    outline: 1px dotted ButtonText;
    padding: 0;
  }

  &:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
}
```

### Ratio

Size containers using aspect ratios. See all the
[available ratios](dependent-css/ratio.css) and their
[atomic variations](dependent-css/ratio.atomic.css).

```scss
.some-selector {
  @extend %ratio, %ratio-16x9;
}

/* becomes */

.some-selector {
  display: block;
  position: relative;

  &::before {
    content: "";
    display: block;
    padding-top: 56.25%;
  }

  & > :first-child {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
```

### Unset

Selectively unset native element styles in all browsers. See all the
[available unsets](dependent-css/unset.css) and their
[atomic variations](dependent-css/unset.atomic.css).

```scss
.some-selector {
  @extend %unset-input;
}

/* becomes */

.some-selector {
  background-color: transparent;
  border-width: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  padding: 0;
}
```

[CSS Custom Properties]: https://drafts.csswg.org/css-variables/
[CSS Functional Classes]: https://jonathantneal.github.io/specs/css-extend-rule/
[Practical Styles]: https://github.com/jonathantneal/practical-styles
