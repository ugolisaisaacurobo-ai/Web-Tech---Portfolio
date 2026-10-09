# Ugolisa's Student Portfolio (ICT251 Activity 3)

A personal portfolio website built for **ICT251 Web Technologies** at Mulungushi University.
It improves my Activity 2 page with a professional design, a responsive layout and four JavaScript features.
It is a plain HTML5, CSS and JavaScript static site (no build step), published on Render through GitHub.

**Live website:** _add your onrender.com link here_

## Folder structure

```
index.html
css/styles.css
js/script.js
images/photo1.jpg, photo2.jpg, photo3.jpg
videos/intro.mp4, voice.m4a
```

## Sections

About Me, My Hobbies, Projects & Skills, My Learning Plan (with table), My Photo Gallery, My Media (video and audio with written summaries) and Contact.

## The four JavaScript features

All the logic is in `js/script.js`.

1. **Contact form validation and preview (compulsory)**
   - Checks the name, email and message when the form is submitted.
   - Rejects empty or spaces-only names and messages, and badly formatted emails.
   - Shows error messages under the fields. A valid form shows a summary on the page without reloading.
   - The preview says the data was **validated**, not delivered. The form is labelled *Browser demonstration only — no message is sent.*
   - Uses `event.preventDefault()` and `textContent`.
2. **Gallery viewer**: Previous and Next buttons change the photo and its caption. After the last photo, Next goes back to the first; Previous on the first photo goes to the last.
3. **Theme switch**: the Dark mode / Light mode button swaps the colour scheme. The choice is saved in the browser (localStorage).
4. **Mobile navigation**: on screens 700px wide or less, a Menu button opens and closes the links. The button text and `aria-expanded` show the state. Escape closes the menu.

## How to test

1. Open the site (Live Server locally, or the Render link).
2. **Form:** submit it empty (errors appear), then with only spaces in Name and Message, then with `abc` as the email (rejected). Fill in valid details and click *Validate and Preview* to see the preview.
3. **Gallery:** click Next three times and Previous three times to check the first and last photo.
4. **Theme:** click Dark mode, check all sections are readable, refresh to see the saved choice, then click Light mode.
5. **Mobile menu:** narrow the browser to about 375px (or use DevTools device mode), click Menu, choose a link, and press Escape with the menu open.
6. Press Tab to check every link and button shows a visible focus outline.

## Sources

- HTML, CSS and JavaScript reference: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn)
- Photos, video and audio: recorded by me.
- Fonts: system fonts only (Segoe UI, Arial). No external libraries.
- Code written with the help of an AI assistant (Claude) and reviewed and tested by me.
