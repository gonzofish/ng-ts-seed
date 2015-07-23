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

	app/
		components/
		scripts/
			filters/
			services/
			app.ts
		index.html
	test/
		karma.conf.js
		spec/
			components/
			filters/
			services/
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