module.exports = {
    getProducts: (req, res) => {
        let db = req.app.get('db');
        db.get_products().then(dbRes => {
            res.status(200).send(dbRes)
        }).catch(err => console.error(err))
    },
    getProductDetails: (req, res) => {
        let {id} = req.params
        let db = req.app.get('db');
        db.get_product_details([id]).then(dbRes => {
            res.status(200).send(dbRes)
        }).catch(err => console.error(err))
    }
}