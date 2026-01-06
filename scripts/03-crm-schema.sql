-- Friends Factory Cafe - Complete CRM Schema
-- Version 2.0 - Comprehensive CRM for romantic cafe experiences

-- ============================================
-- OUTLETS & CONFIGURATION
-- ============================================

CREATE TABLE IF NOT EXISTS public.outlets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT NOT NULL,
  google_maps_link TEXT,
  contact_numbers TEXT[],
  email TEXT,
  opening_hours JSONB DEFAULT '{}',
  default_slot_duration_minutes INTEGER DEFAULT 120,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TIME SLOTS & TABLE/ZONE MANAGEMENT
-- ============================================

CREATE TABLE IF NOT EXISTS public.time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outlet_id UUID REFERENCES public.outlets(id) ON DELETE CASCADE,
  slot_name TEXT NOT NULL, -- Sunset, Late Night, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tables_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outlet_id UUID REFERENCES public.outlets(id) ON DELETE CASCADE,
  zone_name TEXT NOT NULL, -- rooftop, cabana, private room, indoor
  table_number TEXT,
  capacity INTEGER DEFAULT 2,
  is_bookable BOOLEAN DEFAULT TRUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PACKAGES & ADD-ONS
-- ============================================

CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_description TEXT,
  detailed_inclusions JSONB DEFAULT '[]',
  outlet_availability UUID[], -- Array of outlet_ids
  base_price DECIMAL(10, 2) NOT NULL,
  max_people INTEGER DEFAULT 2,
  duration_minutes INTEGER DEFAULT 120,
  experience_type TEXT CHECK (experience_type IN ('candlelight', 'birthday', 'anniversary', 'proposal', 'private_celebration', 'other')),
  is_active BOOLEAN DEFAULT TRUE,
  is_highlighted BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.add_ons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  outlet_availability UUID[],
  addon_type TEXT CHECK (addon_type IN ('decor', 'food', 'service', 'time', 'other')),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CUSTOMERS
-- ============================================

CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  whatsapp_number TEXT,
  email TEXT,
  city TEXT,
  birthday DATE,
  anniversary_date DATE,
  tags TEXT[] DEFAULT '{}', -- VIP, influencer, corporate, repeat
  lead_source_first_seen TEXT,
  total_visits INTEGER DEFAULT 0,
  total_revenue DECIMAL(10, 2) DEFAULT 0,
  last_visit_date DATE,
  last_experience_type TEXT,
  whatsapp_marketing_opt_in BOOLEAN DEFAULT TRUE,
  last_marketing_message_type TEXT,
  last_marketing_message_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LEADS & ENQUIRIES
-- ============================================

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  whatsapp_number TEXT,
  email TEXT,
  city TEXT,
  lead_source TEXT CHECK (lead_source IN ('instagram', 'google_maps', 'website', 'zomato', 'referral', 'walk_in', 'other')),
  enquiry_channel TEXT CHECK (enquiry_channel IN ('call', 'whatsapp', 'dm', 'form', 'other')),
  occasion_type TEXT CHECK (occasion_type IN ('candlelight', 'birthday', 'anniversary', 'proposal', 'private_celebration', 'other')),
  preferred_date DATE,
  preferred_time_slot_id UUID REFERENCES public.time_slots(id),
  preferred_outlet_id UUID REFERENCES public.outlets(id),
  budget_range TEXT,
  number_of_people INTEGER DEFAULT 2,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_contact', 'quotation_sent', 'awaiting_payment', 'converted', 'lost')),
  assigned_staff_id UUID REFERENCES auth.users(id),
  converted_to_customer_id UUID REFERENCES public.customers(id),
  converted_to_booking_id UUID,
  lost_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead follow-up tasks
CREATE TABLE IF NOT EXISTS public.lead_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  task_type TEXT CHECK (task_type IN ('follow_up', 'send_quotation', 'call_back', 'send_payment_link', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ NOT NULL,
  assigned_staff_id UUID REFERENCES auth.users(id),
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BOOKINGS & RESERVATIONS
-- ============================================

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT UNIQUE,
  customer_id UUID REFERENCES public.customers(id),
  lead_id UUID REFERENCES public.leads(id),
  outlet_id UUID REFERENCES public.outlets(id),
  booking_date DATE NOT NULL,
  time_slot_id UUID REFERENCES public.time_slots(id),
  table_zone_id UUID REFERENCES public.tables_zones(id),
  number_of_people INTEGER DEFAULT 2,
  experience_type TEXT CHECK (experience_type IN ('candlelight', 'birthday', 'anniversary', 'proposal', 'private_celebration', 'other')),
  package_id UUID REFERENCES public.packages(id),
  special_notes TEXT,
  guest_of_honor_name TEXT,
  full_amount DECIMAL(10, 2) NOT NULL,
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'payment_link_sent', 'partial', 'paid')),
  booking_status TEXT DEFAULT 'pending' CHECK (booking_status IN ('pending', 'on_hold', 'confirmed', 'completed', 'no_show', 'cancelled', 'rescheduled')),
  -- Reschedule tracking
  previous_date DATE,
  previous_slot_id UUID,
  reschedule_count INTEGER DEFAULT 0,
  reschedule_reason TEXT,
  -- Operations checklist
  decor_ready BOOLEAN DEFAULT FALSE,
  kitchen_ready BOOLEAN DEFAULT FALSE,
  photographer_assigned BOOLEAN DEFAULT FALSE,
  payment_verified BOOLEAN DEFAULT FALSE,
  table_setup_status TEXT DEFAULT 'pending' CHECK (table_setup_status IN ('pending', 'in_progress', 'ready')),
  -- Hold management
  hold_expires_at TIMESTAMPTZ,
  -- Staff assignment
  assigned_staff_id UUID REFERENCES auth.users(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Booking add-ons junction table
CREATE TABLE IF NOT EXISTS public.booking_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  addon_id UUID REFERENCES public.add_ons(id),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PAYMENTS & INVOICES
-- ============================================

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id),
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_mode TEXT CHECK (payment_mode IN ('upi', 'card', 'cash', 'bank_transfer', 'payment_link', 'other')),
  transaction_reference TEXT,
  payment_date_time TIMESTAMPTZ DEFAULT NOW(),
  payment_note TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id),
  invoice_number TEXT UNIQUE NOT NULL,
  invoice_date DATE DEFAULT CURRENT_DATE,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  tax_details JSONB DEFAULT '{}',
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'issued' CHECK (status IN ('draft', 'issued', 'paid', 'cancelled')),
  pdf_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SETTINGS & POLICIES
-- ============================================

CREATE TABLE IF NOT EXISTS public.policy_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outlet_id UUID REFERENCES public.outlets(id),
  reschedule_window_hours INTEGER DEFAULT 24,
  refund_policy_text TEXT,
  no_show_policy_text TEXT,
  terms_and_conditions_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_type TEXT NOT NULL CHECK (template_type IN (
    'enquiry_ack', 'quotation', 'payment_link', 'booking_confirmation',
    'pre_visit_reminder', 'last_minute_instructions', 'post_visit_thankyou',
    'review_request', 'birthday_wish', 'anniversary_wish', 'marketing_offer'
  )),
  name TEXT NOT NULL,
  subject TEXT,
  message_template TEXT NOT NULL,
  whatsapp_template_id TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  outlet_id UUID REFERENCES public.outlets(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.integration_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  is_encrypted BOOLEAN DEFAULT FALSE,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- WHATSAPP & MARKETING CAMPAIGNS
-- ============================================

CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  campaign_type TEXT CHECK (campaign_type IN ('broadcast', 'drip', 'triggered')),
  target_segment JSONB DEFAULT '{}', -- Filters: city, tags, last_visit, occasion_month, etc.
  message_template_id UUID REFERENCES public.notification_templates(id),
  scheduled_time TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'running', 'completed', 'cancelled')),
  stats JSONB DEFAULT '{"sent": 0, "delivered": 0, "read": 0, "clicked": 0, "responded": 0}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.campaign_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'clicked', 'responded', 'failed')),
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  clicked_link BOOLEAN DEFAULT FALSE,
  replied BOOLEAN DEFAULT FALSE,
  booked_from_campaign BOOLEAN DEFAULT FALSE,
  booking_id UUID REFERENCES public.bookings(id),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CUSTOMER FEEDBACK
-- ============================================

CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id),
  customer_id UUID REFERENCES public.customers(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  food_rating INTEGER CHECK (food_rating >= 1 AND food_rating <= 5),
  ambience_rating INTEGER CHECK (ambience_rating >= 1 AND ambience_rating <= 5),
  service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
  comments TEXT,
  would_recommend BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ACTIVITY LOG / AUDIT
-- ============================================

CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL, -- lead, booking, customer, payment, etc.
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON public.leads(whatsapp_number);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_outlet_date ON public.bookings(outlet_id, booking_date);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_whatsapp ON public.customers(whatsapp_number);
CREATE INDEX IF NOT EXISTS idx_customers_tags ON public.customers USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_payments_booking ON public.payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON public.payments(payment_date_time DESC);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.outlets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users full access (simplified for now)
CREATE POLICY "Allow authenticated access" ON public.outlets FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.time_slots FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.tables_zones FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.packages FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.add_ons FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.customers FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.lead_tasks FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.bookings FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.booking_addons FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.payments FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.invoices FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.policy_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.notification_templates FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.integration_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.campaigns FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.campaign_recipients FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.feedback FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated access" ON public.activity_log FOR ALL TO authenticated USING (true);

-- ============================================
-- SEED DATA
-- ============================================

-- Insert default outlets
INSERT INTO public.outlets (name, city, address) VALUES
('Friends Factory Cafe - Surat', 'Surat', 'Surat, Gujarat'),
('Friends Factory Cafe - Vadodara', 'Vadodara', 'Vadodara, Gujarat')
ON CONFLICT DO NOTHING;

-- Insert default time slots (will be linked to outlets)
INSERT INTO public.time_slots (outlet_id, slot_name, start_time, end_time, display_order)
SELECT o.id, s.slot_name, s.start_time::TIME, s.end_time::TIME, s.display_order
FROM public.outlets o
CROSS JOIN (VALUES 
  ('Lunch Special', '12:00', '14:00', 1),
  ('Afternoon Delight', '14:30', '16:30', 2),
  ('Sunset Romance', '17:00', '19:00', 3),
  ('Dinner Classic', '19:30', '21:30', 4),
  ('Late Night', '22:00', '00:00', 5)
) AS s(slot_name, start_time, end_time, display_order)
ON CONFLICT DO NOTHING;

-- Insert sample packages
INSERT INTO public.packages (name, short_description, base_price, max_people, experience_type, duration_minutes, is_highlighted) VALUES
('Classic Candlelight Dinner', 'Intimate dinner with candles, roses, and special ambience', 2499, 2, 'candlelight', 120, true),
('Premium Rooftop Experience', 'Exclusive rooftop setup with premium décor and photographer', 4999, 2, 'candlelight', 150, true),
('Birthday Celebration', 'Special birthday setup with cake, balloons, and decorations', 3499, 4, 'birthday', 120, false),
('Anniversary Special', 'Celebrate your love story with roses, cake, and memories', 3999, 2, 'anniversary', 120, true),
('Proposal Setup', 'The perfect setting to pop the question - fairy lights, flowers, and magic', 5999, 2, 'proposal', 180, true),
('Private Cabana', 'Exclusive private space for intimate celebrations', 6999, 4, 'private_celebration', 180, false)
ON CONFLICT DO NOTHING;

-- Insert sample add-ons
INSERT INTO public.add_ons (name, description, price, addon_type, display_order) VALUES
('Rose Bouquet', 'Beautiful bouquet of 12 red roses', 599, 'decor', 1),
('Premium Cake (1kg)', 'Custom cake with message', 899, 'food', 2),
('Flower Path Entry', 'Romantic flower path to your table', 799, 'decor', 3),
('Live Musician (30 mins)', 'Guitarist or violinist performance', 1999, 'service', 4),
('Professional Photographer', 'Capture your special moments', 1499, 'service', 5),
('Extra 30 Minutes', 'Extend your experience', 499, 'time', 6),
('Balloon Decoration', 'Colorful balloon arch and décor', 699, 'decor', 7),
('Special Mocktails (2)', 'Signature romantic mocktails', 399, 'food', 8),
('Personalized Letter', 'Handwritten love letter in calligraphy', 299, 'service', 9),
('Fog Entry', 'Dramatic fog machine entry', 599, 'decor', 10)
ON CONFLICT DO NOTHING;

-- Insert sample tables/zones
INSERT INTO public.tables_zones (outlet_id, zone_name, table_number, capacity, description)
SELECT o.id, z.zone_name, z.table_number, z.capacity, z.description
FROM public.outlets o
CROSS JOIN (VALUES 
  ('Rooftop', 'R1', 2, 'Premium rooftop table with city view'),
  ('Rooftop', 'R2', 2, 'Corner rooftop table with privacy'),
  ('Rooftop', 'R3', 4, 'Large rooftop table for groups'),
  ('Private Cabana', 'C1', 4, 'Exclusive private cabana'),
  ('Indoor', 'I1', 2, 'Cozy indoor table'),
  ('Indoor', 'I2', 2, 'Window-side indoor table'),
  ('Garden', 'G1', 2, 'Garden table with fairy lights'),
  ('Garden', 'G2', 4, 'Large garden setup')
) AS z(zone_name, table_number, capacity, description)
ON CONFLICT DO NOTHING;

-- Insert notification templates
INSERT INTO public.notification_templates (template_type, name, message_template) VALUES
('enquiry_ack', 'Enquiry Acknowledgement', 'Hi {{name}}! Thank you for your interest in Friends Factory Cafe. We''ve received your enquiry for {{occasion_type}} on {{preferred_date}}. Our team will contact you shortly! 💝'),
('quotation', 'Quotation Message', 'Hi {{name}}! Here''s your personalized quote for {{package_name}} at Friends Factory Cafe:\n\n📦 Package: {{package_name}}\n💰 Price: ₹{{amount}}\n📅 Date: {{date}}\n⏰ Slot: {{slot}}\n\nReply YES to proceed with booking!'),
('payment_link', 'Payment Link', 'Hi {{name}}! To confirm your {{occasion_type}} booking at Friends Factory Cafe, please complete the payment:\n\n💳 Amount: ₹{{amount}}\n🔗 Pay here: {{payment_link}}\n\nBooking will be confirmed upon payment. Thank you! 💝'),
('booking_confirmation', 'Booking Confirmed', '🎉 Booking Confirmed!\n\nHi {{name}}, your {{occasion_type}} at Friends Factory Cafe is confirmed!\n\n📅 Date: {{date}}\n⏰ Time: {{slot}}\n📍 Location: {{outlet}}\n\nWe can''t wait to make your experience magical! ✨'),
('pre_visit_reminder', 'Pre-Visit Reminder', 'Hi {{name}}! Just a reminder about your special experience tomorrow at Friends Factory Cafe!\n\n📅 {{date}} | ⏰ {{slot}}\n📍 {{outlet}}\n\nPlease arrive 10 mins early. See you soon! 💝'),
('post_visit_thankyou', 'Post Visit Thank You', 'Hi {{name}}! Thank you for choosing Friends Factory Cafe for your {{occasion_type}}! 💝\n\nWe hope you had a magical time. Your memories matter to us!\n\n⭐ Rate us: {{review_link}}\n\nSee you again soon!')
ON CONFLICT DO NOTHING;
