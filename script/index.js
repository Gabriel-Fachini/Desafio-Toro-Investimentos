async function getContent(){
    try {
        const response = await fetch('http://localhost:3456/')
        console.log("Conectado com sucesso!")
    } catch (error) {
        console.log(error)
    }
}

getContent()