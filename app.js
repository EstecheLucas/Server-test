const express = require("express")
const app = express()
const data = require("./database.json")

app.use(express.json())

app.listen(3000, () => {
    console.log("El servidor esta corriendo en el puerto 3000")
})

app.get("/", (req, res) => {
    res.json(data)
})

app.get("/:id", (req, res) => {
    const id = req.params.id
    res.json(data[id - 1])
})

app.post("/", (req, res) => {
    const { id, name } = req.body
    data.push({ id, name })
    res.json({ messege: "Se agrego correctamente" })


})


app.put("/:id", (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const index = data.findIndex(item => item.id == id)
    if (index !== -1) {
        data[index] = { id, name }
        res.json({ messege: "Se actualizo correctamente" })
    } else {
        res.json({ messege: "No se pudo actualizar" })
    }

})


   
    app.delete("/:id", (req, res) => {
        const { id } = req.params
        const index = data.findIndex(item => item.id == id)
        if (index !== -1) {
            data.splice(index,1)
            res.json({ messege: "Se elimino correctamente" })
        } else {
            res.json({ messege: "No se pudo eliminar" })
        }
    
    })

