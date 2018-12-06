module.exports = {
    getBindings: (req, res) => {
        let db = req.app.get('db')
        db.get_bindings().then(dbRes => {
            res.status(200).send(dbRes)
        }).catch(err => console.log(err))
    }
}