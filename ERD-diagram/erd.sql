CREATE TABLE `parks` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `code` varchar(255),
  `parking_name` varchar(255),
  `parking_location` varchar(255),
  `amount_per_hr` decimal(10,2),
  `n_available` integer,
  `status` varchar(255) DEFAULT 'AVAILABLE' COMMENT 'ENUM: AVAILABLE | FULL',
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255) UNIQUE,
  `password` varchar(255) COMMENT 'Hidden from select queries',
  `role` varchar(255) DEFAULT 'ATTENDANT' COMMENT 'ENUM: ADMIN | ATTENDANT',
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
);

CREATE TABLE `vehicles` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `plate_number` varchar(255),
  `park_id` integer,
  `user_id` integer,
  `entry_time` timestamp COMMENT 'Nullable',
  `exit_time` timestamp COMMENT 'Nullable',
  `charged_amount` float DEFAULT 0,
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
);

CREATE TABLE `history` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `entity_type` varchar(100),
  `entity_id` varchar(100),
  `action` varchar(255) COMMENT 'ENUM: CREATE | UPDATE | DELETE',
  `actor_email` varchar(255),
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE `vehicles` ADD FOREIGN KEY (`park_id`) REFERENCES `parks` (`id`);

ALTER TABLE `vehicles` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
