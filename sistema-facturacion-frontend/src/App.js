import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ProductCatalog from "./components/ProductCatalog";
import ShoppingCart from "./components/ShoppingCart";
import SelectVendor from "./components/SelectVendor";
import Invoice from "./components/Invoice/Invoice";
import axios from "axios";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  return (
    <Router>
      <div className="App">
        {/* Colocar el Toaster aquí, dentro del div padre */}
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/invoice" element={<Invoice />} />
          {/* Puedes agregar más rutas aquí si es necesario */}
        </Routes>

        {user ? (
          <>
            {user.tipo_usuario === "admin" && <AdminDashboard />}
            {user.tipo_usuario === "user" && (
              <UserDashboard
                selectedVendor={selectedVendor}
                setSelectedVendor={setSelectedVendor}
                cart={cart}
                setCart={setCart}
                user={user}
              />
            )}
          </>
        ) : (
          <Auth setUser={setUser} />
        )}
      </div>
    </Router>
  );
}

const UserDashboard = ({
  selectedVendor,
  setSelectedVendor,
  cart,
  setCart,
  user,
}) => {
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id_producto === product.id_producto
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id_producto === product.id_producto
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const fetchUser = async (idVendedor) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/usuarios/${idVendedor}`
      );
      console.log("Usuario obtenido:", response.data);
      return response.data.nombre_per + " " + response.data.apellido_per;
    } catch (error) {
      console.error("Error obteniendo el usuario:", error);
      return null;
    }
  };

  const removeFromCart = (id_producto) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id_producto !== id_producto)
    );
  };

  const proceedToCheckout = async () => {
    if (!user || !selectedVendor) {
      console.error("Usuario no autenticado o vendedor no seleccionado");
      return;
    }

    const total_factura = cart.reduce(
      (total, item) => total + item.precio_compra_producto_lote * item.quantity,
      0
    );

    const facturaData = {
      id_factura: Math.floor(Math.random() * 200),
      id_metodo_pago: 1, // Cambia según el método de pago seleccionado
      id_persona: user.id,
      fecha_factura: new Date().toISOString().split("T")[0],
      total_factura: total_factura,
      id_vendedor: selectedVendor,
      numero_factura: "FAC-" + Math.floor(Math.random() * 100000),
      productos: cart,
    };

    // Llama a la API para crear la factura
    console.log(facturaData);
    axios
      .post("http://localhost:3000/api/facturas", facturaData)
      .then((response) => {
        console.log("Factura creada:", response.data);
        // Redirigir a la página de factura con la información
      })
      .catch((error) => {
        console.error("Error creando la factura:", error);
      });

    const sellerName = await fetchUser(selectedVendor);
    navigate("/invoice", { state: { invoiceData: facturaData, sellerName } });
  };

  return (
    <div>
      <SelectVendor setSelectedVendor={setSelectedVendor} />
      <ProductCatalog addToCart={addToCart} />
      <ShoppingCart
        cart={cart}
        removeFromCart={removeFromCart}
        proceedToCheckout={proceedToCheckout}
      />
    </div>
  );
};

export default App;
