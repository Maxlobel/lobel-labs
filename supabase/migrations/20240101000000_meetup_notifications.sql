-- Create meetup_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.meetup_requests (
    id BIGSERIAL PRIMARY KEY,
    meetup_type TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.meetup_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for the website)
CREATE POLICY "Allow anonymous inserts" ON public.meetup_requests
    FOR INSERT TO anon
    WITH CHECK (true);

-- Create policy to allow reads for authenticated users (for you to view)
CREATE POLICY "Allow authenticated reads" ON public.meetup_requests
    FOR SELECT TO authenticated
    USING (true);

-- Create function to call the edge function
CREATE OR REPLACE FUNCTION public.handle_meetup_request()
RETURNS TRIGGER AS $$
BEGIN
    -- Call the edge function
    PERFORM
        net.http_post(
            url := 'https://your-project-ref.supabase.co/functions/v1/send-meetup-notification',
            headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}',
            body := json_build_object('record', NEW)::text
        );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_meetup_request_created ON public.meetup_requests;
CREATE TRIGGER on_meetup_request_created
    AFTER INSERT ON public.meetup_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_meetup_request(); 