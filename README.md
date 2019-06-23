# Gulp building system

This gulp template allows you to build your project with concat, minify, autoprefex and live reload CSS, JS and HTML files.

## Struct

>./gulpfile.js  
>./package.json  
>./index.html  
>./src  
>>	/css  
>>>		/main.css  
>>>		/media.css  
>>	/js  
>>>		/lib.js  
>>>		/main.js  

## Installation

Clone project to your project folder.

~~~
  $ git clone https://github.com/andrew-opanasenko/gulp-template.git
~~~

Install all necessary packages (be sure you've installed [NodeJS](https://nodejs.org/en/)).

~~~
  $ npm install
~~~

## Usage

### Compiles and minifies

~~~
  gulp build
~~~

### Watching and live reload

~~~
  gulp dev
~~~

## TODO

- [ ] Autocompile for sass/less files.
- [ ] Autosearch js and css files in project folder.






