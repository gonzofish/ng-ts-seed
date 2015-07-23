# ng-ts-seed

Angular 1.x & TypeScript 1.5+ together at last.

## Why?

With Angular 2 impending and its preference towards TypeScript development, I thought it'd be good to start using TypeScript with Angular
today. This turned out to be an interesting journey and I thought that it might be helpful to anyone who wants to develop this way today to
not worry themselves running through the trials & tribulations that I did to get here.

## How?

You can be up and running in just *4 easy steps*!

1. **You'll need two pieces of software**

	- git: http://git-scm.com/
	- Node.js: http://nodejs.org/

2. Install global Node modules

		npm i -g gulp tsd

	- `gulp`: is for using Gulp
	- `tsd`: is the [TypeScript Definition manager](http://definitelytyped.org/tsd/) for Definitely Typed. These typings will be used when transpiling your TypeScript files. Additionally it is great for tooling. See [DefinitleyTyped](http://definitelytyped.org/) for more information.

3. **Clone the project**

	- With full history:

        	git clone https://github.com/gonzofish/ng-ts-seed.git
	        cd ng-ts-seed
	- Without full history (probably how you want to do it):

	        git clone --depth=1 https://github.com/gonzofish/ng-ts-seed.git <project name>

	    The `depth=1` just tells git to pull the history through the last commit only.

4. **Install the dependencies**

		npm install

"[And, baby, you got a stew going](https://www.youtube.com/watch?v=Sr2PlqXw03Y)".

## Swappable Dependencies

This project does use some dependencies that could be considered swappable for others. Additionally, this doesn't come with all the
batteries included for Angular (i.e., ngAria, ngTouch, etc.)--I'll leave that to you to decide what you like best. Here are the
technologies that you could swap for another and some examples you could swap to:

- ngRoute -> ui-router
    I definitely think the nested concept of ui-router is great, but I don't know enough about ui-router to use it effectively.
- Gulp -> Broccoli, Brunch, Grunt
    I personally like Gulp because it is concise and fast. I used to love Grunt, times change.
- Jasmine -> Mocha, QUint
- NPM -> Bower, jspm
    While just about everyone uses NPM for development dependencies, I also use it for managing my deployment dependencies.
- wepack -> browserify, System.js
    I tried System.js & browserify for this...wepack just clicked for me and I haven't looked back since.

## Directory Layout

You can get rid of all the sample-* folders & files once you clone the project. I wish I didn't have to do it this way, but git has no clean way of representing empty directories.

	app/
		components/
			sample-component/
				sample-component.html
				sample-component.ts
		scripts/
			constants/
				sample-constants.ts
			filters/
				sample-filter.ts
			services/
				sample-service.ts
			app.ts
		index.html
	test/
		karma.conf.ts
		spec/
			components/
				sample-component.spec.ts
			filters/
				sample-filter.spec.ts
			services/
				sample-service.spec.ts
    typings/
        angularjs/
            angular-animate.d.ts
            angular-cookes.d.ts
            angular-mocks.d.ts
            angular-resource.d.ts
            angular-route.d.ts
            angular-sanitize.d.ts
            angular.d.ts
        jasmine/
            jasmine.d.ts
        jquery/
            jquery.d.ts
        tsd.d.ts
	gulp.config.js
	gulpfile.js
	package.json
	tsconfig.json
	tsd.json
	tslint.json
	webpack.config.js

Whew! That's a lot of files....here's what they all are/do:

- `app` (and it's children): This is where all of your application's development files will be.
- `test\spec` (and it's children): The unit test files.
- `test\karma.conf.ts`: The Karma configuration file.
- `typings\tsd.d.ts`: Your main type definition file.
- `typings\*`: Each of the types defined. More can be added by running `tsd install -sro <library name>` in your project's root. 
- `gulp.config.js`: A custom node module that emits a JSON with reusable values--mostly to adhere to a [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principle.
- `gulpfile.js`: The execution module for Gulp.
- `package.json`: Your project's NPM package file.
- `tsconfig.json`: The TypeScript configuration file.
- `tsd.json`: The TypeScript Definition manage configuration file.
- `tslint.json`: The JSON for the TypeScript linter rules to use.
- `webpack.config.js`:  The webpack configuration file.

### Auto-Created Folders

There are also some folders that will be created during the lifecycle of your project:

- `coverage`: This will be where your code coverage output files will live.
- `dev`: The destination for your post-transpiled application during development. 
- `dist`: The destination for your compiled application.
- `node_modules`: Where your dependencies will live. Populates from `npm install`.
- `transpiled`: Where the files end up post-transpilation from TypeScript -> JavaScript.

## Testing

All that's been set up here are unit tests. The tests are run using the [Karma Test Runner](http://karma-runner.github.io/0.13/index.html) and the tests are written in [Jasmine 2](http://jasmine.github.io/2.3/introduction.html).

To run the tests, you just call

	gulp test

If you want to do a browser-based file-watching testing, call

	gulp test --watch

## Serving the Site

If you want to actually use the site, just call

	gulp serve

If you want to serve the [distribution build](#building-the-site-for-distribution) of the site, call

	gulp serve --dist

## Building the Site for Distribution

To build the site minified and packed for delivery, call

	gulp dist