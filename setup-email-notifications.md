# Email Notifications Setup Guide

## Prerequisites
1. Supabase project (you already have this)
2. Resend account for sending emails (free tier available)

## Step 1: Set up Resend (Email Service)
1. Go to [resend.com](https://resend.com) and create a free account
2. Verify your domain OR use their sandbox domain for testing
3. Go to API Keys and create a new API key
4. Copy the API key (starts with `re_`)

## Step 2: Configure Supabase
1. Go to your Supabase dashboard
2. Navigate to **Settings** → **API** 
3. Copy your **Project URL** (looks like: `https://your-project-ref.supabase.co`)
4. Go to **Settings** → **Edge Functions**
5. Add environment variable:
   - Key: `RESEND_API_KEY`
   - Value: Your Resend API key from Step 1

## Step 3: Update the Migration File
1. Open `supabase/migrations/20240101000000_meetup_notifications.sql`
2. Replace `your-project-ref` with your actual Supabase project reference
3. Find this line:
   ```sql
   url := 'https://your-project-ref.supabase.co/functions/v1/send-meetup-notification',
   ```
4. Replace `your-project-ref` with your actual project ref

## Step 4: Deploy to Supabase
Run these commands in your terminal:

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (replace with your project ref)
supabase link --project-ref your-project-ref

# Deploy the edge function
supabase functions deploy send-meetup-notification

# Run the migration
supabase db push
```

## Step 5: Update Email Settings (Optional)
In `supabase/functions/send-meetup-notification/index.ts`, you can customize:
- `from` email address (needs to be verified in Resend)
- `to` email address (your email)
- Subject line and email content

## Testing
1. Go to your website
2. Click "Boston Meetup" → Select Coffee or Beer
3. You should receive an email within a few seconds!

## Troubleshooting
- Check Supabase Edge Functions logs for errors
- Verify your Resend API key is correct
- Make sure your domain is verified in Resend (or use sandbox mode)
- Check that the database trigger was created successfully

## What You'll Receive
You'll get emails like this:

**Subject:** ☕ New coffee meetup request from your website

**Content:**
- Meetup type (coffee/beer)
- Timestamp
- Browser info
- Referrer (how they found your site)
- Next steps guidance 