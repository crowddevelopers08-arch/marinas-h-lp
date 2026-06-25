import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { isDatabaseConfigured, prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

function toText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) return null;

  return {
    keyId,
    keySecret,
    authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
  };
}

export async function POST(req: NextRequest) {
  const credentials = getCredentials();

  if (!credentials) {
    return NextResponse.json({ error: 'Razorpay not configured' }, { status: 500 });
  }

  try {
    const rawBody = await req.json();
    const razorpayOrderId = toText(rawBody.razorpay_order_id);
    const razorpayPaymentId = toText(rawBody.razorpay_payment_id);
    const razorpaySignature = toText(rawBody.razorpay_signature);

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: 'Missing Razorpay payment details' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', credentials.keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      if (isDatabaseConfigured()) {
        try {
          await prisma.paymentRecord.updateMany({
            where: { razorpayOrderId },
            data: {
              razorpayPaymentId,
              razorpaySignature,
              paymentStatus: 'signature_failed',
            },
          });
        } catch (dbErr) {
          console.warn('Payment DB signature failure save skipped:', dbErr instanceof Error ? dbErr.message : dbErr);
        }
      }

      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    const paymentRes = await fetch(`https://api.razorpay.com/v1/payments/${razorpayPaymentId}`, {
      headers: {
        Authorization: credentials.authorization,
        Accept: 'application/json',
      },
    });

    if (!paymentRes.ok) {
      const error = await paymentRes.text();
      console.error('Razorpay payment fetch error:', error);
      return NextResponse.json({ error: 'Could not fetch payment details' }, { status: 502 });
    }

    const payment = await paymentRes.json();
    const formName = toText(rawBody.formName) || 'Hernia Consultation Booking Form';
    const source = toText(rawBody.source) || 'Hernia-LP';
    const name = toText(rawBody.name);
    const phone = toText(rawBody.phone);
    const email = toText(rawBody.email);
    const concern = toText(rawBody.concern);
    const pageUrl = toText(rawBody.pageUrl);

    let record = null;
    if (isDatabaseConfigured()) {
      try {
        record = await prisma.paymentRecord.upsert({
          where: { razorpayOrderId },
          create: {
            formName,
            source,
            name,
            phone,
            email: email || null,
            concern: concern || null,
            pageUrl: pageUrl || null,
            amount: Number(payment.amount || rawBody.amount || 0),
            currency: toText(payment.currency) || 'INR',
            paymentStatus: toText(payment.status) || 'verified',
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
            razorpayMethod: toText(payment.method) || null,
            razorpayEmail: toText(payment.email) || email || null,
            razorpayContact: toText(payment.contact) || phone || null,
            razorpayRaw: payment,
          },
          update: {
            formName,
            source,
            name,
            phone,
            email: email || null,
            concern: concern || null,
            pageUrl: pageUrl || null,
            amount: Number(payment.amount || rawBody.amount || 0),
            currency: toText(payment.currency) || 'INR',
            paymentStatus: toText(payment.status) || 'verified',
            razorpayPaymentId,
            razorpaySignature,
            razorpayMethod: toText(payment.method) || null,
            razorpayEmail: toText(payment.email) || email || null,
            razorpayContact: toText(payment.contact) || phone || null,
            razorpayRaw: payment,
          },
        });
      } catch (dbErr) {
        console.warn('Payment DB verification save skipped:', dbErr instanceof Error ? dbErr.message : dbErr);
      }
    }

    return NextResponse.json({ success: true, payment: record || payment });
  } catch (err) {
    console.error('Razorpay verify route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
