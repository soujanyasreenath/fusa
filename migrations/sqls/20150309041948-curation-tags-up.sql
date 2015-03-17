CREATE  TABLE `curation_tags` (
`tag_id` INT NOT NULL ,
`parent_tag_id` INT,
`tag_position` INT NOT NULL ,
INDEX curation_parent_tag_id (parent_tag_id));