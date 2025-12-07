/**
 * Batch Processing Utility
 *
 * Utility condivisa per batch processing parallelo:
 * - Processa items in batch
 * - Esegue batch in gruppi paralleli per evitare rate limiting
 * - Aggiorna stato incrementale (es. existing names per duplicate prevention)
 *
 * Principi: KISS, SOLID (Single Responsibility), DRY
 */

/**
 * Opzioni per batch processing
 */
export interface BatchProcessingOptions<TItem, TResult> {
  /** Items da processare */
  items: TItem[];
  /** Dimensione di ogni batch */
  batchSize: number;
  /** Numero di batch da processare in parallelo (default: 2) */
  parallelGroups?: number;
  /** Funzione per processare un singolo batch */
  processor: (batch: TItem[], batchIndex: number) => Promise<TResult[]>;
  /** Funzione opzionale per aggiornare stato dopo ogni gruppo (es. existing names) */
  onGroupComplete?: (results: TResult[], state: unknown) => void;
  /** Stato iniziale opzionale (es. existing names array) */
  initialState?: unknown;
}

/**
 * Processa items in batch con esecuzione parallela controllata
 *
 * @param options Opzioni di batch processing
 * @returns Array di tutti i risultati
 */
export async function processBatchesInParallel<TItem, TResult>(
  options: BatchProcessingOptions<TItem, TResult>
): Promise<TResult[]> {
  const {
    items,
    batchSize,
    parallelGroups = 2,
    processor,
    onGroupComplete,
    initialState,
  } = options;

  const batches = Math.ceil(items.length / batchSize);
  const allResults: TResult[] = [];
  const state = initialState;

  // Process batches in parallel groups
  for (let groupStart = 0; groupStart < batches; groupStart += parallelGroups) {
    const batchGroup: Promise<TResult[]>[] = [];

    for (let i = groupStart; i < Math.min(groupStart + parallelGroups, batches); i++) {
      const batchStart = i * batchSize;
      const batchEnd = Math.min(batchStart + batchSize, items.length);
      const batch = items.slice(batchStart, batchEnd);

      if (batch.length === 0) continue;

      batchGroup.push(
        processor(batch, i).catch((error: unknown) => {
          // Log error but return empty array to continue processing
          console.error(`[BatchProcessing] Error processing batch ${i}:`, error);
          return [] as TResult[];
        })
      );
    }

    // Wait for all batches in this group to complete
    const groupResults = await Promise.all(batchGroup);
    const flatResults = groupResults.flat();

    // Update state after group completes (avoid race conditions)
    if (onGroupComplete && state !== undefined) {
      onGroupComplete(flatResults, state);
    }

    allResults.push(...flatResults);
  }

  return allResults;
}
