CREATE  TABLE `search_products` (
`product_id` INT NOT NULL ,
`name` VARCHAR(255) NULL ,
`description` TEXT NULL ,
`color` VARCHAR(255) NULL ,
`price` BIGINT(20) NULL ,
`material` VARCHAR(255) NULL ,
`occasion` VARCHAR(255) NULL ,
`product_type` VARCHAR(255) NULL ,
`dimension` VARCHAR(255) NULL ,
`gender` VARCHAR(255) NULL ,
`path` VARCHAR(255) NULL ,
`delivery_type` VARCHAR(255) NULL ,
INDEX search_product_id_index (product_id),
INDEX search_products_index (name,description(255), color, product_type)
);

