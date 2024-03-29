# AngularUtil

- [Why was this project created?](#why-was-this-project-created)
- [Elements included in this project](#elements-included-in-this-project)
  - [New types](#new-types)
  - [Util classes](#util-classes)
  - [Angular components](#angular-components) 
- [How to use the project](#how-to-use-the-project)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Further help](#further-help) 


## Why was this project created?

The main goal is to include several general purpose functionality, mainly related to functional programming, in a common Angular project.
<br><br>



## Elements included in this project

Below is shown a brief introduction to the functionality included in this one:
<br><br>


### New types

New types providing generic functionality like: 

* [Comparator](https://github.com/doctore/AngularUtil/blob/main/src/app/core/types/comparator/comparator.type.ts) comparison function, which imposes a total ordering on some collection of objects.
* [Consumer](https://github.com/doctore/AngularUtil/blob/main/src/app/core/types/consumer) represents an operation that accepts zero or more input arguments and returns no result.
* [Generic subject](https://github.com/doctore/AngularUtil/blob/main/src/app/core/types/subject/generic-subject.type.ts) wrapper of RxJS [Subject](https://rxjs.dev/guide/subject) adding several customizations.

Others related with functional programming:

* [Either](https://github.com/doctore/AngularUtil/blob/main/src/app/core/types/functional/either.type.ts) represents a value of one of two possible types (a disjoint union).
* [Function](https://github.com/doctore/AngularUtil/blob/main/src/app/core/types/function) represents an operation that accepts zero or more input arguments and returns a result.
* [Predicate](https://github.com/doctore/AngularUtil/blob/main/src/app/core/types/predicate) represents an operation that accepts zero or more input arguments and returns a boolean result based on provided data.
* [Optional](https://github.com/doctore/AngularUtil/blob/main/src/app/core/types/functional/optional.type.ts) a container object which may or may not contain a non-null value.
* [Try](https://github.com/doctore/AngularUtil/blob/main/src/app/core/types/functional/try.type.ts) computation representation that may either result in an error, or return a successfully computed value.
* [Validation](https://github.com/doctore/AngularUtil/blob/main/src/app/core/types/functional/validation.type.ts) used to validate the given instance, defining 2 different status to manage the result: `Valid` and `Invalid`.


### Util classes

* [ArrayUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/array.util.ts)
* [AssertUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/assert.util.ts)
* [JsonUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/json.util.ts)
* [MapUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/map.util.ts) 
* [NumberUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/number.util.ts)
* [ObjectUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/object.util.ts)
* [StringUtil](https://github.com/doctore/AngularUtil/blob/main/src/app/core/util/string.util.ts)


### Angular components

Some new components have been added to the project

* [Confirmation Alert](https://github.com/doctore/AngularUtil/tree/main/src/app/shared/dialog/confirmation-alert): dialog to display tittle and message in a modal, sending events when the user clicks on provided buttons.
* [Disable Double Click](https://github.com/doctore/AngularUtil/tree/main/src/app/shared/directive/disable-dblclick): directive to disable temporarily the double click events in required DOM elements.
<br><br>


## How to use the project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7.


### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
