/**
 * Fallback copy if async copy is not available.
 *
 * @param {String} text
 */
function fallbackCopyTextToClipboard(text) {
	const textArea = document.createElement('textarea');
	textArea.value = text;
	textArea.setAttribute('readonly', '');
	textArea.style.position = 'absolute';
	textArea.style.left = '-9999px';
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		const successful = document.execCommand('copy');
		const msg = successful ? 'successful' : 'unsuccessful';
		console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
}

/**
 * Async copy.
 *
 * @param {String} text
 */
function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}

	navigator.clipboard.writeText(text).then(
		function() {
			console.log('Async: Copying to clipboard was successful!');
		},
		function(err) {
			console.error('Async: Could not copy text: ', err);
			fallbackCopyTextToClipboard(text);
		}
	);
}

// Create account button.
const btn = document.querySelector('.create-account');

// Copy the command on register.
btn.addEventListener('click', e => {
	const user = {
		cloudName: document.querySelector('.cloud_name_value').innerText,
		email: document.querySelector('#user_email').value,
	};

	// Add to local storage.
	window.localStorage.setItem('user', JSON.stringify(user));

	// Put that in a command.
	// const command = `yarn new --name ${user.cloudName} --email ${user.email}`;
	const command = `yarn new ${user.cloudName}`;

	// Add to local storage.
	window.localStorage.setItem('command', JSON.stringify(command));

	// Copy the CLI command.
	copyTextToClipboard(command);
});
