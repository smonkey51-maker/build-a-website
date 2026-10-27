import { NextResponse } from "next/server";

/**
 * Placeholder: l'assistente AI non è ancora collegato.
 * Quando sarà pronto, chiamare Gemini qui lato server (GEMINI_API_KEY non deve mai arrivare al client).
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    message?: unknown;
  } | null;
  if (!body || typeof body.message !== "string" || body.message.length > 2000) {
    return NextResponse.json(
      { error: "Messaggio non valido." },
      { status: 400 },
    );
  }
  return NextResponse.json({
    reply: "Assistente in arrivo. Questa funzione è un segnaposto.",
    placeholder: true,
  });
}
