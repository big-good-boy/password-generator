'use strict';
import * as view from './view.js';

view.initializing();
document.querySelector('.pass-generator__result-pass').innerText =
	view.updatePass();
