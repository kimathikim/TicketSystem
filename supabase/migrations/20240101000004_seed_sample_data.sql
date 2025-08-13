-- Insert sample admin user for event management
INSERT INTO users (id, name, email, role) VALUES 
  ('00000000-0000-0000-0000-000000000001', 'System Admin', 'admin@ticketkenya.com', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample events (based on your JSON data structure)
INSERT INTO events (id, title, description, category, image_url, event_date, event_time, location, venue, organizer_id, capacity, featured, has_seating, tags) VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'Nairobi Tech Summit 2024',
    'Kenya''s largest technology conference bringing together innovators, entrepreneurs, and tech leaders from across East Africa.',
    'tech',
    '/src/assets/tech-event.jpg',
    '2024-08-15',
    '09:00',
    'KICC, Nairobi',
    'Kenyatta International Convention Centre',
    '00000000-0000-0000-0000-000000000001',
    2000,
    true,
    true,
    ARRAY['Technology', 'Innovation', 'Networking']
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Koroga Festival',
    'Kenya''s premier music and food festival featuring local and international artists with authentic Kenyan cuisine.',
    'festival',
    '/src/assets/cultural-festival.jpg',
    '2024-08-22',
    '14:00',
    'Carnivore Grounds, Nairobi',
    'Carnivore Simba Saloon',
    '00000000-0000-0000-0000-000000000001',
    5000,
    true,
    false,
    ARRAY['Music', 'Food', 'Entertainment']
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Diamond Platnumz Live in Concert',
    'East Africa''s biggest music star performs live in Nairobi with special guest performances.',
    'concert',
    'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
    '2024-09-01',
    '19:00',
    'Kasarani Stadium, Nairobi',
    'Moi International Sports Centre Kasarani',
    '00000000-0000-0000-0000-000000000001',
    30000,
    true,
    true,
    ARRAY['Music', 'Concert', 'Bongo Flava']
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Harambee Stars vs Nigeria',
    'International football friendly match between Kenya and Nigeria national teams.',
    'sports',
    'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    '2024-08-30',
    '16:00',
    'Nyayo Stadium, Nairobi',
    'Nyayo National Stadium',
    '00000000-0000-0000-0000-000000000001',
    30000,
    false,
    true,
    ARRAY['Football', 'Sports', 'International']
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'DevFest Nairobi 2024',
    'Google Developer Groups'' largest annual event focused on modern technologies and innovation.',
    'tech',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    '2024-09-15',
    '08:00',
    'University of Nairobi',
    'Taifa Hall, University of Nairobi',
    '00000000-0000-0000-0000-000000000001',
    1000,
    false,
    true,
    ARRAY['Technology', 'Google', 'Development']
  )
ON CONFLICT (id) DO NOTHING;

-- Insert event pricing (based on your JSON data)
INSERT INTO event_prices (event_id, ticket_type, price, available_quantity) VALUES 
  -- Nairobi Tech Summit
  ('11111111-1111-1111-1111-111111111111', 'regular', 2500.00, 1500),
  ('11111111-1111-1111-1111-111111111111', 'vip', 5000.00, 400),
  ('11111111-1111-1111-1111-111111111111', 'vvip', 10000.00, 100),
  
  -- Koroga Festival
  ('22222222-2222-2222-2222-222222222222', 'regular', 1500.00, 4000),
  ('22222222-2222-2222-2222-222222222222', 'vip', 3500.00, 800),
  ('22222222-2222-2222-2222-222222222222', 'vvip', 7000.00, 200),
  
  -- Diamond Platnumz Concert
  ('33333333-3333-3333-3333-333333333333', 'regular', 2000.00, 25000),
  ('33333333-3333-3333-3333-333333333333', 'vip', 5000.00, 4000),
  ('33333333-3333-3333-3333-333333333333', 'vvip', 12000.00, 1000),
  
  -- Harambee Stars vs Nigeria
  ('44444444-4444-4444-4444-444444444444', 'regular', 500.00, 25000),
  ('44444444-4444-4444-4444-444444444444', 'vip', 1500.00, 4000),
  ('44444444-4444-4444-4444-444444444444', 'vvip', 3000.00, 1000),
  
  -- DevFest Nairobi
  ('55555555-5555-5555-5555-555555555555', 'regular', 1000.00, 700),
  ('55555555-5555-5555-5555-555555555555', 'vip', 2500.00, 250),
  ('55555555-5555-5555-5555-555555555555', 'vvip', 5000.00, 50)
ON CONFLICT DO NOTHING;

-- Insert a sample user for testing
INSERT INTO users (id, name, email, phone, role) VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'John Doe', 'john@example.com', '+254712345678', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert a sample order and tickets
INSERT INTO orders (id, user_id, event_id, total_amount, payment_status, payment_method, payment_reference) VALUES 
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 5000.00, 'completed', 'mpesa', 'MPESA-REF-123456789')
ON CONFLICT (id) DO NOTHING;

INSERT INTO tickets (order_id, event_id, user_id, attendee_name, attendee_email, attendee_phone, ticket_type, price, seat_number, status) VALUES 
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'John Doe', 'john@example.com', '+254712345678', 'vip', 5000.00, 'A15', 'active'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Jane Doe', 'jane@example.com', '+254712345679', 'vip', 5000.00, 'A16', 'active');
