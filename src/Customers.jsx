import { useForm } from "react-hook-form";
import { insertCustomer } from './services/Customers.js'
// ...existing code...
function Customers() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    const customer = {
                firstName: data.name,
                lastName: data.apellido,
                email: data.email,
                addressId: {
                    address: data.direccion1,
                    address2: data.direccion2,
                    district: data.distrito,
                    cityId: {
                        city_id: 424
                    },
                    postalCode: data.codigoPostal,
                    phone: data.telefono,
                }
            }
    insertCustomer(customer)
      .then((items) => {
        console.log("Cliente insertado");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  /*
  This component renders a form for customer input.{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: "Jorge",
                lastName: "Castillo",
                email: "a@mail.com",
                addressId: {
                    address: "Calle a",
                    address2: "Calle b",
                    district: "1",
                    cityId: {
                        city_id: 424
                    },
                    postalCode: "12345",
                    phone: "123456789",
                }
            })
        }
  */
  return (
    <div className="customers">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{marginTop: 40, fontSize: 15}}>Introduce los datos de un nuevo cliente</p>
        <div className="form-container">
          <div className="form-input"> 
            <p className="form-label">Nombre</p>
            <input 
              {...register('name', { required: 'Nombre es obligatorio' })} 
            />
          </div>
          <div className="form-input"> 
            <p className="form-label">Apellidos</p>
            <input 
              {...register('apellido', { required: 'Apellidos es obligatorio' })} 
            />
          </div>
          <div className="form-input"> 
            <p className="form-label">Email</p>
            <input 
              {...register('email', { 
                required: 'Email obligatorio',
                /* pattern: {
                  value: /^S+@S+$/i,
                  message: 'Email inválido'
                } */
              })} 
            />
          </div>
          <div className="form-input"> 
            <p className="form-label">Dirección 1</p>
            <input 
              {...register('direccion1', { required: 'Dirección 1 es obligatoria' })} 
            />
          </div>
          <div className="form-input"> 
            <p className="form-label">Dirección 2</p>
            <input 
              {...register('direccion2')} 
            />
          </div>
          <div className="form-input"> 
            <p className="form-label">Distrito</p>
            <input 
              {...register('distrito', { required: 'Distrito es obligatorio' })} 
            />
          </div>
          <div className="form-input">
            <p className="form-label">Código postal</p>
            <input 
              {...register('codigoPostal', { required: 'Código postal es obligatorio' })} 
            />
          </div>
          <div className="form-input">
            <p className="form-label">Teléfono</p>
            <input 
              {...register('telefono', { required: 'Teléfono es obligatorio' })} 
            />
          </div>
        </div>
        <div> 
          {errors.name && <p className="error">{errors.name.message}</p>}
          {errors.apellido && <p className="error">{errors.apellido.message}</p>}
          {errors.email && <p className="error">{errors.email.message}</p>}
          {errors.direccion1 && <p className="error">{errors.direccion1.message}</p>}
          {errors.direccion2 && <p className="error">{errors.direccion2.message}</p>}
          {errors.distrito && <p className="error">{errors.distrito.message}</p>}
          {errors.codigoPostal && <p className="error">{errors.codigoPostal.message}</p>}
          {errors.telefono && <p className="error">{errors.telefono.message}</p>}
        </div>
        
        <button type="submit" className="boton-guardar-cliente">Guardar</button>
      </form>
    </div>
  );
}
export default Customers;