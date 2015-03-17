CREATE  TABLE `curation_newin` (
`tag_id` INT NOT NULL ,
`sale_id` INT,
`sale_position` INT,
`tag_position` INT,
INDEX curation_newin_ids (tag_id, sale_id)
);
