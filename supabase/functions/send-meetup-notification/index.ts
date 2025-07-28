import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { record } = await req.json()
    
    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🎉 New Meetup Request from Your Website!</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Meetup Details:</h3>
          <p><strong>Type:</strong> ${record.meetup_type === 'coffee' ? '☕ Coffee' : '🍺 Beer'} meetup</p>
          <p><strong>Requested:</strong> ${new Date(record.timestamp).toLocaleString()}</p>
          <p><strong>Browser:</strong> ${record.user_agent?.substring(0, 100) || 'Unknown'}</p>
          <p><strong>Came from:</strong> ${record.referrer || 'Direct visit'}</p>
        </div>
        
        <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
          <p style="margin: 0;"><strong>Next Steps:</strong> Someone is interested in meeting up! You can reach out to them through your contact form or wait for them to provide contact details.</p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">This email was sent automatically from your Lobel Labs website.</p>
      </div>
    `

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'notifications@lobell-labs.com',
        to: ['maxlobel1@gmail.com'],
        subject: `${record.meetup_type === 'coffee' ? '☕' : '🍺'} New ${record.meetup_type} meetup request from your website`,
        html: emailHtml,
      }),
    })

    if (res.ok) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      throw new Error(`Failed to send email: ${res.status}`)
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}) 