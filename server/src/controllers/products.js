const { pool } = require("../config/database");

exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "created_at",
      order = "desc",
    } = req.query;
    const offset = (page - 1) * limit;

    const products = await pool.query(
      `SELECT * FROM products 
       ORDER BY ${sort} ${order}
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const total = await pool.query("SELECT COUNT(*) FROM products");
    const totalPages = Math.ceil(total.rows[0].count / limit);

    res.json({
      status: "success",
      data: {
        products: products.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: parseInt(total.rows[0].count),
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching products",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);

    if (product.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.json({
      status: "success",
      data: {
        product: product.rows[0],
      },
    });
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching product",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO products (name, description, price, stock, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, price, stock, req.userId]
    );

    res.status(201).json({
      status: "success",
      data: {
        product: newProduct.rows[0],
      },
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      status: "error",
      message: "Error creating product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    // Check if product exists and belongs to the user
    const existingProduct = await pool.query(
      "SELECT * FROM products WHERE id = $1 AND user_id = $2",
      [req.params.id, req.userId]
    );

    if (existingProduct.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Product not found or unauthorized",
      });
    }

    const updatedProduct = await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *",
      [name, description, price, stock, req.params.id]
    );

    res.json({
      status: "success",
      data: {
        product: updatedProduct.rows[0],
      },
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      status: "error",
      message: "Error updating product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    // Check if product exists and belongs to the user
    const existingProduct = await pool.query(
      "SELECT * FROM products WHERE id = $1 AND user_id = $2",
      [req.params.id, req.userId]
    );

    if (existingProduct.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Product not found or unauthorized",
      });
    }

    await pool.query("DELETE FROM products WHERE id = $1", [req.params.id]);

    res.json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      status: "error",
      message: "Error deleting product",
    });
  }
};
