/* ==========================================================
   ICT251 Activity 3 - js/script.js
   Features:
   1. Contact form validation and preview (compulsory)
   2. Gallery viewer (Previous / Next)
   3. Theme switch (light / dark)
   4. Mobile navigation (open / close menu)
   ========================================================== */

'use strict';

/* ---------- Feature 1: Contact form validation and preview ---------- */

// An email must look like name@domain.ext (no spaces, one @, a dot in the domain)
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Each check returns an error message, or '' when the value is fine.
function checkName(value) {
  return value.trim() === '' ? 'Please enter your name. Spaces alone are not accepted.' : '';
}

function checkEmail(value) {
  const email = value.trim();
  if (email === '') {
    return 'Please enter your email address.';
  }
  return EMAIL_PATTERN.test(email) ? '' : 'Please enter a valid email address, for example name@example.com.';
}

function checkMessage(value) {
  return value.trim() === '' ? 'Please write a message. Spaces alone are not accepted.' : '';
}

// Show (or clear) the error text under a field and mark the field as invalid for screen readers.
function setFieldError(field, message) {
  const errorBox = document.getElementById(field.id + '-error');
  errorBox.textContent = message;
  field.setAttribute('aria-invalid', message === '' ? 'false' : 'true');
}

// Build the preview box. textContent is used for everything the visitor typed,
// so typed HTML is shown as plain text and never run.
function showPreview(data) {
  const box = document.getElementById('form-result');
  box.textContent = '';

  const heading = document.createElement('h3');
  heading.textContent = 'Form validated (preview only)';
  box.appendChild(heading);

  const list = document.createElement('dl');
  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Topic', data.topic],
    ['Message', data.message]
  ];

  rows.forEach(function (row) {
    const term = document.createElement('dt');
    term.textContent = row[0];
    const detail = document.createElement('dd');
    detail.textContent = row[1];
    list.appendChild(term);
    list.appendChild(detail);
  });
  box.appendChild(list);

  const note = document.createElement('p');
  note.textContent = 'Your details passed validation in this browser. No message has been sent or stored.';
  box.appendChild(note);
}

// Runs when the form is submitted: validates all fields, then shows errors or the preview.
function handleFormSubmit(event) {
  event.preventDefault();   // keep everything local, no page reload

  const form = event.target;
  const nameField = form.elements['name'];
  const emailField = form.elements['email'];
  const messageField = form.elements['message'];
  const topicField = form.elements['topic'];
  const resultBox = document.getElementById('form-result');

  const checks = [
    { field: nameField, message: checkName(nameField.value) },
    { field: emailField, message: checkEmail(emailField.value) },
    { field: messageField, message: checkMessage(messageField.value) }
  ];

  checks.forEach(function (item) {
    setFieldError(item.field, item.message);
  });

  const firstProblem = checks.find(function (item) {
    return item.message !== '';
  });

  if (firstProblem) {
    resultBox.textContent = '';          // remove any old preview
    firstProblem.field.focus();          // send the visitor to the first problem
    return;
  }

  showPreview({
    name: nameField.value.trim(),
    email: emailField.value.trim(),
    topic: topicField.options[topicField.selectedIndex].text,
    message: messageField.value.trim()
  });
}

// Wires the form up, and clears a field's error as soon as the visitor edits it.
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) {
    return;
  }
  form.addEventListener('submit', handleFormSubmit);

  ['name', 'email', 'message'].forEach(function (id) {
    const field = document.getElementById(id);
    field.addEventListener('input', function () {
      setFieldError(field, '');
    });
  });
}

/* ---------- Feature 2: Gallery viewer ---------- */

// Turns the three photos into a one-at-a-time viewer with Previous and Next buttons.
function initGallery() {
  const gallery = document.getElementById('gallery');
  const controls = document.getElementById('gallery-controls');
  const prevButton = document.getElementById('gallery-prev');
  const nextButton = document.getElementById('gallery-next');
  const status = document.getElementById('gallery-status');
  if (!gallery || !controls) {
    return;
  }

  const figures = Array.from(gallery.querySelectorAll('figure'));  // photo + caption pairs
  let current = 0;

  // Show photo number "index". Going past the last photo wraps to the first, and vice versa.
  function showPhoto(index) {
    current = (index + figures.length) % figures.length;
    figures.forEach(function (figure, position) {
      figure.classList.toggle('active', position === current);
    });
    status.textContent = 'Photo ' + (current + 1) + ' of ' + figures.length;
  }

  prevButton.addEventListener('click', function () {
    showPhoto(current - 1);
  });
  nextButton.addEventListener('click', function () {
    showPhoto(current + 1);
  });

  gallery.classList.add('viewer');
  controls.hidden = false;
  showPhoto(0);
}

/* ---------- Feature 3: Theme switch ---------- */

const THEME_KEY = 'ugolisa-theme';

// Applies "light" or "dark" to the page and updates the button text to the other option.
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const button = document.getElementById('theme-toggle');
  button.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
}

// Sets the starting theme (from a saved choice if there is one) and handles the button.
function initThemeSwitch() {
  const button = document.getElementById('theme-toggle');
  if (!button) {
    return;
  }

  let theme = 'light';
  try {
    if (localStorage.getItem(THEME_KEY) === 'dark') {
      theme = 'dark';
    }
  } catch (error) {
    // Saving is optional, so the page still works if storage is blocked
  }
  applyTheme(theme);

  button.addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      // ignore: the theme still changes for this visit
    }
  });
}

/* ---------- Feature 4: Mobile navigation ---------- */

// Lets the Menu button open and close the navigation on narrow screens.
function initMobileNav() {
  const header = document.querySelector('.site-header');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!header || !toggle || !nav) {
    return;
  }

  header.classList.add('js-nav');   // tells the CSS that the menu can be collapsed

  // Opens or closes the menu and keeps the button text and aria-expanded in step.
  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  }

  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });

  // Close the menu after a link is chosen
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  // Escape closes the menu and returns focus to the button
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // If the window is widened, reset the menu state
  window.matchMedia('(min-width: 701px)').addEventListener('change', function (event) {
    if (event.matches) {
      setMenu(false);
    }
  });
}

/* ---------- Start everything ---------- */
initContactForm();
initGallery();
initThemeSwitch();
initMobileNav();
