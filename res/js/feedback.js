function previewForm() {
    var form = document.getElementById('form-feedback');
    var formData = new FormData(form);
    var preview = document.getElementById('preview-data');

    preview.innerHTML = '';

    formData.forEach(function(value, key) {

        if (key!="access_key"){

        var previewItem = document.createElement('div');
        var keyDivholder = document.createElement('div');
        var valueDivholder = document.createElement('div');

        previewItem.classList.add('preview-item');
        keyDivholder.classList.add('preview-key');
        valueDivholder.classList.add('preview-value');

        keyDivholder.textContent = key + ':';
        valueDivholder.textContent = value;

        previewItem.appendChild(keyDivholder);
        previewItem.appendChild(valueDivholder);
        preview.appendChild(previewItem);
    }});
    // preview.classList.remove('hidden');
    preview.style.display = 'block';
    return false;
    };

// https://web3forms.com/platforms/javascript-contact-form

const form = document.getElementById('form-feedback');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});