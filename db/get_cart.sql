select * from cart c
join products on c.product_id = products.id
where c.user_id = $1
order by products.id;