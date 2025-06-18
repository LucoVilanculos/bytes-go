import { useEffect, useState } from "react";

import ProductList from "../components/admin/productList";
import OrderList from "../components/admin/orderList";
import {
    getProducts,
    getOrders,
    updateOrderStatus,
    getCategories,
    createCategories,
    createProduct,
    updateCategory,
    updateProduct,
    deleteProduct,
    deleteCategory,
    getCurrentUser
} from "../services/admin";
import { ProductModal } from "../components/admin/productModal";
import { CategoryModal } from "../components/admin/categoryModal";
import CategoryList from "../components/admin/categoryList";
import { Button } from "../components/ui/button";

export function AdminPage() {

    const logedUser = getCurrentUser();


    const [products, setProducts] = useState<Product[]>([]);

    interface User {
        _id: string;
        name: string;
        email: string;
        role: string;
    }

    type Order = {
        _id: string;
        user: User;
        userId: string;
        items: Product[];
        status: "pendente" | "enviado" | "entregue" | "cancelado";
        total: number;
        createdAt: string;
    };

    const [orders, setOrders] = useState<Order[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [isProductModalOpen, setProductModalOpen] = useState(false);

    type Category = { _id: string; name: string; description?: string };
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );

    type Product = {
        _id: string;
        name: string;
        price: number;
        categoryId: string;
        imageUrl: string;
        description: string;
        colors: string[];
        sizes: string[];
        stock: number;
    };

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            console.log("Produtos:", response);
            setProducts(response);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            const result = Array.isArray(response)
                ? response
                : Array.isArray(response?.data)
                    ? response.data
                    : Array.isArray(response?.orders)
                        ? response.orders
                        : [];
            console.log("Resposta de getOrders:", response);

            setOrders(result);
            setOrders(response);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            setOrders([])
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            if (Array.isArray(response)) {
                setCategories(response);
            } else {
                console.error("Categorias inválidas:", response);
                setCategories([]);
            }
            return response;
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        await updateOrderStatus(id, status);
        await fetchOrders();
    };

    // Open modals
    const openCategoryModal = (category: any) => {
        setSelectedCategory(category);
        setCategoryModalOpen(true);
    };

    const closeCategoryModal = () => {
        setCategoryModalOpen(false);
        setSelectedCategory(null);
        fetchCategories();
    };

    const openProductModal = (product: any) => {
        setSelectedProduct(product);
        setProductModalOpen(true);
    };

    const closeProductModal = () => {
        setProductModalOpen(false);
        setSelectedProduct(null);
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
        fetchOrders();
        fetchCategories();
    }, []);

    //const user = { name: "Maud Uate" };

    if (!logedUser || logedUser.role !== "admin") {
        
    return (
        <div className="p-6 space-y-10">
            <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
            <h2 className="text-2xl font-semibold mb-4 text-center">Welcome {logedUser.name}</h2>
            <section>
                <h2 className="text-2xl font-semibold mb-4">Requests</h2>
                <OrderList orders={orders} onUpdateStatus={handleUpdateStatus} />
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 flex justify-between">
                    Categories
                    <Button
                        onClick={() => openCategoryModal(null)}
                        className="btn-primary"
                    >
                        Add Category
                    </Button>
                </h2>
                <CategoryList categories={categories} onEdit={openCategoryModal}
                    onDelete={async (id) => {
                        try {
                            const confirmed = confirm("Tens certeza que queres apagar este produto?");
                            if (!confirmed) return;
                            await deleteCategory(id);
                            await fetchCategories();


                        } catch (error) {
                            console.error("Erro ao deletar categoria:", error);
                            alert("Erro ao deletar categoria");
                        }

                    }} />


            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 flex justify-between">
                    Products
                    <Button
                        onClick={() => openProductModal(null)}
                        className="btn-primary"
                    >
                        Add Product
                    </Button>
                </h2>
                <ProductList
                    products={products}
                    categories={categories}
                    onEdit={openProductModal}
                    onDelete={async (id) => {
                        try {
                            const confirmed = confirm("Tens certeza que queres apagar este produto?");
                            if (!confirmed) return;
                            await deleteProduct(id);
                            await fetchProducts();
                        } catch (error) {
                            console.error("Erro ao deletar produto:", error);
                            alert("Erro ao deletar produto");
                        }
                    }} />
            </section>

            {/* Modais */}
            <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={closeCategoryModal}
                category={selectedCategory}
                onSubmit={async (_category) => {
                    if (selectedCategory && selectedCategory._id) {
                        // Edit category
                        await updateCategory(selectedCategory._id, {
                            name: _category.name,
                            description: _category.description || "",
                        });

                        await fetchCategories();
                        console.log("Categoria atualizada com sucesso:", _category);
                    } else {
                        // Create category

                        await createCategories(_category);
                        await fetchCategories();
                        console.log("Categoria criada com sucesso:", _category);
                    }
                    closeCategoryModal();
                }}
            />
            <ProductModal
                isOpen={isProductModalOpen}
                onClose={closeProductModal}
                productToEdit={selectedProduct}
                categories={categories}
                onSubmit={async (_product) => {
                    try {
                        if (selectedProduct && selectedProduct._id) {
                            // Edit product
                            await updateProduct(selectedProduct._id, {
                                name: _product.name,
                                price: _product.price,
                                categoryId: _product.categoryId,
                                imageUrl: _product.imageUrl,
                                description: _product.description || "",
                                colors: _product.colors,
                                sizes: _product.sizes,
                                stock: _product.stock,
                            });
                            console.log("Produto atualizado com sucesso:", _product);
                        } else {
                            // Create product
                            await createProduct(_product);;
                            console.log("Produto criado com sucesso:", _product);
                        }
                        await fetchProducts();
                        closeProductModal();
                    } catch (error) {
                        console.error("Erro ao criar produto:", error);
                        alert("Erro ao criar produto");
                    }
                }}
            />
        </div>
    );
}else{
    <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
            </div>
}
}


