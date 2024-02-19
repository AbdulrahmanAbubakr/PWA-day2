import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";

// async function useDb() {
//   const dbpromise = await openDB("simple-database", 2, {
//     upgrade(db) {
//   if (!db.objectStoreNames.contains("user")) {
//     db.createObjectStore("user",{keyPath:'id',autoIncrement:true});
//   }
//       if (!db.objectStoreNames.contains("products")) {
//         db.createObjectStore("products",{keyPath:'proId'});
//       }
//     },
//   });
// }

// useDb();

async function addProduct() {
  const dbpromise = await openDB("ecommerce", 6, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("products")) {
        db.createObjectStore("products", { keyPath: "id" });
      }
    },
  });

  var tx = dbpromise.transaction("products", "readwrite");
  Promise.all([
    tx.store.add({
      id: 1,
      name: "product 1",
      price: 1000,
    }),
    tx.store.add({
      id: 2,
      name: "product 2",
      price: 1500,
    }),
    tx.store.add({
      id: 3,
      name: "product3",
      price: 1700,
    }),
  ]);
}

async function getProduct() {
  const dbpromise = await openDB("ecommerce", 5);
  var myProduct = await dbpromise.get("products", 1);
  console.dir(myProduct);
}

async function getAllProduct() {
  const dbpromise = await openDB("ecommerce", 6);
  var allProducts = await dbpromise.getAll("products");
  console.dir(allProducts);
}
async function updateProduct() {
  const dbpromise = await openDB("ecommerce", 7);
  var product = await dbpromise.put("products", {
    id: 1,
    name: "product 8",
    price: 4000,
  });
  console.dir(product);
}
async function deleteProduct() {
  const dbpromise = await openDB("ecommerce", 7);
  //   var transaction = await dbpromise.transaction("products", "readwrite");
  let deleteProduct = await dbpromise.delete("products", 2);
  console.log("done");
}
window.deleteProduct = deleteProduct;
window.updateProduct = updateProduct;
window.addProduct = addProduct;
window.getProduct = getProduct;
window.getAllProduct = getAllProduct;
