# MVC6.Material.Design.Starter
##Purpose
this project is using angularjs material design as starter and setup an working environment on VS2015 for developing angularjs.

##Princeple
use grunt to compile 
use npm to mange develop dependencies
use bower to manage project dependencies

develop project folder structure (thanks for https://scotch.io/tutorials/angularjs-best-practices-directory-structure)
> app/<br/>
> ----- shared/   // acts as reusable components<br/>
> ----- components/   //each component is treated as a mini Angular app, support to compile scss and css<br/>
> ---------- users/<br/><br/>
> --------------- app.css<br/>
> --------------- contactSheet.tmpl.html<br/>
> --------------- UserController.js<br/>
> --------------- UserService.js<br/>
> ----- app.module.js<br/>
> ----- app.routes.js<br/>
> index.html<br/>
> assets/<br/>
> ----- images/      // Images and icons for your app<br/>
> ----- styles/   // All styles and style related files (SCSS or LESS files)<br/>
> ----- js/       // JavaScript files written for your app that are not for angular<br/>

after compile the output will save in dist folder and copy to wwwroot for testing, all the template url will comiple into app.min.js using 
$templateCache and the static file will be replaced for new path, file will be appended hash
> dist/<br/>
>  --app  (all the components translations)<br/>
>  --scripts (all js or other scripts)<br/>
>  --styles (all css or other styles files)<br/>
>  --fonts (all fonts files)<br/>
>  --assets<br/>
>        -- images<br/>


##Usage:
- open with visual studio 2015
- grunt buildcss
- grunt all

##References:
https://github.com/angular/material
https://github.com/gruntjs/grunt-contrib-uglify
