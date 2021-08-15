
const audioBarcodeReaded = new Audio('scanned.wav')

Quagga.init({
    inputStream: {
        name: "Live",
        type: 'LiveStream',
        target: document.getElementById('liveStream')
    },
    decoder: {
        readers: ["ean_reader"],
    }
}, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Initalization finished. Ready to start')
    Quagga.start()
})

Quagga.onDetected(data => {
    if (data) {
        if (data.codeResult) {
            audioBarcodeReaded.play()
            Quagga.stop()
            document.getElementById('liveStream').style = 'display: none;'
            document.getElementById('result').innerText =
                data.codeResult.code
            document.getElementById('json').textContent = 
                JSON.stringify(data.codeResult, undefined, 2)
            console.log('onDetected', data.codeResult)
        }
    }
})
