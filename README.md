# React Markdown Live Preview

To preview a markdown file:

```
PORT=9000 FILE=~/w/react/buyshoes-layout/_index.md make dev
```

+ Starts webpack for auto rebuild.
+ Starts BrowserSync to live reload.

The `dirname` of the target markdown file is the root for static assets. All references to assets should be relative to the directory of the markdown file.

# NPM Package

Coming soonish.
