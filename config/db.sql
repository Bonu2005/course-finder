CREATE DATABASE course_finder;
DROP DATABASE course_finder;
use  course_finder;
DROP TABLE signincourse;
SHOW  TABLES ;

ALTER TABLE majority DROP COLUMN majorityId;

SELECT
    CONSTRAINT_NAME, TABLE_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
    COLUMN_NAME = 'majorityId' AND TABLE_NAME = 'majority';

SELECT * FROM majority;

SHOW INDEXES FROM signinCourse WHERE Column_name = 'centerId';

DROP INDEX majorityId ON majority;


ALTER TABLE signinCourse
ADD CONSTRAINT unique_user_majority_filial UNIQUE (userId, majorityId, filialId);

DESCRIBE majorityItem;



