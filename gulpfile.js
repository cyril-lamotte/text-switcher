'use strict';

/**
  * Usage :
  *
  * `gulp` : Lancer l'écoute des répertoire.
  * `gulp archive` : Générer une archive du répertoire.
  */


/* =============================================================================
   Configuration
============================================================================= */

try {

// Packages
var gulp             = require('gulp'),                // gulp core.
    gutil            = require('gulp-util'),           // Display logs in console.
    sass             = require('gulp-sass'),           // Compile SASS code.
    postcss          = require('gulp-postcss'),        // Post CSS features.
    autoprefixer     = require('autoprefixer'),        // Add browsers prefix.
    sourcemaps       = require('gulp-sourcemaps');     // Generate SASS sourcemap.

} catch(err) {

  gutil.log('>> Un ou plusieurs modules sont manquants, lancer la commande `npm install`');
  gutil.log('>> ' + err.message);

  return;
}


// Project
var project = {
  namespace: 'mockup'
}

// Paths
var paths = {
  scss: 'sources/scss/',
  dist: 'dist/',
  css: 'dist/assets/css/',
}


// Errors managment
var onError = function(err) {
  gutil.log(err.message);
  this.emit('end');
}


/* =============================================================================
   Build tasks
============================================================================= */

/**
  * Build CSS
  *
  * Compilation SASS
  * Génération des sourcemaps
  * Autoprefixer
  */
gulp.task('build-css', function() {

  console.log('');
  console.log('');

  return gulp.src(paths.scss + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', onError)
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions', '> 1%'] }) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css));

});


/* =============================================================================
   Default & watch
============================================================================= */

// Watch.
gulp.task('watch', function() {
  gulp.watch(paths.scss + '**/*.scss', ['build-css']);
});

// Define the default task.
gulp.task('default', ['build-css', 'watch']);
