# lazyload

Image lazy loaded


## Install

```bash
npm install plugin-lazyload --save-dev
```

## Example

```html
<body id="app">
    <div>
        <img class="lazy-image" data-src="1.png"/>
    </div>
</body>
<script>
new LazyLoad([options])
</script>
```

### Options

Name                   | default      | description
:--------------------- | :----------- | :--------------------
lazyLoadingClass       | lazy-image   | 需要懒加载图片的class
lazyStatusLoadingClass | lazy-loading | 懒加载图片加载中的class
lazyStatusLoadedClass  | lazy-loaded  | 懒加载图片加载完成后的class
lazyScreenMount  | 0  | 提前加载几屏, 可以是小数

## Methods

- `stop`
- `start`
