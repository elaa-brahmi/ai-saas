import {NextRequest,NextResponse} from 'next/server'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const GET = async (req: NextRequest) => {
    return NextResponse.json({
        status: 'Payments API is running',
        message: 'This endpoint handles Stripe webhook events via POST requests'
    });
}

export const POST = async (req: NextRequest) => {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json({
            error: 'Stripe configuration is missing'
        }, { status: 500 });
    }

    const payload = await req.text();
    const sig = req.headers.get('stripe-signature');
    
    if (!sig) {
        return NextResponse.json({
            error: 'No stripe signature found in request'
        }, { status: 400 });
    }

    let event;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        
        switch(event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log(session);
                break;
            case 'customer.subscription.deleted':
                const subscription = event.data.object;
                console.log(subscription);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (err) {
        console.error('Webhook error:', err);
        return NextResponse.json({
            error: 'Failed to process webhook',
            details: err instanceof Error ? err.message : 'Unknown error'
        }, { status: 400 });
    }

    return NextResponse.json({
        status: 'success'
    });
}