import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);

  if (eventType === "user.created") {
    try {
      const userData = evt.data;
      
      await prisma.user.create({
        data: {
          id: userData.id,
          username: userData.username || `user_${userData.id.slice(-8)}`,
          email: userData.email_addresses?.[0]?.email_address || '',
          displayName: userData.first_name && userData.last_name 
            ? `${userData.first_name} ${userData.last_name}`
            : userData.username || 'User',
          bio: "New user",
          location: "",
          job: "",
          website: "",
          img: userData.image_url || null,
          cover: null,
        },
      });
      
      console.log("User created successfully:", userData.id);
      return new Response("User created", { status: 200 });
    } catch (err) {
      console.error("Error creating user:", err);
      return new Response("Error: Failed to create a user!", {
        status: 500,
      });
    }
  }

  if (eventType === "user.updated") {
    try {
      const userData = evt.data;
      
      await prisma.user.update({
        where: { id: userData.id },
        data: {
          username: userData.username || `user_${userData.id.slice(-8)}`,
          email: userData.email_addresses?.[0]?.email_address || '',
          displayName: userData.first_name && userData.last_name 
            ? `${userData.first_name} ${userData.last_name}`
            : userData.username || 'User',
          img: userData.image_url || null,
        },
      });
      
      console.log("User updated successfully:", userData.id);
      return new Response("User updated", { status: 200 });
    } catch (err) {
      console.error("Error updating user:", err);
      return new Response("Error: Failed to update user!", {
        status: 500,
      });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await prisma.user.delete({ 
        where: { id: evt.data.id } 
      });
      
      console.log("User deleted successfully:", evt.data.id);
      return new Response("User deleted", { status: 200 });
    } catch (err) {
      console.error("Error deleting user:", err);
      return new Response("Error: Failed to delete user!", {
        status: 500,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}