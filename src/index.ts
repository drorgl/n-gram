/**
 * Factory returning a function that converts a value string to n-grams.
 * @param from from number of characters
 * @param to to number of characters
 */
export default function nGram(from: number, to?: number) {
	if (typeof from !== "number" || isNaN(from) || from < 1 || from === Infinity) {
		throw new Error("`" + from + "` is not a valid argument for n-gram");
	}

	to = to || from;

	if (to < from) {
		throw new Error("to must be larger than from");
	}

	return grams;

	/**
	 * Create n-grams from a given value.
	 * @param value
	 */
	function grams(value?: string | string[]) {
		// const nGrams: string[] | string[][] = [];
		const nGrams = new Set<string | string[]>();

		if (value === null || value === undefined) {
			return Array.from(nGrams);
		}

		value = value.slice ? value : String(value);

		for (let i = from; i <= to; i++) {

			let index = value.length - i + 1;

			if (index < 1) {
				// return Array.from(nGrams);
				continue;
			}

			while (index--) {
				nGrams.add(value.slice(index, index + i) as any);
			}

		}

		return Array.from(nGrams);
	}
}

export let bigram = nGram(2);
export let trigram = nGram(3);
