
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(data : Request) {
  try {
    const resend = new Resend('re_NHrZ6SDJ_6WNnUUA7gv18RuVv36cCkm7a');

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'vefkraft@vefkraft.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}


