const form = document.getElementById('subscribe_form');

async function sendData() {

  // Associate the FormData object with the form element
  const formData = new FormData(form);

  try {
    // Disable submit button.
    document.getElementById('subscribe_submit').disabled = true;

    const response = await fetch('https://neutroni.hayo.fi/~liftup/api/subscribe.php', {
      method: 'POST',
      // Set the FormData instance as the request body
      body: formData,
    });
    let result = await response.json();

    if (result.status === 400) {
      document.getElementById('subscribe_error').innerHTML = result.message;
      document.getElementById('subscribe_submit').disabled = false;
    }

    if (result.status === 200) {
      document.getElementById('subscribe').innerHTML = "<div id='subscribe_info'>" + result.message + "</div>";
    }

  } catch (e) {
    console.error(e);
  }

}

// Take over form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  sendData();
});
