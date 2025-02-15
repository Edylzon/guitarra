import { useState, useEffect ,useMemo} from 'react'
import { db } from '../components/data/db'

export function aseCarts(){
  const inicialCart = () => {
      const localStorageCart = localStorage.getItem("cart")
      return localStorageCart ? JSON.parse(localStorageCart) 
      : []
    }
  
  
    const [data] = useState(db)
      const [cart, setCart] = useState(inicialCart)
  
      const max_cart = 5
      const min_cart = 1
  
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
      }, [cart])
      //funciones
      function addToCart(items) {
  
        const itemExits = cart.findIndex(guitar => guitar.id === items.id)
        if (itemExits >= 0) {
          if (cart[itemExits].quantify >= max_cart) return
          const updatecart = [...cart]
          updatecart[itemExits].quantify++
          setCart(updatecart)
        }
        else {
          items.quantify = 1
          setCart([...cart, items])
  
        }
  
      }
      function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
      function incrementar(id) {
        const uppdatedCart = cart.map(items => {
          if (items.id === id && items.quantify < max_cart) {
            return {
              ...items,
              quantify: items.quantify + 1
            }
          }
          return items
        })
        setCart(uppdatedCart)
      }
      function decrementar(id) {
        const uppdatedCart = cart.map(items => {
          if (items.id === id && items.quantify > min_cart) {
            return {
              ...items,
              quantify: items.quantify - 1
            }
          }
          return items
        })
        setCart(uppdatedCart)
      }
      function clearCart() {
        setCart([])
      }

      // use Memo
      const isEmpty= useMemo(() => cart.length  ===0 ,[cart] )
      const cartTotal=useMemo( () => cart.reduce( (total, item)  => total + (item.quantify * item.price),0),[cart])


  return{
    data,
    cart,
    addToCart,
    removeFromCart,
    incrementar,
    decrementar,
    clearCart,
    isEmpty,
    cartTotal
  }
}