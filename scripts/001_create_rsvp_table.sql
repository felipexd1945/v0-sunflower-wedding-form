-- Create RSVP table for wedding confirmations
CREATE TABLE IF NOT EXISTS rsvp_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  attendance TEXT NOT NULL CHECK (attendance IN ('yes', 'no')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE rsvp_confirmations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert RSVP confirmations (public form)
CREATE POLICY "Allow anyone to submit RSVP" 
  ON rsvp_confirmations FOR INSERT 
  WITH CHECK (true);

-- Policy: Only admins can read all RSVPs (optional, but secure for future admin panel)
CREATE POLICY "Allow service role to read all RSVPs" 
  ON rsvp_confirmations FOR SELECT 
  USING (auth.role() = 'service_role');
