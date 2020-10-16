const simple = {
	0: "zero",
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	5: "five",
	6: "six",
	7: "seven",
	8: "eight",
	9: "nine"
}

function numberArr(item) {
	let arr = [];
	if (item < 21) {
		arr.push(item);
		return arr;
	}

	function deleteNulls(item) {
		let result = [];
		if (item.length > 1) {
			item.forEach(elem => {
				if (elem != 0) {
					result.push(elem);
				}
			})
		}
		return result;
	}

	function cutNumber(item) {

		let x = '';
		let xArr = [];
		console.log(item);

		for (let i = item.length - 1; i >= 0; i--) {
			xArr.push(`${item[i]}${x}`);
			x += '0';
		}
		return deleteNulls(xArr);
	}

	let itemArr = Array.from(item.toString());
	let result = cutNumber(itemArr);
	for (let i = result.length - 1; i >= 0; i--) {
		arr.push(+result[i])
	}

	return arr;
}

//0-9
function simpleNumber(item) {
	for (let key in simple) {
		if (+key === item) {
			console.log(item.toString())
			return simple[key]
		}
	}
}
//</>

//10-19 (+ 'teen')
function derivedNumbers(item) {
	let number = item.toString()[1];
	let result;
	for (let key in simple) {
		if (+key === +number) {
			result = simple[key] + 'teen';
		}
	}

	console.log(result)

	if (result === 'fiveteen') {
		return result = 'fifteen';
	} else if (result === 'eightteen') {
		return result = 'eighteen';
	} else if (result === 'threeteen') {
		return result = 'thirteen';
	} else if (result === 'twoteen') {
		return result = 'twelve';
	} else if (result === 'oneteen') {
		return result = 'eleven';
	} else if (result === 'zeroteen') {
		return result = 'ten';
	} else {
		return result;
	}

}
//</>

//20-90 (20 30 40 50 60 ....) (+ 'ty')
function derivedMoreNumbers(item) {
	let number = item.toString()[0];

	let result;
	if (+item.toString()[1] === 0 && +item.toString()[0] != 1) {
		for (let key in simple) {
			if (+key === +number) {
				result = simple[key] + 'ty';
			}
		}

		if (result === 'fivety') {
			return result = 'fifty';
		} else if (result === 'eightty') {
			return result = 'eighty';
		} else if (result === 'threety') {
			return result = "thirty"
		} else if (result === 'twoty') {
			return result = "twenty"
		} else if (result === 'fourty') {
			return result = "forty"
		} else {
			return result;
		}
	}
}
//</>

function numberOfZeros(item) {
	let number = "";
	console.log(item);
	switch (item.toString().length) {
		case 1:
			return simpleNumber(item);

		case 2:
			if (derivedMoreNumbers(item)) {
				return derivedMoreNumbers(item);
			} else {
				return derivedNumbers(item);
			}

		case 3:
			return `${simpleNumber(+item.toString()[0])} hundred`;

		case 4:
			return `${simpleNumber(+item.toString()[0])} thousand`;

		case 5:
			number += `${item.toString()[0]}${item.toString()[1]}`;
			return `${derivedMoreNumbers(number)} thousand`;
	}
}

module.exports = function toReadable(number) {
	let result = "";
	let num = numberArr(number);
	console.log(num);

	if (num.length === 1 && number < 100) {
		if (number < 10) result += simpleNumber(num[0]);
		if (number >= 10 && number < 20) result += derivedNumbers(num[0]);
		if (num.toString()[1] === '0' && num.toString()[0] != 1) result = derivedMoreNumbers(num[0]);
	} else {
		num.forEach((elem, i) => {
			if (elem === 10 && num.length > 2) {
				elem += num[i + 1];
				num.splice(i + 1, 1);
			}
			console.log(elem);
			result += `${numberOfZeros(elem)} `;
		})
	}

	return result.trim();
}


