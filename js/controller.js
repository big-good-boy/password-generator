'use strict';
import * as view from './view.js';
import { dictionary, optionsPassword } from './model.js';

// Формирование словаря в соответствии с опциями (кроме пробела)
const dictionaryGenerator = () => {
	let libSymArr = new Array();
	if (optionsPassword.upperCase) {
		libSymArr = libSymArr.concat(dictionary.upp);
	}
	if (optionsPassword.lowerCase) {
		libSymArr = libSymArr.concat(dictionary.low());
	}
	if (optionsPassword.numbers) {
		libSymArr = libSymArr.concat(dictionary.num);
	}
	if (optionsPassword.symbols) {
		libSymArr = libSymArr.concat(dictionary.sym);
	}

	return libSymArr;
};

// Генерация пароля. Принимает словарь (массив) и длину пароля (число)
const passGenerator = (arr, length) => {
	let result = '';

	arr.forEach(() => {
		if (result.length < length) {
			result += arr[Math.floor(Math.random() * arr.length)];
		}
	});

	return result;
};

// Изменение длины пароля
const input = document.querySelector('.pass-generator__length-input');
const range = document.querySelector('.pass-generator__length-range');
// Обработка нажатий на + и -
document.querySelectorAll('.pass-generator__length-num').forEach((el) => {
	el.addEventListener('click', function () {
		if (this.classList.contains('pass-generator__length-num--less')) {
			if (+input.value > +input.getAttribute('min')) {
				--input.value;
				synchronizeInputs(range, input);
			}
		}
		if (this.classList.contains('pass-generator__length-num--more')) {
			if (+input.value < +input.getAttribute('max')) {
				++input.value;
				synchronizeInputs(range, input);
			}
		}
	});
});
// Обработка изменения поля для ввода
input.addEventListener('change', () => {
	synchronizeInputs(range, input);
});
// Обработка изменения ползунка
range.addEventListener('input', () => {
	synchronizeInputs(input, range);
});
// Синхронизация значений ползунка и поля для ввода
function synchronizeInputs(input1, input2) {
	if (
		+input2.value >= +input1.getAttribute('min') &&
		+input2.value <= +input1.getAttribute('max')
	) {
		input1.value = input2.value;
		optionsPassword.length = document.querySelector(
			'.pass-generator__length-input'
		).value;
		document.querySelector('.pass-generator__result-pass').innerText =
			view.updatePass();
	} else {
		if (+input2.value < +input1.getAttribute('min')) {
			document.querySelector(
				'.pass-generator__length-error'
			).innerHTML = `Минимальная длина пароля ${+input1.getAttribute(
				'min'
			)} символов`;
		}
		if (+input2.value > +input1.getAttribute('max')) {
			document.querySelector(
				'.pass-generator__length-error'
			).innerHTML = `Максимальная длина пароля ${+input1.getAttribute(
				'max'
			)} символа`;
			document
				.querySelector('.pass-generator__length-error')
				.classList.add('pass-generator__length-error--visible');
		}
		document
			.querySelector('.pass-generator__length-error')
			.classList.add('pass-generator__length-error--visible');
		setTimeout(() => {
			document
				.querySelector('.pass-generator__length-error')
				.classList.remove('pass-generator__length-error--visible');
		}, 3000);
	}
}

// Изменение опций
document.querySelectorAll('.pass-generator__option-item').forEach((option) => {
	option.addEventListener('click', () => {
		if (option.classList.contains('pass-generator__option-item--active')) {
			option.classList.remove('pass-generator__option-item--active');
			switch (true) {
				case option.classList.contains('pass-generator__option-item--upper'):
					optionsPassword.upperCase = false;
					break;
				case option.classList.contains('pass-generator__option-item--lower'):
					optionsPassword.lowerCase = false;
					break;
				case option.classList.contains('pass-generator__option-item--num'):
					optionsPassword.numbers = false;
					break;
				case option.classList.contains('pass-generator__option-item--char'):
					optionsPassword.symbols = false;
			}
		} else {
			option.classList.add('pass-generator__option-item--active');
			switch (true) {
				case option.classList.contains('pass-generator__option-item--upper'):
					optionsPassword.upperCase = true;
					break;
				case option.classList.contains('pass-generator__option-item--lower'):
					optionsPassword.lowerCase = true;
					break;
				case option.classList.contains('pass-generator__option-item--num'):
					optionsPassword.numbers = true;
					break;
				case option.classList.contains('pass-generator__option-item--char'):
					optionsPassword.symbols = true;
			}
		}
		let password = view.updatePass();

		// Добавление пробела
		if (
			document.querySelector(
				'.pass-generator__option-item--white.pass-generator__option-item--active'
			)
		) {
			password = password.split('');
			password[Math.floor(Math.random() * (password.length - 2) + 1)] = ' ';
			password = password.join('');
		}
		document.querySelector('.pass-generator__result-pass').innerText = password;
	});
});

export { dictionaryGenerator, passGenerator };
