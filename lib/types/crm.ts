// CRM Types for Friends Factory Cafe

export type LeadSource = 'instagram' | 'google_maps' | 'website' | 'zomato' | 'referral' | 'walk_in' | 'other'
export type EnquiryChannel = 'call' | 'whatsapp' | 'dm' | 'form' | 'other'
export type OccasionType = 'candlelight' | 'birthday' | 'anniversary' | 'proposal' | 'private_celebration' | 'other'
export type LeadStatus = 'new' | 'in_contact' | 'quotation_sent' | 'awaiting_payment' | 'converted' | 'lost'
export type PaymentStatus = 'unpaid' | 'payment_link_sent' | 'partial' | 'paid'
export type BookingStatus = 'pending' | 'on_hold' | 'confirmed' | 'completed' | 'no_show' | 'cancelled' | 'rescheduled'
export type PaymentMode = 'upi' | 'card' | 'cash' | 'bank_transfer' | 'payment_link' | 'other'
export type AddOnType = 'decor' | 'food' | 'service' | 'time' | 'other'

export interface Outlet {
  id: string
  name: string
  address: string | null
  city: string
  google_maps_link: string | null
  contact_numbers: string[] | null
  email: string | null
  opening_hours: Record<string, any>
  default_slot_duration_minutes: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TimeSlot {
  id: string
  outlet_id: string
  slot_name: string
  start_time: string
  end_time: string
  is_active: boolean
  display_order: number
  created_at: string
}

export interface TableZone {
  id: string
  outlet_id: string
  zone_name: string
  table_number: string | null
  capacity: number
  is_bookable: boolean
  description: string | null
  image_url: string | null
  created_at: string
}

export interface Package {
  id: string
  name: string
  short_description: string | null
  detailed_inclusions: any[]
  outlet_availability: string[] | null
  base_price: number
  max_people: number
  duration_minutes: number
  experience_type: OccasionType | null
  is_active: boolean
  is_highlighted: boolean
  display_order: number
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface AddOn {
  id: string
  name: string
  description: string | null
  price: number
  outlet_availability: string[] | null
  addon_type: AddOnType | null
  is_active: boolean
  display_order: number
  image_url: string | null
  created_at: string
}

export interface Customer {
  id: string
  name: string
  phone: string | null
  whatsapp_number: string | null
  email: string | null
  city: string | null
  birthday: string | null
  anniversary_date: string | null
  tags: string[]
  lead_source_first_seen: string | null
  total_visits: number
  total_revenue: number
  last_visit_date: string | null
  last_experience_type: string | null
  whatsapp_marketing_opt_in: boolean
  last_marketing_message_type: string | null
  last_marketing_message_date: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  name: string
  phone: string | null
  whatsapp_number: string | null
  email: string | null
  city: string | null
  lead_source: LeadSource | null
  enquiry_channel: EnquiryChannel | null
  occasion_type: OccasionType | null
  preferred_date: string | null
  preferred_time_slot_id: string | null
  preferred_outlet_id: string | null
  budget_range: string | null
  number_of_people: number
  notes: string | null
  status: LeadStatus
  assigned_staff_id: string | null
  converted_to_customer_id: string | null
  converted_to_booking_id: string | null
  lost_reason: string | null
  created_at: string
  updated_at: string
  // Relations
  outlet?: Outlet
  time_slot?: TimeSlot
}

export interface LeadTask {
  id: string
  lead_id: string
  task_type: 'follow_up' | 'send_quotation' | 'call_back' | 'send_payment_link' | 'other'
  title: string
  description: string | null
  due_date: string
  assigned_staff_id: string | null
  is_completed: boolean
  completed_at: string | null
  created_at: string
}

export interface Booking {
  id: string
  booking_number: string | null
  customer_id: string | null
  lead_id: string | null
  outlet_id: string | null
  booking_date: string
  time_slot_id: string | null
  table_zone_id: string | null
  number_of_people: number
  experience_type: OccasionType | null
  package_id: string | null
  special_notes: string | null
  guest_of_honor_name: string | null
  full_amount: number
  payment_status: PaymentStatus
  booking_status: BookingStatus
  previous_date: string | null
  previous_slot_id: string | null
  reschedule_count: number
  reschedule_reason: string | null
  decor_ready: boolean
  kitchen_ready: boolean
  photographer_assigned: boolean
  payment_verified: boolean
  table_setup_status: 'pending' | 'in_progress' | 'ready'
  hold_expires_at: string | null
  assigned_staff_id: string | null
  created_by: string | null
  created_at: string
  updated_at: string
  // Relations
  customer?: Customer
  outlet?: Outlet
  time_slot?: TimeSlot
  table_zone?: TableZone
  package?: Package
  addons?: BookingAddOn[]
}

export interface BookingAddOn {
  id: string
  booking_id: string
  addon_id: string
  quantity: number
  unit_price: number
  total_price: number
  notes: string | null
  created_at: string
  addon?: AddOn
}

export interface Payment {
  id: string
  booking_id: string
  customer_id: string | null
  amount: number
  currency: string
  payment_mode: PaymentMode | null
  transaction_reference: string | null
  payment_date_time: string
  payment_note: string | null
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  created_by: string | null
  created_at: string
}

export interface Invoice {
  id: string
  booking_id: string
  customer_id: string | null
  invoice_number: string
  invoice_date: string
  subtotal: number
  tax_amount: number
  tax_details: Record<string, any>
  total_amount: number
  status: 'draft' | 'issued' | 'paid' | 'cancelled'
  pdf_url: string | null
  notes: string | null
  created_at: string
}

export interface Campaign {
  id: string
  name: string
  campaign_type: 'broadcast' | 'drip' | 'triggered' | null
  target_segment: Record<string, any>
  message_template_id: string | null
  scheduled_time: string | null
  status: 'draft' | 'scheduled' | 'running' | 'completed' | 'cancelled'
  stats: {
    sent: number
    delivered: number
    read: number
    clicked: number
    responded: number
  }
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface NotificationTemplate {
  id: string
  template_type: string
  name: string
  subject: string | null
  message_template: string
  whatsapp_template_id: string | null
  is_active: boolean
  outlet_id: string | null
  created_at: string
  updated_at: string
}

// Form types
export interface LeadFormData {
  name: string
  phone: string
  whatsapp_number: string
  email: string
  city: string
  lead_source: LeadSource
  enquiry_channel: EnquiryChannel
  occasion_type: OccasionType
  preferred_date: string
  preferred_time_slot_id: string
  preferred_outlet_id: string
  budget_range: string
  number_of_people: number
  notes: string
}

export interface BookingFormData {
  customer_id: string
  lead_id?: string
  outlet_id: string
  booking_date: string
  time_slot_id: string
  table_zone_id: string
  number_of_people: number
  experience_type: OccasionType
  package_id: string
  special_notes: string
  guest_of_honor_name: string
  addons: { addon_id: string; quantity: number }[]
}

// Dashboard stats
export interface DashboardStats {
  totalLeads: number
  newLeadsToday: number
  totalBookings: number
  confirmedBookings: number
  todayBookings: number
  totalRevenue: number
  monthlyRevenue: number
  conversionRate: number
  pendingPayments: number
  upcomingBookings: number
}

// Analytics types
export interface RevenueBySource {
  source: LeadSource
  revenue: number
  bookings: number
}

export interface PackagePerformance {
  package_id: string
  package_name: string
  bookings: number
  revenue: number
  avg_ticket_size: number
}
