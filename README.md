# abn-test-assignment

This application display information about tv shows returned by tvmaze API.

Confirmed to be working with following versions of node and npm:

    $ node --version
    v20.5.1
    $ npm --version
    9.8.1


# Setup and run

Use npm to install dependencies and run development server:


    $ npm install
    $ npm run dev


Development server will output the URL to acccess the page, which by default should be http://localhost:5173/


# Run units

Use the following command to run units and see 100% coverage for all files:


    $ npm run test:unit


# Technology choice decisions

Project uses vue3 with composition API for user interface and pinia on the data layer. 
Why vue3: the mix of single-file components and composition API allows to use best tools
for each task and components self-contained at the same time. Declarative templates naturally
restrict leakage of login into presentational layer, automatic CSS scoping makes it possible
to write CSS the usual CSS way and then reuse selectors in automation tools if needed, as
classnames are not mangled.

Setup section of the component is mostly used to direct data flows and should not contain
major pieces of logic. Case in point: `useKeyboard()` handles Arrow navigation in a horizontal
list and can be reused in a different component.

Composition API is a huge step forward from mixins, as we can keep behavioral code reusable
and in a separate file, at the same time interaction of different hooks is fully visible
in a setup function (i.e. Mixin1 can't talk to Mixin2 or modify component state and DOM 
without it being obvious in the component itself).

On the data layer we have pinia, as it allows for the same compositional API but in stores.
Method calls and getter access both support typescript. Instead of dispatchign a string name
of method, we just call the method like on a regular object.

Overall, the setup is very much default vue3 project. Only thing I added myself is gettext library (see below)


# Technical design decisions

API is accessed through a pinia store that acts as a middleware, taking care of error
handling, displaying messages and deserialization.
One pinia store per endpoint to make sure search data does not pop up in general lists.
Another store handles displaying error messages. They don't time out and disappear
per WCAG guidelines (see comment in the store itself).

Components are divided into views that interact with the router and the store and presentation
components that accept data as props. All pages that have lists of shows reuse the same
show list component.

# Design and responsiveness

Color theme is beige, black and orage. Beige works better as neutral color compared to bright white
in both dark and light environments. Text is black, orange provides contrast for borders.

Lists follow the usual pattern we see on Netflix when screen size allows to go horizontal. Lists
are keyboard-navigatable. Try tabbing into one and pressing Left and Right. It also loops once
reaches the end. Tab between lists, arrow-navigate inside lists, press Space to select the item.

While loading, skeleton list is shown. Uncomment the marked line in `api.ts` to see slow mode.
Skeleton tiles glow a bit. Uncommenting another marked line in `api.ts` or blocking requests
in dev tools will bring up message alerts that slide nicely.

Show lists are horizontal when space allows and start wrapping into three columns once we hit 715px wide.

General page frame decres margins below 600px, header switches to shorter headline. At 390px we no
longer have search bar in the header.

# Extra

There is a language selector at the bottom of the page, that works through vue3-gettext.
Localization files can be found in src/locale.
