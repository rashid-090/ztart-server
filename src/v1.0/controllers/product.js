const messages = require("../../config/messages");
const { NotFoundException } = require("../../utils/customExceptions");
const {
  getAllProduct,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
} = require("../services/internal/product");
const { makeQueryBuilder } = require("../services/internal/queryBuilder");

const listProducts = async (req) => {
  const queryBuilder = makeQueryBuilder(req);
  const Products = await getAllProduct(queryBuilder, {});
  return {
    message: messages?.success,
    data: Products,
  };
};

const viewProduct = async (req) => {
  const Product = await getProductById(req?.params.id);
  return {
    message: messages?.success,
    data: Product,
  };
};

const deleteProduct = async (req) => {
  await deleteProductById(req?.params.id);
  return {
    message: messages?.success,
  };
};

const addProduct = async (req) => {
    const data = req?.body;
    data.userId = req?.user?._id;
    const Product = await createProduct(data);
    return {
        message: messages?.success,
        data: Product,
    };
};

const updateProducts=async(req)=>{
    const data=req?.body
    await updateProduct(req?.params?.id,data)
    return{
        message:messages?.success
    }
}

const uploadImage=async(req)=>{
  console.log(req);
}


module.exports = {
  listProducts,
  viewProduct,
  deleteProduct,
  addProduct,
  updateProducts,
  uploadImage
};
