import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { confirmPayment, revokeMembership } from "@/app/actions/payments";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("stripe-signature")!;
  let event;
  try {
    event = await stripe.constructEvent(body, signature);
  } catch (error) {
    console.error("Could not construct Stripe event:", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await confirmPayment(
          event.data.object.id,
          event.data.object.customer as string
        );
        break;
      }
      case "customer.subscription.deleted": {
        await revokeMembership(event.data.object.customer as string);
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Error handling Stripe event", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }

  return NextResponse.json({});
}
