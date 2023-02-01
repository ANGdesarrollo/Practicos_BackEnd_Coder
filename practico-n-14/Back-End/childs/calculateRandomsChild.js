process.on("message", (msg) => {
    console.log(msg)
    if(msg.message === "start") {
        const numbers = {}
        for( let i = 0; i < msg.qty; i++ ) {
            const tempNum = Math.floor( Math.random() * 20 )
            numbers[ tempNum ] = numbers[ tempNum ] ? numbers[ tempNum ] + 1 : 1
        }
        process.send(numbers);
    }

})


