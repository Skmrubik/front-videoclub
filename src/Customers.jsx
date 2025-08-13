import { useForm } from "react-hook-form";
import { insertCustomer } from './services/Customers.js'
import { getCountries } from './services/Countries.js'
import { getCitiesByCountry } from './services/Cities.js'
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
// ...existing code...
const actors = [
  { value: 1, label: "Actor 1" },
  { value: 2, label: "Actor 2" },
  { value: 3, label: "Actor 3" }
];
function Customers() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [countries, setCountries] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      const customer = {
                firstName: data.name,
                lastName: data.apellido,
                email: data.email,
                addressId: {
                    address: data.direccion1,
                    address2: data.direccion2,
                    district: data.distrito,
                    cityId: {
                        city_id: data.ciudad
                    },
                    postalCode: data.codigoPostal,
                    phone: data.telefono,
                }
            }
      insertCustomer(customer)
        .then(() => {
          console.log("Cliente insertado");
          alert("Cliente insertado correctamente");
          // Reset form or redirect as needed 
          reset();  
          setSelectedOption("");
          setCities([]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    getCountries()
      .then(items => {
        setCountries(items)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (selectedOption != undefined && selectedOption.value != undefined) {
      getCitiesByCountry(selectedOption.value) 
      .then(items => {
        setCities(items)
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
    
  }, [selectedOption]);


  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
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
            <p className="form-label">Nombre*</p>
            <input 
              {...register('name', { required: 'Nombre es obligatorio', pattern: {
                  value: /^[a-zA-Z\s]{0,20}$/,
                  message: 'Nombre debe tener como máximo 20 caracteres'
                } })} 
            />
          </div>
          <div className="form-input"> 
            <p className="form-label">Apellidos*</p>
            <input 
              {...register('apellido', { required: 'Apellidos es obligatorio', pattern: {
                  value: /^[a-zA-Z\s]{5,50}$/,
                  message: 'Apellido debe tener entre 5 y 50 caracteres'
                } })} 
            />
          </div>
          <div className="form-input"> 
            <p className="form-label">Email*</p>
            <input 
              {...register('email', { 
                required: 'Email obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email inválido'
                } 
              })} 
            />
          </div>
          <div className="form-input"> 
            <p className="form-label">Dirección 1*</p>
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
            <p className="form-label">Pais</p>
            <div style={{ padding: '0px 10px 10px 10px', fontFamily: 'Segoe UI'}}>
              <Select
                style={{ color: 'black', padding: 10 }}
                className="selectCountry"
                aria-labelledby="Segoe UI"
                inputId="Segoe UI"
                placeholder="Selecciona una opción..." 
                name="Segoe UI"
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuClose}
                defaultValue={0}
                value={selectedOption}
                onChange={setSelectedOption}
                options={countries}
              />
            </div>
          </div>
          <div className="form-input"> 
            <p className="form-label">Ciudad*</p>
            <select className="selectCity" disabled={selectedOption==""? true: false} 
            {...register("ciudad", { required: 'Ciudad es obligatoria' })}>
              <option value="" disabled selected>Selecciona un país</option>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>{city.label}</option>
              ))}
            </select>
          </div>
          <div className="form-input"> 
            <p className="form-label">Distrito*</p>
            <input 
              {...register('distrito', { required: 'Distrito es obligatorio' })} 
            />
          </div>
          <div className="form-input">
            <p className="form-label">Código postal*</p>
            <input 
              {...register('codigoPostal', { required: 'Código postal es obligatorio', pattern: {
                value: /^\d{5}$/,
                message: "El código postal debe tener 5 dígitos",
              },})} 
            />
          </div>
          <div className="form-input">
            <p className="form-label">Teléfono*</p>
            <input 
              {...register('telefono', { required: 'Teléfono es obligatorio', pattern: {
                value: /^\d{9}$/,
                message: "El teléfono debe tener 9 dígitos",
              },})} 
            />
          </div>
        </div>
        <div> 
          {errors.name && <p className="error">{errors.name.message}</p>}
          {errors.apellido && <p className="error">{errors.apellido.message}</p>}
          {errors.email && <p className="error">{errors.email.message}</p>}
          {errors.direccion1 && <p className="error">{errors.direccion1.message}</p>}
          {errors.direccion2 && <p className="error">{errors.direccion2.message}</p>}
          {errors.ciudad && <p className="error">{errors.ciudad.message}</p>}
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