/**
 * Compares two arrays for equality.
 * @returns Whether the arrays are equal.
 */
export function arrayEquals<T>(a: T[] | null | undefined, b: T[] | null | undefined, options?: {strict?: boolean}): boolean {
	  if (a === b) return true;
	  if (!a || !b) return false;
	  if (a.length !== b.length) return false;
	  if (!options?.strict) {
		  const sortedA = [...a].sort();
		  const sortedB = [...b].sort();
		  if (arrayEquals(sortedA, sortedB, { strict: true })) return true;
	  }

	  for (let i = 0; i < a.length; i++) {
		  if (a[i] !== b[i]) return false;
	  }
	  return true;
}