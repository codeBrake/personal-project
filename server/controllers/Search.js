
module.exports = {
    
    searchProducts: async (req, res) => {
        try {
            let db = req.app.get('db')
            let { search } = req.query
            let products = await db.getProductsSearch([search, +search])
            if(!products[0]){
                return res.status(404).send('search not found')
            }
            res.send(products)
        } catch (error) {
            console.log(error)
            res.status(500).send(error, 'search not found')
        }
    }

}