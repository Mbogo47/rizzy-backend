CREATE DATABASE rizzyDB
use rizzyDB

--Create Customer schema
-- CREATE SCHEMA customer;

-- Customer Table
CREATE TABLE customer.users (
  userId INT IDENTITY(1, 1) PRIMARY KEY,
  userName VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(MAX)
);

--Create Products schema
-- CREATE SCHEMA products;

-- Products Table
CREATE TABLE products.Products (
  productId INT IDENTITY(1, 1) PRIMARY KEY,
  productName VARCHAR(50),
  productDescription VARCHAR(MAX),
  productPrice DECIMAL(10, 2),
  category VARCHAR(50)
);



INSERT INTO products.Products (productName, productDescription, productPrice, category)
VALUES
    -- Inserting data for children's clothing
   ('Romper', 'Adorable and comfortable romper for infants.', 19.99, 'Children'),
    ('T-shirt', 'Cute and colorful t-shirt for toddlers.', 14.99, 'Children'),
    ('Jeans', 'Stylish jeans for young children.', 24.99, 'Children'),
    ('Dress', 'Elegant dress for little ones.', 29.99, 'Children'),
    ('Polo-Shirt', 'Classic polo shirt for kids.', 19.99, 'Children'),
    ('Onesies', 'Comfortable onesies for newborns.', 16.99, 'Children'),
    ('Sweater', 'Warm and cozy sweater for children.', 22.99, 'Children'),
    ('Skirt', 'Playful skirt for little ones.', 17.99, 'Children'),
    
    -- Inserting data for women's clothing
    ('Sweatpants', 'Comfortable sweatpants for a relaxed look.', 29.99, 'Women'),
    ('Leather Pants', 'Stylish and trendy leather pants for a chic outfit.', 49.99, 'Women'),
    ('Jumpsuit', 'A fashionable jumpsuit suitable for various occasions.', 39.99, 'Women'),
    ('Evening Gown', 'An elegant evening gown for special occasions.', 34.99, 'Women'),
    ('Ankle Boots', 'Stylish ankle boots to complement any outfit.', 54.99, 'Women'),
    ('High Heel Sandals', 'Elegant high heel sandals for formal occasions.', 59.99, 'Women'),
    ('Tote Bag', 'Spacious and versatile tote bag for daily essentials.', 32.99, 'Women'),
    ('Clutch', 'Elegant clutch purse for evening events.', 29.99, 'Women'),
    
    -- Inserting data for men's clothing
    ('Leather Jacket', 'A stylish leather jacket for a classic and rugged look.', 99.99, 'Men'),
    ('Sneakers', 'Comfortable and versatile sneakers for everyday wear.', 49.99, 'Men'),
    ('Wristwatch', 'An elegant wristwatch to complement any outfit.', 79.99, 'Men'),
    ('Dress Shirt', 'A crisp and tailored dress shirt for formal occasions.', 59.99, 'Men'),
    ('Chinos', 'Classic chinos for a smart casual look.', 39.99, 'Men'),
    ('Hoodie', 'A comfortable hoodie for a relaxed and casual style.', 34.99, 'Men'),
    ('Loafers', 'Sophisticated loafers for a polished and refined appearance.', 69.99, 'Men'),
    ('Polo Shirt', 'A timeless polo shirt for a sporty and classic outfit.', 29.99, 'Men');

-- Add the productImage column
ALTER TABLE products.Products
ADD productImage VARCHAR(MAX);

-- -- Update the rows with the appropriate productImage URLs based on productName
UPDATE products.Products
SET productImage =
  CASE productName
    -- WOMEN
    WHEN 'Sweatpants' THEN 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQszDtVyAQozqliKHam7HfBMMxJINagq0Exyg&usqp=CAU'
    WHEN 'Leather Pants' THEN 'https://pictures-kenya.jijistatic.com/40196155_NjIwLTkzMC0zZGRkZWNmYTE4LTE.webp'
    WHEN 'Jumpsuit' THEN 'https://lulabridal.com/cdn/shop/files/kamora-jumpsuit-burgundy-custom-size-wedding-273.webp'
    WHEN 'Evening Gown' THEN 'https://i.etsystatic.com/36443295/r/il/23eb0a/4955098877/il_fullxfull.4955098877_9iq0.jpg'
    WHEN 'Ankle Boots' THEN 'https://images.yaoota.com/o8HKtU1MKHSqLYOhpGaHN6FykUY=/trim/fit-in/500x500/filters:quality(80)/yaootaweb-production-ke/media/crawledproductimages/681a9552345d6bcd8351cd9f4483655937abca69.jpg'
    WHEN 'High Heel Sandals' THEN 'https://images.bewakoof.com/utter/content/2899/content_1.jpg'
    WHEN 'Tote Bag' THEN 'https://m.media-amazon.com/images/I/71Y-HIaFEWL._AC_UY1000_.jpg'
    WHEN 'Clutch' THEN 'https://m.media-amazon.com/images/I/910VXNiPx6L.jpg'

    -- MEN
    WHEN 'Leather Jacket' THEN 'https://www.mrporter.com/cms/ycm/resource/blob/1412138/91edd48ea6b18b893a35654bc579d6a5/image-mobile-data.jpg'
    WHEN 'Sneakers' THEN 'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/20/7902031/1.jpg'
    WHEN 'Wristwatch' THEN 'https://media.neimanmarcus.com/f_auto,q_auto:low,ar_4:5,c_fill,dpr_2.0,w_456/01/nm_4372084_100000_m'
    WHEN 'Dress Shirt' THEN 'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/71/222537/1.jpg'
    WHEN 'Chinos' THEN 'https://i.pinimg.com/originals/72/02/0b/72020be88d879770cc2da653a3053f25.jpg'
    WHEN 'Hoodie' THEN 'https://ke.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/20/639892/1.jpg'
    WHEN 'Loafers' THEN 'https://images.bewakoof.com/utter/content/2830/content_blue_loafers_for_men_fashion_2018.jpg'
    WHEN 'Polo Shirt' THEN 'https://hips.hearstapps.com/hmg-prod/images/hlh110122lifestyle003-1664380770.jpg'
    WHEN 'Belt' THEN 'https://media.istockphoto.com/id/454363033/photo/brown-leather-belt-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=4mKQ6Ta9Fck_7KuY0Vk7L4dG1i1CzIZtX4rssGt9gW8='

    -- KIDS FASHION
    WHEN 'Romper' THEN 'https://asherkids.co.ke/wp-content/uploads/2020/09/warm-romper.jpeg'
    WHEN 'T-shirt' THEN 'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/99/7968111/1.jpg'
    WHEN 'Jeans' THEN 'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/32/846103/1.jpg'
    WHEN 'Dress' THEN 'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/37/834052/1.jpg'
    WHEN 'Polo-Shirt' THEN 'https://www.rlmedia.io/is/image/PoloGSI/s7-1264387_lifestyle?$plpDeskRF$'
    WHEN 'Onesies' THEN 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShMmVeG-W6TmRSFbo5MOqZIXiyLC_QcZTlPw&usqp=CAU'
    WHEN 'Sweater' THEN 'https://5.imimg.com/data5/DT/BK/WM/SELLER-64329850/kids-girls-sweater-500x500.jpg'
    WHEN 'Skirt' THEN 'https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/63/586465/1.jpg?9630'
 WHEN 'Pink Sneakers' THEN 'http://d13y5iorv6bymp.cloudfront.net/image/cache/catalog/NRB8130-------/pink-purple-unicorn-pastel-color-candies-high-top-lace-up-sneakers-boots-shoes-800x800.jpg'
    
    ELSE '' -- Default value if productName doesn't match any cases
  END;


-- Create Cart table
CREATE TABLE Cart (
    cartId INT PRIMARY KEY,
    userId INT FOREIGN KEY REFERENCES Users(userId),
    createdAt DATETIME,
    isCheckedOut BIT
);

-- Create Cart Items table
CREATE TABLE CartItems (
    cartItemId INT PRIMARY KEY,
    cartId INT FOREIGN KEY REFERENCES Cart(cartId),
    productId INT FOREIGN KEY REFERENCES Products(productId),
    quantity INT
);

-- Create Wishlist table
CREATE TABLE Wishlist (
    wishlistId INT PRIMARY KEY,
    userId INT FOREIGN KEY REFERENCES Users(userId)
);

-- Create Wishlist Items table
CREATE TABLE WishlistItems (
    wishlistItemId INT PRIMARY KEY,
    wishlistId INT FOREIGN KEY REFERENCES Wishlist(wishlistId),
    productId INT FOREIGN KEY REFERENCES Products(productId)
);

-- Create Orders table
CREATE TABLE Orders (
    orderId INT PRIMARY KEY,
    userId INT FOREIGN KEY REFERENCES Users(userId),
    createdAt DATETIME,
    totalAmount DECIMAL(10, 2)
);

-- Create Order Items table
CREATE TABLE OrderItems (
    orderItemId INT PRIMARY KEY,
    orderId INT FOREIGN KEY REFERENCES Orders(orderId),
    productId INT FOREIGN KEY REFERENCES Products(productId),
    quantity INT,
    unitPrice DECIMAL(10, 2)
);

-- Create Admins table

CREATE TABLE admin.Admins (
    adminId INT PRIMARY KEY IDENTITY(1,1), 
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100)
);



-- -- Add the productImage column
-- ALTER TABLE products.Products
-- ADD productImage VARCHAR(MAX);

