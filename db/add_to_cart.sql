insert into cart(user_id, product_id, quantity)
values ($1, $2, 1);

select * from cart
join products on cart.product_id = products.id
where cart.user_id = $1
order by category 