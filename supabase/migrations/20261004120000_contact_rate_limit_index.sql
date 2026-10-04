-- The contact rate limit counts one sender's recent messages: equality on ip_hash, then a range on created_at.
create index contact_messages_ip_hash_created_at_idx
  on public.contact_messages (ip_hash, created_at);
