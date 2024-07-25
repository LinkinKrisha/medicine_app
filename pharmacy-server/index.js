const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'register'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(cors());
app.use(bodyParser.json());

// User registration endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  connection.query(
    'INSERT INTO registerdetail (USERNAME, PASWRD, EMAIL) VALUES (?, ?, ?)',
    [username, password, email],
    (error, results) => {
      if (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Error registering user: ' + error.message });
      }
      res.json({ message: 'User registered successfully' });
    }
  );
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {l
    return res.status(400).json({ message: 'Username and password are required' });
  }

  connection.query(
    'SELECT * FROM registerdetail WHERE USERNAME = ? AND PASWRD = ?',
    [username, password],
    (error, results) => {
      if (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Error logging in: ' + error.message });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      res.json({ message: 'Login successful' });
    }
  );
});

// transaction
app.put('/transactions/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ message: 'Transaction ID and status are required' });
  }
  const sql = 'UPDATE transactions SET status = ? WHERE id = ?';
  const values = [status, id];

  // Execute the query
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating transaction status:', err);
      res.status(500).json({ error: 'Failed to update transaction status' });
      return;
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Transaction not found or status not updated' });
      return;
    }

    console.log('Transaction status updated successfully');
    res.json({ message: 'Transaction status updated successfully' });
  });
});


app.get('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const query = 'SELECT * FROM orders WHERE id = ?';
  connection.query(query, [orderId], (error, results) => {
    if (error) {
      console.error('Error fetching order:', error);
      res.status(500).send('Error fetching order');
      return;
    }
    res.json(results[0]); // Assuming `id` is unique, there should be only one result
  });
});
// app.post('/orders', (req, res) => {
//   const { address, items, totalAmount, paymentMethod } = req.body;

//   const insertOrderQuery = `
//     INSERT INTO orders (address, items, total_amount, payment_method)
//     VALUES (?, ?, ?, ?)
//   `;
  
//   db.query(insertOrderQuery, [address, JSON.stringify(items), totalAmount, paymentMethod], (err, result) => {
//     if (err) {
//       console.error('Error inserting order:', err.message);
//       return res.status(500).json({ message: 'Failed to save order', error: err.message });
//     }
//     res.status(200).json({ message: 'Order saved successfully', orderId: result.insertId });
//   });
// });
app.post('/orders', (req, res) => {
  const { address, items, totalAmount, paymentMethod } = req.body;
  const itemsJson = JSON.stringify(items);

  const sql = 'INSERT INTO orders (address, items, total_amount, payment_method) VALUES (?, ?, ?, ?)';
  const values = [address, itemsJson, totalAmount, paymentMethod];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error saving order to database:', err.message);
      res.status(500).json({ error: 'Failed to save order' });
      return;
    }

    console.log('Order saved successfully');
    res.json({ message: 'Order saved successfully' });
  });
});

// GET endpoint to fetch all orders
app.get('/orders', (req, res) => {
  const sql = 'SELECT * FROM orders';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err.message);
      res.status(500).json({ error: 'Failed to fetch orders' });
      return;
    }

    res.json(results);
  });
});
app.put('/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ message: 'Order ID and status are required' });
  }

  const sql = 'UPDATE orders SET status = ? WHERE id = ?';
  const values = [status, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating order status:', err);
      return res.status(500).json({ error: 'Failed to update order status' });
    }
    console.log('Order status updated successfully');
    res.json({ message: 'Order status updated successfully' });
  });
});

// Products endpoints
app.post('/products', (req, res) => {
  const { label, description, price, image, outOfStock } = req.body;
  if (!label || !price) {
    return res.status(400).json({ message: 'Label and price are required' });
  }

  const sql = 'INSERT INTO products (label, description, price, image, outOfStock) VALUES (?, ?, ?, ?, ?)';
  const values = [label, description || null, price, image || null, outOfStock || false];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ error: 'Failed to add product' });
    }
    res.json({ message: 'Product added successfully', productId: result.insertId });
  });
});

app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(results);
  });
});

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  const sql = 'DELETE FROM products WHERE id = ?';
  connection.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ error: 'Failed to delete product' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const { label, description, price, image, outOfStock } = req.body;

  if (!label || !price) {
    return res.status(400).json({ message: 'Label and price are required' });
  }

  const sql = 'UPDATE products SET label = ?, description = ?, price = ?, image = ?, outOfStock = ? WHERE id = ?';
  const values = [label, description || null, price, image || null, outOfStock || false, productId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Failed to update product' });
    }
    res.json({ message: 'Product updated successfully' });
  });
});

app.post('/categorie', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  const sql = 'INSERT INTO categories (name) VALUES (?)';
  const values = [name];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding category:', err);
      return res.status(500).json({ error: 'Failed to add category' });
    }
    res.json({ message: 'Category added successfully', categoryId: result.insertId });
  });
});
app.get('/categorie', (req, res) => {
  const sql = 'SELECT * FROM categorie';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json(results);
  });
});
app.get('/categorie/:id', (req, res) => {
  const categoryId = req.params.id;
  const sql = 'SELECT * FROM categories WHERE id = ?';
  
  connection.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error('Error fetching category:', err);
      res.status(500).json({ error: 'Failed to fetch category' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.post('/categorie/:categoryId/categoryproducts', (req, res) => {
  const { categoryId } = req.params;
  const { name, description, price, image_url } = req.body;

  if (!categoryId || !name || !price || !image_url) {
    return res.status(400).json({ message: 'Category ID, name, price, and image URL are required' });
  }

  const sql = 'INSERT INTO categoryproducts (categoryId, name, description, price, image_url) VALUES (?, ?, ?, ?, ?)';
  const values = [categoryId, name, description || null, price, image_url || null];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding product to category:', err);
      return res.status(500).json({ error: 'Failed to add product to category' });
    }
    res.json({ message: 'Product added to category successfully', productCategoryId: result.insertId });
  });
});

app.get('/categorie/:categoryId/categoryproducts', (req, res) => {
  const { categoryId } = req.params;
  const sql = 'SELECT * FROM categoryproducts WHERE categoryId = ?';

  connection.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error('Error fetching products for category:', err);
      return res.status(500).json({ error: 'Failed to fetch products for category' });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
