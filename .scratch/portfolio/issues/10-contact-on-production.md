# 10 — Contact on production: Supabase and Resend

**What to build:** A Contact message sent from the live site is stored in Supabase and arrives in the owner's inbox; the per-IP limit uses real data.

**Blocked by:** 08 — Contact section and form (fakes); 09 — Supabase Content, seed and revalidation

**Status:** ready-for-agent

**Human in the loop:** the owner creates a Resend account, adds `tgolab.dev` and the DNS records Resend shows; the agent gives step-by-step instructions.

- [ ] Form start timestamp added to the Zod schema, shared by client and server
- [ ] Submission module with injected message store, notifier, clock and rate limiter: re-validates, silently drops honeypot or too-fast submissions, rejects above the per-IP limit, stores then notifies
- [ ] Server Action wires the module; the form's send function calls it; rate-limited state in the form
- [ ] Vitest: valid message stored and notified; invalid input returns field errors; honeypot and too-fast dropped without notification; rate limit rejects; notifier failure keeps the stored message and reports an error
- [ ] Message store backed by `contact_messages` (server-side, service role key never exposed to the browser); IP stored only as a hash
- [ ] Rate limiter counts recent messages per hashed IP from the table
- [ ] Notifier sends via Resend from a verified `tgolab.dev` sender to the owner's notification address, with reply-to set to the visitor's email
- [ ] Production wiring selected by environment; fixture mode unchanged for CI
- [ ] Manual check on the preview: a real message is stored and delivered; a burst above the limit is rejected
