'use strict';
import { html } from './view.js';
import { dictionarys } from './model.js';

document.body.appendChild(html);

// Обработка кликов на опциях
if (document.querySelector('.pass-generator__option-item')) {
	document.querySelectorAll('.pass-generator__option-item').forEach((el) => {
		el.addEventListener('click', function () {
			this.classList.toggle('pass-generator__option-item--active');
			dictionaryGenerator();
			updatePass();
		});
	});
}

// Формирование словаря в соответствии с опциями (кроме пробела)
function dictionaryGenerator() {
	let libSymArr = new Array();
	let optionsActive = document.querySelectorAll(
		'.pass-generator__option-item--active'
	);

	optionsActive.forEach((el) => {
		if (el.classList.contains('pass-generator__option-item--upper')) {
			libSymArr = libSymArr.concat(dictionarys.upp);
		}
		if (el.classList.contains('pass-generator__option-item--lower')) {
			libSymArr = libSymArr.concat(dictionarys.low());
		}
		if (el.classList.contains('pass-generator__option-item--num')) {
			libSymArr = libSymArr.concat(dictionarys.num);
		}
		if (el.classList.contains('pass-generator__option-item--char')) {
			libSymArr = libSymArr.concat(dictionarys.sym);
		}
	});

	return libSymArr;
}

// Получение длины пароля
function lengthPass() {
	return document.querySelector('.pass-generator__length-input').value;
}

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

// Попадает ли введённое в поле число в доступный диапазон
input.addEventListener('change', () => {
	if (input.getAttribute('min') && +input.value < +input.getAttribute('min')) {
		input.value = input.getAttribute('min');
	}
	if (input.getAttribute('max') && +input.value > +input.getAttribute('max')) {
		input.value = input.getAttribute('max');
	}
	updatePass();
});

// Обработка изменения ползунка
range.addEventListener('input', () => {
	synchronizeInputs(input, range);
});

// Синхронизация значений ползунка и поля для ввода
function synchronizeInputs(input1, input2) {
	input1.value = input2.value;
	updatePass();
}

// Генерация пароля. Принимает словарь (массив) и длину пароля (число)
function passGenerator(arr, length) {
	let result = '';

	arr.forEach(() => {
		if (result.length < length) {
			result += arr[Math.floor(Math.random() * arr.length)];
		}
	});

	return result;
}

// Обновление пароля
function updatePass() {
	let password = passGenerator(dictionaryGenerator(), lengthPass());

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

	document.querySelector('.pass-generator__result-pass').innerHTML = password;
	document.querySelector('.pass-generator__result-link').innerText =
		'Скопировать в буфер обмена';
	document
		.querySelector('.pass-generator__result-link')
		.classList.remove('pass-generator__result-link--copy');
}

// Копирование пароля
document
	.querySelector('.pass-generator__result')
	.addEventListener('click', function () {
		window.navigator.clipboard.writeText(
			document.querySelector('.pass-generator__result-pass').textContent
		);

		// Смена цвета
		this.querySelector('.pass-generator__result-link').classList.add(
			'pass-generator__result-link--copy'
		);

		// Замена текста
		this.querySelector('.pass-generator__result-link').innerText =
			'Пароль скопирован в буфер обмена';
	});

updatePass();
