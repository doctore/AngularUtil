# AngularUtil

- [Why was this project created?](#why-was-this-project-created)
- [Elements included in this project](#elements-included-in-this-project)
  - [New types](#new-types)
  - [Collections](#collections) 
  - [Services](#services)
  - [Util classes](#util-classes)
- [How to use the project](#how-to-use-the-project)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Building](#building)
  - [Running unit tests](#running-unit-tests)
  - [Running benchmarks](#running-benchmarks)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Additional Resources](#additional-resources)
- [Changelog](#changelog) 


## Why was this project created?

The main goal is to include several general purpose functionality, mainly related to functional programming, in a common Angular project.
<br><br>



## Elements included in this project

Below is shown a brief introduction to the functionality included in this one:
<br><br>


### New types

New types providing generic functionality like:

* [Comparator](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/comparator/comparator.type.ts) comparison function, which imposes a total ordering on some collection of objects.
* [Consumer](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/consumer) represents an operation that accepts zero or more input arguments and returns no result.
* [Generic subject](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/subject/generic-subject.type.ts) wrapper of RxJS [Subject](https://rxjs.dev/guide/subject) adding several customizations.

Others related with functional programming:

* [Either](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/functional/either.type.ts) represents a value of one of two possible types (a disjoint union).
* [Function](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/function) represents an operation that accepts zero or more input arguments and returns a result.
* [Predicate](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/predicate) represents an operation that accepts zero or more input arguments and returns a boolean result based on provided data.
* [Optional](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/functional/optional.type.ts) a container object which may or may not contain a non-null value.
* [Try](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/functional/try.type.ts) computation representation that may either result in an error, or return a successfully computed value.
* [Validation](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/functional/validation.type.ts) used to validate the given instance, defining 2 different status to manage the result: `Valid` and `Invalid`.


### Collections

There are new collections used to store, search, sort and organize data more easily - all using standardized methods and patterns:

* [Set](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/collection/set) stores a collection of unique elements.
  - [MutableHashSet](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/collection/set/mutable-hash-set.type.ts): unordered collection of unique elements based on hash function to locate internal elements. This Set can be updated, reduced or extended in place.
  - [ImmutableHashSet](https://github.com/doctore/AngularUtil/blob/main/src/app/core/type/collection/set/immutable-hash-set.type.ts): unordered collection of unique elements based on hash function to locate internal elements. This Set never change, that is, all the operations updating it will return a new Set and leave the old one unchanged.


### Services

* [CookieService](https://github.com/doctore/AngularUtil/blob/main/src/app/core/service/cookie.service.ts)
* [WebStorageService](https://github.com/doctore/AngularUtil/blob/main/src/app/core/service/web-storage.service.ts)


### Util classes

* [ArrayUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/array-util.ts)
* [AssertUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/assert-util.ts)
* [JsonUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/json-util.ts)
* [MapUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/map-util.ts)
* [NumberUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/number-util.ts)
* [ObjectUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/object-util.ts)
* [SetUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/set-util.ts)
* [StringUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/string-util.ts)
<br><br>



## How to use the project

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.3.


### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```


### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.


### Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```


### Running benchmarks

To execute benchmarks with the [Vitest](https://vitest.dev/) benchmark runner, use the following command:

```bash
vitest bench
```


### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.


### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
<br><br>



## Changelog

There are previous versions of this project located with other git branches different than [main](https://github.com/doctore/AngularUtil/tree/main):

* [2.7.5](https://github.com/doctore/AngularUtil/tree/archive/v2.7.5) related with Angular 15 and TypeScript 4.9.
