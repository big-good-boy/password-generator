'use strict';
import * as controller from './controller.js';
import { optionsPassword } from './model.js';

// Инициализация настроек
const initializing = () => {
	document.querySelector('.pass-generator__length-range').value =
		document.querySelector('.pass-generator__length-input').value =
			optionsPassword.length;
	if (optionsPassword.upperCase)
		document
			.querySelector('.pass-generator__option-item--upper')
			.classList.add('pass-generator__option-item--active');
	if (optionsPassword.lowerCase)
		document
			.querySelector('.pass-generator__option-item--lower')
			.classList.add('pass-generator__option-item--active');
	if (optionsPassword.numbers)
		document
			.querySelector('.pass-generator__option-item--num')
			.classList.add('pass-generator__option-item--active');
	if (optionsPassword.symbols)
		document
			.querySelector('.pass-generator__option-item--char')
			.classList.add('pass-generator__option-item--active');
};

// Обновление пароля
const updatePass = () => {
	const password = controller.passGenerator(
		controller.dictionaryGenerator(),
		optionsPassword.length
	);
	document.querySelector('.pass-generator__result-pass').innerText = password;
};

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

export { initializing, updatePass };
