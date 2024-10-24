import webpush from "web-push";

webpush.setVapidDetails(
  process.env.NOTIFICATIONS_FROM,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function sendNotification(subscription: any, payload: any) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload))
  } catch(err) {
    console.error("Error sending notification:", err);
  }
}