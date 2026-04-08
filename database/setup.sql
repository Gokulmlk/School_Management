-- 1. Create database
CREATE DATABASE IF NOT EXISTS school_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 2. Use it
USE school_management;

-- 3. Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id          INT           NOT NULL AUTO_INCREMENT,
  name        VARCHAR(255)  NOT NULL,
  address     VARCHAR(500)  NOT NULL,
  latitude    FLOAT         NOT NULL,
  longitude   FLOAT         NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Optional: seed some sample schools
-- INSERT INTO schools (name, address, latitude, longitude) VALUES
--   ('Delhi Public School',       'Mathura Road, New Delhi, 110003',     28.5355, 77.2910),
--   ('Kendriya Vidyalaya',        'Sector 8, RK Puram, New Delhi',       28.5672, 77.1884),
--   ('St. Xavier School',         'Park Street, Kolkata, 700016',        22.5553, 88.3507),
--   ('City International School', 'FC Road, Pune, Maharashtra 411004',   18.5204, 73.8567),
--   ('Greenwood High School',     'Bannerghatta Road, Bengaluru 560083', 12.8432, 77.6011);

-- Verify
SELECT * FROM schools;
