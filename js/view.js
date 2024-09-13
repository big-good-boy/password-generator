'use strict';

export const html = document.createElement('div');
html.className = 'pass-generator';
html.innerHTML = `
<div class="pass-generator__wrapper">
	<div class="pass-generator__length">
		<div class="pass-generator__length-top">
			<span class="pass-generator__length-text">Длина пароля:</span>
			<span class="pass-generator__length-wrap">
				<span
					class="pass-generator__length-num pass-generator__length-num--less"
					>-</span
				>
				<input
					class="pass-generator__length-input"
					type="number"
					value="8"
					min="6"
					max="24"
				/>
				<span
					class="pass-generator__length-num pass-generator__length-num--more"
					>+</span
				>
			</span>
			<span class="pass-generator__length-text">символов</span>
		</div>
		<input
			class="pass-generator__length-range"
			type="range"
			min="6"
			max="24"
			value="8"
		/>
	</div>

	<div class="pass-generator__result">
		<span class="pass-generator__result-pass">00000000</span>
		<span class="pass-generator__result-link"
			>Скопировать в буфер обмена</span
		>
	</div>

	<ul class="pass-generator__option">
		<li
			class="pass-generator__option-item pass-generator__option-item--active pass-generator__option-item--upper"
		>
			Верхний регистр
		</li>
		<li
			class="pass-generator__option-item pass-generator__option-item--active pass-generator__option-item--lower"
		>
			Нижний регистр
		</li>
		<li
			class="pass-generator__option-item pass-generator__option-item--active pass-generator__option-item--num"
		>
			Цифры
		</li>
		<li
			class="pass-generator__option-item pass-generator__option-item--char"
		>
			Символы
			<span
				class="pass-generator__option-info"
				data-title="! # $ % & ( ) * + . / : ; = > ? @ [ \ ] ^ \` { | } ~ ' - < _ >"
			></span>
		</li>
		<li
			class="pass-generator__option-item pass-generator__option-item--white"
		>
			Пробел
		</li>
	</ul>
</div>
`;
