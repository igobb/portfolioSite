# 08 — Contact section and form (fakes)

**What to build:** The Contact section from the canvas: a visitor can copy the owner's email with confirmation, open the CV, LinkedIn and GitHub, and send a Contact message through a validated form with sending, success and error states. Submission runs through the real submission module with in-memory store and fake notifier in this ticket.

**Blocked by:** 03 — Content module (fixtures) and hero

**Status:** ready-for-agent

- [ ] Email with a copy button that confirms ("Copied ✓") and resets after a moment; CV (current Locale), LinkedIn and GitHub links from the Profile
- [ ] One Zod schema (name, email, message, honeypot, form start timestamp) shared by client and server
- [ ] React Hook Form with the Zod resolver; inline errors from UI copy in both Locales; pending, success and error states; retry on error
- [ ] Submission module with injected message store, notifier, clock and rate limiter: re-validates, silently drops honeypot or too-fast submissions, rejects above the per-IP limit, stores then notifies
- [ ] Server Action wires the module with in-memory store and fake notifier (fixture mode)
- [ ] Header "Contact" link scrolls to the section
- [ ] Vitest: valid message stored and notified; invalid input returns field errors; honeypot and too-fast dropped without notification; rate limit rejects; notifier failure keeps the stored message and reports an error
- [ ] Playwright: validation errors show; a valid submission shows the success state; copy-email shows confirmation
