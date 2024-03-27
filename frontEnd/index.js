document.querySelector('#calculateButton').addEventListener('click', (event) => {
    event.preventDefault();
    const num1Input = document.querySelector('input[name="num1"]').value;
    const num2Input = document.querySelector('input[name="num2"]').value;
    const operator = document.querySelector('select[name="operator"]').value;
    const data = {
        "num1": num1Input,
        "num2": num2Input,
    };

    let apiUrl = `http://localhost:8080/${operator}`;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Unknown Error');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        document.getElementById('result').textContent = data.result;
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(error.message); 
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var operatorSelect = document.querySelector('select[name="operator"]');
    var num2Input = document.querySelector('input[name="num2"]');

    operatorSelect.addEventListener('change', function() {
        if (this.value === 'squareroot') {
            num2Input.disabled = true;
            num2Input.value = 'None'; 
        } else {
            num2Input.disabled = false;
        }
    });
});
