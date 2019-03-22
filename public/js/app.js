
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one'); // Used for loading message and errors
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the browser from resetting the page!

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    // fetch is being used to retrieve JSON data clientside, which in taps into server-side JS which taps into external API
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    });
});






