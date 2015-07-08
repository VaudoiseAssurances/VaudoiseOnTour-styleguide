# VaudoiseOnTour

You can view all the UI components in the [styleguide](http://vaudoise.github.io/styleguide) !

## Installation

````shell
$ npm install
$ bower install
$ gulp
````

## Development

````shell
$ gulp serve
````

### Components

To add reusable element like **header**, **navbar**, **footer**,... just add it in the `assets/components/...` directory. To use it on templates, include your component with the Handlebars syntax. For example if you have `assets/components/molecules/thumbnail.html`, add `{{> thumnail }}` in your template.

The directory where the component is located (atoms, molecules, organisms,...) depends of his size acording to the [atomic design principles](http://bradfrost.com/blog/post/atomic-web-design/).

You can inject content in your component by using variables. Example in `heading.html` :

````html
<h1>
  {{ title }}
</h1>
````

or (more complex) :

````html
<h1>
  {{# if title}}
    {{ title }}
  {{ else }}
    Mon super titre !
  {{/if}}
</h1>
````

and in `homepage.html` :

````html
<div class="container">
  {{> heading title="Hello" }}
</div>
````

### Data

You can use data injection in your templates/components by adding a data JSON/YAML file in the `assets/data/` directory.

For **example**** if you have in `assets/data/cat.yml` :

````yml
kitten:
    name: 'Arnold'
````

You can use it in your template/component with `{{ cat.kitten.name }}`

For a more **complex example**, you can loop over json array like :

in `data/cat.json` :

````json
{
    "kitten": [
        {
            "name": "Arnold",
            "age": 8
        },
        {
            "name": "James",
            "age": 19
        }
    ]
}
````

in `components/card.html` :

````html
<h3>{{ title }}</h3>
<small>{{ something }}</small>
````

To use this two in my `templates/homepage.html` to list kittens :

````html
{{#each cat.kitten }}
  {{> card title=this.name something=this.age }}
{{/each}}
````

### Templates :

To build **templates**, you can had all your html files in the `assets/templates/` directory.

## Usage

Use the builded files from `./build`
