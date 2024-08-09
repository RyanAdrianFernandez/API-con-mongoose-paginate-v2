import { Router } from "express";
import ProductModel from "../models/products.model.js";

const productRouter = Router();

productRouter.get("/products", async (req, res) => {
    try{
      const limit = parseInt(req.query.limit, 10) || 10;
      const page = parseInt(req.query.page, 10) || 1;
      let query = req.query.query // Filtrar por elemento
      let categoria = req.query.categoria // Filtrar por categoría
      let disponibilidad = req.query.disponibilidad // Filtrar por disponibilidad, true/false
      let orden = req.query.orden // Ordenar el precio asc/desc, sort
      let filtro = {}
      // Filtrar por elemento si existe el query
      
        if (categoria) {
          filtro.categoria = categoria;
      }

      // Filtrar por disponibilidad si se proporciona
      if (disponibilidad) {
          // Convertir 'disponibilidad' a booleano
          const disponibilidadBool = disponibilidad === 'true';
          filtro.disponibilidad = disponibilidadBool;
      }
      
      
      const opciones = {
        page,
        limit
      }
      if (orden === 'asc' || orden === 'desc') {
        // Convertir 'asc'/'desc' a 1/-1 para el ordenamiento
        const direccion = orden === 'asc' ? 1 : -1;
        opciones.sort = { price: direccion };
    }

      const productos = await ProductModel.paginate(filtro, opciones)
      res.status(200).json({status: "Success", payload: productos})
    }
    catch{err=>res.status(500).send(err)}
})

productRouter.post("/products", async (req, res)=>{
    const newProduct = new ProductModel(req.body);
    console.log(newProduct);
    const productGuardado = await newProduct.save()
    res.json(productGuardado);
})

export default productRouter