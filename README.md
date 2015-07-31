# MVC6.Material.Design.Starter
##Purpose
this project is using angularjs material design as starter and setup an working environment on VS2015 for developing angularjs.

##Princeple
use grunt to compile 
use npm to mange develop dependencies
use bower to manage project dependencies

develop project folder structure (thanks for https://scotch.io/tutorials/angularjs-best-practices-directory-structure)
> app/
> ----- shared/   // acts as reusable components
> ----- components/   //each component is treated as a mini Angular app, support to compile scss and css
> ---------- users/
> --------------- app.css
> --------------- contactSheet.tmpl.html
> --------------- UserController.js
> --------------- UserService.js
> ----- app.module.js
> ----- app.routes.js
> index.html
> assets/
> ----- img/      // Images and icons for your app
> ----- styles/   // All styles and style related files (SCSS or LESS files)
> ----- js/       // JavaScript files written for your app that are not for angular

after compile the output will save in dist folder and copy to wwwroot for testing, all the template url will comiple into app.min.js using 
$templateCache and the static file will be replaced for new path, file will be appended hash
> dist/
>  --app  (all the components translations)
>  --scripts (all js or other scripts)
>  --styles (all css or other styles files)
>  --fonts (all fonts files)
>  --assets
>        -- images


##Usage:
- open with visual studio 2015
- grunt buildcss
- grunt all

##References:
https://github.com/angular/material
https://github.com/gruntjs/grunt-contrib-uglify
