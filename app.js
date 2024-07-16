document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictionForm');
    const resultsContainer = document.getElementById('results');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');

        // Clear previous errors
        resultsContainer.innerHTML = '';
        
        // Validate inputs
        let isValid = true;

        if (nameInput.value.trim() === '') {
            displayError('Name cannot be empty');
            isValid = false;
        }

        if (!isValidEmail(emailInput.value)) {
            displayError('Please enter a valid email address');
            isValid = false;
        }

        if (isValid) {
            try {
                // Fetch age prediction
                const response = await fetch(`https://api.agify.io?name=${nameInput.value}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                displayResult(data.age);
            } catch (error) {
                displayError('Failed to fetch age prediction');
            }
        }
    });

    function isValidEmail(email) {
        // Very basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function displayError(message) {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error');
        errorElement.textContent = message;
        resultsContainer.appendChild(errorElement);
    }

    function displayResult(age) {
        const resultElement = document.createElement('p');
        resultElement.textContent = `Predicted age: ${age}`;
        resultsContainer.appendChild(resultElement);
    }
});
