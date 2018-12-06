delete from cart;

select * from cart
join products on cart.product_id = products.id
order by products.id