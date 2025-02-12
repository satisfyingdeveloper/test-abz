<template>
  <header>
    <nav am-layout="horizontal">
      <a href="#">ㅤ</a>
      <router-link to="/users">Login</router-link>
      <router-link to="/form">Create new user</router-link>
      <a href="#">ㅤ</a>
    </nav>
  </header>
  <section class="articles">
    <div v-for="user in users" :key="user.id">
      <div class="loading" v-if="loading">Loading...</div>

      <article>
        <div class="article-wrapper">
          <figure>
            <img :src="user.photo" alt="" />
          </figure>
          <div class="article-body">
            <h2>{{ user.name }}</h2>
            <ul>
              <li>{{ user.email }}</li>
              <li>{{ user.phone }}</li>
              <li>{{ user.position }}</li>
              <li>{{ new Date(user.registration_timestamp * 1000).toLocaleDateString() }}</li>
            </ul>
          </div>
        </div>
      </article>

    </div>
    <button style="align-items:center" @click="fetchMore">Show More</button>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';

const users = ref([])
const loading = ref(true)
const page = ref(1)

async function fetchInfo(page = 1) {
  try {
    const response = await axios.get(`http://localhost:8080/api/users?page=${page}&count=6`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
async function fetchMore() {
  page.value++
  const data = await fetchInfo(page.value)
  if (!data?.users?.length) return alert('No more users')
  users.value = [...users.value, ...data.users]
}

onMounted(async () => {
  const data = await fetchInfo(page.value)
  users.value = data.users
  loading.value = false
})
</script>

<style scoped>
html {
  font-family: sans-serif;
  /* 1 */
  -ms-text-size-adjust: 100%;
  /* 2 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
}

/**
 * Remove default margin.
 */

body {
  margin: 0;
}

/* HTML5 display definitions
   ========================================================================== */

/**
 * Correct `block` display not defined for any HTML5 element in IE 8/9.
 * Correct `block` display not defined for `details` or `summary` in IE 10/11
 * and Firefox.
 * Correct `block` display not defined for `main` in IE 11.
 */

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}

/**
 * 1. Correct `inline-block` display not defined in IE 8/9.
 * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.
 */

audio,
canvas,
progress,
video {
  display: inline-block;
  /* 1 */
  vertical-align: baseline;
  /* 2 */
}

/**
 * Prevent modern browsers from displaying `audio` without controls.
 * Remove excess height in iOS 5 devices.
 */

audio:not([controls]) {
  display: none;
  height: 0;
}

/**
 * Address `[hidden]` styling not present in IE 8/9/10.
 * Hide the `template` element in IE 8/9/11, Safari, and Firefox < 22.
 */

[hidden],
template {
  display: none;
}

/* Links
   ========================================================================== */

/**
 * Remove the gray background color from active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * Improve readability when focused and also mouse hovered in all browsers.
 */

a:active,
a:hover {
  outline: 0;
}

/* Text-level semantics
   ========================================================================== */

/**
 * Address styling not present in IE 8/9/10/11, Safari, and Chrome.
 */

abbr[title] {
  border-bottom: 1px dotted;
}

/**
 * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.
 */

b,
strong {
  font-weight: bold;
}

/**
 * Address styling not present in Safari and Chrome.
 */

dfn {
  font-style: italic;
}

/**
 * Address variable `h1` font-size and margin within `section` and `article`
 * contexts in Firefox 4+, Safari, and Chrome.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/**
 * Address styling not present in IE 8/9.
 */

mark {
  background: #ff0;
  color: #000;
}

/**
 * Address inconsistent and variable font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` affecting `line-height` in all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sup {
  top: -0.5em;
}

sub {
  bottom: -0.25em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove border when inside `a` element in IE 8/9/10.
 */

img {
  border: 0;
}

/**
 * Correct overflow not hidden in IE 9/10/11.
 */

svg:not(:root) {
  overflow: hidden;
}

/* Grouping content
   ========================================================================== */

/**
 * Address margin not present in IE 8/9 and Safari.
 */

figure {
  margin: 1em 40px;
}

/**
 * Address differences between Firefox and other browsers.
 */

hr {
  box-sizing: content-box;
  height: 0;
}

/**
 * Contain overflow in all browsers.
 */

pre {
  overflow: auto;
}

/**
 * Address odd `em`-unit font size rendering in all browsers.
 */

code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}

/* Forms
   ========================================================================== */

/**
 * Known limitation: by default, Chrome and Safari on OS X allow very limited
 * styling of `select`, unless a `border` property is set.
 */

/**
 * 1. Correct color not being inherited.
 *    Known issue: affects color of disabled elements.
 * 2. Correct font properties not being inherited.
 * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.
 */

button,
input,
optgroup,
select,
textarea {
  color: inherit;
  /* 1 */
  font: inherit;
  /* 2 */
  margin: 0;
  /* 3 */
}

/**
 * Address `overflow` set to `hidden` in IE 8/9/10/11.
 */

button {
  overflow: visible;
}

/**
 * Address inconsistent `text-transform` inheritance for `button` and `select`.
 * All other form control elements do not inherit `text-transform` values.
 * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.
 * Correct `select` style inheritance in Firefox.
 */

button,
select {
  text-transform: none;
}

/**
 * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`
 *    and `video` controls.
 * 2. Correct inability to style clickable `input` types in iOS.
 * 3. Improve usability and consistency of cursor style between image-type
 *    `input` and others.
 */

button,
html input[type="button"],
/* 1 */
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  /* 2 */
  cursor: pointer;
  /* 3 */
}

/**
 * Re-set default cursor for disabled elements.
 */

button[disabled],
html input[disabled] {
  cursor: default;
}

/**
 * Remove inner padding and border in Firefox 4+.
 */

button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

/**
 * Address Firefox 4+ setting `line-height` on `input` using `!important` in
 * the UA stylesheet.
 */

input {
  line-height: normal;
}

/**
 * It's recommended that you don't attempt to style these elements.
 * Firefox's implementation doesn't respect box-sizing, padding, or width.
 *
 * 1. Address box sizing set to `content-box` in IE 8/9/10.
 * 2. Remove excess padding in IE 8/9/10.
 */

input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

/**
 * Fix the cursor style for Chrome's increment/decrement buttons. For certain
 * `font-size` values of the `input`, it causes the cursor style of the
 * decrement button to change from `default` to `text`.
 */

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Address `appearance` set to `searchfield` in Safari and Chrome.
 * 2. Address `box-sizing` set to `border-box` in Safari and Chrome
 *    (include `-moz` to future-proof).
 */

input[type="search"] {
  -webkit-appearance: textfield;
  /* 1 */
  /* 2 */
  box-sizing: content-box;
}

/**
 * Remove inner padding and search cancel button in Safari and Chrome on OS X.
 * Safari (but not Chrome) clips the cancel button when the search input has
 * padding (and `textfield` appearance).
 */

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * Define consistent border, margin, and padding.
 */

fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}

/**
 * 1. Correct `color` not being inherited in IE 8/9/10/11.
 * 2. Remove padding so people aren't caught out if they zero out fieldsets.
 */

legend {
  border: 0;
  /* 1 */
  padding: 0;
  /* 2 */
}

/**
 * Remove default vertical scrollbar in IE 8/9/10/11.
 */

textarea {
  overflow: auto;
}

/**
 * Don't inherit the `font-weight` (applied by a rule above).
 * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.
 */

optgroup {
  font-weight: bold;
}

/* Tables
   ========================================================================== */

/**
 * Remove most spacing between table cells.
 */

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  max-width: 100%;
}

html {
  box-sizing: border-box;
  height: calc(100%);
}

body {
  min-height: 100%;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
}

header,
nav,
article,
footer,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
div {
  width: 100%;
  word-wrap: break-word;
}

header,
nav,
aside,
main,
article,
section,
footer {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-align-content: flex-start;
  -ms-flex-line-pack: start;
  align-content: flex-start;
  position: relative;
}

header {
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
}

main,
section,
aside+article {
  -webkit-box-flex: 1;
  -webkit-flex: 1 8.3333%;
  -ms-flex: 1 8.3333%;
  flex: 1 8.3333%;
  min-width: 8.3333%;
}

aside {
  -webkit-flex-basis: 20%;
  -ms-flex-preferred-size: 20%;
  flex-basis: 20%;
}

footer {
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
}

@media (orientation: portrait) {
  article {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  section,
  aside {
    -webkit-flex-basis: auto;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    width: 100%;
  }
}

[am-padding] {
  padding: 1em;
}

[am-padding][am-padding="small"] {
  padding: calc(0.5em);
}

[am-padding][am-padding="large"] {
  padding: calc(1.5em);
}

[am-padding][am-padding~="top"] {
  padding: 1em 0 0 0;
}

[am-padding][am-padding~="top"][am-padding~="small"] {
  padding: calc(0.5em) 0 0 0;
}

[am-padding][am-padding~="top"][am-padding~="large"] {
  padding: calc(1.5em) 0 0 0;
}

[am-padding][am-padding~="right"] {
  padding: 0 1em 0 0;
}

[am-padding][am-padding~="right"][am-padding~="small"] {
  padding: 0 calc(0.5em) 0 0;
}

[am-padding][am-padding~="right"][am-padding~="large"] {
  padding: 0 calc(1.5em) 0 0;
}

[am-padding][am-padding~="bottom"] {
  padding: 0 0 1em 0;
}

[am-padding][am-padding~="bottom"][am-padding~="small"] {
  padding: 0 0 calc(0.5em) 0;
}

[am-padding][am-padding~="bottom"][am-padding~="large"] {
  padding: 0 0 calc(1.5em) 0;
}

[am-padding][am-padding~="left"] {
  padding: 0 0 0 1em;
}

[am-padding][am-padding~="left"][am-padding~="small"] {
  padding: 0 0 0 calc(0.5em) 0;
}

[am-padding][am-padding~="left"][am-padding~="large"] {
  padding: 0 0 0 calc(1.5em) 0;
}

[am-margin] {
  margin: 1em;
}

[am-margin][am-margin="small"] {
  margin: calc(0.5em);
}

[am-margin][am-margin="large"] {
  margin: calc(1.5em);
}

[am-margin][am-margin~="top"] {
  margin: 1em 0 0 0;
}

[am-margin][am-margin~="top"][am-margin~="large"] {
  margin: calc(1.5em) 0 0 0;
}

[am-margin][am-margin~="top"][am-margin~="small"] {
  margin: calc(0.5em) 0 0 0;
}

[am-margin][am-margin~="right"] {
  margin: 0 1em 0 0;
}

[am-margin][am-margin~="right"][am-margin~="large"] {
  margin: 0 calc(1.5em) 0 0;
}

[am-margin][am-margin~="right"][am-margin~="small"] {
  margin: 0 calc(0.5em) 0 0;
}

[am-margin][am-margin~="bottom"] {
  margin: 0 0 1em 0;
}

[am-margin][am-margin~="bottom"][am-margin~="large"] {
  margin: 0 0 calc(1.5em) 0;
}

[am-margin][am-margin~="bottom"][am-margin~="small"] {
  margin: 0 0 calc(0.5em) 0;
}

[am-margin][am-margin~="left"] {
  margin: 0 0 0 1em;
}

[am-margin][am-margin~="left"][am-margin~="large"] {
  margin: 0 0 0 calc(1.5em);
}

[am-margin][am-margin~="left"][am-margin~="small"] {
  margin: 0 0 0 calc(0.5em);
}

[am-row] {
  -webkit-flex-basis: auto;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
}

[am-row] div[am-col] {
  -webkit-box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  width: 8.3333%;
}

[am-row] div[am-col][am-col~="25"] {
  width: 25%;
}

[am-row] div[am-col][am-col~="33"] {
  width: 33.333%;
}

[am-row] div[am-col][am-col~="50"] {
  width: 50%;
}

[am-row] div[am-col][am-col~="66"] {
  width: 66.6667%;
}

[am-row] div[am-col][am-col~="75"] {
  width: 75%;
}

[am-row] div[am-col][am-col~="100"] {
  width: 100%;
}

[am-row][am-row^="gutter margin"]>div[am-col] {
  margin-left: 1em;
  -webkit-flex-basis: 0;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
}

[am-row][am-row^="gutter margin"]>div[am-col]:first-of-type {
  margin-left: -1em;
  padding-left: 1em;
}

[am-row][am-row^="gutter padding"]>div[am-col] {
  padding-left: 1em;
}

[am-row][am-row^="gutter padding"]>div[am-col]:first-of-type {
  padding-left: 0;
}

@media (orientation: portrait) {
  [am-row][am-row~="portrait-100"][am-row^="gutter margin"]>div[am-col] {
    margin-left: 0;
    padding-left: 0;
  }

  [am-row][am-row~="portrait-100"]>div[am-col] {
    -webkit-flex-basis: auto;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    width: 100%;
  }
}

[am-layout^="gutter margin"]>div[am-row]>div[am-col] {
  margin-left: 1em;
}

[am-layout^="gutter margin"]>div[am-row]>div[am-col]:first-of-type {
  margin-left: -1em;
  padding-left: 1em;
}

[am-layout^="gutter padding"]>div[am-row]>div[am-col] {
  padding-left: 1em;
}

[am-layout^="gutter padding"]>div[am-row]>div[am-col]:first-of-type {
  padding-left: 0;
}

@media (orientation: portrait) {
  [am-layout~="portrait-100"] div[am-row] div[am-col] {
    margin-left: 0;
    padding-left: 0;
    -webkit-flex-basis: auto;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    width: 100%;
  }

  [am-layout~="portrait-100"] div[am-row] div[am-col]:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }
}

div[am-block] {
  display: table;
  table-layout: fixed;
}

div[am-block][am-block~="1"] {
  width: 8.3333%;
  display: table-cell;
}

div[am-block][am-block~="2"] {
  width: 16.6667%;
  display: table-cell;
}

div[am-block][am-block~="3"] {
  width: 25%;
  display: table-cell;
}

div[am-block][am-block~="4"] {
  width: 33.3333%;
  display: table-cell;
}

div[am-block][am-block~="5"] {
  width: 41.6667%;
  display: table-cell;
}

div[am-block][am-block~="6"] {
  width: 50%;
  display: table-cell;
}

div[am-block][am-block~="7"] {
  width: 58.3333%;
  display: table-cell;
}

div[am-block][am-block~="8"] {
  width: 66.6667%;
  display: table-cell;
}

div[am-block][am-block~="9"] {
  width: 75%;
  display: table-cell;
}

div[am-block][am-block~="10"] {
  width: 83.3333%;
  display: table-cell;
}

div[am-block][am-block~="11"] {
  width: 91.6667%;
  display: table-cell;
}

div[am-block][am-block~="12"] {
  width: 100%;
  display: table-row;
}

@media (orientation: portrait) {
  div[am-block][am-block~="1P"] {
    width: 8.3333%;
    display: table-cell;
  }

  div[am-block][am-block~="2P"] {
    width: 16.6667%;
    display: table-cell;
  }

  div[am-block][am-block~="3P"] {
    width: 25%;
    display: table-cell;
  }

  div[am-block][am-block~="4P"] {
    width: 33.3333%;
    display: table-cell;
  }

  div[am-block][am-block~="5P"] {
    width: 41.6667%;
    display: table-cell;
  }

  div[am-block][am-block~="6P"] {
    width: 50%;
    display: table-cell;
  }

  div[am-block][am-block~="7P"] {
    width: 58.3333%;
    display: table-cell;
  }

  div[am-block][am-block~="8P"] {
    width: 66.6667%;
    display: table-cell;
  }

  div[am-block][am-block~="9P"] {
    width: 75%;
    display: table-cell;
  }

  div[am-block][am-block~="10P"] {
    width: 83.3333%;
    display: table-cell;
  }

  div[am-block][am-block~="11P"] {
    width: 91.6667%;
    display: table-cell;
  }

  div[am-block][am-block~="12P"] {
    width: 100%;
    display: table-row;
  }
}

@media (orientation: landscape) {
  div[am-block][am-block~="1L"] {
    width: 8.3333%;
    display: table-cell;
  }

  div[am-block][am-block~="2L"] {
    width: 16.6667%;
    display: table-cell;
  }

  div[am-block][am-block~="3L"] {
    width: 25%;
    display: table-cell;
  }

  div[am-block][am-block~="4L"] {
    width: 33.3333%;
    display: table-cell;
  }

  div[am-block][am-block~="5L"] {
    width: 41.6667%;
    display: table-cell;
  }

  div[am-block][am-block~="6L"] {
    width: 50%;
    display: table-cell;
  }

  div[am-block][am-block~="7L"] {
    width: 58.3333%;
    display: table-cell;
  }

  div[am-block][am-block~="8L"] {
    width: 66.6667%;
    display: table-cell;
  }

  div[am-block][am-block~="9L"] {
    width: 75%;
    display: table-cell;
  }

  div[am-block][am-block~="10L"] {
    width: 83.3333%;
    display: table-cell;
  }

  div[am-block][am-block~="11L"] {
    width: 91.6667%;
    display: table-cell;
  }

  div[am-block][am-block~="12L"] {
    width: 100%;
    display: table-row;
  }
}

article[am-layout~="vertical"]>section {
  -webkit-flex-basis: auto;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  width: 100%;
}

form[am-layout] {
  width: 100%;
}

form[am-layout] fieldset {
  border: none;
  padding: 0;
  margin: 0;
  -webkit-flex-basis: 100%;
  -ms-flex-preferred-size: 100%;
  flex-basis: 100%;
}

form[am-layout] fieldset div[role="group"] {
  width: auto;
}

form[am-layout] fieldset div[role="group"] legend {
  width: 100%;
  word-wrap: break-word;
}

form[am-layout] textarea {
  resize: vertical;
  width: 100%;
}

form[am-layout] input[type="checkbox"] {
  display: inline-block;
  vertical-align: middle;
}

form[am-layout] input[type="radio"] {
  display: inline-block;
  vertical-align: middle;
}

form[am-layout] label {
  display: inline-block;
}

form[am-layout] label input {
  width: auto;
}

form[am-layout] select {
  padding: .35em 0;
}

form[am-layout][am-layout~="stacked"] input:not([type="checkbox"]):not([type="radio"]),
form[am-layout][am-layout~="stacked"] select,
form[am-layout][am-layout~="stacked"] label {
  width: 100%;
}

form[am-layout][am-layout~="aligned"]>span {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: justify;
  -ms-flex-pack: justify;
  justify-content: justify;
  width: 100%;
}

form[am-layout][am-layout~="aligned"]>span label,
form[am-layout][am-layout~="aligned"]>span input:not([type="checkbox"]):not([type="radio"]),
form[am-layout][am-layout~="aligned"]>span select,
form[am-layout][am-layout~="aligned"]>span textarea {
  -webkit-box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  width: 8.3333%;
}

@media (max-width: 30em) {

  form[am-layout][am-layout~="aligned"]>span label,
  form[am-layout][am-layout~="aligned"]>span input:not([type="checkbox"]):not([type="radio"]),
  form[am-layout][am-layout~="aligned"]>span select,
  form[am-layout][am-layout~="aligned"]>span textarea {
    width: 100%;
  }
}

form[am-layout][am-layout~="aligned"] fieldset>div[role="group"]>span {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: justify;
  -ms-flex-pack: justify;
  justify-content: justify;
  width: 100%;
}

form[am-layout][am-layout~="aligned"] fieldset>div[role="group"]>span label,
form[am-layout][am-layout~="aligned"] fieldset>div[role="group"]>span input:not([type="checkbox"]):not([type="radio"]),
form[am-layout][am-layout~="aligned"] fieldset>div[role="group"]>span select,
form[am-layout][am-layout~="aligned"] fieldset>div[role="group"]>span textarea {
  -webkit-box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  width: 8.3333%;
}

@media (max-width: 30em) {

  form[am-layout][am-layout~="aligned"] fieldset>div[role="group"]>span label,
  form[am-layout][am-layout~="aligned"] fieldset>div[role="group"]>span input:not([type="checkbox"]):not([type="radio"]),
  form[am-layout][am-layout~="aligned"] fieldset>div[role="group"]>span select,
  form[am-layout][am-layout~="aligned"] fieldset>div[role="group"]>span textarea {
    width: 100%;
  }
}

form[am-layout][am-layout~="multicolumn"] {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
}

form[am-layout][am-layout~="multicolumn"] input:not([type="checkbox"]):not([type="radio"]),
form[am-layout][am-layout~="multicolumn"] select,
form[am-layout][am-layout~="multicolumn"] textarea,
form[am-layout][am-layout~="multicolumn"] label {
  width: 100%;
}

form[am-layout][am-layout~="multicolumn"]>div {
  -webkit-box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  width: 8.3333%;
}

@media (max-width: 30em) {
  form[am-layout][am-layout~="multicolumn"]>div {
    width: 100%;
  }
}

form[am-layout][am-layout~="multicolumn"] fieldset>div[role="group"] {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
}

form[am-layout][am-layout~="multicolumn"] fieldset>div[role="group"] input:not([type="checkbox"]):not([type="radio"]),
form[am-layout][am-layout~="multicolumn"] fieldset>div[role="group"] select,
form[am-layout][am-layout~="multicolumn"] fieldset>div[role="group"] textarea,
form[am-layout][am-layout~="multicolumn"] fieldset>div[role="group"] label {
  width: 100%;
}

form[am-layout][am-layout~="multicolumn"] fieldset>div[role="group"]>div {
  -webkit-box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  width: 8.3333%;
}

@media (max-width: 30em) {
  form[am-layout][am-layout~="multicolumn"] fieldset>div[role="group"]>div {
    width: 100%;
  }
}

@media (max-width: 30em) {

  form[am-layout] input:not([type="checkbox"]):not([type="radio"]),
  form[am-layout] select,
  form[am-layout] textarea,
  form[am-layout] label {
    width: 100%;
  }
}

nav[am-layout][am-layout~="horizontal"] a {
  -webkit-box-flex: 1;
  -webkit-flex: 1 8.3333%;
  -ms-flex: 1 8.3333%;
  flex: 1 8.3333%;
}

nav[am-layout][am-layout~="vertical"] {
  -webkit-flex-flow: column nowrap;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
}

nav[am-layout][am-layout~="justify-align"] {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

nav[am-layout][am-layout~="left-align"] a {
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
}

nav[am-layout][am-layout~="right-align"] {
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

nav[am-layout][am-layout~="right-align"] a {
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
}

nav[am-layout][am-layout~="center-align"] {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

nav[am-layout][am-layout~="center-align"] a {
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
}

nav[am-layout] a:not(.am-floating-action) {
  padding: 1em;
  display: inline-block;
  text-decoration: none;
}

@media (max-width: 30em) {
  nav[am-layout] a:not(.am-floating-action) {
    font-size: 90%;
  }
}

a[am-layout~="split-bottom"],
button[am-layout~="split-bottom"] {
  bottom: -25px;
  position: absolute;
  right: 25px;
}

a[am-layout~="split-top"],
button[am-layout~="split-top"] {
  top: -25px;
  position: absolute;
  right: 25px;
}

table[am-layout] {
  border: 1px solid #d4d4d4;
  width: 100%;
}

table[am-layout] caption {
  text-align: left;
}

table[am-layout] thead th:first-child {
  border-left: 0 none;
}

@media (orientation: portrait) {
  table[am-layout] thead {
    display: none;
  }
}

@media (orientation: portrait) {
  table[am-layout] tbody {
    display: block;
  }
}

table[am-layout] th {
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  padding: 1em;
  text-transform: uppercase;
}

table[am-layout] th[scope="rowgroup"] {
  background-color: #f1f1f1;
}

table[am-layout] th[scope="rowgroup"]:first-child {
  border-left: 0 none;
}

table[am-layout] th[scope="colgroup"] {
  background-color: #f1f1f1;
}

table[am-layout] th[scope="colgroup"]:first-child {
  border-left: 0 none;
}

table[am-layout] th[scope="row"] {
  background-color: #ebecee;
}

table[am-layout] th[scope="col"] {
  background-color: #ebecee;
}

@media (orientation: portrait) {
  table[am-layout] th {
    display: none;
  }

  table[am-layout] th[scope="row"] {
    display: block;
    border-left: 0 none;
  }
}

table[am-layout] td {
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  padding: 1em;
  background-color: #ffffff;
}

table[am-layout] td:first-child {
  border-left: 0 none;
}

@media (orientation: portrait) {
  table[am-layout] td:first-child {
    text-align: right;
  }
}

@media (orientation: portrait) {
  table[am-layout] td {
    display: block;
    text-align: right;
    vertical-align: middle;
    width: 100%;
    border: 0 none;
  }

  table[am-layout] td[data-title]::before {
    content: attr(data-title);
    float: left;
    font-size: inherit;
    font-weight: 700;
    text-transform: uppercase;
  }
}

table[am-layout] tr:not('tbody'):last-child td {
  border-bottom: 0 none;
}

table[am-layout] tr:hover td {
  background-color: #ebecee;
}

@media (orientation: portrait) {
  table[am-layout] tr {
    display: block;
    border-bottom: 1px solid #e0e0e0;
  }
}

@media (orientation: portrait) {
  table[am-layout] tfoot tr:first-child {
    border-bottom: 1px solid #e0e0e0;
  }
}

table[am-layout] tfoot tr:last-child {
  font-weight: 700;
}

@media (orientation: portrait) {
  table[am-layout] tfoot tr:last-child {
    border-bottom: 0 none;
  }
}

table[am-layout] tfoot tr:last-child td {
  border-bottom: 0 none;
}

@media (orientation: portrait) {
  table[am-layout] tfoot {
    display: block;
  }
}

table[am-layout][am-layout~="zebra-stripe"] tr:nth-child(even) td {
  background-color: #f7f7f7;
}

table[am-layout][am-layout~="zebra-stripe"] tr:hover td {
  background-color: #ebecee;
}

[am-layout~="outline"] article,
[am-layout~="outline"] section,
[am-layout~="outline"] aside,
[am-layout~="outline"] div:not([class]) {
  background: rgba(216, 67, 21, 0.15);
  border: 1px solid rgba(216, 67, 21, 0.2);
}

[am-event][am-event~="slide-caption"] {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

[am-event][am-event~="slide-caption"] figure {
  margin: 0;
}

[am-event][am-event~="slide-caption"] figure figcaption {
  left: 0;
  bottom: -200%;
  overflow: hidden;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  margin-top: 0;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

[am-event][am-event~="slide-caption"] figure figcaption * {
  color: rgba(255, 255, 255, 0.87);
}

[am-event][am-event~="slide-caption"]:hover figcaption {
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

[am-event~="elevate"]:hover,
[am-event~="elevate"]:focus {
  -webkit-transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

[am-event~="elevate"]:hover:hover,
[am-event~="elevate"]:focus:hover,
[am-event~="elevate"]:hover:focus,
[am-event~="elevate"]:focus:focus {
  box-shadow: 0 27px 24px 0 rgba(0, 0, 0, 0.2), 0 40px 77px 0 rgba(0, 0, 0, 0.22);
}

body>div[am-wrapper] {
  min-width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
}

body>div[am-wrapper]>header,
body>div[am-wrapper]>footer {
  background-color: #37474f;
  color: #ffb8a2;
}

body>div[am-wrapper]>header h1,
body>div[am-wrapper]>footer h1,
body>div[am-wrapper]>header h2,
body>div[am-wrapper]>footer h2,
body>div[am-wrapper]>header h3,
body>div[am-wrapper]>footer h3,
body>div[am-wrapper]>header h4,
body>div[am-wrapper]>footer h4,
body>div[am-wrapper]>header h5,
body>div[am-wrapper]>footer h5,
body>div[am-wrapper]>header h6,
body>div[am-wrapper]>footer h6 {
  color: #ffb8a2;
}

body>div[am-wrapper]>header a,
body>div[am-wrapper]>footer a {
  color: #ffb8a2;
}

body>div[am-wrapper]>header a:hover,
body>div[am-wrapper]>footer a:hover {
  color: #ffffff;
}

*:not(body)>[am-wrapper] {
  max-height: 100%;
}

[am-layout][am-layout~="frame"] {
  -webkit-flex-flow: column nowrap;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

[am-layout][am-layout~="frame"] header {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}

[am-layout][am-layout~="frame"] div[am-scrollable] {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  max-height: 100%;
}

[am-layout][am-layout~="frame"] footer {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}

[am-layout][am-layout~="frame"][am-layout~="overflow-y"]>div[am-scrollable] {
  overflow-y: auto;
  overflow-x: hidden;
}

[am-layout][am-layout~="frame"][am-layout~="overflow-x"]>div[am-scrollable] {
  overflow-x: auto;
  overflow-y: hidden;
}

[am-layout][am-layout~="vertical-center"] {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  margin: auto;
  width: auto;
  text-align: center;
}

[am-layer][am-layer~="z1"] {
  z-index: 1;
}

[am-layer][am-layer~="z2"] {
  z-index: 2;
}

[am-layer][am-layer~="z3"] {
  z-index: 3;
}

[am-layer][am-layer~="z4"] {
  z-index: 4;
}

[am-layer][am-layer~="z5"] {
  z-index: 5;
}

[am-layer][am-event~="elevate"],
[am-layer][am-event~="elevate"]:hover,
[am-layer][am-event~="elevate"]:focus {
  -webkit-transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

[am-layer][am-event~="elevate"]:hover,
[am-layer][am-event~="elevate"]:hover:hover,
[am-layer][am-event~="elevate"]:focus:hover,
[am-layer][am-event~="elevate"]:focus,
[am-layer][am-event~="elevate"]:hover:focus,
[am-layer][am-event~="elevate"]:focus:focus {
  box-shadow: 0 27px 24px 0 rgba(0, 0, 0, 0.2), 0 40px 77px 0 rgba(0, 0, 0, 0.22);
}

@-webkit-keyframes fadeinout {
  0% {
    opacity: 0;
  }

  11.11111111% {
    opacity: 1;
  }

  33.33333333% {
    opacity: 1;
  }

  44.44444444% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

@keyframes fadeinout {
  0% {
    opacity: 0;
  }

  11.11111111% {
    opacity: 1;
  }

  33.33333333% {
    opacity: 1;
  }

  44.44444444% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

[am-image-slider] {
  height: 150px;
  position: relative;
}

[am-image-slider] figure {
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0;
  -webkit-animation: fadeinout 25s infinite;
  animation: fadeinout 25s infinite;
}

[am-image-slider] figure img {
  height: 100%;
  margin: 0 auto;
}

[am-image-slider] figure:nth-child(1) {
  -webkit-animation-delay: -2.77777778s;
  animation-delay: -2.77777778s;
}

[am-image-slider] figure:nth-child(2) {
  -webkit-animation-delay: 5.55555556s;
  animation-delay: 5.55555556s;
}

[am-image-slider] figure:nth-child(3) {
  -webkit-animation-delay: 13.88888889s;
  animation-delay: 13.88888889s;
}

.am-btn {
  -moz-user-select: none;
  background-image: none;
  text-decoration: none;
  display: inline-block;
  position: relative;
  font-size: 14px;
  font-weight: 400;
  text-align: cent
}

article {
  --img-scale: 1.001;
  --title-color: black;
  --link-icon-translate: -20px;
  --link-icon-opacity: 0;
  position: relative;
  border-radius: 16px;
  box-shadow: none;
  background: #fff;
  transform-origin: center;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
}

article a::after {
  position: absolute;
  inset-block: 0;
  inset-inline: 0;
  cursor: pointer;
  content: "";
}

/* basic article elements styling */
article h2 {
  margin: 0 0 18px 0;
  font-family: "Bebas Neue", cursive;
  font-size: 1.9rem;
  letter-spacing: 0.06em;
  color: var(--title-color);
  transition: color 0.3s ease-out;
}

figure {
  margin: 0;
  padding: 0;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

article img {
  max-width: 100%;
  transform-origin: center;
  transform: scale(var(--img-scale));
  transition: transform 0.4s ease-in-out;
}

.article-body {
  padding: 24px;
}

article a {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #28666e;
}

article a:focus {
  outline: 1px dotted #28666e;
}

article a .icon {
  min-width: 24px;
  width: 24px;
  height: 24px;
  margin-left: 5px;
  transform: translateX(var(--link-icon-translate));
  opacity: var(--link-icon-opacity);
  transition: all 0.3s;
}

/* using the has() relational pseudo selector to update our custom properties */
article:has(:hover, :focus) {
  --img-scale: 1.1;
  --title-color: #28666e;
  --link-icon-translate: 0;
  --link-icon-opacity: 1;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}


/************************ 
Generic layout (demo looks)
**************************/

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 48px 0;
  font-family: "Figtree", sans-serif;
  font-size: 1.2rem;
  line-height: 1.6rem;
  background-image: linear-gradient(45deg, #7c9885, #b5b682);
  min-height: 100vh;
}

.articles {
  display: grid;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 24px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

@media screen and (max-width: 960px) {
  article {
    container: card/inline-size;
  }

  .article-body p {
    display: none;
  }
}

@container card (min-width: 380px) {
  .article-wrapper {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 16px;
  }

  .article-body {
    padding-left: 0;
  }

  figure {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  figure img {
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
}

.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>