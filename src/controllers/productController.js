import { ProductService } from '../repositories/index.js';

class ProductController {
  async getAll(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error al obtener productos', error });
    }
  }

  async getById(req, res) {
    try {
      const product = await ProductService.getProductByID(req.params.id);
      if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json(product);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error al obtener producto', error });
    }
  }

  async create(req, res) {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json({ message: 'Producto creado', product: newProduct });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error al crear producto', error });
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
      if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ message: 'Producto actualizado', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar producto', error });
    }
  }

  async delete(req, res) {
    try {
      const deletedProduct = await ProductService.deleteProduct(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar producto', error });
    }
  }
}

export default new ProductController();