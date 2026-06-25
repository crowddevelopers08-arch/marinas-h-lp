import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured, prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

function toText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const razorpayOrderId = toText(rawBody.orderId);

    if (!razorpayOrderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    if (!isDatabaseConfigured()) {
      return NextResponse.json({ success: true, skipped: 'Database not configured' });
    }

    try {
      await prisma.paymentRecord.upsert({
        where: { razorpayOrderId },
        create: {
          formName: toText(rawBody.formName) || 'Hernia Consultation Booking Form',
          source: toText(rawBody.source) || 'Hernia-LP',
          name: toText(rawBody.name),
          phone: toText(rawBody.phone),
          email: toText(rawBody.email) || null,
          concern: toText(rawBody.concern) || null,
          pageUrl: toText(rawBody.pageUrl) || null,
          amount: Number(rawBody.amount || 0),
          currency: toText(rawBody.currency) || 'INR',
          paymentStatus: 'failed',
          razorpayOrderId,
        },
        update: {
          paymentStatus: 'failed',
          formName: toText(rawBody.formName) || 'Hernia Consultation Booking Form',
          source: toText(rawBody.source) || 'Hernia-LP',
          name: toText(rawBody.name),
          phone: toText(rawBody.phone),
          email: toText(rawBody.email) || null,
          concern: toText(rawBody.concern) || null,
          pageUrl: toText(rawBody.pageUrl) || null,
          amount: Number(rawBody.amount || 0),
          currency: toText(rawBody.currency) || 'INR',
        },
      });
    } catch (dbErr) {
      console.warn('Payment abandonment DB save skipped:', dbErr instanceof Error ? dbErr.message : dbErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Razorpay abandon route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
