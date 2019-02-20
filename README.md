# Simple Shadow Postcss Plugin

Postcss function that will produce a Material design style drop shadow. There are 25 depths ranging from 0 25; 0 having no shadow while 25 has the most.

### Usage
---
shadow: &lt;depth&gt;;

- **Depth**: number value between 0 and 25.

```css
/* input.css */
shadow: 10;

/* output.css */
box-shadow: box-shadow: 0px 5px 7px -3px rgba(0, 0, 0, 0.2), 0px 10px 16px 2px rgba(0, 0, 0, 0.15), 0px 4px 20px 4px rgba(0, 0, 0, 0.09);
```
