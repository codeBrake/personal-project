delete from cart
where product_id = $1;

select * from cart
join products on cart.product_id = products.id
order by products.id