# 10 — Contact on production: Supabase and Resend

**What to build:** A Contact message sent from the live site is stored in Supabase and arrives in the owner's inbox; the per-IP limit uses real data.

**Blocked by:** 08 — Contact section and form (fakes); 09 — Supabase Content, seed and revalidation

**Status:** ready-for-agent

**Human in the loop:** the owner creates a Resend account, adds `tgolab.dev` and the DNS records Resend shows; the agent gives step-by-step instructions.

- [ ] Message store backed by `contact_messages` (server-side, service role key never exposed to the browser); IP stored only as a hash
- [ ] Rate limiter counts recent messages per hashed IP from the table
- [ ] Notifier sends via Resend from a verified `tgolab.dev` sender to the owner's notification address, with reply-to set to the visitor's email
- [ ] Production wiring selected by environment; fixture mode unchanged for CI
- [ ] Manual check on the preview: a real message is stored and delivered; a burst above the limit is rejected
