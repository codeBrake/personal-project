select *
from products
where lower(brand) = lower($1) 
or model = $1
or lower(category) = lower($1)
or size = $2

