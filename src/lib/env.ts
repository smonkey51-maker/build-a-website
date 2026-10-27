import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  GEMINI_API_KEY: z.string().min(1).optional(),
});

export type Env = z.infer<typeof serverSchema>;

/**
 * Valida le variabili d'ambiente lato server.
 * Un valore non valido fa fallire il build o l'avvio, non il runtime.
 */
export function parseEnv(
  source: Record<string, string | undefined> = process.env,
): Env {
  const result = serverSchema.safeParse(source);
  if (!result.success) {
    throw new Error(`Variabili d'ambiente non valide: ${result.error.message}`);
  }
  return result.data;
}
