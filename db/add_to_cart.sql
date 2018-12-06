insert into cart(user_id, product_id, quantity)
values ($1, $2, 1);

select * from cart
join products on cart.user_id = products.id

order by category