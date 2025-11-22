import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail, generateUserUpdateEmail } from "@/lib/email";

interface SendEmailRequest {
  userIds?: string[];
  emails?: string[];
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendEmailRequest = await request.json();
    const { userIds, emails, subject, message } = body;

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required" },
        { status: 400 }
      );
    }

    let recipientEmails: string[] = [];


    if (userIds && userIds.length > 0) {
      const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { email: true, fullName: true },
      });
      recipientEmails = users.map((u: any) => u.email);
    }


    if (emails && emails.length > 0) {
      recipientEmails = [...recipientEmails, ...emails];
    }


    recipientEmails = [...new Set(recipientEmails)];

    if (recipientEmails.length === 0) {
      return NextResponse.json(
        { error: "No recipients specified" },
        { status: 400 }
      );
    }


    const sendResults = await Promise.allSettled(
      recipientEmails.map((email) =>
        sendEmail({
          to: email,
          subject,
          html: generateUserUpdateEmail("Valued Customer", subject, message),
        })
      )
    );

    const successful = sendResults.filter((r) => r.status === "fulfilled").length;
    const failed = sendResults.filter((r) => r.status === "rejected").length;

    return NextResponse.json(
      {
        message: "Emails sent",
        successful,
        failed,
        total: recipientEmails.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ADMIN_EMAIL_POST]", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
