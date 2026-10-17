# 🏫 CampusFlow — Academic Operating System

A modern, multi-portal, role-isolated Academic Management System built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

CampusFlow provides dedicated, strictly-locked portals for **Students**, **Teachers**, **Parents**, and **Accountants**, with centralized governance for **Super Administrators**.

---

## 🔑 Demo Accounts Matrix (For Testing)

> **Note:** Quick 1-click demo login buttons have been removed from the website UI as requested. Use the credentials below in the **Sign In** tab or use the **Create Account** tab to register new accounts.

| Role | Portal | Demo Name | Email Address | Password | Permissions & Features |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 🛡️ **Super Admin** | Admin Portal | Central Administration | `admin@campusflow.edu` | `admin123` | Institutional suite, cross-portal switcher, student/staff directories, fees, timetable, audit |
| 👨‍🏫 **Teacher** | Teacher Portal | Mr. Tariq Mehmood | `tariq.math@campusflow.edu` | `teacher123` | Attendance register, editable timetable slots, mark entry, assignments dispatch, syllabus tracking |
| 🎓 **Student** | Student Portal | Ayesha Khan (Class 8-A) | `ayesha.khan@campusflow.edu` | `student123` | Personal timetable, report cards, fee receipts, homework submissions, photo upload, roll no slip |
| 👨‍👩‍👧 **Parent** | Parent Portal | Farooq Ahmed (Guardian) | `farooq.parent@gmail.com` | `parent123` | Child progress tracking, attendance breakdown, tuition vouchers, PTM booking, teacher messaging |
| 💰 **Accountant** | Accounting Portal | Rashid Minhas (Bursar) | `finance@campusflow.edu` | `finance123` | Invoices ledger, scholarship concessions, defaulters SMS, salary disbursement, daily cashier audit |

---

## 📝 Self-Registration (Create Account)

The login screen now includes a dedicated **Create Account** tab supporting:
- **Students**: Enter full name, email, password, class/grade, section, roll number, guardian name & phone.
- **Teachers**: Enter full name, email, password, department / subject specialization, and phone.
- **Parents**: Enter full name, email, password, child's name, and child admission ID.

*(Admin and Accountant accounts are strictly provisioned by institutional IT administration for security).*

---

## ⚡ Supabase Setup Guide (Backend & Database)

To connect CampusFlow to a real cloud backend, follow these steps with **[Supabase](https://supabase.com/)**:

### 1. Create a Supabase Account & Project
1. Sign up for free at [https://supabase.com](https://supabase.com).
2. Click **New Project**.
3. Choose a name (e.g. `campusflow-prod`), select a strong database password, and select your nearest region.

### 2. Copy API Keys to `.env`
In your Supabase project dashboard, navigate to **Project Settings** → **API**. Copy:
- **Project URL**
- **anon / public key**

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

### 3. Run Database Schema (SQL Editor)
Open the **SQL Editor** tab in your Supabase dashboard and execute the following SQL script to create all necessary tables:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends Supabase Auth users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text unique not null,
  role text not null check (role in ('admin', 'teacher', 'student', 'parent', 'accountant')),
  avatar_url text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. STUDENTS TABLE
create table public.students (
  id text primary key default ('STU' || lpad(nextval('student_seq')::text, 3, '0')),
  user_id uuid references public.profiles(id) on delete set null,
  admission_no text unique not null,
  name text not null,
  photo text,
  grade text not null,
  section text not null,
  roll_no integer not null,
  gender text check (gender in ('Female', 'Male', 'Other')),
  dob text,
  email text,
  phone text,
  address text,
  guardian_name text,
  guardian_phone text,
  guardian_relation text,
  enrollment_date date default current_date,
  status text default 'Active' check (status in ('Active', 'Inactive', 'On Leave')),
  attendance_rate integer default 100,
  total_marks integer default 0,
  fee_status text default 'Paid' check (fee_status in ('Paid', 'Pending', 'Partial', 'Overdue'))
);

-- 3. TEACHERS TABLE
create table public.teachers (
  id text primary key,
  user_id uuid references public.profiles(id) on delete set null,
  staff_id text unique not null,
  name text not null,
  email text unique not null,
  phone text,
  avatar text,
  subjects text[] default '{}',
  assigned_classes text[] default '{}',
  status text default 'Active' check (status in ('Active', 'On Leave'))
);

-- 4. TIMETABLE SLOTS
create table public.timetable_slots (
  id uuid default uuid_generate_v4() primary key,
  day text not null check (day in ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
  time text not null,
  subject text not null,
  teacher text not null,
  room text not null,
  type text default 'Theory' check (type in ('Theory', 'Lab', 'Activity', 'Class', 'Break')),
  grade text not null,
  section text not null
);

-- 5. FEE INVOICES
create table public.fee_invoices (
  id uuid default uuid_generate_v4() primary key,
  invoice_no text unique not null,
  student_id text references public.students(id) on delete cascade,
  student_name text not null,
  grade text not null,
  month text not null,
  due_date date not null,
  total_fee numeric not null default 0,
  paid_amount numeric not null default 0,
  due_amount numeric not null default 0,
  status text not null check (status in ('Paid', 'Partial', 'Pending', 'Overdue')),
  payment_method text,
  paid_at timestamp with time zone,
  receipt_no text
);

-- 6. EXAM MARKS
create table public.exam_marks (
  id uuid default uuid_generate_v4() primary key,
  student_id text references public.students(id) on delete cascade,
  student_name text not null,
  grade text not null,
  section text not null,
  exam_name text not null,
  math integer default 0,
  english integer default 0,
  science integer default 0,
  urdu integer default 0,
  total integer default 0,
  max_total integer default 400,
  percentage numeric default 0,
  grade_letter text default 'A',
  remarks text
);

-- 7. ASSIGNMENTS
create table public.assignments (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  subject text not null,
  grade text not null,
  teacher_name text not null,
  due_date date not null,
  assigned_date date default current_date,
  description text not null,
  status text default 'Pending' check (status in ('Pending', 'Submitted', 'Graded'))
);

-- 8. NOTICES & CIRCULARS
create table public.notices (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  date date default current_date,
  category text check (category in ('Exam', 'Event', 'Holiday', 'General', 'Fee', 'Academic')),
  target_role text default 'All' check (target_role in ('All', 'Students', 'Teachers', 'Parents')),
  urgent boolean default false,
  posted_by text
);

-- 9. LEAVE REQUESTS
create table public.leave_requests (
  id uuid default uuid_generate_v4() primary key,
  student_id text references public.students(id) on delete cascade,
  student_name text not null,
  grade text not null,
  from_date date not null,
  to_date date not null,
  reason text not null,
  status text default 'Pending' check (status in ('Pending', 'Approved', 'Rejected')),
  applied_at timestamp with time zone default now()
);

-- 10. PTM BOOKINGS
create table public.ptm_bookings (
  id uuid default uuid_generate_v4() primary key,
  parent_name text not null,
  student_name text not null,
  teacher_name text not null,
  date date not null,
  time_slot text not null,
  topic text not null,
  status text default 'Confirmed' check (status in ('Confirmed', 'Pending', 'Completed'))
);
```

### 4. Setup Storage Bucket
1. Go to **Storage** in your Supabase Dashboard.
2. Click **New Bucket**.
3. Name it `campusflow-avatars`.
4. Turn on **Public Bucket** so student photos and avatars can be viewed without token expiry.

### 5. Setup Supabase Client
Install the official client in the project:
```bash
npm install @supabase/supabase-js
```
Create `src/lib/supabase.ts`:
```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 🌐 Other External Accounts & Cloud Services to Set Up

To turn CampusFlow into a complete, enterprise-grade production school system, set up these external services:

### 1. Transactional Email Service
- **Recommended Provider**: [Resend](https://resend.com) or [SendGrid](https://sendgrid.com)
- **Purpose**:
  - Sending automated fee receipts & invoices (PDF) to parents.
  - Sending Examination Report Cards at the end of each term.
  - Parent circulars, attendance alerts, and password reset links.
- **Supabase Integration**: In Supabase Dashboard → **Authentication** → **Email Templates**, add your custom SMTP credentials from Resend.

### 2. SMS Gateway Service (Parent Alerts)
- **Recommended Providers**:
  - Global: [Twilio](https://twilio.com)
  - Pakistan (Local SMS): [Jazz Business SMS Gateway](https://www.jazz.com.pk/business), [Telenor SMS Gateway](https://telenor.com.pk/business), or [Zong CMPak SMS API].
- **Purpose**:
  - Daily instant SMS notification when student is marked Absent or Late.
  - Fee voucher reminder SMS to defaulters.
  - PTM booking confirmation SMS.

### 3. Payment Gateway Accounts (Fee Collection)
- **JazzCash Merchant Portal**:
  - Register at [JazzCash Business](https://www.jazzcash.com.pk/business).
  - Provides Merchant ID and Hash Key for online voucher settlements.
- **EasyPaisa Business**:
  - Register at [EasyPaisa Partner Portal](https://easypaisa.com.pk/business).
  - API provides instant QR and mobile number payment settlement.
- **1Link / PayFast**:
  - Connects to all Pakistani commercial bank apps for 1Bill invoice payment via 6-digit voucher number.

### 4. Hosting & Continuous Deployment
- **Recommended Provider**: [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
- **Deployment Steps**:
  1. Push code to your GitHub/GitLab repository.
  2. Import project into Vercel/Netlify.
  3. Set Framework Preset to **Vite**.
  4. Add Environment Variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
  5. Hit **Deploy** — automated builds on every `git push`!

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Server will run at `http://localhost:5173/`.
