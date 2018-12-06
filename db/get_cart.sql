select * from cart
join products on cart.product_id = products.id
where cart.user_id = $1
order by products.id