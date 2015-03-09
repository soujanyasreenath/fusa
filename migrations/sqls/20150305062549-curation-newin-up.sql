CREATE  TABLE `curation_newin` (
`tag_id` INT NOT NULL ,
`sale_id` INT NOT NULL ,
`sale_position` INT NOT NULL ,
`tag_position` INT NOT NULL,
INDEX curation_newin_ids (tag_id, sale_id)
);
