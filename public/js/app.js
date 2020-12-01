const weatherSearch = (address) => {
    const msg1 = document.querySelector('#msg-1')
    const msg2 = document.querySelector('#msg-2')
    const url = '/weather?address=' + address
    msg1.textContent = 'Finding the forecat'
    msg2.textContent = ''
    fetch(url).then(response => {
        response.json().then(data => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                let { location, forecast } = data
                msg1.textContent = location
                msg2.textContent = forecast
            }
        })
    })
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    weatherSearch(document.querySelector('input').value)
})
