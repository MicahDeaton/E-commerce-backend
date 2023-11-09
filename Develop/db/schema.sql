-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

-- category
CREATE TABLE category (
    id INT,
    category_name VARCHAR(50)
);
productproductcategory
-- product
CREATE TABLE product (
    id INT,
    product_name VARCHAR(50),
    price DECIMAL(15,2),
    stock INT,
    category_id INT
);

-- tag
CREATE TABLE tag (
    id INT,
    tag_name VARCHAR(50)
);

-- product_tag
CREATE TABLE product_tag (
    id INT,
    product_id INT,
    tag_id INT
);
