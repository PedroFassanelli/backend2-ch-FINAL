import ProductRepository from '../repositories/ProductRepository.js';

class ProductController {
  async getAll(req, res) {
    try {
      const products = await ProductRepository.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos', error });
    }
  }

  async getById(req, res) {
    try {
      const product = await ProductRepository.getById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener producto', error });
    }
  }

  async create(req, res) {
    try {
      const newProduct = await ProductRepository.create(req.body);
      res.status(201).json({ message: 'Producto creado', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear producto', error });
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await ProductRepository.updateById(req.params.id, req.body);
      if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ message: 'Producto actualizado', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar producto', error });
    }
  }

  async delete(req, res) {
    try {
      const deletedProduct = await ProductRepository.deleteById(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar producto', error });
    }
  }
}

export default new ProductController();