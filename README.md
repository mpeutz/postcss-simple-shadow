# Simple Shadow Postcss Plugin

[![Build Status](https://travis-ci.org/mpeutz/postcss-simple-shadow.svg?branch=master)](https://travis-ci.org/mpeutz/postcss-simple-shadow)

Postcss function that will produce a Material design style drop shadow. There are 25 depths ranging from 0 25; 0 having no shadow while 25 has the most.

### Usage
---

Used as declaration is the quickest use of the shadow function

shadow: &lt;depth&gt;;

- **Depth**: number value between 0 and 25.

```css
/* input.css */
shadow: 10;

/* output.css */
box-shadow: 0px 5px 7px -3px rgba(0, 0, 0, 0.2), 0px 10px 16px 2px rgba(0, 0, 0, 0.15), 0px 4px 20px 4px rgba(0, 0, 0, 0.09);
```
---

Shadow can also be used as a property; it can be mixed with other shadow props.

box-shadow: &lt;additional properties ...&gt; shadow(&lt;depth&gt;);

- **Depth**: number value between 0 and 25.

```css
/* input.css */
box-shadow: inset 0 1px 1px #000, shadow(15), inset 0 -1px 1px #fff;

/* output.css */
box-shadow: inset 0 1px 1px #000, 0px 7px 10px -5px rgba(0, 0, 0, 0.25), 0px 15px 24px 2px rgba(0, 0, 0, 0.18), 0px 6px 29px 5px rgba(0, 0, 0, 0.11), inset 0 -1px 1px #fff;;
```