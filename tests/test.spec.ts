import { expect } from "chai";
import "mocha";

import nGram from "../src/index";

describe("nGram", () => {
	const fixtures = {
		"`0`": 0,
		"negative numbers": -1,
		"negative numbers (2)": -Infinity,
		"non-numbers": true,
		"non-numbers (2)": "5",
		"non-numbers (3)": NaN,
		"`Infinity`": Infinity
	};

	Object.keys(fixtures).forEach((name) => {
		const value = (fixtures as any)[name];

		it("should fail when given " + name, () => {
			expect(() => nGram(value)).to.throw("is not a valid argument");
		});
		// t.throws(
		// 	() => {

		// 	},
		// 	new RegExp("^Error: `" + value + "` is not a valid argument for n-gram$"),
		//
		// );
	});

	describe("nGram(1) # unigram", () => {
		const unigrams = nGram(1);

		const values = {
			"`0`": [0, "0"],
			"negative numbers": [-1, "-", "1"],
			"non-numbers": [true, "t", "r", "u", "e"],
			"non-numbers (2)": ["5", "5"],
			"non-numbers (3)": [NaN, "N", "a", "N"],
			"`Infinity`": [Infinity, "I", "n", "f", "i", "n", "i", "t", "y"]
		};

		it("should return strings", () => {
			Object.keys(values).forEach((name) => {
				const value = (values as any)[name];
				expect(unigrams(value[0])).to.include.members(value.slice(1));
			});
		});

		it("should be a function", () => {
			expect(typeof unigrams).to.eq("function");
		});

		it("should return an Array", () => {
			expect(Array.isArray(unigrams())).to.eq(true);
		});

		it("should return strings", () => {
			expect(unigrams("test")).to.include.members(["t", "e", "s", "t"]);
		});

		it("should return no n-grams when no value is given", () => {
			expect(unigrams()).to.deep.eq([]);
		});

		it("should return one n-gram when one character is given", () => {
			expect(unigrams("a")).to.deep.eq(["a"]);
		});

		it("should return two n-grams when two characters are given", () => {
			expect(unigrams("ab")).to.include.members(["a", "b"]);
		});

		it("should support an array", () => {
			expect(unigrams(["alpha", "bravo", "charlie"])).to.deep.eq([["charlie"], ["bravo"], ["alpha"]]);
		});

		it("should return no n-grams when an empty array is given", () => {
			expect(unigrams([])).to.deep.eq([]);
		});

		it("should return one n-gram when an array with one value is given", () => {
			expect(unigrams(["alpha"])).to.deep.eq([["alpha"]]);
		});

		it("should return two n-grams when an array with two values is given", () => {
			expect(unigrams(["alpha", "bravo"])).to.deep.eq([["bravo"], ["alpha"]]);
		});

	});

	describe("nGram(2) # bigram", () => {
		const bigrams = nGram(2);

		it("should be a function", () => {
			expect(typeof bigrams).to.eq("function");
		});

		it("should return an Array", () => {
			expect(Array.isArray(bigrams())).to.eq(true);
		});

		it("should return strings", () => {
			expect(bigrams("test")).to.include.members(["te", "es", "st"]);
		});

		it("should return no n-grams when no value is given", () => {
			expect(bigrams()).to.deep.eq([]);
		});

		it("should return no n-grams when one character is given", () => {
			expect(bigrams("a")).to.deep.eq([]);
		});

		it("should return one n-gram when two characters are given", () => {
			expect(bigrams("ab")).to.deep.eq(["ab"]);
		});

		it("should support an array", () => {
			expect(bigrams(["alpha", "bravo", "charlie"])).to.deep.eq([["bravo", "charlie"], ["alpha", "bravo"]]);
		});

		it("should return no n-grams when an empty array is given", () => {
			expect(bigrams([])).to.deep.eq([]);
		});

		it("should return no n-grams when an array with one value is given", () => {
			expect(bigrams(["alpha"])).to.deep.eq([]);
		});

		it("should return one n-gram when an array with two values is given", () => {
			expect(bigrams(["alpha", "bravo"])).to.deep.eq([["alpha", "bravo"]]);
		});

	});

	describe("nGram(3) # trigram", () => {
		const trigrams = nGram(3);

		it("should be a function", () => {
			expect(typeof trigrams).to.eq("function");
		});

		it("should return an Array", () => {
			expect(Array.isArray(trigrams())).to.eq(true);
		});

		it("should return strings", () => {
			expect(trigrams("test")).to.deep.eq(["est", "tes"]);
		});

		it("should return no n-grams when no value is given", () => {
			expect(trigrams()).to.deep.eq([]);
		});

		it("should return no n-grams when one character is given", () => {
			expect(trigrams("a")).to.deep.eq([]);
		});

		it("should return no n-grams when two characters are given", () => {
			expect(trigrams("ab")).to.deep.eq([]);
		});

		it("should return one n-gram when three characters are given", () => {
			expect(trigrams("abc")).to.deep.eq(["abc"]);
		});

		it("should support an array", () => {
			expect(trigrams(["alpha", "bravo", "charlie", "delta"]))
				.to.deep.eq([["bravo", "charlie", "delta"], ["alpha", "bravo", "charlie"]]);
		});

		it("should return no n-grams when an empty array is given", () => {
			expect(trigrams([])).to.deep.eq([]);
		});

		it("should return no n-grams when an array with one value is given", () => {
			expect(trigrams(["alpha"])).to.deep.eq([]);
		});

		it("should return no n-grams when an array with two values is given", () => {
			expect(trigrams(["alpha", "bravo"])).to.deep.eq([]);
		});

		it("should return one n-gram when an array with three values is given", () => {
			expect(trigrams(["alpha", "bravo", "charlie"])).to.deep.eq([["alpha", "bravo", "charlie"]]);
		});
	});

	describe("nGram(10) # decagram", () => {
		const decagrams = nGram(10);
		const values = [
			"alpha",
			"bravo",
			"charlie",
			"delta",
			"echo",
			"foxtrot",
			"golf",
			"hotel",
			"india",
			"juliette",
			"kilo"
		];

		it("should be a function", () => {
			expect(typeof decagrams).to.eq("function");
		});

		it("should return an Array", () => {
			expect(Array.isArray(decagrams())).to.eq(true);
		});

		it("should return strings", () => {
			expect(decagrams("testtesttest")).to.deep.eq(["sttesttest", "esttesttes", "testtestte"]);
		});

		it("should return no n-grams when no value is given", () => {
			expect(decagrams()).to.deep.eq([]);
		});

		it("should return no n-grams when nine characters are given", () => {
			expect(decagrams("testtestt")).to.deep.eq([]);
		});

		it("should return one n-gram when ten characters are given", () => {
			expect(decagrams("testtestte")).to.deep.eq(["testtestte"]);
		});

		it("should return arrays of strings", () => {
			expect(decagrams(values)).to.deep.eq([values.slice(0, 10), values.slice(1, 11)].reverse());
		});

		it("should return no n-grams when an empty array is given", () => {
			expect(decagrams([])).to.deep.eq([]);
		});

		it("should return no n-grams when an array with one value is given", () => {
			expect(decagrams(["alpha"])).to.deep.eq([]);
		});

		it("should return no n-grams when an array with nine values is given", () => {
			expect(decagrams(values.slice(0, 9))).to.deep.eq([]);
		});

		it("should return one n-gram when an array with ten values is given", () => {
			expect(decagrams(values.slice(0, 10))).to.deep.eq([values.slice(0, 10)]);
		});

	});

	describe("nGram range (1-10)", () => {
		const muligrams = nGram(1, 10);
		const values = [
			"alpha",
			"bravo",
			"charlie",
			"delta",
			"echo",
			"foxtrot",
			"golf",
			"hotel",
			"india",
			"juliette",
			"kilo"
		];

		it("should be a function", () => {
			expect(typeof muligrams).to.eq("function");
		});

		it("should return an Array", () => {
			expect(Array.isArray(muligrams())).to.eq(true);
		});

		it("should return strings", () => {
			expect(muligrams("testtesttest"))
				.to.deep.eq(
					["t", "s", "e",
						"st", "es", "te", "tt",
						"est", "tes", "tte", "stt",
						"test", "ttes", "stte", "estt",
						"ttest", "sttes", "estte", "testt",
						"sttest", "esttes", "testte", "ttestt",
						"esttest", "testtes", "ttestte", "sttestt",
						"testtest", "ttesttes", "sttestte", "esttestt",
						"ttesttest", "sttesttes", "esttestte", "testtestt",
						"sttesttest", "esttesttes", "testtestte"]);
		});

		it("should return no n-grams when no value is given", () => {
			expect(muligrams()).to.deep.eq([]);
		});

		it("should return no n-grams when an empty array is given", () => {
			expect(muligrams([])).to.deep.eq([]);
		});
	});

});
