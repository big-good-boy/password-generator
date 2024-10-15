'use strict';

// Настройки по умолчанию
export const optionsPassword = {
	length: 8, // Длина пароля
	upperCase: true, // Верхний регистр
	lowerCase: true, // Нижний регистр
	numbers: true, // Цифры
	symbols: false, // Символы
	whitespace: false, // Пробел
};

// Словари
export const dictionary = {
	upp: [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
	],
	num: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
	sym: [
		'!',
		'#',
		'$',
		'%',
		'&',
		'(',
		')',
		'*',
		'+',
		'.',
		'/',
		':',
		';',
		'=',
		'>',
		'?',
		'@',
		'[',
		'\\',
		']',
		'^',
		'`',
		'{',
		'|',
		'}',
		'~',
		"'",
		'-',
		'<',
		'_',
		'>',
	],
	low() {
		return this.upp.map((el) => el.toLowerCase());
	},
};
