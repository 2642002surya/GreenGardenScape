-- Cart Items Table
create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  quantity integer not null default 1,
  created_at timestamp with time zone default now()
);

alter table cart_items enable row level security;
create policy "Users can manage own cart" on cart_items
  for all using (auth.uid() = user_id);

-- Wishlist Items Table
create table if not exists wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamp with time zone default now()
);

alter table wishlist_items enable row level security;
create policy "Users can manage own wishlist" on wishlist_items
  for all using (auth.uid() = user_id);
