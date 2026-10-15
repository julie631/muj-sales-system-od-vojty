/**
 * Jediné místo, kde se Sales Coach přizpůsobuje konkrétnímu člověku.
 * Všechno ostatní (hovory, roleplaye, vzorce) se čte ze složky data/sales-coach/.
 */
export const CONFIG = {
  /** Jméno do hlavičky pod „Sales Coach". Prázdné = nic. */
  ownerName: "",

  /**
   * Jak se v přepisech jmenuje obchodník (stačí část jména, nezáleží na velikosti).
   * Jeho repliky se v přepisu zvýrazní barvou.
   */
  repNames: ["obchodník", "obchodnice", "prodejce", "prodejkyně"],

  /**
   * Volitelné hezčí názvy linií. Linie = podsložka v data/sales-coach/transcripts/.
   * Když tu linie chybí, zobrazí se název složky.
   */
  linieLabels: {
    salony: "Salony",
    b2b: "B2B",
  } as Record<string, string>,
};

export function linieLabel(linie: string): string {
  return CONFIG.linieLabels[linie] || linie;
}
