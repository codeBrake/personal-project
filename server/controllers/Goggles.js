module.exports = {
    getGoggles: (req, res) => {
        let db = req.app.get('db')
        db.get_goggles().then(dbRes => {
            res.status(200).send(dbRes)
        }).catch(err => console.log(err))
    }
}