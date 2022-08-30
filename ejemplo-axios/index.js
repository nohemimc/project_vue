
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    axios
        .post("http://192.168.1.71:5000/files/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log('Respuesta', res);
        })
        .catch((err) => {
            console.log('Error', err);
        });
});
