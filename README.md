# monad-slug
Support for slug fields for Monad CMS

Sometimes items in an admin will require a _slug_. Slugs are URL-enabled
versions of plain text, e.g. the title of a blog post. In other words, given
the following blog post:

```html
<h1>My awesome blog!</h1>
```

...we would need to generate this slug for SEO-friendly links:

```html
<a href="/my-awesome-blog/">My awesome blog!</a>
```

This plugin automates that process for you, optionally allowing the author to
override the generated slug.

## Installation

### NPM
```sh
$ npm install --save monad-slug
```

```js
var monad = require('monad-cms');
var monadSlug = require('monad-slug');

angular.module('myAwesomeCms', [monad, monadSlug]);
```

### Bower
```sh
$ bower install --save monad-slug
```

```html
<!-- Optionally use the .min.js versions in production: -->
<script src="/path/to/monad-cms.js"></script>
<script src="/path/to/monad-slug.js"></script>
<script src="/path/to/your/bundle.js"></script>
```

```js
angular.module('myAwesomeCms', [monad, monadSlug]);
```

## Usage
Slugs require a source field. Let's say your model is like so:

```js
var blogPost = {
    title: 'My awesome blog!',
    slug: ''
};
```

In the schema view, you could then write this:

```html
<label>Title:</label>
<input type="text" ng-model="blogPost.title">

<label>Slug:</label>
<input type="text" ng-model="blogPost.slug" monad-slug="blogPost.title">
```

The directive now watches the `title` for changes, and updates the `ngModel`
specified on the form element with the new slug.

Use a hidden element or the `disabled` attribute to prevent authors overriding
the generated slug.

## Todo/wishlist
- Support for checking slug uniqueness via an API

