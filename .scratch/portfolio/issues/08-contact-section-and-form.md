# 08 — Contact section and form (fakes)

**What to build:** The Contact section from the canvas: a visitor can copy the owner's email with confirmation, open the CV, LinkedIn and GitHub, and send a Contact message through a validated form with sending, success and error states. Without a backend yet: the form validates and calls a send function that only logs the message; the server side moved to ticket 10.

**Blocked by:** 03 — Content module (fixtures) and hero

**Status:** done

- [x] Email with a copy button that confirms ("Copied ✓") and resets after a moment; CV (current Locale), LinkedIn and GitHub links from the Profile
- [x] One Zod schema (name, email, message, honeypot) for the form; the server reuses it in ticket 10
- [x] React Hook Form with the Zod resolver; inline errors from UI copy in both Locales; pending, success and error states; retry on error
- [x] A filled-in honeypot shows success without sending
- [x] Send function without a backend (logs the message); submission module and Server Action moved to ticket 10
- [x] Header "Contact" link scrolls to the section
- [x] Playwright: validation errors show; a valid submission shows the success state; a filled-in honeypot sends nothing; copy-email shows confirmation
