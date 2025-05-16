This is my first socket io realtime chatting application. 


deploed to heroku 


db updates

ALTER TABLE `users` ADD `chatURL` TEXT NOT NULL AFTER `image`;

ALTER TABLE `messages` ADD `user_id` INT NOT NULL AFTER `user_ids`, ADD `room_id` TEXT NOT NULL AFTER `user_id`;