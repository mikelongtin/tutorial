
// Modules
var gulp        = require('gulp');
var g           = require('gulp-load-plugins')({ lazy: true });
var browserify  = require('browserify');
var jadeify     = require('jadeify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var del         = require('del');

// Paths
//**********************************************************************
var path =
{
	libjs :
	[
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/lodash/lodash.min.js',
		'node_modules/backbone/backbone-min.js',
		'node_modules/socket.io-client/socket.io.js',
		'node_modules/materialize-css/dist/js/materialize.min.js',
		'node_modules/datatables.net/js/jquery.dataTables.js',
		'node_modules/highcharts/highcharts.js',
		'node_modules/highcharts/modules/data.js',
		'node_modules/highcharts/modules/drilldown.js',
		'node_modules/highcharts/modules/heatmap.js',
		'node_modules/highcharts/modules/exporting.js',
		'public/base64.min.js',
		'public/colorGradient.min.js',
		'public/dataTables.materialize.js'
	],
	libcss :
	[
		'node_modules/materialize-css/dist/css/materialize.min.css',
		'public/dataTables.materialize.css'
	]
};

// Tasks
//**********************************************************************
gulp.task('lint', function ()
{
	return gulp.src(['config/**/*.js', 'app/**/*.js', 'client/**/*.js'], { base: __dirname })
		.pipe(g.jshint('.jshintrc'))
		.pipe(g.jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task('clean', function (done)
{
	return del([ 'dist/js/*', 'dist/css/*', 'dist/fonts/*' ], done);
});

gulp.task('prebuild', ['lint', 'clean']);

gulp.task('build', ['build:bundle', 'build:fonts']);

gulp.task('build:bundle', ['build:browserify', 'build:less', 'build:libjs', 'build:libcss']);

gulp.task('build:fonts', ['fonts:font-awesome', 'fonts:materialize-css']);

gulp.task('build:browserify', ['prebuild'], function ()
{
	// Browserify all client side module dependencies
	var options =
	{
		basedir: __dirname,
		entries: 'client/app.js',
		cache: {},
		packageCache: {},
		fullPaths: true
	};

	var bundler = browserify(options);           // Browserify
	bundler.transform(jadeify);                  // Jade Template Transformer

	// Uglify and Output
	function bundle ()
	{
		var stream = bundler.bundle();
		stream.on('error', function (err)
		{
			console.log('Browserify: ' + err);
		});
		
		return stream.pipe(source('index.js')) // gives streaming vinyl file object
			.pipe(buffer()) // convert from streaming to buffered vinyl file object
			.pipe(g.uglify())
			.pipe(gulp.dest('dist/js'));
	}

	// listen for an update and run bundle
	bundler.on('update', function ()
	{
		console.log('Rebundling...');
		bundle();
	});

	return bundle();
});

gulp.task('build:less', ['prebuild'], function ()
{
	return gulp.src('client/styles/index.less')
		.pipe(g.plumber())
		.pipe(g.less())
		.pipe(g.autoprefixer({ browsers: [ 'last 2 version', '> 5%' ] }))
		.pipe(g.concat('index.css'))
		.pipe(g.cleanCss({ keepBreaks: false }))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('build:libjs', ['prebuild'],  function ()
{
	return gulp.src(path.libjs)
		.pipe(g.concat('lib.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('build:libcss', ['prebuild'],  function ()
{
	return gulp.src(path.libcss)
		.pipe(g.concat('lib.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('fonts:font-awesome', ['prebuild'],  function ()
{
	return gulp.src('node_modules/font-awesome/fonts/*', {base: 'node_modules/font-awesome/fonts'})
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('fonts:materialize-css', ['prebuild'],  function ()
{
	return gulp.src('node_modules/materialize-css/fonts/roboto/*', {base: 'node_modules/materialize-css/fonts/roboto'})
		.pipe(gulp.dest('dist/fonts/roboto'));
});

// Start Build
//**********************************************************************
gulp.task('default', ['lint', 'clean', 'build']);
