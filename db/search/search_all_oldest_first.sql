SELECT p.id AS post_id, title, content, img, profile_pic,
date_created, username as author_username, upvotes FROM helo_posts p
JOIN helo_users u on u.id = p.author_id
WHERE LOWER(title) LIKE $1
ORDER BY date_created ASC;