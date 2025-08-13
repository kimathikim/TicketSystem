-- Create events table for the ticket system
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  location TEXT NOT NULL,
  venue TEXT NOT NULL,
  organizer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  capacity INTEGER NOT NULL DEFAULT 100,
  featured BOOLEAN DEFAULT false,
  has_seating BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Create event pricing table
CREATE TABLE event_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  ticket_type TEXT NOT NULL CHECK (ticket_type IN ('regular', 'vip', 'vvip')),
  price DECIMAL(10,2) NOT NULL,
  available_quantity INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trigger to automatically update updated_at for events
CREATE TRIGGER update_events_updated_at 
    BEFORE UPDATE ON events 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_featured ON events(featured);
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_event_prices_event_id ON event_prices(event_id);

-- Enable RLS on events and event_prices
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_prices ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Anyone can view published events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Organizers can manage their events" ON events
  FOR ALL USING (organizer_id = auth.uid());

CREATE POLICY "Admins can manage all events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for event_prices
CREATE POLICY "Anyone can view event prices" ON event_prices
  FOR SELECT USING (true);

CREATE POLICY "Event organizers can manage prices" ON event_prices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM events 
      WHERE events.id = event_prices.event_id 
      AND events.organizer_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all event prices" ON event_prices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
