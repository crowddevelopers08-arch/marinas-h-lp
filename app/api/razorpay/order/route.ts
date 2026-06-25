import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured, prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

function toText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({ error: 'Razorpay not configured' }, { status: 500 });
  }

  try {
    const rawBody = await req.json();
    const amount = Number(rawBody.amount || 100);
    const currency = toText(rawBody.currency) || 'INR';
    const formName = toText(rawBody.formName) || 'Hernia Consultation Booking Form';
    const source = toText(rawBody.source) || 'Hernia-LP';
    const name = toText(rawBody.name);
    const phone = toText(rawBody.phone);
    const email = toText(rawBody.email);
    const concern = toText(rawBody.concern);
    const pageUrl = toText(rawBody.pageUrl);

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: `rcpt_${Date.now()}`,
        notes: {
          form: formName,
          source,
          customer_name: name,
          customer_phone: phone,
          customer_email: email,
          concern,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Razorpay order error:', err);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 502 });
    }

    const order = await res.json();

    if (isDatabaseConfigured()) {
      try {
        await prisma.paymentRecord.upsert({
          where: { razorpayOrderId: order.id },
          create: {
            formName,
            source,
            name,
            phone,
            email: email || null,
            concern: concern || null,
            pageUrl: pageUrl || null,
            amount: order.amount,
            currency: order.currency,
            paymentStatus: order.status || 'order_created',
            razorpayOrderId: order.id,
            razorpayRaw: order,
          },
          update: {
            formName,
            source,
            name,
            phone,
            email: email || null,
            concern: concern || null,
            pageUrl: pageUrl || null,
            amount: order.amount,
            currency: order.currency,
            paymentStatus: order.status || 'order_created',
            razorpayRaw: order,
          },
        });
      } catch (dbErr) {
        console.warn('Payment DB save skipped:', dbErr instanceof Error ? dbErr.message : dbErr);
      }
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (err) {
    console.error('Razorpay route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
