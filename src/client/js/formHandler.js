function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    console.log(formText);
    if (Client.checkForName(formText)==true){
        fetch('http://localhost:8081/results',{
        mode: 'no-cors', // 'cors' by default
         method: "POST",
         credentials: "same-origin",
         headers: {
            'Content-Type': "application/json",
            'Access-Control-Allow-Origin': '*'
         },
         body: JSON.stringify({url:formText})
     })
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('polarity').innerHTML = res.polarity
        document.getElementById('subjectivity').innerHTML = res.subjectivity
        document.getElementById('polar-conf').innerHTML = res.polarity_confidence
        document.getElementById('subj-conf').innerHTML = res.subjectivity_confidence
    })
}
else {
    alert("URL not in correct format")
    console.log("Bad URL")
}

}

export { handleSubmit }
