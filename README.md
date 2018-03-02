# Solution of two code exercises

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## First Exercise: ReactComponentExercise

I updated the code to write improvements and have a better quality.

The start point of the exercise was the following code:

```jsx
/**
* This React class is intended to query an endpoint that will return an alphanumeric string, after clicking a button.
* This component is passed a prop "apiQueryDelay", which delays the endpoint request by N milliseconds. There is a
* second button to disable this functionality and have the endpoint request run immediately after button click.
* This data is then to be displayed inside a simple container.
* The "queryAPI" XHR handler will return the endpoint response in the form of a Promise (such as axios, fetch).
* The response object will look like the following: {data: "A0B3HCJ"}
* The containing element ref isn't used, but should remain within the class.
* Please identify, correct and comment on any errors or bad practices you see in the React component class below.
* Additionally, please feel free to change the code style as you see fit.
* Please note - React version for this exercise is 15.5.4
*/

import React, Component from 'react';
import queryAPI from 'queryAPI';


class ShowResultsFromAPI extends Component() {
  constructor() {
    super(props);

    this.container = null;
  }

  onDisableDelay() {
    this.props.apiQueryDelay = 0;
  }

  click() {
    if (this.props.apiQueryDelay) {
      setTimeout(function() {
        this.fetchData();
      }, this.props.apiQueryDelay);
    }
  }

  fetchData() {
    queryAPI()
      .then(function(response) {
        if (response.data) {
          this.setState({
            data: response.data,
            error: false
          });
        }
      });
  }

  render() {
    return <div class="content-container" ref="container">
            {
              if (!!error) {
                <p>Sorry - there was an error with your request.</p>
              }
              else {
                <p>data</p>
              }
            }
          </div>
          <Button onClick={this.onDisableDelay.bind(this)}>Disable request delay</Button>
          <Button onClick={this.click.bind(this)}>Request data from endpoint</Button>
  }
}

ShowResultsFromAPI.displayName = {
  name: "ShowResultsFromAPI"
};
ShowResultsFromAPI.defaultProps = {
  apiQueryDelay: 0
};
ShowResultsFromAPI.propTypes = {
  apiQueryDelay: React.propTypes.number
};

export ContentContainer;
```

To try the exercise simple `npm install && npm start` will open it in the browser.


### Changes to the original request

In order to work more effectibly I changed two things not requested in the exercise:

#### I updated the version to React ^16.2.0:

I know in the comments you request 15.5.4, but when I start a project, I always use last available libraries version unless is an existing project.

#### I created a mock implementation of queryAPI instead a imported version of it.

It returns the sample data `{data: "A0B3HCJ"}` after 1 second, to mock a real API call and being able to execute the sample for real.

### Implementation Points

#### Formated to match babel eslint

I formated the document with eslint and prettier configuration that could be found in the `.eslintrc` file

#### Using last js features with babel

Not much used in this example, but as general rule, I always try to use babel last features ("react", "env", "stage-0").

#### Name of the document

I renamed the file to `ShowResultsFromAPI` from the original `ReactComponentExercise.js`.

#### Fixing the export

Because we are creating a just a component (as it should always be) in the file, I updated the name and export it in the default way.

#### Saving the container correctly

Loading the container with the new way of using the ref property in React (arrow function in the ref prop.)

#### Destructuring error and data

In order to use and show data and error I save them to local constants and then print them correctly

#### Using ternary style to display

I don't like if else in react, I prefer ternary statements.

#### Creating a apiQueryDelay state property

I think is incorrect to mutate properties from inside a component, for me they should always be inputs for it.

#### We don't need to initialize `container` property in the constructor.

We are creating this prop in the ref callback, and in the exercise is not clear what we need for, so we don't need to create to null in the constructor.

#### Making error to be always boolean

!!error to transform it to a true or false value, even if it doesn't exist, could be fine if we don't know the source if the error, but we do and we can control it.
I prefer to control the value to always be true or false, specially in such controlled usage context.

#### Moving the buttons to the container

Because React one to have node child contained in a only DOM element, and because doesn't make sense to have them isolated out of the component container.

#### The constructor receive as a param the property object

Otherwise we can't call super with them.

#### onClick fixes

Let's stop using bind and arrow functions instead and we don't need ever to pass the `this` element to the functions we call if we are using bind, the context is giving to the function called, so we can use it just within the "binded" function. Anyway, no more binds and this anyway available inside the functions we call on the `onClick`.

#### Button is not a Component

There is a lot of libraries out-there which use their `Button` React implementation, but is not the case here, so just use out of the box in html `button`

#### The constructor now set up the apiQueryDelay state property

Doing some es6 styled code.

#### Fixing context of this in click() function

Solving problems with arrow function in the `setTimeout`.
Adding destructuring to access to the `apiQueryDelay`.
If no delayed, we should call the function directly no avoid it.

#### fetchData with async

Because the callback of the promise of queryAPI uses a normal function we lost the scope of the class, so `this` is no longer the Component (and hasn't got `setState` method). This is easily fixable with an arrow function:

```js
  fetchData() {
    queryAPI().then(response => {
      if (response.data) {
        this.setState({
          data: response.data,
          error: false,
        });
      }
    });
  }
```

But because right now we have async / await I preferred them for the solution

#### propTypes with style

I like to add propTypes at the end of the components after the export

#### class ShowResultsFromAPI extends Component() ??

A bit ugly trick to break the code from executing, we extend Components no execute them

#### Moving displayName to a class property

Even though I would delete it, but just to don't remove code that was there moving to the proper place.

#### Adding a default `apiQueryDelay`

When loading the `ShowResultsFromAPI` from the `EntryPoint` index I added a `23` just to have something to disable when clicking it.

#### If is already disabled (apiQueryDelay === 0), I disabled the botton

Just simple detail to show when is disabled and also to don't execute a function which does nothing.

## Second Exercise: ReactComponentExercise

Please use your most proficient programming language to create object oriented design and use test driven development to implement classes and methods with appropriate data structure and test the code for the following scenario. Please add comments describing any assumptions you make:

* [x] There are Teachers
* [x] There are Students
* [x] Students are in classes that teachers teach
* [x] Teachers can create multiple quizzes with many questions (each question is multiple choice) Teachers can assign quizzes to students
* [x] Students solve/answer questions to complete the quiz, but they don't have to complete it at once. (Partial submissions can be made).
* [x] Quizzes need to get graded
* [x] For each teacher, they can calculate each student's total grade accumulated over a semester for their classes. I can generate the `totalGrade` for all the quizzes of one student in a specific class (And we could create a new class each 6 months). To make the proper aggregation, I need a School object to then search all the classes (classRooms) of this teacher and make a accumulated grade for all their students.

### Solution

I added the solution into the same project, for simplicity.

I'm using the folder `src/school` to have both the classes and the tests.

Using Jest for the tests.

A simple `npm test` would run all of them.

I know I'm using the id defined in Base class only for Classes and StudentResults, but I think not to worry about id generation is just a good practice/tool I like to have available everywhere.

I understood this problem as a object oriented exercise and TDD exercise more than a real solution that could be taken and implemented without changes in a real system.

I made an implementation based on the only really mutable data (answers in the Questions). Of course I know this is not very good for performance when this problem scale, but as I don't have database I just wanted to store the minimum what should be stored and made calcs up from there, in this way the classes contain real logic.
