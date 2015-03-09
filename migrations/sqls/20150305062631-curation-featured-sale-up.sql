CREATE  TABLE `curation_featured_sale` (
`tag_id` INT NOT NULL ,
`sale_id` INT NOT NULL ,
`sale_position` INT NOT NULL ,
INDEX curation_featured_sale_ids (tag_id, sale_id));
