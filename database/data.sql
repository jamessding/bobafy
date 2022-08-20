insert into "users" ("username", "hashedPassword", "firstName", "lastName", "avatarUrl", "email")
values ('guestUser', '$argon2i$v=19$m=4096,t=3,p=1$jdEUmsnl5/WGI3GVjP1/Vw$n8dKgTvn/RYRN1hMNdaLRipQGmAcjIERY+I3AuWV79c', 'Guest', 'User', 'https://avatars.githubusercontent.com/u/103629526?v=4', 'guestuser@example.com');

-- insert into "reviews" ("userId", "storeId", "imageUrl", "content", "drinkType", "recommend")
-- values (1, '1zWNM2R5NEKtSrc57FYhsQ', 'https://s3-media0.fl.yelpcdn.com/bphoto/JQAjIOMZA9DhHYNlLIndAQ/300s.jpg', 'My personal favorite is the White Peach Oolong with boba, 50% sweet!', 'Fruit Tea', true);
