# Front-end Development. Gulp builder. Pug + Sass/SCSS.

Thanks for choosing our team!  
This Readme contains all the information needed to work with our markup build, understand it's structure and complile the project on your side.

The builder helps to automate tasks in everyday front-end development: compiles Sass/SCSS and Pug, compresses files, optimizes images and allows to write JS in ECMAScript. Each time you save a file in the code editor, browser automatically reloads the page.

## Main structure

* ```html``` — ready to go html markup of the website;
* ```sources``` — source files, gulp builder, configs and so on;
* ```README.md``` — this readme.

Most likely you'll need only ```html``` folder. But we advice not to make changes in this folder directly. If you receive updates from us, you'll need to add your changes again or transfer our updates to your code. Try to automate the process or make a documentation/version control for this folder.

Working with ```sources``` is always welcome. After you've made any updates, you just send this folder to us and we continue development without any problems. Using Git for this is also a great approach.

## How to work with sources?

In many cases it shouldn't be a problem. We tried to use popular components and technologies to unify the process as much as possible and include all steps in this instruction.


## What does the builder include?

* [browser-sync](https://browsersync.io/docs/gulp) — live reload web-page when you make changes in source files;
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) — automatically put prefixes in CSS files according to [Can I Use](https://caniuse.com/);
* [gulp-babel](https://www.npmjs.com/package/gulp-babel) — using ECMAScript with [Babel](https://babeljs.io/);
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) — minificator of JS-files;
* [gulp-pug](https://www.npmjs.com/package/gulp-pug) — compiler of Pug into HTML;
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) — compiler of Sass/SCSS into CSS;
* [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) — minificator of CSS-files;
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) — style map;
* [gulp-concat](https://www.npmjs.com/package/gulp-concat) — file concat;
* [gulp-add-src](https://www.npmjs.com/package/gulp-add-src) — adding files for concat;
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) — compress images PNG, JPG, GIF and SVG;
* [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) — addon for gulp-imagemin to work with PNG;
* [imagemin-jpeg-recompress](https://www.npmjs.com/package/imagemin-jpeg-recompress) — addon for gulp-imagemin to work with JPG;
* [gulp-webp](https://github.com/sindresorhus/gulp-webp) — create and optimize WebP images;
* [gulp-favicons](https://github.com/evilebottnawi/favicons) — favicon generator for your project;
* [gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite) — generate an SVG-sprite;
* [gulp-replace](https://www.npmjs.com/package/gulp-replace) — replace strings in source files;
* [gulp-newer](https://www.npmjs.com/package/gulp-newer) — addon for ```gulp-imagemin``` to compress only new added files;
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) — notifications in terminal (eg, errors in Sass/SCSS when compiling);
* [gulp-debug](https://www.npmjs.com/package/gulp-debug) — debug in terminal;
* [gulp-watch](https://www.npmjs.com/package/gulp-watch) — file watcher for changes in sources;
* [gulp-clean](https://www.npmjs.com/package/gulp-clean) — remove files and folders.

## Set up the environment

* Node version 14+ must be [installed](https://nodejs.org/en/download/);
<details><summary>pnpm should be installed...</summary>
<p>

```sh
npm install -g pnpm
```  

</p>
</details>
<details><summary>gulp-cli must be installed...</summary>
<p>

```sh
npm install -g gulp-cli
```  

</p>
</details>
<details><summary>additionally may be needed for Windows</summary>
<p>

* [Git for Windows](https://gitforwindows.org/);  
* in PowerShell, run as administrator:  
```sh
npm install --global windows-build-tools
```  
```sh
Set-ExecutionPolicy -ExecutionPolicy Unrestricted
```

</p>
</details>
<details><summary>additionally may be needed for Linux</summary>
<p>

* for example in Ubuntu 18.04+:  
```sh
sudo apt install -y build-essential attr autoconf libjpeg-dev libpng-dev libtiff-dev libgif-dev
```  

</p>
</details>

* download our markup as zip and extract it or clone it from git (probably you have already done it if you are reading this doc);
* in terminal go to the sources folder:
```sh
cd sources
```
* run command to download and prepare components of the builder:
```sh
yarn
```

When completed, you will see the following:
```sh
➤ YN0000: └ Completed in XXs
➤ YN0000: Done in XXm
```
or
```sh
➤ YN0000: └ Completed in XXs
➤ YN0000: Done with warnings in XXm
```
If the process breaks with error, please check that all the components mentioned above are installed and their versions are correct. If you can't solve the problem, do not hesitate to contacts us - we'll try to find solution.


## How to build?

As you already know, the project builds in ```html``` folder next to ```sources```.

So, we have open terminal, working folder — ```sources```  
Run:
```sh
gulp
```

![](https://myscreen.onl/rv6wj)

If everything goes right, working project will open in a browser window at local server http://localhost:9000 and it will have active live reload. That means the build completed successfully and a new markup in ```html``` folder is fully updated from the current sources.

At the same time active monitoring for file changes runs in the following directories:
* ```sources/src/pug/**/*.pug```
* ```sources/src/sass/**/*.{scss,sass}```
* ```sources/src/fonts/**/*```
* ```sources/src/images/**/*``` — all images will be compressed automatically
* ```sources/src/images/favicons/*``` — all necessary favicons are generated from one image
* ```sources/src/images/skip-optimization/**/*``` — for images which should not be compressed (eg. you compressed them manually)
* ```sources/src/images/sprite-svg/*.svg``` — all svg files here will be collected in one sprite
* ```sources/src/js/**/*.js``` — all js files will be concatenated into one main.min.js
* ```sources/src/html_direct_copying/**/*``` — static files/folders, which are copied directly to the html folder

To stop watcher press  ```Ctrl + C```.

## Build failed with error?

Let's try to reset cache and install project modules from scratch. In the ```sources``` delete next folders and files (if exist):  
```sh  
node_modules
pnpm-lock.yaml
.yarn
.yarnrc.yml
.pnp.js
yarn.lock
package-lock.json
```

Then run:
```sh
pnpm install
gulp
```


## Commands (tasks) of the builder

Often for a completed project you will need to update only specific files (styles, images, scripts or html) without making full re-build.
In our builder these commands are available for updating:
```gulp pug``` — html code  
```gulp styles``` — styles  
```gulp styles_min``` — styles with minification  
```gulp styles_unmin``` — styles without minification  
```gulp scripts``` — scripts  
```gulp scripts_min``` — scripts with minification  
```gulp scripts_unmin``` — scripts without minification*  
```gulp favicons``` — favicon  
```gulp images``` — images  
```gulp sprite``` — svg-sprites (don't forget to update styles after that, see below)  
```gulp html_direct_copying``` — direct copying of any file/folder from ```sources/src/html_direct_copying``` to ```html```

Copying new added libraries:  
```gulp libs``` (don't forget to update scripts after that, see below)

Build full project without running local webserver and live reload:
```gulp build```  
```gulp build_min``` — build with minification  
```gulp build_unmin``` — build without minification*

Run local webserver with live reload: 
```gulp watch```  
```gulp watch_min``` — with minification  
```gulp watch_unmin``` — without minification*

Check W3C HTML validation:  
```gulp validateHtml```

\* — please don't forget to attach separated libs in ```sources/src/pug/base/_layout.pug```.


## Sass vs SCSS

The compiler supports both formats. The only rule is that code in a single .sass or .scss file must be written either in pure sass syntax or scss. At the same time, the different files that you import can have different syntax (.sass or .scss, respectively).


## Image Optimization

The builder performs automatic image compression. Priority is given to the maximum visual quality with no obvious artifacts on any kind of displays. Considering this, we need to mention that Google PageSpeed or similar tools for analyzing image compression may indicate that further compression should be applied, so you are to decide, what is more important for your project. You can change the compression level with the appropriate settings in ```sources/gulp/tasks/images.js``` and restart the build of ```gulp```.

**JPG**: optimization is configured and works fine. The main thing is to use JPG with a quality of 100% (without any initial compression).

**PNG**: optimization is configured and works well. In some cases, [TinyPNG](https://tinypng.com/) will do better (in quality and/or compression ratio), but overall the result is similar.  Keep the original PNGs (PNG24), without compression and/or any optimization.

**SVG**: optimization is configured and works fine. However, the svg format itself is very complicated, it can include raster graphics inside(!), animations, so svg output loss/distortion is not excluded (in this case, use the advice below). However, during testing, no problems with this optimizer have been identified.

In the builder there is a folder ```sources/src/images/skip-optimization/``` — all files from it are copied without any changes to ```html/images/```.
In case if optimizer worked poorly for a particular image, optimize it manually.
**Note:** save the file in ```sources/src/images/skip-optimization/``` make sure that there is no file with the same name in the main folder ```sources/src/images/```.

## WebP images

The builder performs automatic WebP image conversion and optimization. All raster images from ```sources/src/images/``` will be automatically converted into .webp and saved to the main stream ```html/images/```. Quality level is 85. It's enough for most cases, but also can be changed in ```sources/gulp/tasks/images.js```.


## Icon Font? We don't use it anymore!

And instead we use svg sprites. Font was used earlier for maximum cross-browser compatibility, now it is not relevant. Detailed comparison [here](https://css-tricks.com/icon-fonts-vs-svg/).


## Bower or adding libraries (including jQuery, slick, etc.)

Previously, Bower was popular for automatic downloading of libraries and plugins. Now almost everything supports installing via PNPM.

For example, you need [jQuery](https://jquery.com/) (perhaps already used in the layout), enter the command: ```npm install jquery``` or ```pnpm add jquery```.

The library will be downloaded to ```node_modules```, and dependency will be added to ```sources/package.json```.
When the dependency is already registered, these commands are not needed - everything gets automatically downloaded, when the project is deployed (```pnpm i --frozen-lockfile```).
To remove: ```pnpm remove jquery```. You can also manually clean the ```sources/package.json``` and run ```pnpm install```.
Note: in this way deleted libraries **are not automatically deleted** from ```sources/src/libs```. So, everything superfluous should be cleaned manually.

Next, run: ```gulp libs``` — all libraries will be copied to ```sources/src/libs```. Source files and documentation will also be included.
Layout usually uses only collected minified distributions, most often they are in ```dist``` folder.

The path to the libraries is in ```sources/src/js/_libs_concat.cjs```.
After running build all JS files are merged into one file ```html/js/main.min.js``` and usually it is added to ```sources/src/pug/base/_layout.pug```.

## Questions, comments, suggestions?

Contact us!
