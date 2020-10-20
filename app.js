const express = require('express')
const exhbs = require('express-handlebars');
const products = require('./products.json');
const PORT = process.env.PORT || 4444;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.engine('hbs', exhbs({
    extname: 'hbs'
}))
 
app.get('/', (req, res) => {
    res.render('home')
});

app.get('/about', (req, res) => {
    res.render('about', { cssFilename: 'about', pageTitle: 'About us'})
});

app.get('/products', (req, res) => {
    res.render('products', {products, cssFilename: 'products', pageTitle: 'Our products'})
});

app.get('/product/:productId', (req, res) => {
    console.log(req.params);
    const product = products.find(p => p.id === req.params.productId);
    res.render('product', { product });
})

app.listen(PORT, () => {
    console.log(`application server is running on port ${PORT}`)
});